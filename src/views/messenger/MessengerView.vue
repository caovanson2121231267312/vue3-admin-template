<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { MessengerConversation, MessengerMessage } from '../../types/messenger'
import {
  getConversations,
  getMessages,
  getOtherParticipant,
  formatMessageTime,
  formatListTime,
} from './data/messenger-mock'

const { t } = useI18n()
const currentUserId = 'me'

const conversations = ref<MessengerConversation[]>(getConversations())
const selectedId = ref<string | null>(null)
const searchQuery = ref('')
const messageInput = ref('')
const sidebarOpen = ref(false)
const extraMessages = ref<Record<string, MessengerMessage[]>>({})

const filteredConversations = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return conversations.value
  return conversations.value.filter((c) => {
    const other = getOtherParticipant(c, currentUserId)
    return other?.name.toLowerCase().includes(q)
  })
})

const selectedConversation = computed(() =>
  selectedId.value ? conversations.value.find((c) => c.id === selectedId.value) : null
)
const otherParticipant = computed(() =>
  selectedConversation.value ? getOtherParticipant(selectedConversation.value, currentUserId) : null
)
const messages = computed(() => {
  if (!selectedId.value) return []
  const base = getMessages(selectedId.value)
  const extra = extraMessages.value[selectedId.value] ?? []
  return [...base, ...extra]
})

function selectConversation(id: string) {
  selectedId.value = id
  sidebarOpen.value = false
}
function sendMessage() {
  const text = messageInput.value.trim()
  if (!text || !selectedId.value) return
  const newMsg: MessengerMessage = {
    id: 'new-' + Date.now(),
    conversationId: selectedId.value,
    senderId: currentUserId,
    text,
    sentAt: new Date().toISOString(),
  }
  if (!extraMessages.value[selectedId.value]) extraMessages.value[selectedId.value] = []
  extraMessages.value[selectedId.value].push(newMsg)
  extraMessages.value = { ...extraMessages.value }
  messageInput.value = ''
  const conv = conversations.value.find((c) => c.id === selectedId.value)
  if (conv) {
    conv.lastMessage = { text: newMsg.text, sentAt: newMsg.sentAt, senderId: currentUserId }
  }
}
function backToList() {
  selectedId.value = null
  sidebarOpen.value = true
}

// Mobile: show list by default when no conversation selected
watch(selectedId, (id) => {
  if (!id) sidebarOpen.value = true
})
</script>

