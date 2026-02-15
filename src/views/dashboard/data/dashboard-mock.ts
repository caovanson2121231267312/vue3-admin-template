/** Mock data for dashboard charts and KPIs */

export const revenueByMonth = [
  { month: 'T7', value: 420 },
  { month: 'T8', value: 580 },
  { month: 'T9', value: 510 },
  { month: 'T10', value: 720 },
  { month: 'T11', value: 890 },
  { month: 'T12', value: 950 },
  { month: 'T1', value: 820 },
  { month: 'T2', value: 1100 },
]

export const ordersByMonth = [
  { month: 'T7', count: 120 },
  { month: 'T8', count: 145 },
  { month: 'T9', count: 132 },
  { month: 'T10', count: 168 },
  { month: 'T11', count: 195 },
  { month: 'T12', count: 210 },
  { month: 'T1', count: 188 },
  { month: 'T2', count: 245 },
]

export const salesByCategory = [
  { name: 'Điện tử', value: 35, color: '#4f46e5' },
  { name: 'Thời trang', value: 28, color: '#0ea5e9' },
  { name: 'Thực phẩm', value: 22, color: '#10b981' },
  { name: 'Gia dụng', value: 15, color: '#f59e0b' },
]

export const trafficBySource = [
  { source: 'Google', value: 42 },
  { source: 'Facebook', value: 28 },
  { source: 'Direct', value: 18 },
  { source: 'Other', value: 12 },
]

export const ordersByStatus = [
  { status: 'Đã giao', count: 156 },
  { status: 'Đang giao', count: 42 },
  { status: 'Đang xử lý', count: 28 },
  { status: 'Chờ xác nhận', count: 19 },
]

export const weeklyActivity = [
  { day: 'T2', orders: 45, revenue: 125 },
  { day: 'T3', orders: 52, revenue: 142 },
  { day: 'T4', orders: 48, revenue: 138 },
  { day: 'T5', orders: 61, revenue: 165 },
  { day: 'T6', orders: 55, revenue: 152 },
  { day: 'T7', orders: 38, revenue: 98 },
  { day: 'CN', orders: 25, revenue: 72 },
]

export interface DashboardKpi {
  label: string
  value: string
  subValue?: string
  trend: number
  icon: string
  color: string
}

export const kpis: DashboardKpi[] = [
  { label: 'dashboard.kpiRevenue', value: '2.84B', subValue: 'VND', trend: 12.5, icon: 'bi-currency-dollar', color: 'primary' },
  { label: 'dashboard.kpiOrders', value: '1,523', subValue: '', trend: 8.2, icon: 'bi-cart-check', color: 'success' },
  { label: 'dashboard.kpiCustomers', value: '3,842', subValue: '', trend: 15.3, icon: 'bi-people', color: 'info' },
  { label: 'dashboard.kpiConversion', value: '4.2%', subValue: '', trend: -1.2, icon: 'bi-graph-up-arrow', color: 'warning' },
  { label: 'dashboard.kpiAvgOrder', value: '1.86M', subValue: 'VND', trend: 5.1, icon: 'bi-basket', color: 'danger' },
]

export interface RecentOrder {
  id: string
  customer: string
  amount: string
  status: string
  statusKey: string
  date: string
}

export const recentOrders: RecentOrder[] = [
  { id: '#ORD-2841', customer: 'Nguyễn Văn A', amount: '2.450.000', status: 'Đã giao', statusKey: 'delivered', date: '13/02/2025' },
  { id: '#ORD-2840', customer: 'Trần Thị B', amount: '1.820.000', status: 'Đang giao', statusKey: 'shipping', date: '13/02/2025' },
  { id: '#ORD-2839', customer: 'Lê Văn C', amount: '3.100.000', status: 'Đang xử lý', statusKey: 'processing', date: '12/02/2025' },
  { id: '#ORD-2838', customer: 'Phạm Thị D', amount: '890.000', status: 'Chờ xác nhận', statusKey: 'pending', date: '12/02/2025' },
  { id: '#ORD-2837', customer: 'Hoàng Văn E', amount: '5.200.000', status: 'Đã giao', statusKey: 'delivered', date: '11/02/2025' },
]

export interface TopProduct {
  name: string
  sold: number
  revenue: string
  growth: number
}

export const topProducts: TopProduct[] = [
  { name: 'Laptop Dell XPS 15', sold: 124, revenue: '3.72B', growth: 18 },
  { name: 'Áo thun basic', sold: 892, revenue: '267M', growth: 12 },
  { name: 'Tai nghe Bluetooth', sold: 456, revenue: '1.37B', growth: 25 },
  { name: 'Balo công sở', sold: 234, revenue: '702M', growth: -3 },
  { name: 'Pin sạc dự phòng', sold: 567, revenue: '340M', growth: 8 },
]

export interface ActivityItem {
  id: string
  type: 'order' | 'user' | 'product' | 'system'
  message: string
  messageKey: string
  time: string
  icon: string
}

export const recentActivity: ActivityItem[] = [
  { id: '1', type: 'order', message: 'Đơn #ORD-2841 đã được giao thành công.', messageKey: 'activityOrderDelivered', time: '5 phút trước', icon: 'bi-truck' },
  { id: '2', type: 'user', message: 'Người dùng mới đăng ký: user@example.com', messageKey: 'activityNewUser', time: '12 phút trước', icon: 'bi-person-plus' },
  { id: '3', type: 'product', message: 'Sản phẩm "Laptop Dell XPS" sắp hết hàng.', messageKey: 'activityLowStock', time: '28 phút trước', icon: 'bi-box-seam' },
  { id: '4', type: 'order', message: 'Đơn #ORD-2840 đã xuất kho.', messageKey: 'activityOrderShipped', time: '1 giờ trước', icon: 'bi-cart-check' },
  { id: '5', type: 'system', message: 'Sao lưu dữ liệu định kỳ hoàn tất.', messageKey: 'activityBackup', time: '2 giờ trước', icon: 'bi-database-check' },
]
