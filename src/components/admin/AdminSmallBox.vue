<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    value: string | number
    icon?: string
    variant?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'secondary'
    href?: string
    linkText?: string
  }>(),
  { icon: 'bi bi-cart3', variant: 'info', linkText: 'Xem thêm' }
)
</script>

<template>
  <div class="admin-small-box" :class="`admin-small-box--${variant}`">
    <div class="admin-small-box__inner">
      <h3 class="admin-small-box__value">{{ value }}</h3>
      <p class="admin-small-box__title">{{ title }}</p>
    </div>
    <div class="admin-small-box__icon">
      <i :class="icon"></i>
    </div>
    <a v-if="href" :href="href" class="admin-small-box__footer">
      {{ linkText }} <i class="bi bi-arrow-right-circle ms-1"></i>
    </a>
  </div>
</template>

<style scoped>
.admin-small-box {
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
  display: block;
  color: #fff;
  overflow: hidden;
}
.admin-small-box__inner {
  padding-right: 3rem;
}
.admin-small-box__value {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}
.admin-small-box__title {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.9;
}
.admin-small-box__icon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 4rem;
  opacity: 0.3;
}
.admin-small-box__footer {
  display: block;
  padding: 0.5rem 0 0;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 0.9rem;
}
.admin-small-box__footer:hover {
  color: #fff;
  text-decoration: none;
}
.admin-small-box--primary { background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%); }
.admin-small-box--success { background: linear-gradient(135deg, #198754 0%, #146c43 100%); }
.admin-small-box--info { background: linear-gradient(135deg, #0dcaf0 0%, #0aa2c0 100%); }
.admin-small-box--warning { background: linear-gradient(135deg, #ffc107 0%, #d39e00 100%); color: #212529; }
.admin-small-box--warning .admin-small-box__footer { color: rgba(0,0,0,0.7); }
.admin-small-box--warning .admin-small-box__footer:hover { color: #212529; }
.admin-small-box--danger { background: linear-gradient(135deg, #dc3545 0%, #b02a37 100%); }
.admin-small-box--secondary { background: linear-gradient(135deg, #6c757d 0%, #545b62 100%); }
</style>
