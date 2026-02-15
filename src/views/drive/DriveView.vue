<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { DriveItem, DriveViewMode } from '../../types/drive'
import { getDriveItemsByParentId, getBreadcrumb, getDriveItemById } from './data/drive-mock'

const { t } = useI18n()

const currentFolderId = ref<string | null>('root')
const viewMode = ref<DriveViewMode>('grid')
const leftNav = ref<'my-drive' | 'shared' | 'recent' | 'trash'>('my-drive')
const sidebarOpen = ref(false)

const breadcrumb = computed(() => getBreadcrumb(currentFolderId.value))
const items = computed(() => getDriveItemsByParentId(currentFolderId.value))

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function getFileIcon(mimeType?: string): string {
  if (!mimeType) return 'bi-file-earmark'
  if (mimeType.includes('pdf')) return 'bi-file-earmark-pdf text-danger'
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'bi-file-earmark-excel text-success'
  if (mimeType.includes('word') || mimeType.includes('document')) return 'bi-file-earmark-word text-primary'
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'bi-file-earmark-ppt text-warning'
  if (mimeType.includes('image')) return 'bi-file-earmark-image text-info'
  if (mimeType.includes('text')) return 'bi-file-earmark-text'
  return 'bi-file-earmark'
}

function openFolder(item: DriveItem) {
  if (item.type === 'folder') currentFolderId.value = item.id
}

function goBreadcrumb(id: string) {
  currentFolderId.value = id === 'root' ? 'root' : id
}

function goUp() {
  const item = currentFolderId.value ? getDriveItemById(currentFolderId.value) : null
  const parent = item?.parentId ?? null
  currentFolderId.value = parent ?? 'root'
}

