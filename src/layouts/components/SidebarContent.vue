<script setup lang="ts">
import { computed } from 'vue'
import SidebarBrand from './SidebarBrand.vue'
import SidebarNavLink from './SidebarNavLink.vue'
import SidebarNavGroup from './SidebarNavGroup.vue'
import { sidebarMenu } from '../../config/sidebar-menu'

const menuItems = computed(() => [...sidebarMenu].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)))
</script>

<template>
  <div class="sidebar-content">
    <SidebarBrand />
    <nav class="sidebar-nav px-2">
      <ul class="nav flex-column">
        <template v-for="item in menuItems" :key="item.title">
          <SidebarNavGroup v-if="item.children?.length" :item="item" />
          <SidebarNavLink v-else :item="item" />
        </template>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.sidebar-nav {
  padding-top: 0.5rem;
}
</style>
