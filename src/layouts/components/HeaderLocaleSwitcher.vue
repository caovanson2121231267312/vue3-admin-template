<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { setLocale } from '../../plugins/i18n'

const { locale, t } = useI18n()

function switchTo(loc: 'en' | 'vi') {
  setLocale(loc)
}
</script>

<template>
  <div class="dropdown">
    <button
      class="btn btn-link text-dark text-decoration-none dropdown-toggle py-2 d-flex align-items-center"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      :title="locale === 'vi' ? t('common.localeVi') : t('common.localeEn')"
    >
      <span class="d-none d-sm-inline">{{ locale === 'vi' ? 'VI' : 'EN' }}</span>
      <i class="bi bi-globe ms-1"></i>
    </button>
    <ul class="dropdown-menu dropdown-menu-end shadow">
      <li>
        <button
          type="button"
          class="dropdown-item d-flex align-items-center"
          :class="{ active: locale === 'vi' }"
          @click="switchTo('vi')"
        >
          <span class="me-2">🇻🇳</span> {{ t('common.localeVi') }}
        </button>
      </li>
      <li>
        <button
          type="button"
          class="dropdown-item d-flex align-items-center"
          :class="{ active: locale === 'en' }"
          @click="switchTo('en')"
        >
          <span class="me-2">🇬🇧</span> {{ t('common.localeEn') }}
        </button>
      </li>
    </ul>
  </div>
</template>
