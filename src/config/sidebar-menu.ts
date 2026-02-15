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
      { title: 'nav.productDetail', routeName: 'ProductDetail', path: '/products/1' },
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
      { title: 'nav.orderDetail', routeName: 'OrderDetail', path: '/orders/1' },
    ],
  },
  {
    title: 'nav.reports',
    icon: 'bi-graph-up',
    order: 5,
    children: [
      { title: 'nav.salesReport', routeName: 'ReportSales', path: '/reports/sales' },
      { title: 'nav.userReport', routeName: 'ReportUsers', path: '/reports/users' },
      { title: 'nav.reportAttendance', routeName: 'ReportAttendance', path: '/reports/attendance' },
      { title: 'nav.reportPayroll', routeName: 'ReportPayroll', path: '/reports/payroll' },
      { title: 'nav.reportInventory', routeName: 'ReportInventory', path: '/reports/inventory' },
      { title: 'nav.reportReceivables', routeName: 'ReportReceivables', path: '/reports/receivables' },
    ],
  },
  {
    title: 'nav.assets',
    icon: 'bi-building',
    order: 5.5,
    children: [
      { title: 'nav.assetsOverview', routeName: 'AssetsOverview', path: '/assets' },
      { title: 'nav.assetsList', routeName: 'AssetsList', path: '/assets/list' },
      { title: 'nav.depreciation', routeName: 'Depreciation', path: '/assets/depreciation' },
      { title: 'nav.maintenance', routeName: 'Maintenance', path: '/assets/maintenance' },
      { title: 'nav.assetTypes', routeName: 'AssetTypes', path: '/assets/types' },
    ],
  },
  {
    title: 'nav.warehouse',
    icon: 'bi-boxes',
    order: 5.6,
    children: [
      { title: 'nav.warehouseOverview', routeName: 'WarehouseOverview', path: '/warehouse' },
      { title: 'nav.warehousesList', routeName: 'WarehousesList', path: '/warehouse/list' },
      { title: 'nav.stockIn', routeName: 'StockIn', path: '/warehouse/stock-in' },
      { title: 'nav.stockOut', routeName: 'StockOut', path: '/warehouse/stock-out' },
      { title: 'nav.stocktake', routeName: 'Stocktake', path: '/warehouse/stocktake' },
      { title: 'nav.stockLevel', routeName: 'StockLevel', path: '/warehouse/stock-level' },
    ],
  },
  {
    title: 'nav.accounting',
    icon: 'bi-calculator',
    order: 6,
    children: [
      { title: 'nav.accountingOverview', routeName: 'AccountingDashboard', path: '/accounting' },
      { title: 'nav.invoices', routeName: 'Invoices', path: '/accounting/invoices' },
      { title: 'nav.receipts', routeName: 'Receipts', path: '/accounting/receipts' },
      { title: 'nav.payments', routeName: 'Payments', path: '/accounting/payments' },
      { title: 'nav.receivables', routeName: 'Receivables', path: '/accounting/receivables' },
      { title: 'nav.financialReports', routeName: 'FinancialReports', path: '/accounting/financial-reports' },
      { title: 'nav.tax', routeName: 'Tax', path: '/accounting/tax' },
      { title: 'nav.budget', routeName: 'Budget', path: '/accounting/budget' },
    ],
  },
  {
    title: 'nav.hr',
    icon: 'bi-person-badge',
    order: 7,
    children: [
      { title: 'nav.hrOverview', routeName: 'HRDashboard', path: '/hr' },
      { title: 'nav.employees', routeName: 'Employees', path: '/hr/employees' },
      { title: 'nav.attendance', routeName: 'Attendance', path: '/hr/attendance' },
      { title: 'nav.payroll', routeName: 'Payroll', path: '/hr/payroll' },
      { title: 'nav.shifts', routeName: 'Shifts', path: '/hr/shifts' },
      { title: 'nav.leave', routeName: 'Leave', path: '/hr/leave' },
      { title: 'nav.payslips', routeName: 'Payslips', path: '/hr/payslips' },
      { title: 'nav.contracts', routeName: 'Contracts', path: '/hr/contracts' },
      { title: 'nav.training', routeName: 'Training', path: '/hr/training' },
      { title: 'nav.recruitment', routeName: 'Recruitment', path: '/hr/recruitment' },
      { title: 'nav.departments', routeName: 'Departments', path: '/hr/departments' },
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
