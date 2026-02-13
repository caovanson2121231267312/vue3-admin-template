export type UserRole = 'admin' | 'editor' | 'user' | 'guest'
export type UserStatus = 'active' | 'inactive' | 'pending' | 'banned'

export interface User {
  id: string
  email: string
  fullName: string
  avatar?: string
  role: UserRole
  status: UserStatus
  phone?: string
  createdAt: string
  lastLoginAt?: string
  department?: string
}

export interface UserFilters {
  keyword: string
  role: UserRole | ''
  status: UserStatus | ''
  dateFrom: string
  dateTo: string
  department: string
}

export type TableViewMode = 'table' | 'grid' | 'compact'
