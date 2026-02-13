<script setup lang="ts">
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()

function onSubmit() {
  toast.success('Đăng nhập thành công (demo)')
  router.push({ name: 'Dashboard' })
}
</script>

<template>
  <div class="auth-form">
    <h4 class="text-center mb-4">Đăng nhập</h4>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input id="email" type="email" class="form-control" placeholder="admin@example.com" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mật khẩu</label>
        <input id="password" type="password" class="form-control" placeholder="••••••••" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
    </form>
    <p class="text-center text-muted small mt-3 mb-0">
      <router-link :to="{ name: 'Dashboard' }" class="text-decoration-none">← Quay lại trang chủ</router-link>
    </p>
  </div>
</template>
