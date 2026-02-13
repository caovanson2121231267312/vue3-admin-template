<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { User, UserRole, UserStatus, TableViewMode } from '../../../types/user'

const props = defineProps<{
  users: User[]
  viewMode: TableViewMode
  selectedIds: string[]
  sortBy: string
  sortDir: 'asc' | 'desc'
}>()

const emit = defineEmits<{
  'update:selectedIds': [value: string[]]
  sort: [field: string]
}>()

const { t } = useI18n()

const roleLabel = computed<Record<UserRole, string>>(() => ({
  admin: t('common.admin'),
  editor: t('common.editor'),
  user: t('common.user'),
  guest: t('common.guest'),
}))

const statusLabel = computed<Record<UserStatus, string>>(() => ({
  active: t('common.active'),
  inactive: t('common.inactiveShort'),
  pending: t('common.pending'),
  banned: t('common.banned'),
}))

const statusClass: Record<UserStatus, string> = {
  active: 'bg-success',
  inactive: 'bg-secondary',
  pending: 'bg-warning text-dark',
  banned: 'bg-danger',
}

function getRoleLabel(role: UserRole) {
  return roleLabel.value[role] ?? role
}

function getStatusLabel(status: UserStatus) {
  return statusLabel.value[status] ?? status
}

function getStatusClass(status: UserStatus) {
  return statusClass[status] ?? 'bg-secondary'
}

const allSelected = computed(() => props.users.length > 0 && props.selectedIds.length === props.users.length)
const someSelected = computed(() => props.selectedIds.length > 0)

function toggleAll() {
  if (allSelected.value) {
    emit('update:selectedIds', [])
  } else {
    emit('update:selectedIds', props.users.map((u) => u.id))
  }
}

function toggleOne(id: string) {
  const set = new Set(props.selectedIds)
  if (set.has(id)) set.delete(id)
  else set.add(id)
  emit('update:selectedIds', [...set])
}

function handleSort(field: string) {
  emit('sort', field)
}
</script>

