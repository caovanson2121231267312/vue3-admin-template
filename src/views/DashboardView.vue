<script setup lang="ts">
import { toast } from 'vue3-toastify'

function showToast() {
  toast.success('Chào mừng đến Vue Admin!')
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <h1 class="mb-4">Dashboard</h1>
    <p class="text-muted mb-4">Tổng quan hệ thống quản trị.</p>
    <div class="row g-3">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 animate__animated animate__fadeInUp" style="animation-delay: 0.1s">
          <div class="card-body">
            <h5 class="card-title text-primary"><i class="bi bi-people me-2"></i>Người dùng</h5>
            <p class="card-text text-muted small">Quản lý tài khoản và phân quyền.</p>
            <router-link :to="{ name: 'Users' }" class="btn btn-outline-primary btn-sm">Xem</router-link>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 animate__animated animate__fadeInUp" style="animation-delay: 0.2s">
          <div class="card-body">
            <h5 class="card-title text-success"><i class="bi bi-gear me-2"></i>Cài đặt</h5>
            <p class="card-text text-muted small">Cấu hình hệ thống và giao diện.</p>
            <router-link :to="{ name: 'Settings' }" class="btn btn-outline-success btn-sm">Xem</router-link>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 animate__animated animate__fadeInUp" style="animation-delay: 0.3s">
          <div class="card-body">
            <h5 class="card-title text-info"><i class="bi bi-bell me-2"></i>Thông báo</h5>
            <p class="card-text text-muted small">Toast từ vue3-toastify.</p>
            <button class="btn btn-outline-info btn-sm" @click="showToast">Gửi Toast</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
