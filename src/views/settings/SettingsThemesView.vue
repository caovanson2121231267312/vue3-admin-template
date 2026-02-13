<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { themeCategories, themes, type ThemeDefinition, type ThemeCategory } from '../../config/themes'
import { useTheme } from '../../composables/useTheme'

const { t } = useI18n()
const { currentThemeId, setTheme } = useTheme()

const activeCategory = ref<ThemeCategory | 'all'>('all')
const selectedTheme = ref<ThemeDefinition | null>(null)
const showDetailModal = ref(false)
const currentSlide = ref(0)
const SLIDE_INTERVAL = 3500
let slideTimer: ReturnType<typeof setInterval> | null = null

const filteredThemes = computed(() => {
  if (activeCategory.value === 'all') return themes
  return themes.filter((th) => th.category === activeCategory.value)
})

const previewFrameStyle = computed(() => {
  const theme = selectedTheme.value
  if (!theme) return {}
  const v = theme.variables
  return {
    '--preview-bg': v['--bs-body-bg'],
    '--preview-primary': v['--bs-primary'],
    '--preview-border': v['--bs-border-color'],
    '--preview-text': v['--bs-body-color'],
  } as Record<string, string>
})

/** Tên slide cho carousel xem trước */
const previewSlideLabels = [
  { id: 'dashboard', labelKey: 'nav.dashboard' },
  { id: 'table', labelKey: 'nav.userManagement' },
  { id: 'form', labelKey: 'nav.demoForms' },
]

function themeName(theme: ThemeDefinition): string {
  return theme.nameKey ? t(theme.nameKey) : theme.name
}

function themeDesc(theme: ThemeDefinition): string {
  return theme.descriptionKey ? t(theme.descriptionKey) : theme.description || ''
}

function categoryName(cat: ThemeCategory): string {
  return themeCategories.find((c) => c.id === cat)?.nameKey ? t(themeCategories.find((c) => c.id === cat)!.nameKey) : cat
}

function startSlideTimer() {
  stopSlideTimer()
  slideTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % previewSlideLabels.length
  }, SLIDE_INTERVAL)
}

function stopSlideTimer() {
  if (slideTimer) {
    clearInterval(slideTimer)
    slideTimer = null
  }
}

function goSlide(index: number) {
  currentSlide.value = index
  startSlideTimer()
}

watch(showDetailModal, (visible) => {
  if (visible) {
    document.body.classList.add('modal-open')
    document.body.style.overflow = 'hidden'
    currentSlide.value = 0
    startSlideTimer()
  } else {
    document.body.classList.remove('modal-open')
    document.body.style.overflow = ''
    stopSlideTimer()
  }
})

onUnmounted(() => {
  stopSlideTimer()
  document.body.classList.remove('modal-open')
  document.body.style.overflow = ''
})

function openDetail(theme: ThemeDefinition) {
  selectedTheme.value = theme
  showDetailModal.value = true
}

function closeModal() {
  showDetailModal.value = false
  selectedTheme.value = null
}

