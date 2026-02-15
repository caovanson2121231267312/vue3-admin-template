export type OrderStatus =
  | 'pending'      // Chờ xác nhận
  | 'confirmed'    // Đã xác nhận
  | 'processing'   // Đang xử lý
  | 'shipping'     // Đang giao
  | 'delivered'    // Đã giao
  | 'cancelled'    // Đã hủy

export interface OrderItem {
  productId: string
  productName: string
  sku: string
  quantity: number
  unitPrice: number
  total: number
}

export interface OrderCustomer {
  id: string
  fullName: string
  email: string
  phone: string
  address: string
}

export interface OrderTimelineEntry {
  status: OrderStatus
  at: string
  note?: string
}

export interface Order {
  id: string
  code: string
  status: OrderStatus
  createdAt: string
  customerId: string
  customerName: string
  totalAmount: number
  itemCount: number
}

export interface OrderDetail extends Order {
  customer: OrderCustomer
  items: OrderItem[]
  timeline: OrderTimelineEntry[]
  note?: string
  shippingAddress?: string
  paymentMethod?: string
}
