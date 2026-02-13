<script setup lang="ts">
</script>

<template>
  <div class="auth-layout min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="auth-card card shadow animate__animated animate__fadeInUp p-4" style="max-width: 420px; width: 100%">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.auth-card {
  border-radius: 12px;
}
</style>