function applyAndClose(theme: ThemeDefinition) {
  setTheme(theme.id)
  closeModal()
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <h1 class="mb-2">{{ t('theme.title') }}</h1>
    <p class="text-muted mb-4">{{ t('theme.subtitle') }}</p>

    <!-- Tab thể loại -->
    <ul class="nav nav-pills mb-4">
      <li class="nav-item">
        <button
          type="button"
          class="nav-link"
          :class="{ active: activeCategory === 'all' }"
          @click="activeCategory = 'all'"
        >
          {{ t('common.viewAll') }}
        </button>
      </li>
      <li v-for="cat in themeCategories" :key="cat.id" class="nav-item">
        <button
          type="button"
          class="nav-link"
          :class="{ active: activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          {{ t(cat.nameKey) }}
        </button>
      </li>
    </ul>

    <!-- Grid theme cards -->
    <div class="row g-3">
      <div
        v-for="theme in filteredThemes"
        :key="theme.id"
        class="col-6 col-md-4 col-lg-3"
      >
        <div
          class="card theme-card h-100 border shadow-sm"
          :class="{ 'border-primary': currentThemeId === theme.id }"
          role="button"
          tabindex="0"
          @click="openDetail(theme)"
          @keydown.enter="openDetail(theme)"
        >
          <!-- Preview mini -->
          <div
            class="theme-card__preview rounded-top"
            :style="{
              background: theme.variables['--bs-body-bg'] || '#f8f9fa',
              minHeight: '80px',
            }"
          >
            <div class="d-flex p-2 gap-1" style="border-bottom: 1px solid var(--bs-border-color);">
              <span
                v-for="(color, i) in theme.previewColors"
                :key="i"
                class="rounded flex-grow-1"
                :style="{ height: '12px', backgroundColor: color }"
              />
            </div>
            <div class="p-2 d-flex gap-1 align-items-center">
              <span
                class="rounded"
                :style="{
                  width: '20px',
                  height: '20px',
                  backgroundColor: theme.variables['--bs-primary'] || '#0d6efd',
                }"
              />
              <span
                class="rounded flex-grow-1"
                :style="{
                  height: '8px',
                  backgroundColor: theme.variables['--bs-border-color'] || '#dee2e6',
                  maxWidth: '60%',
                }"
              />
            </div>
          </div>
          <div class="card-body py-2 px-3">
            <div class="d-flex align-items-center justify-content-between gap-2">
              <strong class="small text-truncate">{{ themeName(theme) }}</strong>
              <span
                v-if="currentThemeId === theme.id"
                class="badge bg-primary"
              >
                {{ t('theme.current') }}
              </span>
            </div>
            <span class="badge bg-secondary bg-opacity-25 text-secondary small">
              {{ categoryName(theme.category) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal chi tiết + xem trước (chỉ render khi mở) -->
    <Teleport to="body">
      <div
        v-if="showDetailModal"
        class="theme-detail-modal"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="themeDetailModalLabel"
      >
        <div class="theme-detail-modal__backdrop" @click.self="closeModal"></div>
        <div class="theme-detail-modal__dialog">
          <div class="theme-detail-modal__content">
            <div class="theme-detail-modal__header">
              <h5 id="themeDetailModalLabel" class="theme-detail-modal__title">
                {{ selectedTheme ? themeName(selectedTheme) : '' }}
              </h5>
              <button type="button" class="theme-detail-modal__close" aria-label="Close" @click="closeModal"></button>
            </div>
            <div v-if="selectedTheme" class="theme-detail-modal__body">
              <p class="text-muted small mb-3">{{ themeDesc(selectedTheme) }}</p>
              <p class="small fw-semibold mb-2">{{ t('theme.preview') }}</p>
              <!-- Carousel xem trước theme - chạy slide (Vue-driven) -->
              <div class="theme-slider position-relative rounded border overflow-hidden">
                <div class="carousel-indicators position-absolute bottom-0 mb-1">
                  <button
                    v-for="(item, idx) in previewSlideLabels"
                    :key="idx"
                    type="button"
                    :class="{ active: currentSlide === idx }"
                    :aria-label="t(item.labelKey)"
                    @click="goSlide(idx)"
                  ></button>
                </div>
                <!-- Slide 1: Dashboard -->
                <div v-show="currentSlide === 0" class="theme-slide">
                  <div class="theme-preview-frame" :style="previewFrameStyle">
                    <div class="preview-header">☰ Vue Admin</div>
                    <div class="d-flex">
                      <div class="preview-sidebar">▢<br>▢<br>▢</div>
                      <div class="preview-main">
                        <div class="preview-bar w-75 mb-2"></div>
                        <div class="d-flex gap-2 mb-2">
                          <div class="preview-card flex-grow-1"></div>
                          <div class="preview-card flex-grow-1"></div>
                        </div>
                        <div class="preview-bar w-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Slide 2: Bảng -->
                <div v-show="currentSlide === 1" class="theme-slide">
                  <div class="theme-preview-frame" :style="previewFrameStyle">
                    <div class="preview-header">☰ Vue Admin</div>
                    <div class="d-flex">
                      <div class="preview-sidebar">▢<br>▢<br>▢</div>
                      <div class="preview-main">
                        <div class="preview-bar w-50 mb-2"></div>
                        <table class="preview-table">
                          <thead><tr><th></th><th></th></tr></thead>
                          <tbody>
                            <tr><td></td><td></td></tr>
                            <tr><td></td><td></td></tr>
                            <tr><td></td><td></td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Slide 3: Form -->
                <div v-show="currentSlide === 2" class="theme-slide">
                  <div class="theme-preview-frame" :style="previewFrameStyle">
                    <div class="preview-header">☰ Vue Admin</div>
                    <div class="d-flex">
                      <div class="preview-sidebar">▢<br>▢<br>▢</div>
                      <div class="preview-main">
                        <div class="preview-bar w-60 mb-2"></div>
                        <div class="preview-bar w-100 mb-1"></div>
                        <div class="preview-bar w-100 mb-2"></div>
                        <div class="preview-btn"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" class="carousel-control-prev theme-slider-btn" @click="goSlide((currentSlide - 1 + 3) % 3)">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button type="button" class="carousel-control-next theme-slider-btn" @click="goSlide((currentSlide + 1) % 3)">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div class="theme-detail-modal__footer">
              <button type="button" class="btn btn-outline-secondary" @click="closeModal">
                {{ t('theme.close') }}
              </button>
              <button
                v-if="selectedTheme"
                type="button"
                class="btn btn-primary"
                @click="applyAndClose(selectedTheme)"
              >
                {{ t('theme.apply') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* Modal overlay: wrapper full màn, backdrop dưới, dialog trên */
.theme-detail-modal {
  position: fixed;
  inset: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.theme-detail-modal__backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.theme-detail-modal__dialog {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: min(90vw, 50rem);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.theme-detail-modal__content {
  background: var(--bs-body-bg);
  color: var(--bs-body-color);
  border: 1px solid var(--bs-border-color);
  border-radius: 0.375rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
}
.theme-detail-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--bs-border-color);
  background: var(--bs-body-bg);
  border-radius: 0.375rem 0.375rem 0 0;
}
.theme-detail-modal__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.4;
}
.theme-detail-modal__close {
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em;
  margin: -0.25em -0.25em -0.25em auto;
  color: var(--bs-body-color);
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23637489'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
  border: 0;
  border-radius: 0.375rem;
  opacity: 0.7;
  cursor: pointer;
}
.theme-detail-modal__close:hover {
  opacity: 1;
}
.theme-detail-modal__body {
  flex: 1 1 auto;
  padding: 1.25rem;
  overflow-y: auto;
}
.theme-detail-modal__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--bs-border-color);
  background: var(--bs-body-bg);
  border-radius: 0 0 0.375rem 0.375rem;
}

.theme-card {
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.theme-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
}
.theme-card__preview {
  border-bottom: 1px solid var(--bs-border-color);
}

.theme-slider {
  min-height: 200px;
  background: var(--bs-light);
}
.theme-slide {
  min-height: 200px;
}
.theme-slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  border: 0;
  opacity: 0.9;
}
.theme-slider-btn:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.5);
}
.carousel-control-prev.theme-slider-btn {
  left: 8px;
}
.carousel-control-next.theme-slider-btn {
  right: 8px;
}
.theme-slider .carousel-indicators {
  z-index: 2;
}
.theme-slider .carousel-indicators button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 0;
  background-color: rgba(0, 0, 0, 0.4);
  margin: 0 3px;
}
.theme-slider .carousel-indicators button.active {
  background-color: var(--bs-primary);
}
.theme-preview-frame {
  min-height: 180px;
  max-height: 280px;
  background: var(--preview-bg);
  color: var(--preview-text);
}
.preview-header {
  background: var(--preview-primary);
  color: #fff;
  font-size: 10px;
  padding: 6px 8px;
}
.preview-sidebar {
  width: 44px;
  background: #1a1a1a;
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
  padding: 6px 4px;
  line-height: 1.6;
}
.preview-main {
  flex: 1;
  padding: 8px;
  font-size: 10px;
  min-height: 120px;
  background: var(--preview-bg);
  color: var(--preview-text);
}
.preview-bar {
  height: 8px;
  border-radius: 4px;
  background: var(--preview-border);
  opacity: 0.4;
}
.preview-card {
  height: 36px;
  border-radius: 4px;
  background: var(--preview-border);
  opacity: 0.25;
}
.preview-table {
  width: 100%;
  font-size: 9px;
  border-collapse: collapse;
}
.preview-table th,
.preview-table td {
  border: 1px solid var(--preview-border);
  height: 10px;
  opacity: 0.5;
}
.preview-btn {
  width: 48px;
  height: 20px;
  border-radius: 4px;
  background: var(--preview-primary);
  margin-top: 4px;
}
.w-60 {
  width: 60%;
}
</style>
