<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { AppRouteRecordRaw } from '../../types/router'

const props = defineProps<{
  route: AppRouteRecordRaw
}>()

const currentRoute = useRoute()

const isActive = computed(() => {
  if (props.route.name === 'Root') return false
  return currentRoute.name === props.route.name || currentRoute.path.startsWith(props.route.path as string)
})

const showInSidebar = computed(() => !props.route.meta?.hideInSidebar)
</script>

<template>
  <li v-if="showInSidebar && props.route.name !== 'Root'" class="nav-item">
    <router-link
      :to="{ path: props.route.path }"
      class="nav-link d-flex align-items-center py-2 px-3 rounded"
      :class="{ active: isActive }"
      active-class="active"
    >
      <i v-if="route.meta?.icon" :class="['me-2', route.meta.icon]"></i>
      <span class="animate__animated animate__fadeIn">{{ route.meta?.title ?? route.name }}</span>
    </router-link>
  </li>
</template>

<style scoped>
.nav-link {
  transition: background-color 0.2s ease, color 0.2s ease;
}
.nav-link:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.nav-link.active {
  background-color: rgba(13, 110, 253, 0.15);
  color: var(--bs-primary);
}
</style>
