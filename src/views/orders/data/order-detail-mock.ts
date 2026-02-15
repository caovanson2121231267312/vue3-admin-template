import type { OrderDetail, OrderCustomer } from '../../../types/order'

const now = new Date()
const fmt = (d: Date) => d.toISOString().slice(0, 10)
const fmtDateTime = (d: Date) => d.toISOString().slice(0, 19).replace('T', ' ')

const customers: Record<string, OrderCustomer> = {
  c1: { id: 'c1', fullName: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0901234567', address: '123 Đường ABC, Quận 1, TP.HCM' },
  c2: { id: 'c2', fullName: 'Trần Thị B', email: 'tranthib@email.com', phone: '0912345678', address: '456 Đường XYZ, Quận 3, TP.HCM' },
  c3: { id: 'c3', fullName: 'Lê Minh C', email: 'leminhc@email.com', phone: '0923456789', address: '789 Đường DEF, Quận 7, TP.HCM' },
  c4: { id: 'c4', fullName: 'Phạm Thu D', email: 'phamthud@email.com', phone: '0934567890', address: '321 Đường GHI, Quận Bình Thạnh, TP.HCM' },
  c5: { id: 'c5', fullName: 'Hoàng Văn E', email: 'hoangvane@email.com', phone: '0945678901', address: '654 Đường JKL, Quận 10, TP.HCM' },
}

export function getOrderDetail(id: string): OrderDetail | null {
  const data = details[id]
  if (!data) return null
  const customer = customers[data.customerId] ?? {
    id: data.customerId,
    fullName: data.customerName,
    email: '',
    phone: '',
    address: '',
  }
  return {
    ...data,
    customer,
  }
}

const details: Record<string, Omit<OrderDetail, 'customer'> & { customerId: string }> = {
  '1': {
    id: '1',
    code: '#2024001',
    status: 'delivered',
    createdAt: fmt(new Date(now.getTime() - 5 * 24 * 3600000)),
    customerId: 'c1',
    customerName: 'Nguyễn Văn A',
    totalAmount: 32990000,
    itemCount: 2,
    shippingAddress: '123 Đường ABC, Quận 1, TP.HCM',
    paymentMethod: 'bank_transfer',
    note: 'Giao giờ hành chính',
    items: [
      { productId: '2', productName: 'iPhone 15 Pro', sku: 'AP-IP15P-002', quantity: 1, unitPrice: 32990000, total: 32990000 },
      { productId: '10', productName: 'Balô laptop', sku: 'AC-BAG-010', quantity: 1, unitPrice: 450000, total: 450000 },
    ],
    timeline: [
      { status: 'pending', at: fmtDateTime(new Date(now.getTime() - 5 * 24 * 3600000)) },
      { status: 'confirmed', at: fmtDateTime(new Date(now.getTime() - 4 * 24 * 3600000)), note: 'Đã xác nhận thanh toán' },
      { status: 'processing', at: fmtDateTime(new Date(now.getTime() - 3 * 24 * 3600000)) },
      { status: 'shipping', at: fmtDateTime(new Date(now.getTime() - 2 * 24 * 3600000)), note: 'Đơn vị GHN' },
      { status: 'delivered', at: fmtDateTime(new Date(now.getTime() - 1 * 24 * 3600000)) },
    ],
  },
  '2': {
    id: '2',
    code: '#2024002',
    status: 'shipping',
    createdAt: fmt(new Date(now.getTime() - 2 * 24 * 3600000)),
    customerId: 'c2',
    customerName: 'Trần Thị B',
    totalAmount: 1590000,
    itemCount: 1,
    shippingAddress: '456 Đường XYZ, Quận 3, TP.HCM',
    paymentMethod: 'cod',
    items: [
      { productId: '5', productName: 'Bàn phím cơ Keychron K2', sku: 'AC-KYC-K2', quantity: 1, unitPrice: 1590000, total: 1590000 },
    ],
    timeline: [
      { status: 'pending', at: fmtDateTime(new Date(now.getTime() - 2 * 24 * 3600000)) },
      { status: 'confirmed', at: fmtDateTime(new Date(now.getTime() - 1.5 * 24 * 3600000)) },
      { status: 'processing', at: fmtDateTime(new Date(now.getTime() - 1 * 24 * 3600000)) },
      { status: 'shipping', at: fmtDateTime(new Date(now.getTime() - 0.5 * 24 * 3600000)), note: 'Đang trên đường giao' },
    ],
  },
  '3': {
    id: '3',
    code: '#2024003',
    status: 'confirmed',
    createdAt: fmt(new Date(now.getTime() - 1 * 24 * 3600000)),
    customerId: 'c3',
    customerName: 'Lê Minh C',
    totalAmount: 450000,
    itemCount: 1,
    shippingAddress: '789 Đường DEF, Quận 7, TP.HCM',
    paymentMethod: 'momo',
    items: [
      { productId: '10', productName: 'Balô laptop', sku: 'AC-BAG-010', quantity: 1, unitPrice: 450000, total: 450000 },
    ],
    timeline: [
      { status: 'pending', at: fmtDateTime(new Date(now.getTime() - 1 * 24 * 3600000)) },
      { status: 'confirmed', at: fmtDateTime(new Date(now.getTime() - 0.8 * 24 * 3600000)) },
    ],
  },
  '4': {
    id: '4',
    code: '#2024004',
    status: 'pending',
    createdAt: fmt(now),
    customerId: 'c4',
    customerName: 'Phạm Thu D',
    totalAmount: 7990000,
    itemCount: 1,
    shippingAddress: '321 Đường GHI, Quận Bình Thạnh, TP.HCM',
    paymentMethod: 'bank_transfer',
    items: [
      { productId: '4', productName: 'Tai nghe Sony WH-1000XM5', sku: 'EL-SNY-XM5', quantity: 1, unitPrice: 7990000, total: 7990000 },
    ],
    timeline: [{ status: 'pending', at: fmtDateTime(now) }],
  },
  '5': {
    id: '5',
    code: '#2024005',
    status: 'processing',
    createdAt: fmt(now),
    customerId: 'c5',
    customerName: 'Hoàng Văn E',
    totalAmount: 28990000,
    itemCount: 1,
    shippingAddress: '654 Đường JKL, Quận 10, TP.HCM',
    paymentMethod: 'bank_transfer',
    items: [
      { productId: '1', productName: 'Laptop Dell XPS 15', sku: 'DL-XPS15-001', quantity: 1, unitPrice: 28990000, total: 28990000 },
    ],
    timeline: [
      { status: 'pending', at: fmtDateTime(now) },
      { status: 'confirmed', at: fmtDateTime(now) },
      { status: 'processing', at: fmtDateTime(now) },
    ],
  },
  '6': {
    id: '6',
    code: '#2023999',
    status: 'cancelled',
    createdAt: fmt(new Date(now.getTime() - 10 * 24 * 3600000)),
    customerId: 'c1',
    customerName: 'Nguyễn Văn A',
    totalAmount: 199000,
    itemCount: 1,
    note: 'Khách hủy do đổi ý',
    items: [
      { productId: '3', productName: 'Áo thun basic', sku: 'CL-TSH-003', quantity: 1, unitPrice: 199000, total: 199000 },
    ],
    timeline: [
      { status: 'pending', at: fmtDateTime(new Date(now.getTime() - 10 * 24 * 3600000)) },
      { status: 'cancelled', at: fmtDateTime(new Date(now.getTime() - 9 * 24 * 3600000)), note: 'Khách yêu cầu hủy' },
    ],
  },
}