<template>
  <div class="messenger-page animate__animated animate__fadeIn">
    <!-- Mobile: toggle sidebar (conversation list) -->
    <button
      v-if="selectedId"
      type="button"
      class="messenger-back d-lg-none"
      :aria-label="t('messenger.back')"
      @click="backToList"
    >
      <i class="bi bi-arrow-left"></i>
    </button>
    <button
      v-else
      type="button"
      class="messenger-menu d-lg-none"
      :aria-label="t('common.openMenu')"
      @click="sidebarOpen = true"
    >
      <i class="bi bi-list"></i>
    </button>

    <div
      class="messenger-overlay"
      :class="{ 'messenger-overlay--open': sidebarOpen }"
      aria-hidden="true"
      @click="sidebarOpen = false"
    ></div>

    <div class="messenger-layout">
      <!-- Left: conversation list -->
      <aside
        class="messenger-sidebar"
        :class="{ 'messenger-sidebar--open': sidebarOpen }"
      >
        <div class="messenger-sidebar__header">
          <span class="messenger-sidebar__title">{{ t('messenger.title') }}</span>
          <button
            type="button"
            class="messenger-sidebar__close d-lg-none"
            :aria-label="t('common.closeMenu')"
            @click="sidebarOpen = false"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="messenger-sidebar__search">
          <i class="bi bi-search"></i>
          <input
            v-model="searchQuery"
            type="text"
            class="messenger-sidebar__input"
            :placeholder="t('messenger.search')"
          />
        </div>
        <div class="messenger-sidebar__list">
          <button
            v-for="conv in filteredConversations"
            :key="conv.id"
            type="button"
            class="messenger-conv"
            :class="{ active: selectedId === conv.id }"
            @click="selectConversation(conv.id)"
          >
            <div class="messenger-conv__avatar">
              <span>{{ getOtherParticipant(conv, currentUserId)?.name?.charAt(0) ?? '?' }}</span>
              <span
                v-if="getOtherParticipant(conv, currentUserId)?.online"
                class="messenger-conv__online"
              ></span>
            </div>
            <div class="messenger-conv__body">
              <span class="messenger-conv__name">{{ getOtherParticipant(conv, currentUserId)?.name ?? '—' }}</span>
              <span class="messenger-conv__preview">
                {{ conv.lastMessage?.senderId === currentUserId ? t('messenger.you') + ': ' : '' }}{{ conv.lastMessage?.text ?? t('messenger.noMessages') }}
              </span>
            </div>
            <div class="messenger-conv__meta">
              <span class="messenger-conv__time">{{ conv.lastMessage ? formatListTime(conv.lastMessage.sentAt) : '' }}</span>
              <span v-if="conv.unreadCount > 0" class="messenger-conv__badge">{{ conv.unreadCount }}</span>
            </div>
          </button>
        </div>
      </aside>

      <!-- Right: chat -->
      <main class="messenger-main">
        <div v-if="!selectedId" class="messenger-welcome">
          <div class="messenger-welcome__icon"><i class="bi bi-chat-dots"></i></div>
          <p class="messenger-welcome__text">{{ t('messenger.chooseConversation') }}</p>
        </div>

        <template v-else>
          <header class="messenger-chat-header">
            <div class="messenger-chat-header__user">
              <div class="messenger-chat-header__avatar">
                {{ otherParticipant?.name?.charAt(0) ?? '?' }}
              </div>
              <div class="messenger-chat-header__info">
                <span class="messenger-chat-header__name">{{ otherParticipant?.name ?? '—' }}</span>
                <span class="messenger-chat-header__status">
                  {{ otherParticipant?.online ? t('messenger.online') : t('messenger.offline') }}
                </span>
              </div>
            </div>
            <div class="messenger-chat-header__actions">
              <button type="button" class="messenger-chat-header__btn" :title="t('messenger.videoCall')">
                <i class="bi bi-camera-video"></i>
              </button>
              <button type="button" class="messenger-chat-header__btn" :title="t('messenger.info')">
                <i class="bi bi-info-circle"></i>
              </button>
            </div>
          </header>

          <div class="messenger-messages">
            <div
              v-for="msg in messages"
              :key="msg.id"
              class="messenger-msg"
              :class="{ 'messenger-msg--own': msg.senderId === currentUserId }"
            >
              <div class="messenger-msg__bubble">
                <p class="messenger-msg__text">{{ msg.text }}</p>
                <span class="messenger-msg__time">{{ formatMessageTime(msg.sentAt) }}</span>
              </div>
            </div>
          </div>

          <div class="messenger-input-wrap">
            <div class="messenger-input">
              <input
                v-model="messageInput"
                type="text"
                class="messenger-input__field"
                :placeholder="t('messenger.typeMessage')"
                @keydown.enter.prevent="sendMessage()"
              />
              <button
                type="button"
                class="messenger-input__send"
                :disabled="!messageInput.trim()"
                :title="t('messenger.send')"
                @click="sendMessage"
              >
                <i class="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </template>
      </main>
    </div>
  </div>
</template>

<style scoped>
.messenger-page {
  margin: -1rem -1.5rem -1rem -1rem;
  min-height: calc(100vh - 120px);
  background: var(--bs-body-bg);
  position: relative;
}
@media (max-width: 991.98px) {
  .messenger-page {
    margin: -0.5rem -0.75rem -0.5rem -0.5rem;
  }
}
.messenger-back,
.messenger-menu {
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 1060;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  background: #fff;
  color: var(--bs-body-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
.messenger-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1040;
}
.messenger-overlay.messenger-overlay--open {
  display: block;
}
.messenger-layout {
  display: flex;
  height: calc(100vh - 120px);
  min-height: 400px;
}
.messenger-sidebar {
  width: 360px;
  min-width: 360px;
  background: #fff;
  border-right: 1px solid var(--bs-border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.messenger-sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem 0.75rem;
  border-bottom: 1px solid var(--bs-border-color);
}
.messenger-sidebar__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--bs-body-color);
}
.messenger-sidebar__close {
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--bs-body-color);
  border-radius: 8px;
  cursor: pointer;
}
.messenger-sidebar__close:hover {
  background: rgba(0, 0, 0, 0.06);
}
.messenger-sidebar__search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f0f2f5;
  margin: 0.5rem 1rem;
  border-radius: 20px;
}
.messenger-sidebar__search i {
  color: #65676b;
  font-size: 1rem;
}
.messenger-sidebar__input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  font-size: 0.9375rem;
  outline: none;
}
.messenger-sidebar__list {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}
.messenger-conv {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease;
}
.messenger-conv:hover {
  background: #f0f2f5;
}
.messenger-conv.active {
  background: #e7f3ff;
}
.messenger-conv__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0084ff, #00c6ff);
  color: #fff;
  font-weight: 600;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}
