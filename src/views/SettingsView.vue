<script setup lang="ts">
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <h1 class="mb-4">Cài đặt</h1>
    <p class="text-muted mb-4">Cấu hình ứng dụng.</p>
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" id="darkMode" />
          <label class="form-check-label" for="darkMode">Chế độ tối</label>
        </div>
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" id="notify" checked />
          <label class="form-check-label" for="notify">Bật thông báo</label>
        </div>
        <hr />
        <button type="button" class="btn btn-primary">Lưu thay đổi</button>
      </div>
    </div>
  </div>
</template>
