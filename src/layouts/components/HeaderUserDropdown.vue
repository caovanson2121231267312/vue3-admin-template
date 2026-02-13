<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  router.push({ name: 'Login' })
}
</script>

<template>
  <div class="dropdown">
    <button
      class="btn btn-link text-dark text-decoration-none d-flex align-items-center dropdown-toggle py-2"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span class="rounded-circle bg-primary bg-opacity-25 d-inline-flex align-items-center justify-content-center me-2"
        style="width: 32px; height: 32px"
      >
        <i class="bi bi-person text-primary"></i>
      </span>
      <span class="d-none d-md-inline">Admin</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end shadow animate__animated animate__fadeIn">
      <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Hồ sơ</a></li>
      <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Cài đặt</a></li>
      <li><hr class="dropdown-divider" /></li>
      <li>
        <button class="dropdown-item text-danger" type="button" @click="logout">
          <i class="bi bi-box-arrow-right me-2"></i>Đăng xuất
        </button>
      </li>
    </ul>
  </div>
</template>
