/**
 * Định nghĩa theme: id, tên, thể loại, màu (áp dụng lên :root).
 * Màu dùng biến CSS Bootstrap (--bs-primary, --bs-body-bg, ...).
 */
export type ThemeCategory = 'light' | 'dark' | 'color'

export interface ThemeDefinition {
  id: string
  name: string
  nameKey?: string
  category: ThemeCategory
  description?: string
  descriptionKey?: string
  /** CSS variables to set on document.documentElement */
  variables: Record<string, string>
  /** Màu dùng cho ô preview nhỏ (hex hoặc name) */
  previewColors: string[]
}

export const themeCategories: { id: ThemeCategory; nameKey: string }[] = [
  { id: 'light', nameKey: 'theme.categoryLight' },
  { id: 'dark', nameKey: 'theme.categoryDark' },
  { id: 'color', nameKey: 'theme.categoryColor' },
]

/** Biến bổ sung: link, card, navbar, sidebar (sidebar dùng riêng --sidebar-bg để không bị trắng). */
const themeVariablesExtended = (base: Record<string, string>): Record<string, string> => ({
  ...base,
  '--bs-secondary': base['--bs-secondary'] ?? base['--bs-body-color'],
  '--bs-secondary-rgb': base['--bs-secondary-rgb'] ?? '108, 117, 125',
  '--bs-link-color': base['--bs-link-color'] ?? base['--bs-primary'],
  '--bs-link-hover-color': base['--bs-link-hover-color'] ?? base['--bs-primary'],
  '--bs-tertiary-bg': base['--bs-tertiary-bg'] ?? base['--bs-body-bg'],
  '--bs-card-bg': base['--bs-card-bg'] ?? base['--bs-body-bg'],
  '--bs-input-bg': base['--bs-input-bg'] ?? base['--bs-body-bg'],
  '--bs-input-border-color': base['--bs-input-border-color'] ?? base['--bs-border-color'],
  '--bs-input-color': base['--bs-input-color'] ?? base['--bs-body-color'],
  '--bs-heading-color': base['--bs-heading-color'] ?? base['--bs-body-color'],
  '--bs-navbar-bg': base['--bs-navbar-bg'] ?? base['--bs-body-bg'],
  /* Sidebar: nền tối cố định, không dùng --bs-body-bg (tránh sidebar trắng khi theme sáng) */
  '--sidebar-bg': base['--sidebar-bg'] ?? '#1a1a1a',
  '--sidebar-border': base['--sidebar-border'] ?? 'rgba(255,255,255,0.08)',
  '--sidebar-text': base['--sidebar-text'] ?? 'rgba(255,255,255,0.9)',
  '--sidebar-text-muted': base['--sidebar-text-muted'] ?? 'rgba(255,255,255,0.6)',
  '--sidebar-active-bg': base['--sidebar-active-bg'] ?? base['--bs-primary'],
  '--sidebar-active-color': '#fff',
  '--sidebar-hover': base['--sidebar-hover'] ?? 'rgba(255,255,255,0.06)',
})

