import type { ProductDetail, ProductImage, ProductVariant, ProductReview, ProductOrderItem } from '../../../types/product'

const now = new Date()
const fmt = (d: Date) => d.toISOString().slice(0, 10)

/** Ảnh mẫu (picsum) hoặc placeholder */
function imageUrl(seed: number, index: number) {
  return `https://picsum.photos/seed/${seed + index}/600/600`
}

export function getProductDetail(id: string): ProductDetail | null {
  const seed = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const base = getBaseProduct(id)
  if (!base) return null

  const images: ProductImage[] = [
    { id: '1', url: imageUrl(seed, 1), alt: base.name, sortOrder: 1 },
    { id: '2', url: imageUrl(seed, 2), alt: `${base.name} - 2`, sortOrder: 2 },
    { id: '3', url: imageUrl(seed, 3), alt: `${base.name} - 3`, sortOrder: 3 },
    { id: '4', url: imageUrl(seed, 4), alt: `${base.name} - 4`, sortOrder: 4 },
    { id: '5', url: imageUrl(seed, 5), alt: `${base.name} - 5`, sortOrder: 5 },
  ]

  const variants: ProductVariant[] = getVariantsForProduct(id, base)
  const reviews: ProductReview[] = getReviewsForProduct(id)
  const relatedOrders: ProductOrderItem[] = getRelatedOrders(id, base)

  const rating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0

  return {
    ...base,
    images,
    variants,
    reviews,
    relatedOrders,
    rating: Math.round(rating * 10) / 10,
    reviewCount: reviews.length,
  }
}

function getBaseProduct(id: string): Omit<ProductDetail, 'images' | 'variants' | 'reviews' | 'relatedOrders' | 'rating' | 'reviewCount'> | null {
  const products: Record<string, Omit<ProductDetail, 'images' | 'variants' | 'reviews' | 'relatedOrders' | 'rating' | 'reviewCount'>> = {
    '1': { id: '1', name: 'Laptop Dell XPS 15', sku: 'DL-XPS15-001', category: 'Electronics', price: 28990000, stock: 12, status: 'in_stock', createdAt: fmt(new Date(now.getTime() - 90 * 24 * 3600000)), description: 'Laptop cao cấp, màn hình 15.6 inch OLED, CPU Intel Core i7 gen 13, RAM 32GB, SSD 1TB. Phù hợp làm việc và sáng tạo nội dung.' },
    '2': { id: '2', name: 'iPhone 15 Pro', sku: 'AP-IP15P-002', category: 'Electronics', price: 32990000, stock: 0, status: 'out_of_stock', createdAt: fmt(new Date(now.getTime() - 60 * 24 * 3600000)), description: 'Smartphone flagship Apple, chip A17 Pro, camera 48MP, titanium.' },
    '3': { id: '3', name: 'Áo thun basic', sku: 'CL-TSH-003', category: 'Clothing', price: 199000, stock: 150, status: 'in_stock', createdAt: fmt(new Date(now.getTime() - 45 * 24 * 3600000)), description: 'Áo thun cotton 100%, form regular fit, nhiều màu.' },
    '4': { id: '4', name: 'Tai nghe Sony WH-1000XM5', sku: 'EL-SNY-XM5', category: 'Electronics', price: 7990000, stock: 25, status: 'in_stock', createdAt: fmt(new Date(now.getTime() - 30 * 24 * 3600000)), description: 'Tai nghe chụp tai chống ồn chủ động, pin 30 giờ.' },
    '5': { id: '5', name: 'Bàn phím cơ Keychron K2', sku: 'AC-KYC-K2', category: 'Accessories', price: 1590000, stock: 0, status: 'out_of_stock', createdAt: fmt(new Date(now.getTime() - 20 * 24 * 3600000)), description: 'Bàn phím 75%, switch Gateron, Bluetooth + USB-C.' },
    '6': { id: '6', name: 'Sách "Clean Code"', sku: 'BK-CC-006', category: 'Books', price: 350000, stock: 80, status: 'in_stock', createdAt: fmt(new Date(now.getTime() - 15 * 24 * 3600000)), description: 'Sách lập trình nổi tiếng của Robert C. Martin.' },
    '7': { id: '7', name: 'Chuột Logitech MX Master 3', sku: 'AC-LOG-MX3', category: 'Accessories', price: 2490000, stock: 40, status: 'in_stock', createdAt: fmt(new Date(now.getTime() - 10 * 24 * 3600000)), description: 'Chuột không dây cho văn phòng, pin 70 ngày.' },
    '8': { id: '8', name: 'Màn hình LG 27 inch', sku: 'EL-LG-27', category: 'Electronics', price: 5490000, stock: 8, status: 'in_stock', createdAt: fmt(new Date(now.getTime() - 5 * 24 * 3600000)), description: 'Màn hình IPS 4K, 27 inch, HDR10.' },
    '9': { id: '9', name: 'Sản phẩm ngừng kinh doanh', sku: 'OLD-009', category: 'Other', price: 0, stock: 0, status: 'discontinued', createdAt: fmt(new Date(now.getTime() - 120 * 24 * 3600000)), description: 'Sản phẩm đã ngừng bán.' },
    '10': { id: '10', name: 'Balô laptop', sku: 'AC-BAG-010', category: 'Accessories', price: 450000, stock: 60, status: 'in_stock', createdAt: fmt(new Date(now.getTime() - 1 * 24 * 3600000)), description: 'Balô chống sốc, ngăn laptop 15.6 inch.' },
  }
  return products[id] ?? null
}

