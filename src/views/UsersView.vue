<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import type { User, UserFilters, TableViewMode } from '../types/user'
import { mockUsers } from './users/data/users-mock'
import UsersStatsCards from './users/components/UsersStatsCards.vue'
import UsersFilterBar from './users/components/UsersFilterBar.vue'
import UsersDataTable from './users/components/UsersDataTable.vue'
import UsersPagination from './users/components/UsersPagination.vue'

const PAGE_SIZE = 5
const viewMode = ref<TableViewMode>('table')
const selectedIds = ref<string[]>([])
const sortBy = ref('fullName')
const sortDir = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)

const filters = ref<UserFilters>({
  keyword: '',
  role: '',
  status: '',
  dateFrom: '',
  dateTo: '',
  department: '',
})

// Dữ liệu đã lọc và sắp xếp
const filteredUsers = computed(() => {
  let list: User[] = [...mockUsers]

  const k = filters.value.keyword.trim().toLowerCase()
  if (k) {
    list = list.filter(
      (u) =>
        u.email.toLowerCase().includes(k) ||
        u.fullName.toLowerCase().includes(k) ||
        (u.department?.toLowerCase().includes(k) ?? false)
    )
  }
  if (filters.value.role) {
    list = list.filter((u) => u.role === filters.value.role)
  }
  if (filters.value.status) {
    list = list.filter((u) => u.status === filters.value.status)
  }
  if (filters.value.department.trim()) {
    const d = filters.value.department.trim().toLowerCase()
    list = list.filter((u) => u.department?.toLowerCase().includes(d))
  }
  if (filters.value.dateFrom) {
    list = list.filter((u) => u.createdAt >= filters.value.dateFrom)
  }
  if (filters.value.dateTo) {
    list = list.filter((u) => u.createdAt <= filters.value.dateTo)
  }

  list.sort((a, b) => {
    const aVal = String((a as unknown as Record<string, unknown>)[sortBy.value] ?? '')
    const bVal = String((b as unknown as Record<string, unknown>)[sortBy.value] ?? '')
    const cmp = aVal.localeCompare(bVal, 'vi')
    return sortDir.value === 'asc' ? cmp : -cmp
  })

  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / PAGE_SIZE)))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredUsers.value.slice(start, start + PAGE_SIZE)
})

// Thống kê từ dữ liệu gốc (hoặc từ filtered)
const stats = computed(() => {
  const list = filteredUsers.value
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10)
  return {
    total: list.length,
    active: list.filter((u) => u.status === 'active').length,
    inactive: list.filter((u) => u.status !== 'active').length,
    newThisMonth: list.filter((u) => u.createdAt >= firstDay).length,
  }
})

function applySearch() {
  currentPage.value = 1
}

const { t } = useI18n()

function resetFilters() {
  filters.value = {
    keyword: '',
    role: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    department: '',
  }
  currentPage.value = 1
  toast.info(t('common.filtersReset'))
}

function handleSort(field: string) {
  if (sortBy.value === field) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortDir.value = 'asc'
  }
}

function exportReport() {
  const headers = ['ID', t('common.fullName'), t('common.email'), t('common.role'), t('common.status'), t('common.department'), t('common.createdAt')]
  const rows = filteredUsers.value.map((u) => [u.id, u.fullName, u.email, u.role, u.status, u.department ?? '', u.createdAt])
  const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${t('users.reportFilename')}-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
  toast.success(t('common.csvExported'))
}

watch(totalPages, (v) => {
  if (currentPage.value > v) currentPage.value = Math.max(1, v)
})
</script>

<template>
  <div class="users-page animate__animated animate__fadeIn">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
      <div>
        <h1 class="h3 mb-1">{{ t('users.title') }}</h1>
        <p class="text-muted small mb-0">{{ t('users.subtitle') }}</p>
      </div>
    </div>

    <UsersStatsCards
      :total="stats.total"
      :active="stats.active"
      :inactive="stats.inactive"
      :new-this-month="stats.newThisMonth"
    />

    <UsersFilterBar
      v-model:filters="filters"
      @search="applySearch"
      @reset="resetFilters"
    />

    <!-- Toolbar: chế độ xem + xuất báo cáo -->
    <div class="card border-0 shadow-sm mb-3">
      <div class="card-body py-2 px-3 d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div class="d-flex align-items-center gap-2">
          <span class="text-muted small">{{ t('common.displayMode') }}:</span>
          <div class="btn-group btn-group-sm" role="group">
            <button
              type="button"
              class="btn"
              :class="viewMode === 'table' ? 'btn-primary' : 'btn-outline-secondary'"
              :title="t('common.table')"
              @click="viewMode = 'table'"
            >
              <i class="bi bi-table"></i>
            </button>
            <button
              type="button"
              class="btn"
              :class="viewMode === 'grid' ? 'btn-primary' : 'btn-outline-secondary'"
              :title="t('common.cards')"
              @click="viewMode = 'grid'"
            >
              <i class="bi bi-grid-3x3-gap"></i>
            </button>
            <button
              type="button"
              class="btn"
              :class="viewMode === 'compact' ? 'btn-primary' : 'btn-outline-secondary'"
              title="Compact"
              @click="viewMode = 'compact'"
            >
              <i class="bi bi-list-ul"></i>
            </button>
          </div>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button type="button" class="btn btn-success btn-sm" @click="exportReport">
            <i class="bi bi-file-earmark-arrow-down me-1"></i>
            {{ t('common.exportReport') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Bảng / Grid / Compact -->
    <div class="card border-0 shadow-sm overflow-hidden">
      <Transition name="fade-slide" mode="out-in">
        <div v-if="paginatedUsers.length" :key="`${viewMode}-${currentPage}`">
          <UsersDataTable
            :users="paginatedUsers"
            :view-mode="viewMode"
            v-model:selected-ids="selectedIds"
            :sort-by="sortBy"
            :sort-dir="sortDir"
            @sort="handleSort"
          />
        </div>
        <div v-else key="empty" class="text-center py-5 text-muted">
          <i class="bi bi-inbox display-4 d-block mb-2"></i>
          <p class="mb-0">{{ t('users.noUsersFound') }}</p>
        </div>
      </Transition>
      <div class="card-footer bg-transparent border-top">
        <UsersPagination
          v-model:current-page="currentPage"
          :total-pages="totalPages"
          :total-items="filteredUsers.length"
          :page-size="PAGE_SIZE"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.users-page {
  min-height: 0;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
