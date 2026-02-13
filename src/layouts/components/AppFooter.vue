<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer py-3 mt-auto border-top bg-light animate__animated animate__fadeInUp">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col text-muted small">
          &copy; {{ year }} Vue Admin. Template TypeScript.
        </div>
        <div class="col-auto text-muted small">
          <a href="#" class="text-decoration-none text-muted">Trợ giúp</a>
          <span class="mx-2">|</span>
          <a href="#" class="text-decoration-none text-muted">Liên hệ</a>
        </div>
      </div>
    </div>
  </footer>
</template>