function getVariantsForProduct(id: string, base: { name: string; price: number }): ProductVariant[] {
  const withVariants = ['2', '3', '5', '7', '10']
  if (!withVariants.includes(id)) return []

  if (id === '2') {
    return [
      { id: 'v1', sku: 'AP-IP15P-002-BK', name: `${base.name} - Đen`, attributes: { 'Màu': 'Đen Titan' }, price: base.price, stock: 0, status: 'out_of_stock' },
      { id: 'v2', sku: 'AP-IP15P-002-WT', name: `${base.name} - Trắng`, attributes: { 'Màu': 'Trắng Titan' }, price: base.price, stock: 0, status: 'out_of_stock' },
      { id: 'v3', sku: 'AP-IP15P-002-BL', name: `${base.name} - Xanh`, attributes: { 'Màu': 'Xanh Titan' }, price: base.price + 500000, stock: 2, status: 'in_stock' },
    ]
  }
  if (id === '3') {
    return [
      { id: 'v1', sku: 'CL-TSH-003-S', name: `${base.name} - S`, attributes: { 'Size': 'S' }, price: base.price, stock: 40, status: 'in_stock' },
      { id: 'v2', sku: 'CL-TSH-003-M', name: `${base.name} - M`, attributes: { 'Size': 'M' }, price: base.price, stock: 50, status: 'in_stock' },
      { id: 'v3', sku: 'CL-TSH-003-L', name: `${base.name} - L`, attributes: { 'Size': 'L' }, price: base.price, stock: 60, status: 'in_stock' },
    ]
  }
  if (id === '5') {
    return [
      { id: 'v1', sku: 'AC-KYC-K2-RED', name: `${base.name} - Red`, attributes: { 'Switch': 'Red' }, price: base.price, stock: 0, status: 'out_of_stock' },
      { id: 'v2', sku: 'AC-KYC-K2-BROWN', name: `${base.name} - Brown`, attributes: { 'Switch': 'Brown' }, price: base.price, stock: 0, status: 'out_of_stock' },
    ]
  }
  if (id === '7') {
    return [
      { id: 'v1', sku: 'AC-LOG-MX3-BK', name: `${base.name} - Đen`, attributes: { 'Màu': 'Đen' }, price: base.price, stock: 25, status: 'in_stock' },
      { id: 'v2', sku: 'AC-LOG-MX3-GY', name: `${base.name} - Xám`, attributes: { 'Màu': 'Xám' }, price: base.price, stock: 15, status: 'in_stock' },
    ]
  }
  if (id === '10') {
    return [
      { id: 'v1', sku: 'AC-BAG-010-BK', name: `${base.name} - Đen`, attributes: { 'Màu': 'Đen' }, price: base.price, stock: 30, status: 'in_stock' },
      { id: 'v2', sku: 'AC-BAG-010-NV', name: `${base.name} - Navy`, attributes: { 'Màu': 'Navy' }, price: base.price, stock: 30, status: 'in_stock' },
    ]
  }
  return []
}

function getReviewsForProduct(id: string): ProductReview[] {
  const all: ProductReview[] = [
    { id: 'r1', userName: 'Nguyễn Văn A', rating: 5, comment: 'Sản phẩm rất tốt, giao hàng nhanh.', createdAt: fmt(new Date(now.getTime() - 10 * 24 * 3600000)), verified: true },
    { id: 'r2', userName: 'Trần Thị B', rating: 4, comment: 'Tốt, giá hợp lý. Đóng gói cẩn thận.', createdAt: fmt(new Date(now.getTime() - 5 * 24 * 3600000)), verified: true },
    { id: 'r3', userName: 'Lê Minh C', rating: 5, comment: 'Hài lòng, sẽ ủng hộ shop lâu dài.', createdAt: fmt(new Date(now.getTime() - 2 * 24 * 3600000)), verified: false },
    { id: 'r4', userName: 'Phạm Thu D', rating: 3, comment: 'Sản phẩm ổn, giao hơi trễ.', createdAt: fmt(new Date(now.getTime() - 1 * 24 * 3600000)), verified: false },
  ]
  return all.slice(0, 2 + (id.charCodeAt(0) % 3))
}

function getRelatedOrders(id: string, base: { price: number }): ProductOrderItem[] {
  const qty = 1 + (id.charCodeAt(0) % 3)
  return [
    { orderId: 'ORD-2024-001', orderCode: '#2024001', orderDate: fmt(new Date(now.getTime() - 3 * 24 * 3600000)), quantity: qty, unitPrice: base.price, total: base.price * qty, status: 'delivered' },
    { orderId: 'ORD-2024-005', orderCode: '#2024005', orderDate: fmt(new Date(now.getTime() - 1 * 24 * 3600000)), quantity: 1, unitPrice: base.price, total: base.price, status: 'shipping' },
  ]
}
