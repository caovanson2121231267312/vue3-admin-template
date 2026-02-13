import type { RouteRecordRaw } from 'vue-router'

/** Meta mở rộng cho từng route (breadcrumb, title, auth, layout) */
export interface RouteMetaExtended {
  /** Tiêu đề trang (hiển thị trên tab, breadcrumb) */
  title: string
  /** Mô tả ngắn (optional) */
  description?: string
  /** Icon cho sidebar (tên class hoặc component) */
  icon?: string
  /** Thứ tự sắp xếp trong sidebar (số nhỏ = trên) */
  order?: number
  /** Ẩn khỏi sidebar */
  hideInSidebar?: boolean
  /** Cần đăng nhập */
  requiresAuth?: boolean
  /** Roles được phép (empty = mọi user đã đăng nhập) */
  roles?: string[]
}

/** Route record dùng trong app (meta được typings) */
export type AppRouteRecordRaw = RouteRecordRaw & {
  meta?: RouteMetaExtended
  children?: AppRouteRecordRaw[]
}

/** Cấu hình một mục nav trong sidebar */
export interface NavItemConfig {
  path: string
  title: string
  icon?: string
  children?: NavItemConfig[]
  badge?: string | number
}
