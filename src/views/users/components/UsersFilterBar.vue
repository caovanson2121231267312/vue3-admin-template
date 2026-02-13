<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { UserFilters, UserRole, UserStatus } from '../../../types/user'

const props = defineProps<{
  filters: UserFilters
}>()

const emit = defineEmits<{
  'update:filters': [value: UserFilters]
  search: []
  reset: []
}>()

const { t } = useI18n()
const expanded = ref(false)

const roleOptions = computed<{ value: UserRole | ''; label: string }[]>(() => [
  { value: '', label: t('common.allRoles') },
  { value: 'admin', label: t('common.admin') },
  { value: 'editor', label: t('common.editor') },
  { value: 'user', label: t('common.user') },
  { value: 'guest', label: t('common.guest') },
])

const statusOptions = computed<{ value: UserStatus | ''; label: string }[]>(() => [
  { value: '', label: t('common.allStatuses') },
  { value: 'active', label: t('common.active') },
  { value: 'inactive', label: t('common.inactive') },
  { value: 'pending', label: t('common.pending') },
  { value: 'banned', label: t('common.banned') },
])

function update(key: keyof UserFilters, value: string) {
  emit('update:filters', { ...props.filters, [key]: value })
}

function search() {
  emit('search')
}

function reset() {
  emit('reset')
}
</script>

<template>
  <div class="card border-0 shadow-sm mb-4 animate__animated animate__fadeIn">
    <div class="card-body p-3 p-md-4">
      <!-- Tìm kiếm nhanh -->
      <div class="row g-2 align-items-center flex-wrap">
        <div class="col-12 col-md-6 col-lg-4">
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted"></i></span>
            <input
              :value="filters.keyword"
              type="text"
              class="form-control border-start-0 ps-0"
              :placeholder="t('common.placeholderSearch')"
              @input="update('keyword', ($event.target as HTMLInputElement).value)"
              @keyup.enter="search"
            />
          </div>
        </div>
        <div class="col-auto d-flex gap-2 flex-wrap">
          <button type="button" class="btn btn-primary" @click="search">
            <i class="bi bi-search me-1"></i> {{ t('common.search') }}
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            :class="{ active: expanded }"
            :aria-expanded="expanded"
            @click="expanded = !expanded"
          >
            <i class="bi me-1" :class="expanded ? 'bi-filter-circle-fill' : 'bi-filter-circle'"></i>
            {{ t('common.advancedFilters') }}
          </button>
          <button type="button" class="btn btn-outline-secondary" @click="reset">
            <i class="bi bi-arrow-counterclockwise me-1"></i> {{ t('common.reset') }}
          </button>
        </div>
      </div>

      <!-- Bộ lọc mở rộng -->
      <Transition name="filter-slide">
        <div v-show="expanded" class="filter-advanced mt-4 pt-4 border-top">
          <div class="row g-3">
            <div class="col-12 col-sm-6 col-md-4">
              <label class="form-label small text-muted">{{ t('common.role') }}</label>
              <select :value="filters.role" class="form-select form-select-sm" @change="update('role', ($event.target as HTMLSelectElement).value)">
                <option v-for="opt in roleOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <label class="form-label small text-muted">{{ t('common.status') }}</label>
              <select :value="filters.status" class="form-select form-select-sm" @change="update('status', ($event.target as HTMLSelectElement).value)">
                <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <label class="form-label small text-muted">{{ t('common.department') }}</label>
              <input
                :value="filters.department"
                type="text"
                class="form-control form-control-sm"
                :placeholder="t('common.placeholderDept')"
                @input="update('department', ($event.target as HTMLInputElement).value)"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <label class="form-label small text-muted">{{ t('common.fromDate') }}</label>
              <input
                :value="filters.dateFrom"
                type="date"
                class="form-control form-control-sm"
                @input="update('dateFrom', ($event.target as HTMLInputElement).value)"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <label class="form-label small text-muted">{{ t('common.toDate') }}</label>
              <input
                :value="filters.dateTo"
                type="date"
                class="form-control form-control-sm"
                @input="update('dateTo', ($event.target as HTMLInputElement).value)"
              />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.filter-slide-enter-active,
.filter-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.filter-slide-enter-from,
.filter-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.input-group .form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}
</style>
