<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  total: number
  active: number
  inactive: number
  newThisMonth: number
}>()
const { t } = useI18n()
</script>

<template>
  <div class="row g-3 mb-4">
    <div class="col-6 col-lg-3">
      <div class="card border-0 shadow-sm h-100 stats-card animate__animated animate__fadeInUp" style="animation-delay: 0.05s">
        <div class="card-body d-flex align-items-center">
          <div class="stats-card__icon bg-primary bg-opacity-10 rounded-3 p-3 me-3">
            <i class="bi bi-people-fill text-primary fs-4"></i>
          </div>
          <div>
            <div class="text-muted small">{{ t('users.totalUsers') }}</div>
            <div class="fs-4 fw-bold">{{ total }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 col-lg-3">
      <div class="card border-0 shadow-sm h-100 stats-card animate__animated animate__fadeInUp" style="animation-delay: 0.1s">
        <div class="card-body d-flex align-items-center">
          <div class="stats-card__icon bg-success bg-opacity-10 rounded-3 p-3 me-3">
            <i class="bi bi-person-check-fill text-success fs-4"></i>
          </div>
          <div>
            <div class="text-muted small">{{ t('users.activeUsers') }}</div>
            <div class="fs-4 fw-bold">{{ active }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 col-lg-3">
      <div class="card border-0 shadow-sm h-100 stats-card animate__animated animate__fadeInUp" style="animation-delay: 0.15s">
        <div class="card-body d-flex align-items-center">
          <div class="stats-card__icon bg-warning bg-opacity-10 rounded-3 p-3 me-3">
            <i class="bi bi-person-x-fill text-warning fs-4"></i>
          </div>
          <div>
            <div class="text-muted small">{{ t('users.inactiveUsers') }}</div>
            <div class="fs-4 fw-bold">{{ inactive }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 col-lg-3">
      <div class="card border-0 shadow-sm h-100 stats-card animate__animated animate__fadeInUp" style="animation-delay: 0.2s">
        <div class="card-body d-flex align-items-center">
          <div class="stats-card__icon bg-info bg-opacity-10 rounded-3 p-3 me-3">
            <i class="bi bi-person-plus-fill text-info fs-4"></i>
          </div>
          <div>
            <div class="text-muted small">{{ t('users.newThisMonth') }}</div>
            <div class="fs-4 fw-bold">{{ newThisMonth }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
}
</style>
