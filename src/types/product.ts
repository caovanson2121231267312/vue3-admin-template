export type ProductStatus = 'in_stock' | 'out_of_stock' | 'discontinued'

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: ProductStatus
  createdAt: string
  description?: string
}

/** Ảnh sản phẩm */
export interface ProductImage {
  id: string
  url: string
  alt?: string
  sortOrder: number
}

/** Biến thể (màu, size, ...) */
export interface ProductVariant {
  id: string
  sku: string
  name: string
  attributes: Record<string, string> // { "Màu": "Đen", "Size": "M" }
  price: number
  stock: number
  status: ProductStatus
  imageUrl?: string
}

/** Đánh giá */
export interface ProductReview {
  id: string
  userName: string
  rating: number
  comment: string
  createdAt: string
  verified?: boolean
}

/** Đơn hàng có chứa sản phẩm này */
export interface ProductOrderItem {
  orderId: string
  orderCode: string
  orderDate: string
  quantity: number
  unitPrice: number
  total: number
  status: string
}

export interface ProductDetail extends Product {
  images: ProductImage[]
  variants: ProductVariant[]
  reviews: ProductReview[]
  relatedOrders: ProductOrderItem[]
  rating?: number
  reviewCount?: number
}

export interface ProductFilters {
  keyword: string
  category: string
  status: ProductStatus | ''
  dateFrom: string
  dateTo: string
}

export type TableViewMode = 'table' | 'grid' | 'compact'
