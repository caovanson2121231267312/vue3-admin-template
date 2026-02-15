import type { Order } from '../../../types/order'

const now = new Date()
const fmt = (d: Date) => d.toISOString().slice(0, 10)

export const mockOrders: Order[] = [
  { id: '1', code: '#2024001', status: 'delivered', createdAt: fmt(new Date(now.getTime() - 5 * 24 * 3600000)), customerId: 'c1', customerName: 'Nguyễn Văn A', totalAmount: 32990000, itemCount: 2 },
  { id: '2', code: '#2024002', status: 'shipping', createdAt: fmt(new Date(now.getTime() - 2 * 24 * 3600000)), customerId: 'c2', customerName: 'Trần Thị B', totalAmount: 1590000, itemCount: 1 },
  { id: '3', code: '#2024003', status: 'confirmed', createdAt: fmt(new Date(now.getTime() - 1 * 24 * 3600000)), customerId: 'c3', customerName: 'Lê Minh C', totalAmount: 450000, itemCount: 1 },
  { id: '4', code: '#2024004', status: 'pending', createdAt: fmt(now), customerId: 'c4', customerName: 'Phạm Thu D', totalAmount: 7990000, itemCount: 1 },
  { id: '5', code: '#2024005', status: 'processing', createdAt: fmt(now), customerId: 'c5', customerName: 'Hoàng Văn E', totalAmount: 28990000, itemCount: 1 },
  { id: '6', code: '#2023999', status: 'cancelled', createdAt: fmt(new Date(now.getTime() - 10 * 24 * 3600000)), customerId: 'c1', customerName: 'Nguyễn Văn A', totalAmount: 199000, itemCount: 1 },
]
