import type { User } from '../../../types/user'

const now = new Date()
const formatDate = (d: Date) => d.toISOString().slice(0, 10)

export const mockUsers: User[] = [
  { id: '1', email: 'admin@example.com', fullName: 'Nguyễn Văn Admin', role: 'admin', status: 'active', phone: '0901234567', createdAt: formatDate(new Date(now.getTime() - 90 * 24 * 3600000)), lastLoginAt: formatDate(now), department: 'IT' },
  { id: '2', email: 'editor@example.com', fullName: 'Trần Thị Biên Tập', role: 'editor', status: 'active', phone: '0912345678', createdAt: formatDate(new Date(now.getTime() - 60 * 24 * 3600000)), lastLoginAt: formatDate(new Date(now.getTime() - 2 * 24 * 3600000)), department: 'Content' },
  { id: '3', email: 'user1@example.com', fullName: 'Lê Văn User', role: 'user', status: 'active', phone: '0923456789', createdAt: formatDate(new Date(now.getTime() - 45 * 24 * 3600000)), department: 'Sales' },
  { id: '4', email: 'user2@example.com', fullName: 'Phạm Thị Hương', role: 'user', status: 'inactive', createdAt: formatDate(new Date(now.getTime() - 30 * 24 * 3600000)), department: 'Marketing' },
  { id: '5', email: 'pending@example.com', fullName: 'Hoàng Minh Tuấn', role: 'user', status: 'pending', phone: '0934567890', createdAt: formatDate(new Date(now.getTime() - 5 * 24 * 3600000)), department: 'Support' },
  { id: '6', email: 'guest@example.com', fullName: 'Khách Demo', role: 'guest', status: 'active', createdAt: formatDate(new Date(now.getTime() - 15 * 24 * 3600000)), department: '' },
  { id: '7', email: 'linh.nguyen@example.com', fullName: 'Nguyễn Thị Linh', role: 'editor', status: 'active', phone: '0945678901', createdAt: formatDate(new Date(now.getTime() - 20 * 24 * 3600000)), lastLoginAt: formatDate(now), department: 'Content' },
  { id: '8', email: 'duong.tran@example.com', fullName: 'Trần Văn Dương', role: 'user', status: 'active', createdAt: formatDate(new Date(now.getTime() - 10 * 24 * 3600000)), department: 'IT' },
  { id: '9', email: 'banned@example.com', fullName: 'Tài Khoản Khóa', role: 'user', status: 'banned', createdAt: formatDate(new Date(now.getTime() - 120 * 24 * 3600000)), department: 'Sales' },
  { id: '10', email: 'newuser@example.com', fullName: 'User Mới Đăng Ký', role: 'user', status: 'pending', phone: '0956789012', createdAt: formatDate(new Date(now.getTime() - 1 * 24 * 3600000)), department: 'Marketing' },
]
