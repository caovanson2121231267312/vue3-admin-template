import type { Product } from '../../../types/product'

const now = new Date()
const formatDate = (d: Date) => d.toISOString().slice(0, 10)

export const mockProducts: Product[] = [
  { id: '1', name: 'Laptop Dell XPS 15', sku: 'DL-XPS15-001', category: 'Electronics', price: 28990000, stock: 12, status: 'in_stock', createdAt: formatDate(new Date(now.getTime() - 90 * 24 * 3600000)), description: 'Laptop cao cấp' },
  { id: '2', name: 'iPhone 15 Pro', sku: 'AP-IP15P-002', category: 'Electronics', price: 32990000, stock: 0, status: 'out_of_stock', createdAt: formatDate(new Date(now.getTime() - 60 * 24 * 3600000)) },
  { id: '3', name: 'Áo thun basic', sku: 'CL-TSH-003', category: 'Clothing', price: 199000, stock: 150, status: 'in_stock', createdAt: formatDate(new Date(now.getTime() - 45 * 24 * 3600000)) },
  { id: '4', name: 'Tai nghe Sony WH-1000XM5', sku: 'EL-SNY-XM5', category: 'Electronics', price: 7990000, stock: 25, status: 'in_stock', createdAt: formatDate(new Date(now.getTime() - 30 * 24 * 3600000)) },
  { id: '5', name: 'Bàn phím cơ Keychron K2', sku: 'AC-KYC-K2', category: 'Accessories', price: 1590000, stock: 0, status: 'out_of_stock', createdAt: formatDate(new Date(now.getTime() - 20 * 24 * 3600000)) },
  { id: '6', name: 'Sách "Clean Code"', sku: 'BK-CC-006', category: 'Books', price: 350000, stock: 80, status: 'in_stock', createdAt: formatDate(new Date(now.getTime() - 15 * 24 * 3600000)) },
  { id: '7', name: 'Chuột Logitech MX Master 3', sku: 'AC-LOG-MX3', category: 'Accessories', price: 2490000, stock: 40, status: 'in_stock', createdAt: formatDate(new Date(now.getTime() - 10 * 24 * 3600000)) },
  { id: '8', name: 'Màn hình LG 27 inch', sku: 'EL-LG-27', category: 'Electronics', price: 5490000, stock: 8, status: 'in_stock', createdAt: formatDate(new Date(now.getTime() - 5 * 24 * 3600000)) },
  { id: '9', name: 'Sản phẩm ngừng kinh doanh', sku: 'OLD-009', category: 'Other', price: 0, stock: 0, status: 'discontinued', createdAt: formatDate(new Date(now.getTime() - 120 * 24 * 3600000)) },
  { id: '10', name: 'Balô laptop', sku: 'AC-BAG-010', category: 'Accessories', price: 450000, stock: 60, status: 'in_stock', createdAt: formatDate(new Date(now.getTime() - 1 * 24 * 3600000)) },
]
