<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push({ name: 'Dashboard' })
}
</script>

<template>
  <div class="text-center py-5 animate__animated animate__fadeIn">
    <h1 class="display-1 text-muted">404</h1>
    <p class="lead">Trang không tồn tại.</p>
    <button class="btn btn-primary mt-3" @click="goHome">Về Dashboard</button>
  </div>
</template>