function closeSidebar() {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="drive-page animate__animated animate__fadeIn">
    <!-- Mobile: nút mở sidebar -->
    <button
      type="button"
      class="drive-sidebar-toggle d-lg-none"
      :aria-label="t('common.openMenu')"
      @click="sidebarOpen = true"
    >
      <i class="bi bi-list"></i>
    </button>

    <!-- Overlay khi mở sidebar trên mobile -->
    <div
      class="drive-sidebar-overlay"
      :class="{ 'drive-sidebar-overlay--open': sidebarOpen }"
      aria-hidden="true"
      @click="closeSidebar"
    ></div>

    <div class="drive-layout">
      <!-- Sidebar trái (giống Google Drive) -->
      <aside class="drive-sidebar" :class="{ 'drive-sidebar--open': sidebarOpen }">
        <div class="drive-sidebar__header">
          <span class="fw-bold">{{ t('drive.myDrive') }}</span>
          <button type="button" class="drive-sidebar__close" :aria-label="t('common.closeMenu')" @click="closeSidebar">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="drive-sidebar__section">
          <button
            type="button"
            class="drive-sidebar__item"
            :class="{ active: leftNav === 'my-drive' }"
            @click="leftNav = 'my-drive'; closeSidebar()"
          >
            <i class="bi bi-folder-fill drive-sidebar__icon drive-sidebar__icon--folder"></i>
            <span>{{ t('drive.myDrive') }}</span>
          </button>
          <button
            type="button"
            class="drive-sidebar__item"
            :class="{ active: leftNav === 'shared' }"
            @click="leftNav = 'shared'; closeSidebar()"
          >
            <i class="bi bi-people-fill drive-sidebar__icon"></i>
            <span>{{ t('drive.sharedWithMe') }}</span>
          </button>
          <button
            type="button"
            class="drive-sidebar__item"
            :class="{ active: leftNav === 'recent' }"
            @click="leftNav = 'recent'; closeSidebar()"
          >
            <i class="bi bi-clock-history drive-sidebar__icon"></i>
            <span>{{ t('drive.recent') }}</span>
          </button>
          <button
            type="button"
            class="drive-sidebar__item"
            :class="{ active: leftNav === 'trash' }"
            @click="leftNav = 'trash'; closeSidebar()"
          >
            <i class="bi bi-trash-fill drive-sidebar__icon"></i>
            <span>{{ t('drive.trash') }}</span>
          </button>
        </div>
        <div class="drive-sidebar__storage mt-3 px-3 py-2 rounded">
          <div class="d-flex justify-content-between small mb-1">
            <span class="text-muted">{{ t('drive.storage') }}</span>
            <span class="fw-semibold">2.1 GB / 15 GB</span>
          </div>
          <div class="progress" style="height: 6px">
            <div class="progress-bar bg-primary" role="progressbar" style="width: 14%" aria-valuenow="14" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </aside>

      <!-- Nội dung chính -->
      <main class="drive-main">
        <!-- Toolbar -->
        <div class="drive-toolbar">
          <nav aria-label="breadcrumb" class="drive-breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <button type="button" class="drive-breadcrumb__link" @click="currentFolderId = 'root'">
                  <i class="bi bi-cloud-arrow-up-fill me-1"></i>{{ t('drive.myDrive') }}
                </button>
              </li>
              <template v-for="crumb in breadcrumb" :key="crumb.id">
                <li v-if="crumb.id !== 'root'" class="breadcrumb-item">
                  <button type="button" class="drive-breadcrumb__link drive-breadcrumb__link--sub" @click="goBreadcrumb(crumb.id)">
                    {{ crumb.name }}
                  </button>
                </li>
              </template>
            </ol>
          </nav>
          <div class="drive-toolbar__actions">
            <button type="button" class="drive-toolbar__btn drive-toolbar__btn--primary" :title="t('drive.newFolder')">
              <i class="bi bi-folder-plus me-1"></i><span class="d-none d-sm-inline">{{ t('drive.newFolder') }}</span>
            </button>
            <button type="button" class="drive-toolbar__btn" :title="t('drive.upload')">
              <i class="bi bi-cloud-arrow-up me-1"></i><span class="d-none d-sm-inline">{{ t('drive.upload') }}</span>
            </button>
            <div class="drive-toolbar__view">
              <button
                type="button"
                class="drive-toolbar__view-btn"
                :class="{ active: viewMode === 'grid' }"
                :title="t('drive.gridView')"
                @click="viewMode = 'grid'"
              >
                <i class="bi bi-grid-3x3-gap-fill"></i>
              </button>
              <button
                type="button"
                class="drive-toolbar__view-btn"
                :class="{ active: viewMode === 'list' }"
                :title="t('drive.listView')"
                @click="viewMode = 'list'"
              >
                <i class="bi bi-list-ul"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Nút quay lên (khi không ở root) -->
        <div v-if="currentFolderId && currentFolderId !== 'root'" class="drive-toolbar drive-toolbar--sub">
          <button type="button" class="drive-back" @click="goUp">
            <i class="bi bi-arrow-left me-1"></i>{{ t('drive.back') }}
          </button>
        </div>

        <!-- Danh sách / Lưới -->
        <div class="drive-content">
          <div v-if="leftNav !== 'my-drive'" class="drive-empty drive-empty--coming">
            <i class="bi bi-cloud-slash"></i>
            <p>{{ t('drive.comingSoon') }}</p>
          </div>

          <template v-else>
            <div v-if="!items.length" class="drive-empty">
              <div class="drive-empty__icon"><i class="bi bi-folder2-open"></i></div>
              <p class="drive-empty__text">{{ t('drive.emptyFolder') }}</p>
            </div>

            <!-- Grid view -->
            <div v-else-if="viewMode === 'grid'" class="drive-grid">
              <div
                v-for="item in items"
                :key="item.id"
                class="drive-grid__item"
              >
                <div
                  class="drive-card"
                  :class="{ 'drive-card--folder': item.type === 'folder' }"
                  @click="openFolder(item)"
                >
                  <div class="drive-card__icon">
                    <i v-if="item.type === 'folder'" class="bi bi-folder-fill"></i>
                    <i v-else :class="getFileIcon(item.mimeType)"></i>
                  </div>
                  <p class="drive-card__name" :title="item.name">{{ item.name }}</p>
                  <p v-if="item.type === 'file'" class="drive-card__meta">{{ item.modifiedTime }} · {{ formatSize(item.size ?? 0) }}</p>
                </div>
              </div>
            </div>

            <!-- List view -->
            <div v-else class="drive-list">
              <div class="drive-list__scroll">
                <table class="drive-list__table">
                  <thead>
                    <tr>
                      <th class="drive-list__th-icon"></th>
                      <th class="drive-list__th-name">{{ t('drive.name') }}</th>
                      <th class="drive-list__th-modified">{{ t('drive.modified') }}</th>
                      <th class="drive-list__th-size">{{ t('drive.size') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in items"
                      :key="item.id"
                      class="drive-list__row"
                      @click="openFolder(item)"
                    >
                      <td class="drive-list__td-icon">
                        <i v-if="item.type === 'folder'" class="bi bi-folder-fill"></i>
                        <i v-else :class="getFileIcon(item.mimeType)"></i>
                      </td>
                      <td class="drive-list__td-name">{{ item.name }}</td>
                      <td class="drive-list__td-modified">{{ item.modifiedTime }}</td>
                      <td class="drive-list__td-size">{{ item.type === 'file' ? formatSize(item.size ?? 0) : '—' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* ----- Page & layout ----- */
.drive-page {
  margin: -1rem -1.5rem -1rem -1rem;
  min-height: calc(100vh - 120px);
  background: var(--bs-body-bg);
}
@media (max-width: 991.98px) {
  .drive-page {
    margin: -0.5rem -0.75rem -0.5rem -0.5rem;
  }
}
.drive-layout {
  display: flex;
  min-height: 100%;
  position: relative;
}

/* ----- Overlay (mobile) ----- */
.drive-sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1040;
  transition: opacity 0.2s ease;
}
.drive-sidebar-overlay.drive-sidebar-overlay--open {
  display: block;
}

/* ----- Sidebar ----- */
.drive-sidebar {
  width: 260px;
  min-width: 260px;
  background: #fff;
  border-right: 1px solid var(--bs-border-color);
  padding: 1rem 0;
  flex-shrink: 0;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.drive-sidebar__header {
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--bs-border-color);
}
.drive-sidebar__close {
  padding: 0.25rem;
  border: none;
  background: transparent;
  color: var(--bs-body-color);
  cursor: pointer;
  border-radius: 8px;
}
.drive-sidebar__close:hover {
  background: rgba(0, 0, 0, 0.06);
}
.drive-sidebar__section {
  padding: 0 0.5rem;
}
.drive-sidebar__item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  border-radius: 0 24px 24px 0;
  color: var(--bs-body-color);
  font-size: 0.9375rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease;
}
.drive-sidebar__item:hover {
  background: rgba(0, 0, 0, 0.06);
}
.drive-sidebar__item.active {
  background: rgba(26, 115, 232, 0.12);
  color: #1a73e8;
  font-weight: 500;
}
.drive-sidebar__icon {
  width: 24px;
  margin-right: 1rem;
  font-size: 1.25rem;
  flex-shrink: 0;
}
.drive-sidebar__icon--folder {
  color: #fcc934;
}
.drive-sidebar__storage {
  background: rgba(0, 0, 0, 0.04);
  font-size: 0.8125rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  margin: 0 0.5rem;
}

/* Mobile: sidebar drawer */
@media (max-width: 991.98px) {
  .drive-sidebar-toggle {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 1px solid var(--bs-border-color);
    border-radius: 10px;
    background: #fff;
    color: var(--bs-body-color);
    cursor: pointer;
    flex-shrink: 0;
  }
  .drive-sidebar-toggle:hover {
    background: #f8f9fa;
  }
  .drive-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1050;
    width: 280px;
    min-width: 280px;
    transform: translateX(-100%);
    box-shadow: none;
  }
  .drive-sidebar.drive-sidebar--open {
    transform: translateX(0);
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.12);
  }
  .drive-sidebar__header {
    display: flex;
  }
}
@media (min-width: 992px) {
  .drive-sidebar-toggle {
    display: none !important;
  }
}

/* ----- Main ----- */
.drive-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #f1f3f4;
}

