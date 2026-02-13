<script setup lang="ts">
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <h1 class="mb-4">Quản lý người dùng</h1>
    <p class="text-muted">Danh sách và chỉnh sửa người dùng.</p>
    <div class="card border-0 shadow-sm mt-3">
      <div class="card-body p-0 p-sm-3">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>admin@example.com</td>
              <td><span class="badge bg-primary">Admin</span></td>
              <td><span class="badge bg-success">Hoạt động</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>user@example.com</td>
              <td><span class="badge bg-secondary">User</span></td>
              <td><span class="badge bg-success">Hoạt động</span></td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>
</template>