export const themes: ThemeDefinition[] = [
  {
    id: 'default',
    name: 'Default',
    nameKey: 'theme.default',
    category: 'light',
    descriptionKey: 'theme.descDefault',
    variables: themeVariablesExtended({
      '--bs-primary': '#0d6efd',
      '--bs-primary-rgb': '13, 110, 253',
      '--bs-body-bg': '#f8f9fa',
      '--bs-body-color': '#212529',
      '--bs-border-color': '#dee2e6',
    }),
    previewColors: ['#0d6efd', '#f8f9fa', '#212529'],
  },
  {
    id: 'ocean',
    name: 'Ocean',
    nameKey: 'theme.ocean',
    category: 'light',
    descriptionKey: 'theme.descOcean',
    variables: themeVariablesExtended({
      '--bs-primary': '#0c4a6e',
      '--bs-primary-rgb': '12, 74, 110',
      '--bs-body-bg': '#f0f9ff',
      '--bs-body-color': '#0c4a6e',
      '--bs-border-color': '#bae6fd',
    }),
    previewColors: ['#0c4a6e', '#0ea5e9', '#f0f9ff'],
  },
  {
    id: 'forest',
    name: 'Forest',
    nameKey: 'theme.forest',
    category: 'light',
    descriptionKey: 'theme.descForest',
    variables: themeVariablesExtended({
      '--bs-primary': '#166534',
      '--bs-primary-rgb': '22, 101, 52',
      '--bs-body-bg': '#f0fdf4',
      '--bs-body-color': '#14532d',
      '--bs-border-color': '#bbf7d0',
    }),
    previewColors: ['#166534', '#22c55e', '#f0fdf4'],
  },
  {
    id: 'sunset',
    name: 'Sunset',
    nameKey: 'theme.sunset',
    category: 'color',
    descriptionKey: 'theme.descSunset',
    variables: themeVariablesExtended({
      '--bs-primary': '#c2410c',
      '--bs-primary-rgb': '194, 65, 12',
      '--bs-body-bg': '#fff7ed',
      '--bs-body-color': '#431407',
      '--bs-border-color': '#fed7aa',
    }),
    previewColors: ['#c2410c', '#ea580c', '#fff7ed'],
  },
  {
    id: 'violet',
    name: 'Violet',
    nameKey: 'theme.violet',
    category: 'color',
    descriptionKey: 'theme.descViolet',
    variables: themeVariablesExtended({
      '--bs-primary': '#6d28d9',
      '--bs-primary-rgb': '109, 40, 217',
      '--bs-body-bg': '#f5f3ff',
      '--bs-body-color': '#4c1d95',
      '--bs-border-color': '#ddd6fe',
    }),
    previewColors: ['#6d28d9', '#8b5cf6', '#f5f3ff'],
  },
  {
    id: 'rose',
    name: 'Rose',
    nameKey: 'theme.rose',
    category: 'color',
    descriptionKey: 'theme.descRose',
    variables: themeVariablesExtended({
      '--bs-primary': '#be123c',
      '--bs-primary-rgb': '190, 18, 60',
      '--bs-body-bg': '#fff1f2',
      '--bs-body-color': '#9f1239',
      '--bs-border-color': '#fecdd3',
    }),
    previewColors: ['#be123c', '#f43f5e', '#fff1f2'],
  },
  {
    id: 'dark',
    name: 'Dark',
    nameKey: 'theme.dark',
    category: 'dark',
    descriptionKey: 'theme.descDark',
    variables: themeVariablesExtended({
      '--bs-primary': '#3b82f6',
      '--bs-primary-rgb': '59, 130, 246',
      '--bs-body-bg': '#0f172a',
      '--bs-body-color': '#f1f5f9',
      '--bs-border-color': '#334155',
      '--sidebar-bg': '#0f172a',
      '--sidebar-border': '#334155',
      '--sidebar-text': '#f1f5f9',
      '--sidebar-text-muted': 'rgba(241,245,249,0.7)',
    }),
    previewColors: ['#0f172a', '#3b82f6', '#334155'],
  },
  {
    id: 'dark-emerald',
    name: 'Dark Emerald',
    nameKey: 'theme.darkEmerald',
    category: 'dark',
    descriptionKey: 'theme.descDarkEmerald',
    variables: themeVariablesExtended({
      '--bs-primary': '#10b981',
      '--bs-primary-rgb': '16, 185, 129',
      '--bs-body-bg': '#022c22',
      '--bs-body-color': '#d1fae5',
      '--bs-border-color': '#064e3b',
      '--sidebar-bg': '#022c22',
      '--sidebar-border': '#064e3b',
      '--sidebar-text': '#d1fae5',
      '--sidebar-text-muted': 'rgba(209,250,229,0.7)',
    }),
    previewColors: ['#022c22', '#10b981', '#064e3b'],
  },
  {
    id: 'dark-slate',
    name: 'Dark Slate',
    nameKey: 'theme.darkSlate',
    category: 'dark',
    descriptionKey: 'theme.descDarkSlate',
    variables: themeVariablesExtended({
      '--bs-primary': '#94a3b8',
      '--bs-primary-rgb': '148, 163, 184',
      '--bs-body-bg': '#0f172a',
      '--bs-body-color': '#e2e8f0',
      '--bs-border-color': '#475569',
      '--sidebar-bg': '#0f172a',
      '--sidebar-border': '#475569',
      '--sidebar-text': '#e2e8f0',
      '--sidebar-text-muted': 'rgba(226,232,240,0.7)',
    }),
    previewColors: ['#0f172a', '#64748b', '#94a3b8'],
  },
  // --- Light (thêm 14) ---
  { id: 'mint', name: 'Mint', nameKey: 'theme.mint', category: 'light', descriptionKey: 'theme.descMint', variables: themeVariablesExtended({ '--bs-primary': '#047857', '--bs-primary-rgb': '4, 120, 87', '--bs-body-bg': '#ecfdf5', '--bs-body-color': '#064e3b', '--bs-border-color': '#a7f3d0' }), previewColors: ['#047857', '#10b981', '#ecfdf5'] },
  { id: 'lavender', name: 'Lavender', nameKey: 'theme.lavender', category: 'light', descriptionKey: 'theme.descLavender', variables: themeVariablesExtended({ '--bs-primary': '#5b21b6', '--bs-primary-rgb': '91, 33, 182', '--bs-body-bg': '#f5f3ff', '--bs-body-color': '#3730a3', '--bs-border-color': '#c4b5fd' }), previewColors: ['#5b21b6', '#8b5cf6', '#f5f3ff'] },
  { id: 'sky', name: 'Sky', nameKey: 'theme.sky', category: 'light', descriptionKey: 'theme.descSky', variables: themeVariablesExtended({ '--bs-primary': '#0369a1', '--bs-primary-rgb': '3, 105, 161', '--bs-body-bg': '#f0f9ff', '--bs-body-color': '#0c4a6e', '--bs-border-color': '#7dd3fc' }), previewColors: ['#0369a1', '#0ea5e9', '#f0f9ff'] },
  { id: 'sand', name: 'Sand', nameKey: 'theme.sand', category: 'light', descriptionKey: 'theme.descSand', variables: themeVariablesExtended({ '--bs-primary': '#b45309', '--bs-primary-rgb': '180, 83, 9', '--bs-body-bg': '#fefce8', '--bs-body-color': '#713f12', '--bs-border-color': '#fde68a' }), previewColors: ['#b45309', '#f59e0b', '#fefce8'] },
  { id: 'cream', name: 'Cream', nameKey: 'theme.cream', category: 'light', descriptionKey: 'theme.descCream', variables: themeVariablesExtended({ '--bs-primary': '#92400e', '--bs-primary-rgb': '146, 64, 14', '--bs-body-bg': '#fffbeb', '--bs-body-color': '#451a03', '--bs-border-color': '#fde68a' }), previewColors: ['#92400e', '#d97706', '#fffbeb'] },
  { id: 'peach', name: 'Peach', nameKey: 'theme.peach', category: 'light', descriptionKey: 'theme.descPeach', variables: themeVariablesExtended({ '--bs-primary': '#c2410c', '--bs-primary-rgb': '194, 65, 12', '--bs-body-bg': '#fff7ed', '--bs-body-color': '#9a3412', '--bs-border-color': '#fed7aa' }), previewColors: ['#c2410c', '#fb923c', '#fff7ed'] },
  { id: 'sage', name: 'Sage', nameKey: 'theme.sage', category: 'light', descriptionKey: 'theme.descSage', variables: themeVariablesExtended({ '--bs-primary': '#3f6212', '--bs-primary-rgb': '63, 98, 18', '--bs-body-bg': '#f7fee7', '--bs-body-color': '#365314', '--bs-border-color': '#bef264' }), previewColors: ['#3f6212', '#84cc16', '#f7fee7'] },
  { id: 'ivory', name: 'Ivory', nameKey: 'theme.ivory', category: 'light', descriptionKey: 'theme.descIvory', variables: themeVariablesExtended({ '--bs-primary': '#4b5563', '--bs-primary-rgb': '75, 85, 99', '--bs-body-bg': '#fffff0', '--bs-body-color': '#1f2937', '--bs-border-color': '#e5e7eb' }), previewColors: ['#4b5563', '#6b7280', '#fffff0'] },
  { id: 'snow', name: 'Snow', nameKey: 'theme.snow', category: 'light', descriptionKey: 'theme.descSnow', variables: themeVariablesExtended({ '--bs-primary': '#1e40af', '--bs-primary-rgb': '30, 64, 175', '--bs-body-bg': '#fafafa', '--bs-body-color': '#1e3a8a', '--bs-border-color': '#dbeafe' }), previewColors: ['#1e40af', '#3b82f6', '#fafafa'] },
  { id: 'honey', name: 'Honey', nameKey: 'theme.honey', category: 'light', descriptionKey: 'theme.descHoney', variables: themeVariablesExtended({ '--bs-primary': '#a16207', '--bs-primary-rgb': '161, 98, 7', '--bs-body-bg': '#fef9c3', '--bs-body-color': '#713f12', '--bs-border-color': '#fde047' }), previewColors: ['#a16207', '#eab308', '#fef9c3'] },
  { id: 'blossom', name: 'Blossom', nameKey: 'theme.blossom', category: 'light', descriptionKey: 'theme.descBlossom', variables: themeVariablesExtended({ '--bs-primary': '#be185d', '--bs-primary-rgb': '190, 24, 93', '--bs-body-bg': '#fdf2f8', '--bs-body-color': '#831843', '--bs-border-color': '#fbcfe8' }), previewColors: ['#be185d', '#ec4899', '#fdf2f8'] },
  { id: 'aqua', name: 'Aqua', nameKey: 'theme.aqua', category: 'light', descriptionKey: 'theme.descAqua', variables: themeVariablesExtended({ '--bs-primary': '#0e7490', '--bs-primary-rgb': '14, 116, 144', '--bs-body-bg': '#ecfeff', '--bs-body-color': '#155e75', '--bs-border-color': '#a5f3fc' }), previewColors: ['#0e7490', '#06b6d4', '#ecfeff'] },
  { id: 'wheat', name: 'Wheat', nameKey: 'theme.wheat', category: 'light', descriptionKey: 'theme.descWheat', variables: themeVariablesExtended({ '--bs-primary': '#a16207', '--bs-primary-rgb': '161, 98, 7', '--bs-body-bg': '#fefce8', '--bs-body-color': '#713f12', '--bs-border-color': '#fef08a' }), previewColors: ['#a16207', '#ca8a04', '#fefce8'] },
  { id: 'linen', name: 'Linen', nameKey: 'theme.linen', category: 'light', descriptionKey: 'theme.descLinen', variables: themeVariablesExtended({ '--bs-primary': '#78716c', '--bs-primary-rgb': '120, 113, 108', '--bs-body-bg': '#fafaf9', '--bs-body-color': '#292524', '--bs-border-color': '#e7e5e4' }), previewColors: ['#78716c', '#a8a29e', '#fafaf9'] },
  // --- Color (thêm 13) ---
  { id: 'amber', name: 'Amber', nameKey: 'theme.amber', category: 'color', descriptionKey: 'theme.descAmber', variables: themeVariablesExtended({ '--bs-primary': '#d97706', '--bs-primary-rgb': '217, 119, 6', '--bs-body-bg': '#fffbeb', '--bs-body-color': '#78350f', '--bs-border-color': '#fcd34d' }), previewColors: ['#d97706', '#f59e0b', '#fffbeb'] },
  { id: 'teal', name: 'Teal', nameKey: 'theme.teal', category: 'color', descriptionKey: 'theme.descTeal', variables: themeVariablesExtended({ '--bs-primary': '#0d9488', '--bs-primary-rgb': '13, 148, 136', '--bs-body-bg': '#f0fdfa', '--bs-body-color': '#134e4a', '--bs-border-color': '#99f6e4' }), previewColors: ['#0d9488', '#14b8a6', '#f0fdfa'] },
  { id: 'indigo', name: 'Indigo', nameKey: 'theme.indigo', category: 'color', descriptionKey: 'theme.descIndigo', variables: themeVariablesExtended({ '--bs-primary': '#4f46e5', '--bs-primary-rgb': '79, 70, 229', '--bs-body-bg': '#eef2ff', '--bs-body-color': '#312e81', '--bs-border-color': '#c7d2fe' }), previewColors: ['#4f46e5', '#6366f1', '#eef2ff'] },
  { id: 'cyan', name: 'Cyan', nameKey: 'theme.cyan', category: 'color', descriptionKey: 'theme.descCyan', variables: themeVariablesExtended({ '--bs-primary': '#0891b2', '--bs-primary-rgb': '8, 145, 178', '--bs-body-bg': '#ecfeff', '--bs-body-color': '#155e75', '--bs-border-color': '#a5f3fc' }), previewColors: ['#0891b2', '#22d3ee', '#ecfeff'] },
  { id: 'magenta', name: 'Magenta', nameKey: 'theme.magenta', category: 'color', descriptionKey: 'theme.descMagenta', variables: themeVariablesExtended({ '--bs-primary': '#c026d3', '--bs-primary-rgb': '192, 38, 211', '--bs-body-bg': '#fdf4ff', '--bs-body-color': '#701a75', '--bs-border-color': '#f5d0fe' }), previewColors: ['#c026d3', '#e879f9', '#fdf4ff'] },
  { id: 'lime', name: 'Lime', nameKey: 'theme.lime', category: 'color', descriptionKey: 'theme.descLime', variables: themeVariablesExtended({ '--bs-primary': '#65a30d', '--bs-primary-rgb': '101, 163, 13', '--bs-body-bg': '#f7fee7', '--bs-body-color': '#365314', '--bs-border-color': '#bef264' }), previewColors: ['#65a30d', '#84cc16', '#f7fee7'] },
  { id: 'gold', name: 'Gold', nameKey: 'theme.gold', category: 'color', descriptionKey: 'theme.descGold', variables: themeVariablesExtended({ '--bs-primary': '#ca8a04', '--bs-primary-rgb': '202, 138, 4', '--bs-body-bg': '#fefce8', '--bs-body-color': '#713f12', '--bs-border-color': '#fef08a' }), previewColors: ['#ca8a04', '#eab308', '#fefce8'] },
  { id: 'ruby', name: 'Ruby', nameKey: 'theme.ruby', category: 'color', descriptionKey: 'theme.descRuby', variables: themeVariablesExtended({ '--bs-primary': '#dc2626', '--bs-primary-rgb': '220, 38, 38', '--bs-body-bg': '#fef2f2', '--bs-body-color': '#991b1b', '--bs-border-color': '#fecaca' }), previewColors: ['#dc2626', '#ef4444', '#fef2f2'] },
  { id: 'emerald', name: 'Emerald', nameKey: 'theme.emerald', category: 'color', descriptionKey: 'theme.descEmerald', variables: themeVariablesExtended({ '--bs-primary': '#059669', '--bs-primary-rgb': '5, 150, 105', '--bs-body-bg': '#ecfdf5', '--bs-body-color': '#064e3b', '--bs-border-color': '#a7f3d0' }), previewColors: ['#059669', '#10b981', '#ecfdf5'] },
  { id: 'sapphire', name: 'Sapphire', nameKey: 'theme.sapphire', category: 'color', descriptionKey: 'theme.descSapphire', variables: themeVariablesExtended({ '--bs-primary': '#2563eb', '--bs-primary-rgb': '37, 99, 235', '--bs-body-bg': '#eff6ff', '--bs-body-color': '#1e40af', '--bs-border-color': '#bfdbfe' }), previewColors: ['#2563eb', '#3b82f6', '#eff6ff'] },
  { id: 'plum', name: 'Plum', nameKey: 'theme.plum', category: 'color', descriptionKey: 'theme.descPlum', variables: themeVariablesExtended({ '--bs-primary': '#7e22ce', '--bs-primary-rgb': '126, 34, 206', '--bs-body-bg': '#faf5ff', '--bs-body-color': '#581c87', '--bs-border-color': '#e9d5ff' }), previewColors: ['#7e22ce', '#a855f7', '#faf5ff'] },
  { id: 'tangerine', name: 'Tangerine', nameKey: 'theme.tangerine', category: 'color', descriptionKey: 'theme.descTangerine', variables: themeVariablesExtended({ '--bs-primary': '#ea580c', '--bs-primary-rgb': '234, 88, 12', '--bs-body-bg': '#fff7ed', '--bs-body-color': '#9a3412', '--bs-border-color': '#fed7aa' }), previewColors: ['#ea580c', '#fb923c', '#fff7ed'] },
  { id: 'cherry', name: 'Cherry', nameKey: 'theme.cherry', category: 'color', descriptionKey: 'theme.descCherry', variables: themeVariablesExtended({ '--bs-primary': '#e11d48', '--bs-primary-rgb': '225, 29, 72', '--bs-body-bg': '#fff1f2', '--bs-body-color': '#9f1239', '--bs-border-color': '#fecdd3' }), previewColors: ['#e11d48', '#f43f5e', '#fff1f2'] },
  // --- Dark (thêm 14) ---
  { id: 'dark-ocean', name: 'Dark Ocean', nameKey: 'theme.darkOcean', category: 'dark', descriptionKey: 'theme.descDarkOcean', variables: themeVariablesExtended({ '--bs-primary': '#38bdf8', '--bs-primary-rgb': '56, 189, 248', '--bs-body-bg': '#0c4a6e', '--bs-body-color': '#e0f2fe', '--bs-border-color': '#075985', '--sidebar-bg': '#0c4a6e', '--sidebar-border': '#075985', '--sidebar-text': '#e0f2fe', '--sidebar-text-muted': 'rgba(224,242,254,0.7)' }), previewColors: ['#0c4a6e', '#38bdf8', '#075985'] },
  { id: 'dark-violet', name: 'Dark Violet', nameKey: 'theme.darkViolet', category: 'dark', descriptionKey: 'theme.descDarkViolet', variables: themeVariablesExtended({ '--bs-primary': '#a78bfa', '--bs-primary-rgb': '167, 139, 250', '--bs-body-bg': '#2e1065', '--bs-body-color': '#ede9fe', '--bs-border-color': '#4c1d95', '--sidebar-bg': '#2e1065', '--sidebar-border': '#4c1d95', '--sidebar-text': '#ede9fe', '--sidebar-text-muted': 'rgba(237,233,254,0.7)' }), previewColors: ['#2e1065', '#a78bfa', '#4c1d95'] },
  { id: 'dark-amber', name: 'Dark Amber', nameKey: 'theme.darkAmber', category: 'dark', descriptionKey: 'theme.descDarkAmber', variables: themeVariablesExtended({ '--bs-primary': '#fbbf24', '--bs-primary-rgb': '251, 191, 36', '--bs-body-bg': '#451a03', '--bs-body-color': '#fef3c7', '--bs-border-color': '#78350f', '--sidebar-bg': '#451a03', '--sidebar-border': '#78350f', '--sidebar-text': '#fef3c7', '--sidebar-text-muted': 'rgba(254,243,199,0.7)' }), previewColors: ['#451a03', '#fbbf24', '#78350f'] },
  { id: 'dark-rose', name: 'Dark Rose', nameKey: 'theme.darkRose', category: 'dark', descriptionKey: 'theme.descDarkRose', variables: themeVariablesExtended({ '--bs-primary': '#fb7185', '--bs-primary-rgb': '251, 113, 133', '--bs-body-bg': '#4c0519', '--bs-body-color': '#ffe4e6', '--bs-border-color': '#9f1239', '--sidebar-bg': '#4c0519', '--sidebar-border': '#9f1239', '--sidebar-text': '#ffe4e6', '--sidebar-text-muted': 'rgba(255,228,230,0.7)' }), previewColors: ['#4c0519', '#fb7185', '#9f1239'] },
  { id: 'dark-forest', name: 'Dark Forest', nameKey: 'theme.darkForest', category: 'dark', descriptionKey: 'theme.descDarkForest', variables: themeVariablesExtended({ '--bs-primary': '#4ade80', '--bs-primary-rgb': '74, 222, 128', '--bs-body-bg': '#052e16', '--bs-body-color': '#dcfce7', '--bs-border-color': '#166534', '--sidebar-bg': '#052e16', '--sidebar-border': '#166534', '--sidebar-text': '#dcfce7', '--sidebar-text-muted': 'rgba(220,252,231,0.7)' }), previewColors: ['#052e16', '#4ade80', '#166534'] },
  { id: 'dark-gold', name: 'Dark Gold', nameKey: 'theme.darkGold', category: 'dark', descriptionKey: 'theme.descDarkGold', variables: themeVariablesExtended({ '--bs-primary': '#facc15', '--bs-primary-rgb': '250, 204, 21', '--bs-body-bg': '#422006', '--bs-body-color': '#fef9c3', '--bs-border-color': '#713f12', '--sidebar-bg': '#422006', '--sidebar-border': '#713f12', '--sidebar-text': '#fef9c3', '--sidebar-text-muted': 'rgba(254,249,195,0.7)' }), previewColors: ['#422006', '#facc15', '#713f12'] },
  { id: 'dark-ruby', name: 'Dark Ruby', nameKey: 'theme.darkRuby', category: 'dark', descriptionKey: 'theme.descDarkRuby', variables: themeVariablesExtended({ '--bs-primary': '#f87171', '--bs-primary-rgb': '248, 113, 113', '--bs-body-bg': '#450a0a', '--bs-body-color': '#fee2e2', '--bs-border-color': '#991b1b', '--sidebar-bg': '#450a0a', '--sidebar-border': '#991b1b', '--sidebar-text': '#fee2e2', '--sidebar-text-muted': 'rgba(254,226,226,0.7)' }), previewColors: ['#450a0a', '#f87171', '#991b1b'] },
  { id: 'dark-midnight', name: 'Dark Midnight', nameKey: 'theme.darkMidnight', category: 'dark', descriptionKey: 'theme.descDarkMidnight', variables: themeVariablesExtended({ '--bs-primary': '#818cf8', '--bs-primary-rgb': '129, 140, 248', '--bs-body-bg': '#0f0f23', '--bs-body-color': '#e0e7ff', '--bs-border-color': '#312e81', '--sidebar-bg': '#0f0f23', '--sidebar-border': '#312e81', '--sidebar-text': '#e0e7ff', '--sidebar-text-muted': 'rgba(224,231,255,0.7)' }), previewColors: ['#0f0f23', '#818cf8', '#312e81'] },
  { id: 'dark-navy', name: 'Dark Navy', nameKey: 'theme.darkNavy', category: 'dark', descriptionKey: 'theme.descDarkNavy', variables: themeVariablesExtended({ '--bs-primary': '#60a5fa', '--bs-primary-rgb': '96, 165, 250', '--bs-body-bg': '#0f172a', '--bs-body-color': '#f1f5f9', '--bs-border-color': '#1e3a5f', '--sidebar-bg': '#0f172a', '--sidebar-border': '#1e3a5f', '--sidebar-text': '#f1f5f9', '--sidebar-text-muted': 'rgba(241,245,249,0.7)' }), previewColors: ['#0f172a', '#60a5fa', '#1e3a5f'] },
  { id: 'dark-wine', name: 'Dark Wine', nameKey: 'theme.darkWine', category: 'dark', descriptionKey: 'theme.descDarkWine', variables: themeVariablesExtended({ '--bs-primary': '#f472b6', '--bs-primary-rgb': '244, 114, 182', '--bs-body-bg': '#3f0f12', '--bs-body-color': '#fce7f3', '--bs-border-color': '#831843', '--sidebar-bg': '#3f0f12', '--sidebar-border': '#831843', '--sidebar-text': '#fce7f3', '--sidebar-text-muted': 'rgba(252,231,243,0.7)' }), previewColors: ['#3f0f12', '#f472b6', '#831843'] },
  { id: 'dark-mocha', name: 'Dark Mocha', nameKey: 'theme.darkMocha', category: 'dark', descriptionKey: 'theme.descDarkMocha', variables: themeVariablesExtended({ '--bs-primary': '#d6d3d1', '--bs-primary-rgb': '214, 211, 209', '--bs-body-bg': '#292524', '--bs-body-color': '#e7e5e4', '--bs-border-color': '#57534e', '--sidebar-bg': '#292524', '--sidebar-border': '#57534e', '--sidebar-text': '#e7e5e4', '--sidebar-text-muted': 'rgba(231,229,228,0.7)' }), previewColors: ['#292524', '#d6d3d1', '#57534e'] },
  { id: 'dark-charcoal', name: 'Dark Charcoal', nameKey: 'theme.darkCharcoal', category: 'dark', descriptionKey: 'theme.descDarkCharcoal', variables: themeVariablesExtended({ '--bs-primary': '#94a3b8', '--bs-primary-rgb': '148, 163, 184', '--bs-body-bg': '#171717', '--bs-body-color': '#d4d4d4', '--bs-border-color': '#404040', '--sidebar-bg': '#171717', '--sidebar-border': '#404040', '--sidebar-text': '#d4d4d4', '--sidebar-text-muted': 'rgba(212,212,212,0.7)' }), previewColors: ['#171717', '#94a3b8', '#404040'] },
  { id: 'dark-cyber', name: 'Dark Cyber', nameKey: 'theme.darkCyber', category: 'dark', descriptionKey: 'theme.descDarkCyber', variables: themeVariablesExtended({ '--bs-primary': '#22d3ee', '--bs-primary-rgb': '34, 211, 238', '--bs-body-bg': '#0a0a0f', '--bs-body-color': '#cffafe', '--bs-border-color': '#164e63', '--sidebar-bg': '#0a0a0f', '--sidebar-border': '#164e63', '--sidebar-text': '#cffafe', '--sidebar-text-muted': 'rgba(207,250,254,0.7)' }), previewColors: ['#0a0a0f', '#22d3ee', '#164e63'] },
  { id: 'dark-copper', name: 'Dark Copper', nameKey: 'theme.darkCopper', category: 'dark', descriptionKey: 'theme.descDarkCopper', variables: themeVariablesExtended({ '--bs-primary': '#f59e0b', '--bs-primary-rgb': '245, 158, 11', '--bs-body-bg': '#1c1917', '--bs-body-color': '#fef3c7', '--bs-border-color': '#78716c', '--sidebar-bg': '#1c1917', '--sidebar-border': '#78716c', '--sidebar-text': '#fef3c7', '--sidebar-text-muted': 'rgba(254,243,199,0.7)' }), previewColors: ['#1c1917', '#f59e0b', '#78716c'] },
]

