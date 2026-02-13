<script setup lang="ts">
import { ToastifyContainer } from 'vue3-toastify'
</script>

<template>
  <router-view />
  <ToastifyContainer />
</template>

<style>
#app {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
</style>
