<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

const { t } = useI18n()
const isOpen = ref(false)

const notifications = computed(() => [
  { id: 1, text: t('notify.systemUpdated'), time: t('notify.timeAgo5m'), read: false },
  { id: 2, text: t('notify.newMessages'), time: t('notify.timeAgo1h'), read: true },
])

function showTestToast() {
  toast.success(t('common.toastMessage'))
  isOpen.value = false
}
</script>

<template>
  <div class="dropdown">
    <button
      class="btn btn-link text-dark position-relative p-2 rounded-circle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      @click="isOpen = !isOpen"
    >
      <i class="bi bi-bell fs-5"></i>
      <span
        v-if="notifications.some((n) => !n.read)"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style="font-size: 0.65rem"
      >
        {{ notifications.filter((n) => !n.read).length }}
      </span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end shadow animate__animated animate__fadeIn">
      <li class="dropdown-header d-flex justify-content-between align-items-center">
        <span>{{ t('common.notifications') }}</span>
        <button class="btn btn-sm btn-outline-primary" @click="showTestToast">{{ t('common.testToast') }}</button>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li v-for="n in notifications" :key="n.id">
        <a class="dropdown-item py-2" href="#">
          <span :class="{ 'fw-bold': !n.read }">{{ n.text }}</span>
          <small class="text-muted d-block">{{ n.time }}</small>
        </a>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li><a class="dropdown-item text-center text-primary" href="#">{{ t('common.viewAll') }}</a></li>
    </ul>
  </div>
</template>