<template>
  <!-- Chế độ: Bảng -->
  <div v-if="viewMode === 'table'" class="table-responsive">
    <table class="table table-hover table-striped align-middle mb-0 users-table">
      <thead class="table-light">
        <tr>
          <th class="users-table__th-check">
            <input
              type="checkbox"
              class="form-check-input"
              :checked="allSelected"
              :indeterminate="someSelected && !allSelected"
              @change="toggleAll"
            />
          </th>
          <th class="users-table__th-name">
            <span class="sortable" @click="handleSort('fullName')">{{ t('common.fullName') }}</span>
            <i v-if="sortBy === 'fullName'" class="bi ms-1" :class="sortDir === 'asc' ? 'bi-caret-up-fill' : 'bi-caret-down-fill'"></i>
          </th>
          <th class="users-table__th-email">
            <span class="sortable" @click="handleSort('email')">{{ t('common.email') }}</span>
            <i v-if="sortBy === 'email'" class="bi ms-1" :class="sortDir === 'asc' ? 'bi-caret-up-fill' : 'bi-caret-down-fill'"></i>
          </th>
          <th class="users-table__th-role">{{ t('common.role') }}</th>
          <th class="users-table__th-status">{{ t('common.status') }}</th>
          <th class="users-table__th-dept">{{ t('common.department') }}</th>
          <th class="users-table__th-date">{{ t('common.createdAt') }}</th>
          <th class="users-table__th-actions text-end">{{ t('common.actions') }}</th>
        </tr>
      </thead>
      <TransitionGroup name="list" tag="tbody">
        <tr v-for="(user, index) in users" :key="user.id" class="animate__animated animate__fadeIn" :style="{ animationDelay: `${index * 0.03}s` }">
          <td class="users-table__td-check"><input type="checkbox" class="form-check-input" :checked="selectedIds.includes(user.id)" @change="toggleOne(user.id)" /></td>
          <td class="users-table__td-name"><strong class="text-truncate d-inline-block" :title="user.fullName" style="max-width: 100%">{{ user.fullName }}</strong></td>
          <td class="users-table__td-email"><span class="text-muted text-truncate d-inline-block" :title="user.email" style="max-width: 100%">{{ user.email }}</span></td>
          <td class="users-table__td-role"><span class="badge bg-primary bg-opacity-25 text-primary">{{ getRoleLabel(user.role) }}</span></td>
          <td class="users-table__td-status"><span class="badge" :class="getStatusClass(user.status)">{{ getStatusLabel(user.status) }}</span></td>
          <td class="users-table__td-dept"><span class="text-muted">{{ user.department || '—' }}</span></td>
          <td class="users-table__td-date"><span class="text-nowrap">{{ user.createdAt }}</span></td>
          <td class="users-table__td-actions text-end">
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-outline-primary" :title="t('common.edit')"><i class="bi bi-pencil"></i></button>
              <button type="button" class="btn btn-outline-danger" :title="t('common.delete')"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      </TransitionGroup>
    </table>
  </div>

  <!-- Chế độ: Grid thẻ -->
  <div v-if="viewMode === 'grid'" class="row g-3">
    <TransitionGroup name="list" class="row g-3">
      <div v-for="(user, index) in users" :key="user.id" class="col-12 col-sm-6 col-lg-4 col-xl-3">
        <div class="card border-0 shadow-sm h-100 user-card animate__animated animate__fadeInUp" :style="{ animationDelay: `${index * 0.04}s` }">
          <div class="card-body">
            <div class="d-flex align-items-start justify-content-between mb-2">
              <div class="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 48px; height: 48px">
                <i class="bi bi-person-fill text-primary fs-4"></i>
              </div>
              <span class="badge" :class="getStatusClass(user.status)">{{ getStatusLabel(user.status) }}</span>
            </div>
            <h6 class="card-title mb-1">{{ user.fullName }}</h6>
            <p class="card-text small text-muted mb-2">{{ user.email }}</p>
            <div class="d-flex flex-wrap gap-1 mb-2">
              <span class="badge bg-primary bg-opacity-25 text-primary">{{ getRoleLabel(user.role) }}</span>
              <span v-if="user.department" class="badge bg-secondary bg-opacity-25 text-secondary">{{ user.department }}</span>
            </div>
            <p class="small text-muted mb-0">{{ user.createdAt }}</p>
            <div class="mt-2 pt-2 border-top d-flex gap-1">
              <button type="button" class="btn btn-sm btn-outline-primary flex-grow-1"><i class="bi bi-pencil me-1"></i>{{ t('common.edit') }}</button>
              <button type="button" class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>

  <!-- Chế độ: Compact -->
  <div v-if="viewMode === 'compact'" class="list-group list-group-flush">
    <TransitionGroup name="list">
      <div v-for="(user, index) in users" :key="user.id" class="list-group-item list-group-item-action d-flex align-items-center py-2 animate__animated animate__fadeIn" :style="{ animationDelay: `${index * 0.02}s` }">
        <input type="checkbox" class="form-check-input me-3 flex-shrink-0" :checked="selectedIds.includes(user.id)" @change="toggleOne(user.id)" />
        <div class="flex-grow-1 min-width-0">
          <span class="fw-semibold">{{ user.fullName }}</span>
          <span class="text-muted small ms-2">{{ user.email }}</span>
        </div>
        <span class="badge me-2" :class="getStatusClass(user.status)">{{ getStatusLabel(user.status) }}</span>
        <span class="badge bg-primary bg-opacity-25 text-primary me-2">{{ getRoleLabel(user.role) }}</span>
        <button type="button" class="btn btn-sm btn-link p-0 text-primary me-1"><i class="bi bi-pencil"></i></button>
        <button type="button" class="btn btn-sm btn-link p-0 text-danger"><i class="bi bi-trash"></i></button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
/* Desktop: bảng full width, cột chia tỉ lệ */
.users-table {
  width: 100%;
  table-layout: fixed;
}
.users-table thead th {
  font-weight: 600;
  font-size: 0.8125rem;
  color: var(--bs-secondary);
  padding: 0.65rem 0.75rem;
  border-bottom: 1px solid var(--bs-border-color);
}
.users-table__th-check { width: 3%; }
.users-table__th-name { width: 16%; }
.users-table__th-email { width: 22%; }
.users-table__th-role { width: 10%; }
.users-table__th-status { width: 11%; }
.users-table__th-dept { width: 12%; }
.users-table__th-date { width: 12%; }
.users-table__th-actions { width: 14%; }

.users-table tbody td {
  padding: 0.65rem 0.75rem;
  font-size: 0.875rem;
  overflow: hidden;
}
.users-table__td-name,
.users-table__td-email {
  max-width: 0; /* cho text-truncate hoạt động trong table-layout: fixed */
}
.users-table .sortable {
  cursor: pointer;
  user-select: none;
}
.users-table .sortable:hover {
  color: var(--bs-primary);
}

/* Màn nhỏ: bảng scroll ngang, giữ min-width để đọc được */
@media (max-width: 991.98px) {
  .users-table {
    table-layout: auto;
    width: max-content;
    min-width: 100%;
  }
  .users-table__th-check { width: 40px; }
  .users-table__th-name { min-width: 120px; }
  .users-table__th-email { min-width: 160px; }
  .users-table__th-role { min-width: 80px; }
  .users-table__th-status { min-width: 90px; }
  .users-table__th-dept { min-width: 90px; }
  .users-table__th-date { min-width: 95px; }
  .users-table__th-actions { min-width: 100px; }
}

.user-card {
  transition: box-shadow 0.2s ease;
}
.user-card:hover {
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.08) !important;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
.list-move {
  transition: transform 0.3s ease;
}
</style>
