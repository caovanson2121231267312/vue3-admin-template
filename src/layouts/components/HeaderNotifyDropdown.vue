<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
const isOpen = ref(false)

const notifications = ref([
  { id: 1, text: 'Cập nhật hệ thống thành công', time: '5 phút trước', read: false },
  { id: 2, text: 'Bạn có 3 tin nhắn mới', time: '1 giờ trước', read: true },
])

function showTestToast() {
  toast.success('Đây là thông báo từ Toast!')
  isOpen.value = false
}
</script>

<template>
  <div class="dropdown">
    <button
      class="btn btn-link text-dark position-relative p-2 rounded-circle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      @click="isOpen = !isOpen"
    >
      <i class="bi bi-bell fs-5"></i>
      <span
        v-if="notifications.some((n) => !n.read)"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style="font-size: 0.65rem"
      >
        {{ notifications.filter((n) => !n.read).length }}
      </span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end shadow animate__animated animate__fadeIn">
      <li class="dropdown-header d-flex justify-content-between align-items-center">
        <span>Thông báo</span>
        <button class="btn btn-sm btn-outline-primary" @click="showTestToast">Test Toast</button>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li v-for="n in notifications" :key="n.id">
        <a class="dropdown-item py-2" href="#">
          <span :class="{ 'fw-bold': !n.read }">{{ n.text }}</span>
          <small class="text-muted d-block">{{ n.time }}</small>
        </a>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li><a class="dropdown-item text-center text-primary" href="#">Xem tất cả</a></li>
    </ul>
  </div>
</template>
