<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { SidebarMenuItem } from '../../config/sidebar-menu'

const props = defineProps<{
  item: SidebarMenuItem
}>()
const { t } = useI18n()

const route = useRoute()
const expanded = ref(false)

const hasChildren = computed(() => Array.isArray(props.item.children) && props.item.children.length > 0)

const isChildActive = (path?: string, name?: string) => {
  if (name && route.name === name) return true
  if (path && route.path === path) return true
  return false
}

const isActive = computed(() => {
  if (!hasChildren.value) return false
  return props.item.children!.some((c: SidebarMenuItem) => isChildActive(c.path, c.routeName))
})

// Chỉ mở nhóm khi trang hiện tại nằm trong nhóm đó
watch(() => route.path, () => {
  expanded.value = isActive.value
}, { immediate: true })

function toggle() {
  expanded.value = !expanded.value
}
</script>

<template>
  <li class="sidebar-nav-group">
    <div
      class="sidebar-nav-group__toggle d-flex align-items-center py-2 px-3 rounded cursor-pointer"
      :class="{ 'sidebar-nav-group__toggle--active': isActive }"
      @click="toggle"
    >
      <i v-if="item.icon" :class="['me-2 flex-shrink-0', item.icon]"></i>
      <span class="flex-grow-1">{{ t(item.title) }}</span>
      <i class="bi flex-shrink-0 transition-rotate" :class="expanded ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
    </div>
    <Transition name="collapse">
      <ul v-show="expanded && hasChildren" class="sidebar-nav-group__children list-unstyled mb-0 ps-3">
        <li v-for="child in item.children" :key="child.routeName ?? child.path ?? child.title" class="sidebar-nav-group__child">
          <router-link
            :to="child.path ? { path: child.path } : { name: child.routeName! }"
            class="sidebar-nav-group__child-link d-flex align-items-center py-2 px-2 rounded"
            :class="{ 'sidebar-nav-group__child-link--active': isChildActive(child.path, child.routeName) }"
          >
            <span class="small">{{ t(child.title) }}</span>
          </router-link>
        </li>
      </ul>
    </Transition>
  </li>
</template>

<style scoped>
.sidebar-nav-group__toggle {
  transition: background 0.2s ease, color 0.2s ease;
  color: var(--sidebar-text);
}
.sidebar-nav-group__toggle:hover {
  background-color: var(--sidebar-hover);
  color: var(--sidebar-text);
}
.sidebar-nav-group__toggle--active {
  color: var(--sidebar-active-color, var(--sidebar-text));
}
.cursor-pointer {
  cursor: pointer;
}
.transition-rotate {
  transition: transform 0.2s ease;
}
.sidebar-nav-group__child-link {
  transition: background 0.2s ease, color 0.2s ease;
  color: var(--sidebar-text-muted);
  text-decoration: none;
}
.sidebar-nav-group__child-link:hover {
  background-color: var(--sidebar-hover);
  color: var(--sidebar-text);
}
.sidebar-nav-group__child-link--active {
  background: var(--sidebar-active-bg);
  color: var(--sidebar-active-color);
  font-weight: 500;
}
.collapse-enter-active,
.collapse-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