/* ----- Toolbar ----- */
.drive-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1rem;
  padding: 0.75rem 1rem 0.75rem 1.25rem;
  flex-wrap: wrap;
  background: #fff;
  border-bottom: 1px solid var(--bs-border-color);
}
.drive-toolbar--sub {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
}
.drive-back {
  padding: 0.25rem 0.5rem;
  border: none;
  background: transparent;
  color: var(--bs-body-color);
  font-size: 0.9375rem;
  cursor: pointer;
  border-radius: 8px;
}
.drive-back:hover {
  background: rgba(0, 0, 0, 0.06);
}
.drive-breadcrumb {
  min-width: 0;
  flex: 1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.drive-breadcrumb::-webkit-scrollbar {
  height: 0;
}
.drive-breadcrumb .breadcrumb {
  flex-wrap: nowrap;
  padding: 0.25rem 0;
}
.drive-breadcrumb .breadcrumb-item + .breadcrumb-item::before {
  content: '›';
  font-size: 1rem;
  color: #5f6368;
}
.drive-breadcrumb__link {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border: none;
  background: transparent;
  color: #1a73e8;
  font-size: 0.9375rem;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 6px;
}
.drive-breadcrumb__link:hover {
  background: rgba(26, 115, 232, 0.08);
}
.drive-breadcrumb__link--sub {
  color: var(--bs-body-color);
}
.drive-breadcrumb__link--sub:hover {
  background: rgba(0, 0, 0, 0.06);
  color: var(--bs-body-color);
}
.drive-toolbar__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}
.drive-toolbar__btn {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--bs-border-color);
  border-radius: 8px;
  background: #fff;
  color: var(--bs-body-color);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.drive-toolbar__btn:hover {
  background: #f8f9fa;
  border-color: #dee2e6;
}
.drive-toolbar__btn--primary {
  background: #1a73e8;
  border-color: #1a73e8;
  color: #fff;
}
.drive-toolbar__btn--primary:hover {
  background: #1557b0;
  border-color: #1557b0;
}
.drive-toolbar__view {
  display: flex;
  border: 1px solid var(--bs-border-color);
  border-radius: 8px;
  overflow: hidden;
}
.drive-toolbar__view-btn {
  padding: 0.4rem 0.65rem;
  border: none;
  background: #fff;
  color: #5f6368;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.drive-toolbar__view-btn + .drive-toolbar__view-btn {
  border-left: 1px solid var(--bs-border-color);
}
.drive-toolbar__view-btn:hover {
  background: #f8f9fa;
  color: var(--bs-body-color);
}
.drive-toolbar__view-btn.active {
  background: #e8f0fe;
  color: #1a73e8;
}