.messenger-conv__online {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #31a24c;
  border: 2px solid #fff;
}
.messenger-conv__body {
  flex: 1;
  min-width: 0;
}
.messenger-conv__name {
  display: block;
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--bs-body-color);
  margin-bottom: 2px;
}
.messenger-conv__preview {
  display: block;
  font-size: 0.8125rem;
  color: #65676b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.messenger-conv__meta {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}
.messenger-conv__time {
  font-size: 0.75rem;
  color: #65676b;
}
.messenger-conv__badge {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background: #0084ff;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.messenger-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}
.messenger-welcome {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #65676b;
  text-align: center;
  padding: 2rem;
}
.messenger-welcome__icon {
  font-size: 4rem;
  color: #c4c6c9;
  margin-bottom: 1rem;
}
.messenger-welcome__text {
  margin: 0;
  font-size: 1rem;
}
.messenger-chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #fff;
  border-bottom: 1px solid var(--bs-border-color);
}
.messenger-chat-header__user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.messenger-chat-header__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0084ff, #00c6ff);
  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
.messenger-chat-header__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.messenger-chat-header__name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--bs-body-color);
}
.messenger-chat-header__status {
  font-size: 0.8125rem;
  color: #31a24c;
}
.messenger-chat-header__actions {
  display: flex;
  gap: 0.25rem;
}
.messenger-chat-header__btn {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: transparent;
  color: #65676b;
  border-radius: 50%;
  cursor: pointer;
}
.messenger-chat-header__btn:hover {
  background: #f0f2f5;
  color: var(--bs-body-color);
}
.messenger-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 0;
}
.messenger-msg {
  display: flex;
  justify-content: flex-start;
}
.messenger-msg--own {
  justify-content: flex-end;
}
.messenger-msg__bubble {
  max-width: 70%;
  padding: 0.5rem 0.75rem;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}
.messenger-msg--own .messenger-msg__bubble {
  background: #0084ff;
  color: #fff;
}
.messenger-msg__text {
  margin: 0 0 4px;
  font-size: 0.9375rem;
  line-height: 1.4;
  word-break: break-word;
}
.messenger-msg__time {
  font-size: 0.6875rem;
  opacity: 0.8;
  display: block;
  text-align: right;
}
.messenger-input-wrap {
  padding: 0.75rem 1rem;
  background: #fff;
  border-top: 1px solid var(--bs-border-color);
}
.messenger-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #f0f2f5;
  border-radius: 24px;
}
.messenger-input__field {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  font-size: 0.9375rem;
  padding: 0.25rem 0;
  outline: none;
}
.messenger-input__send {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #0084ff;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}
.messenger-input__send:hover:not(:disabled) {
  opacity: 0.9;
}
.messenger-input__send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Mobile: sidebar drawer */
@media (max-width: 991.98px) {
  .messenger-back,
  .messenger-menu {
    display: inline-flex !important;
  }
  .messenger-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1050;
    width: 100%;
    max-width: 360px;
    min-width: 0;
    transform: translateX(-100%);
    box-shadow: none;
  }
  .messenger-sidebar.messenger-sidebar--open {
    transform: translateX(0);
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.12);
  }
  .messenger-sidebar__close {
    display: block !important;
  }
}
@media (min-width: 992px) {
  .messenger-back,
  .messenger-menu {
    display: none !important;
  }
  .messenger-sidebar__close {
    display: none !important;
  }
}
</style>
