/** Mục menu có thể có con (đa cấp). title là key i18n (vd: nav.dashboard). */
export interface SidebarMenuItem {
  title: string
  icon?: string
  routeName?: string
  path?: string
  order?: number
  children?: SidebarMenuItem[]
}

/** Cấu hình menu sidebar đa cấp. title dùng làm key cho vue-i18n. */
export const sidebarMenu: SidebarMenuItem[] = [
  {
    title: 'nav.dashboard',
    icon: 'bi-speedometer2',
    routeName: 'Dashboard',
    order: 1,
  },
  {
    title: 'nav.userManagement',
    icon: 'bi-people',
    routeName: 'Users',
    order: 2,
  },
  {
    title: 'nav.products',
    icon: 'bi-box-seam',
    order: 3,
    children: [
      { title: 'nav.productList', routeName: 'ProductList', path: '/products' },
      { title: 'nav.addProduct', routeName: 'ProductAdd', path: '/products/add' },
      { title: 'nav.categories', routeName: 'ProductCategories', path: '/products/categories' },
    ],
  },
  {
    title: 'nav.orders',
    icon: 'bi-cart-check',
    order: 4,
    children: [
      { title: 'nav.orderList', routeName: 'OrderList', path: '/orders' },
      { title: 'nav.createOrder', routeName: 'OrderCreate', path: '/orders/create' },
    ],
  },
  {
    title: 'nav.reports',
    icon: 'bi-graph-up',
    order: 5,
    children: [
      { title: 'nav.salesReport', routeName: 'ReportSales', path: '/reports/sales' },
      { title: 'nav.userReport', routeName: 'ReportUsers', path: '/reports/users' },
    ],
  },
  {
    title: 'nav.demoMenu',
    icon: 'bi-puzzle',
    order: 9,
    children: [
      { title: 'nav.demoButtons', routeName: 'DemoButtons', path: '/demo/buttons' },
      { title: 'nav.demoAlerts', routeName: 'DemoAlerts', path: '/demo/alerts' },
      { title: 'nav.demoCards', routeName: 'DemoCards', path: '/demo/cards' },
      { title: 'nav.demoForms', routeName: 'DemoForms', path: '/demo/forms' },
      { title: 'nav.demoBadges', routeName: 'DemoBadges', path: '/demo/badges' },
      { title: 'nav.demoProgress', routeName: 'DemoProgress', path: '/demo/progress' },
      { title: 'nav.demoTables', routeName: 'DemoTables', path: '/demo/tables' },
      { title: 'nav.demoDropdowns', routeName: 'DemoDropdowns', path: '/demo/dropdowns' },
      { title: 'nav.demoNavTabs', routeName: 'DemoNavTabs', path: '/demo/nav-tabs' },
      { title: 'nav.demoSpinners', routeName: 'DemoSpinners', path: '/demo/spinners' },
      { title: 'nav.demoTypography', routeName: 'DemoTypography', path: '/demo/typography' },
      { title: 'nav.demoUtilities', routeName: 'DemoUtilities', path: '/demo/utilities' },
      { title: 'nav.demoComponents', routeName: 'ComponentsDemo', path: '/demo/components' },
    ],
  },
  {
    title: 'nav.settings',
    icon: 'bi-gear',
    order: 10,
    children: [
      { title: 'nav.general', routeName: 'Settings', path: '/settings' },
      { title: 'nav.system', routeName: 'SettingsSystem', path: '/settings/system' },
      { title: 'nav.themes', routeName: 'SettingsThemes', path: '/settings/themes' },
    ],
  },
]
