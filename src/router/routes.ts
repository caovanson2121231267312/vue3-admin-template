import type { AppRouteRecordRaw } from '../types/router'

/**
 * Định nghĩa tất cả routes của admin.
 * - path: đường dẫn URL
 * - name: tên route (unique) dùng cho router.push({ name: '...' })
 * - component: lazy load để tối ưu bundle
 * - meta: title, icon, sidebar, auth...
 */
export const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: { name: 'Dashboard' },
    meta: { title: 'Home', hideInSidebar: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: {
      title: 'Dashboard',
      icon: 'bi-speedometer2',
      order: 1,
      description: 'Tổng quan hệ thống',
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/UsersView.vue'),
    meta: {
      title: 'Quản lý người dùng',
      icon: 'bi-people',
      order: 2,
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsView.vue'),
    meta: {
      title: 'Cài đặt',
      icon: 'bi-gear',
      order: 10,
      hideInSidebar: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'Không tìm thấy', hideInSidebar: true },
  },
]