const STORAGE_KEY = 'admin-theme-id'

export function getStoredThemeId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function setStoredThemeId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    //
  }
}

export function getThemeById(id: string): ThemeDefinition | undefined {
  return themes.find((t) => t.id === id)
}

export function applyThemeVariables(theme: ThemeDefinition): void {
  const root = document.documentElement
  root.setAttribute('data-theme', theme.category === 'dark' ? 'dark' : 'light')
  Object.entries(theme.variables).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
  injectThemeOverrides()
}

const THEME_OVERRIDES_ID = 'admin-theme-overrides'

/** Inject stylesheet dùng !important để theme ghi đè Bootstrap và style cũ */
function injectThemeOverrides(): void {
  const css = `
/* Theme override: ghi đè body, layout, Bootstrap components */
#app,
body {
  background-color: var(--bs-body-bg) !important;
  color: var(--bs-body-color) !important;
}
/* Theme tối: ép màu chữ sáng để đọc được (header + body) */
[data-theme="dark"] body,
[data-theme="dark"] #app,
[data-theme="dark"] .main-layout,
[data-theme="dark"] .main-wrapper,
[data-theme="dark"] .main-content,
[data-theme="dark"] .app-header,
[data-theme="dark"] .app-header *,
[data-theme="dark"] .navbar,
[data-theme="dark"] .navbar *,
[data-theme="dark"] .card,
[data-theme="dark"] .card-body,
[data-theme="dark"] .card-title,
[data-theme="dark"] .card-text,
[data-theme="dark"] h1, [data-theme="dark"] h2, [data-theme="dark"] h3, [data-theme="dark"] h4, [data-theme="dark"] h5, [data-theme="dark"] h6,
[data-theme="dark"] p,
[data-theme="dark"] .text-muted {
  color: var(--bs-body-color, #e2e8f0) !important;
}
[data-theme="dark"] .dropdown-menu,
[data-theme="dark"] .dropdown-item {
  color: var(--bs-body-color, #e2e8f0) !important;
}
[data-theme="dark"] .btn-outline-secondary {
  color: var(--bs-body-color, #e2e8f0) !important;
  border-color: var(--bs-border-color) !important;
}
[data-theme="dark"] .btn-outline-secondary:hover {
  background-color: var(--bs-tertiary-bg) !important;
  color: var(--bs-body-color, #e2e8f0) !important;
}
/* Header / navbar */
.app-header,
.navbar.bg-white,
.navbar {
  background-color: var(--bs-navbar-bg, var(--bs-body-bg)) !important;
  border-color: var(--bs-border-color) !important;
  color: var(--bs-body-color) !important;
}
.navbar-brand { color: var(--bs-body-color) !important; }
/* Card */
.card,
.card-body,
.card-header,
.card-footer {
  background-color: var(--bs-card-bg, var(--bs-body-bg)) !important;
  border-color: var(--bs-border-color) !important;
  color: var(--bs-body-color) !important;
}
.card-title { color: var(--bs-heading-color, var(--bs-body-color)) !important; }
/* Buttons primary */
.btn-primary {
  background-color: var(--bs-primary) !important;
  border-color: var(--bs-primary) !important;
  color: #fff !important;
}
.btn-primary:hover {
  background-color: var(--bs-primary) !important;
  border-color: var(--bs-primary) !important;
  filter: brightness(1.1);
  color: #fff !important;
}
.btn-outline-primary {
  color: var(--bs-primary) !important;
  border-color: var(--bs-primary) !important;
}
.btn-outline-primary:hover {
  background-color: var(--bs-primary) !important;
  color: #fff !important;
}
/* Badge, bg, text, border primary */
.bg-primary,
.badge.bg-primary { background-color: var(--bs-primary) !important; }
.text-primary,
.badge.text-primary,
a.link-primary { color: var(--bs-primary) !important; }
.border-primary { border-color: var(--bs-primary) !important; }
/* Form controls */
.form-control,
.form-select,
input:not([type="checkbox"]):not([type="radio"]),
select,
textarea {
  background-color: var(--bs-input-bg, var(--bs-body-bg)) !important;
  border-color: var(--bs-input-border-color, var(--bs-border-color)) !important;
  color: var(--bs-input-color, var(--bs-body-color)) !important;
}
.form-control:focus,
.form-select:focus {
  border-color: var(--bs-primary) !important;
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25) !important;
}
/* Dropdown */
.dropdown-menu {
  background-color: var(--bs-body-bg) !important;
  border-color: var(--bs-border-color) !important;
}
.dropdown-item {
  color: var(--bs-body-color) !important;
}
.dropdown-item:hover,
.dropdown-item:focus {
  background-color: var(--bs-tertiary-bg, var(--bs-body-bg)) !important;
  color: var(--bs-body-color) !important;
}
/* Links */
a { color: var(--bs-link-color, var(--bs-primary)) !important; }
a:hover { color: var(--bs-link-hover-color, var(--bs-primary)) !important; }
/* Text muted */
.text-muted { color: var(--bs-secondary, var(--bs-body-color)) !important; opacity: 0.8; }
/* Sidebar: dùng --sidebar-bg (không dùng --bs-body-bg để tránh sidebar trắng) */
html body #app .app-sidebar-desktop.sidebar-theme-dark,
html body .app-sidebar-desktop.sidebar-theme-dark,
html body .sidebar-theme-dark,
html body aside.sidebar-theme-dark {
  background: var(--sidebar-bg, #1a1a1a) !important;
  background-color: var(--sidebar-bg, #1a1a1a) !important;
  border-color: var(--sidebar-border, rgba(255,255,255,0.08)) !important;
  --sidebar-active-bg: var(--bs-primary, #0d6efd) !important;
  --sidebar-active-color: #fff !important;
  --sidebar-hover: var(--sidebar-hover, rgba(255,255,255,0.06)) !important;
}
html body .sidebar-theme-dark a,
html body .sidebar-theme-dark .sidebar-header-title,
html body .sidebar-theme-dark .sidebar-nav-link,
html body .sidebar-theme-dark .sidebar-nav-group__toggle,
html body .sidebar-theme-dark .sidebar-nav-group__child-link {
  color: var(--sidebar-text) !important;
}
html body .sidebar-theme-dark .sidebar-nav-link--active,
html body .sidebar-theme-dark .sidebar-nav-group__child-link--active {
  background: var(--sidebar-active-bg) !important;
  color: var(--sidebar-active-color) !important;
}
html body .sidebar-theme-dark .sidebar-nav-group__toggle--active {
  color: var(--sidebar-active-color) !important;
}
html body .sidebar-overlay-mobile__panel.sidebar-theme-dark {
  background: var(--sidebar-bg, #1a1a1a) !important;
  background-color: var(--sidebar-bg, #1a1a1a) !important;
  border-color: var(--sidebar-border, rgba(255,255,255,0.08)) !important;
}
html body .sidebar-overlay-mobile__panel .sidebar-overlay-mobile__header {
  background-color: var(--sidebar-bg, #1a1a1a) !important;
  border-bottom-color: var(--sidebar-border, rgba(255,255,255,0.08)) !important;
}
`
  let el = document.getElementById(THEME_OVERRIDES_ID) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = THEME_OVERRIDES_ID
    el.setAttribute('data-theme-override', '')
  }
  el.textContent = css
  if (el.parentNode) el.remove()
  document.body.appendChild(el)
}

/** Gọi khi app khởi động để áp theme đã lưu */
export function initTheme(): void {
  const id = getStoredThemeId()
  const theme = getThemeById(id || 'default')
  if (theme) applyThemeVariables(theme)
}

/** Gọi sau khi app mount để đảm bảo theme override luôn thắng style component (sidebar) */
export function ensureThemeOverrideLast(): void {
  const el = document.getElementById(THEME_OVERRIDES_ID)
  if (el && el.parentNode) {
    el.remove()
    document.body.appendChild(el)
  }
}
