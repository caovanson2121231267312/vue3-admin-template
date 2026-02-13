import { ref, computed } from 'vue'
import {
  themes,
  getStoredThemeId,
  setStoredThemeId,
  getThemeById,
  applyThemeVariables,
  type ThemeDefinition,
} from '../config/themes'

const currentThemeId = ref<string>(getStoredThemeId() || 'default')

export function useTheme() {
  const currentTheme = computed<ThemeDefinition | null>(
    () => getThemeById(currentThemeId.value) ?? themes[0]
  )

  function setTheme(id: string) {
    const theme = getThemeById(id)
    if (!theme) return
    currentThemeId.value = id
    setStoredThemeId(id)
    applyThemeVariables(theme)
  }

  return {
    currentThemeId,
    currentTheme,
    themes,
    setTheme,
  }
}
