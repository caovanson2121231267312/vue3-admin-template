import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import vi from '../locales/vi'

const savedLocale = localStorage.getItem('locale') as 'en' | 'vi' | null
const defaultLocale = savedLocale && (savedLocale === 'en' || savedLocale === 'vi') ? savedLocale : 'vi'

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    vi,
  },
})

export function setLocale(locale: 'en' | 'vi') {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
}
