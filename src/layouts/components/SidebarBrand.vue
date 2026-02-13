<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push({ name: 'Dashboard' })
}
</script>

<template>
  <div class="sidebar-brand d-flex align-items-center justify-content-center py-3">
    <a
      href="#"
      class="text-decoration-none text-dark fw-bold d-flex align-items-center animate__animated animate__fadeInLeft"
      @click.prevent="goHome"
    >
      <span class="fs-5">Vue Admin</span>
    </a>
  </div>
</template>

<style scoped>
.sidebar-brand a:hover {
  opacity: 0.85;
}
</style>
