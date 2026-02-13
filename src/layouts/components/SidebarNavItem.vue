<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { AppRouteRecordRaw } from '../../types/router'

const props = defineProps<{
  route: AppRouteRecordRaw
}>()

const route = useRoute()

const isActive = computed(() => {
  if (props.route.name === 'Root') return false
  return route.name === props.route.name || route.path.startsWith(props.route.path as string)
})

const showInSidebar = computed(() => !props.route.meta?.hideInSidebar)
</script>

<template>
  <li v-if="showInSidebar && props.route.name !== 'Root'" class="nav-item">
    <router-link
      :to="{ path: props.route.path }"
      class="sidebar-nav-link d-flex align-items-center py-2 px-3 rounded"
      :class="{ 'sidebar-nav-link--active': isActive }"
      active-class="sidebar-nav-link--active"
    >
      <i v-if="props.route.meta?.icon" :class="['me-2', props.route.meta.icon]"></i>
      <span>{{ props.route.meta?.title ?? props.route.name }}</span>
    </router-link>
  </li>
</template>

<style scoped>
.sidebar-nav-link {
  transition: background-color 0.2s ease, color 0.2s ease;
  color: rgba(255, 255, 255, 0.85);
}
.sidebar-nav-link:hover {
  background-color: rgba(0, 255, 136, 0.08);
  color: var(--sidebar-accent);
}
.sidebar-nav-link--active {
  background-color: rgba(0, 255, 136, 0.12);
  color: var(--sidebar-accent);
  font-weight: 500;
}
</style>
