<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { SidebarMenuItem } from '../../config/sidebar-menu'

const props = defineProps<{
  item: SidebarMenuItem
}>()
const { t } = useI18n()

const route = useRoute()

const isActive = computed(() => {
  if (props.item.routeName && route.name === props.item.routeName) return true
  if (props.item.path && (route.path === props.item.path || route.path.startsWith(props.item.path + '/'))) return true
  return false
})

const to = computed(() => {
  if (props.item.path) return { path: props.item.path }
  if (props.item.routeName) return { name: props.item.routeName }
  return { name: 'Dashboard' }
})
</script>

<template>
  <li class="nav-item">
    <router-link
      :to="to"
      class="sidebar-nav-link d-flex align-items-center py-2 px-3 rounded"
      :class="{ 'sidebar-nav-link--active': isActive }"
    >
      <i v-if="item.icon" :class="['me-2', item.icon]"></i>
      <span>{{ t(item.title) }}</span>
    </router-link>
  </li>
</template>

<style scoped>
.sidebar-nav-link {
  transition: background 0.2s ease, color 0.2s ease;
  color: var(--sidebar-text);
  text-decoration: none;
}
.sidebar-nav-link:hover {
  background-color: var(--sidebar-hover);
  color: var(--sidebar-text);
}
.sidebar-nav-link--active {
  background: var(--sidebar-active-bg);
  color: var(--sidebar-active-color);
  font-weight: 500;
}
</style>
