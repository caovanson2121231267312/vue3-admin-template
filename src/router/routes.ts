import type { AppRouteRecordRaw } from '../types/router'

/**
 * Định nghĩa tất cả routes của admin.
 * Menu đa cấp được cấu hình trong src/config/sidebar-menu.ts
 */
export const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: { name: 'Dashboard' },
    meta: { title: 'nav.home', hideInSidebar: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { title: 'nav.dashboard', icon: 'bi-speedometer2', order: 1 },
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/UsersView.vue'),
    meta: { title: 'nav.userManagement', icon: 'bi-people', order: 2 },
  },
  {
    path: '/products',
    name: 'ProductList',
    component: () => import('../views/products/ProductListView.vue'),
    meta: { title: 'nav.productList', icon: 'bi-box-seam', order: 3 },
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('../views/products/ProductDetailView.vue'),
    meta: { title: 'nav.productDetail', hideInSidebar: true },
  },
  {
    path: '/products/add',
    name: 'ProductAdd',
    component: () => import('../views/products/ProductAddView.vue'),
    meta: { title: 'nav.addProduct', hideInSidebar: true },
  },
  {
    path: '/products/categories',
    name: 'ProductCategories',
    component: () => import('../views/products/ProductCategoriesView.vue'),
    meta: { title: 'nav.productCategories', icon: 'bi-tags', order: 3 },
  },
  {
    path: '/orders',
    name: 'OrderList',
    component: () => import('../views/orders/OrderListView.vue'),
    meta: { title: 'nav.orderList', icon: 'bi-cart-check', order: 4 },
  },
  {
    path: '/orders/create',
    name: 'OrderCreate',
    component: () => import('../views/orders/OrderCreateView.vue'),
    meta: { title: 'nav.createOrder', hideInSidebar: true },
  },
  {
    path: '/reports/sales',
    name: 'ReportSales',
    component: () => import('../views/reports/ReportSalesView.vue'),
    meta: { title: 'nav.salesReport', icon: 'bi-graph-up', order: 5 },
  },
  {
    path: '/reports/users',
    name: 'ReportUsers',
    component: () => import('../views/reports/ReportUsersView.vue'),
    meta: { title: 'nav.userReport', icon: 'bi-people', order: 5 },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsView.vue'),
    meta: { title: 'nav.generalSettings', icon: 'bi-gear', order: 10 },
  },
  {
    path: '/settings/system',
    name: 'SettingsSystem',
    component: () => import('../views/settings/SettingsSystemView.vue'),
    meta: { title: 'nav.systemSettings', hideInSidebar: true },
  },
  {
    path: '/settings/themes',
    name: 'SettingsThemes',
    component: () => import('../views/settings/SettingsThemesView.vue'),
    meta: { title: 'nav.themes', hideInSidebar: true },
  },
  {
    path: '/demo/buttons',
    name: 'DemoButtons',
    component: () => import('../views/demo/DemoButtonsView.vue'),
    meta: { title: 'nav.demoButtons', icon: 'bi-hand-index-thumb', order: 9 },
  },
  {
    path: '/demo/alerts',
    name: 'DemoAlerts',
    component: () => import('../views/demo/DemoAlertsView.vue'),
    meta: { title: 'nav.demoAlerts', icon: 'bi-exclamation-triangle', order: 9 },
  },
  {
    path: '/demo/cards',
    name: 'DemoCards',
    component: () => import('../views/demo/DemoCardsView.vue'),
    meta: { title: 'nav.demoCards', icon: 'bi-card-text', order: 9 },
  },
  {
    path: '/demo/forms',
    name: 'DemoForms',
    component: () => import('../views/demo/DemoFormsView.vue'),
    meta: { title: 'nav.demoForms', icon: 'bi-input-cursor-text', order: 9 },
  },
  {
    path: '/demo/badges',
    name: 'DemoBadges',
    component: () => import('../views/demo/DemoBadgesView.vue'),
    meta: { title: 'nav.demoBadges', icon: 'bi-tag', order: 9 },
  },
  {
    path: '/demo/progress',
    name: 'DemoProgress',
    component: () => import('../views/demo/DemoProgressView.vue'),
    meta: { title: 'nav.demoProgress', icon: 'bi-bar-chart', order: 9 },
  },
  {
    path: '/demo/tables',
    name: 'DemoTables',
    component: () => import('../views/demo/DemoTablesView.vue'),
    meta: { title: 'nav.demoTables', icon: 'bi-table', order: 9 },
  },
  {
    path: '/demo/dropdowns',
    name: 'DemoDropdowns',
    component: () => import('../views/demo/DemoDropdownsView.vue'),
    meta: { title: 'nav.demoDropdowns', icon: 'bi-menu-button', order: 9 },
  },
  {
    path: '/demo/nav-tabs',
    name: 'DemoNavTabs',
    component: () => import('../views/demo/DemoNavTabsView.vue'),
    meta: { title: 'nav.demoNavTabs', icon: 'bi-tabs', order: 9 },
  },
  {
    path: '/demo/spinners',
    name: 'DemoSpinners',
    component: () => import('../views/demo/DemoSpinnersView.vue'),
    meta: { title: 'nav.demoSpinners', icon: 'bi-arrow-repeat', order: 9 },
  },
  {
    path: '/demo/typography',
    name: 'DemoTypography',
    component: () => import('../views/demo/DemoTypographyView.vue'),
    meta: { title: 'nav.demoTypography', icon: 'bi-type', order: 9 },
  },
  {
    path: '/demo/utilities',
    name: 'DemoUtilities',
    component: () => import('../views/demo/DemoUtilitiesView.vue'),
    meta: { title: 'nav.demoUtilities', icon: 'bi-brush', order: 9 },
  },
  {
    path: '/demo/components',
    name: 'ComponentsDemo',
    component: () => import('../views/demo/ComponentsDemoView.vue'),
    meta: { title: 'nav.demoComponents', icon: 'bi-puzzle', order: 9 },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'nav.notFound', hideInSidebar: true },
  },
]