/* ----- Content ----- */
.drive-content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 1rem;
}
@media (max-width: 575.98px) {
  .drive-content {
    padding: 0.75rem;
  }
}

/* ----- Empty state ----- */
.drive-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  color: #5f6368;
  text-align: center;
}
.drive-empty__icon {
  font-size: 4rem;
  color: #dadce0;
  margin-bottom: 1rem;
}
.drive-empty__icon i {
  display: block;
}
.drive-empty__text,
.drive-empty p {
  margin: 0;
  font-size: 0.9375rem;
}
.drive-empty--coming {
  min-height: 320px;
}
.drive-empty--coming i {
  font-size: 3.5rem;
  color: #dadce0;
  margin-bottom: 1rem;
}

/* ----- Grid ----- */
.drive-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
@media (min-width: 576px) {
  .drive-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
}
@media (min-width: 768px) {
  .drive-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 992px) {
  .drive-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
  }
}
@media (min-width: 1200px) {
  .drive-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
.drive-grid__item {
  min-width: 0;
}
.drive-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0.75rem;
  background: #fff;
  border-radius: 12px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s;
}
.drive-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.06);
}
.drive-card--folder .drive-card__icon {
  color: #fcc934;
}
.drive-card__icon {
  font-size: 2.75rem;
  margin-bottom: 0.5rem;
  color: #5f6368;
}
.drive-card__name {
  width: 100%;
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.drive-card__meta {
  margin: 0.25rem 0 0;
  font-size: 0.75rem;
  color: #5f6368;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ----- List ----- */
.drive-list {
  background: #fff;
  border-radius: 12px;
  border: 1px solid var(--bs-border-color);
  overflow: hidden;
}
.drive-list__scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.drive-list__table {
  width: 100%;
  min-width: 420px;
  border-collapse: collapse;
  font-size: 0.9375rem;
}
.drive-list__table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #5f6368;
  background: #f8f9fa;
  border-bottom: 1px solid var(--bs-border-color);
}
.drive-list__table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--bs-border-color-translucent, rgba(0, 0, 0, 0.06));
}
.drive-list__row {
  cursor: pointer;
  transition: background 0.1s ease;
}
.drive-list__row:hover {
  background: rgba(26, 115, 232, 0.06);
}
.drive-list__th-icon,
.drive-list__td-icon {
  width: 48px;
  text-align: center;
  font-size: 1.25rem;
}
.drive-list__td-icon .bi-folder-fill {
  color: #fcc934;
}
.drive-list__th-name,
.drive-list__td-name {
  min-width: 120px;
}
.drive-list__td-name {
  font-weight: 500;
}
.drive-list__th-modified,
.drive-list__td-modified {
  min-width: 100px;
  color: #5f6368;
}
@media (max-width: 575.98px) {
  .drive-list__th-modified,
  .drive-list__td-modified {
    display: none;
  }
  .drive-list__table {
    min-width: 280px;
  }
}
.drive-list__th-size,
.drive-list__td-size {
  width: 80px;
  text-align: right;
  color: #5f6368;
}
@media (max-width: 767.98px) {
  .drive-list__th-size,
  .drive-list__td-size {
    display: none;
  }
  .drive-list__table {
    min-width: 260px;
  }
}
</style>
