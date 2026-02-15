import type { DriveItem } from '../../../types/drive'

const now = new Date()
const fmt = (d: Date) => d.toISOString().slice(0, 10)

/** Flat list of items (id, name, type, size, modifiedTime, parentId) */
export const mockDriveItems: DriveItem[] = [
  { id: 'root', name: 'My Drive', type: 'folder', modifiedTime: fmt(now), parentId: null },
  { id: 'f1', name: 'Công việc', type: 'folder', modifiedTime: fmt(new Date(now.getTime() - 2 * 24 * 3600000)), parentId: 'root' },
  { id: 'f2', name: 'Tài liệu', type: 'folder', modifiedTime: fmt(new Date(now.getTime() - 5 * 24 * 3600000)), parentId: 'root' },
  { id: 'f3', name: 'Ảnh', type: 'folder', modifiedTime: fmt(new Date(now.getTime() - 1 * 24 * 3600000)), parentId: 'root' },
  { id: 'f4', name: 'Dự án 2024', type: 'folder', modifiedTime: fmt(new Date(now.getTime() - 10 * 24 * 3600000)), parentId: 'f1' },
  { id: 'f5', name: 'Báo cáo', type: 'folder', modifiedTime: fmt(new Date(now.getTime() - 3 * 24 * 3600000)), parentId: 'f1' },
  { id: 'file1', name: 'Báo cáo tháng 1.pdf', type: 'file', mimeType: 'application/pdf', size: 1024000, modifiedTime: fmt(new Date(now.getTime() - 1 * 24 * 3600000)), parentId: 'f1' },
  { id: 'file2', name: 'Danh sách công việc.xlsx', type: 'file', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', size: 45600, modifiedTime: fmt(now), parentId: 'f1' },
  { id: 'file3', name: 'Hợp đồng mẫu.docx', type: 'file', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 128000, modifiedTime: fmt(new Date(now.getTime() - 4 * 24 * 3600000)), parentId: 'f2' },
  { id: 'file4', name: 'Hướng dẫn sử dụng.pdf', type: 'file', mimeType: 'application/pdf', size: 2048000, modifiedTime: fmt(new Date(now.getTime() - 6 * 24 * 3600000)), parentId: 'f2' },
  { id: 'file5', name: 'avatar.png', type: 'file', mimeType: 'image/png', size: 256000, modifiedTime: fmt(new Date(now.getTime() - 2 * 24 * 3600000)), parentId: 'f3' },
  { id: 'file6', name: 'banner.jpg', type: 'file', mimeType: 'image/jpeg', size: 512000, modifiedTime: fmt(new Date(now.getTime() - 1 * 24 * 3600000)), parentId: 'f3' },
  { id: 'file7', name: 'Presentation.pptx', type: 'file', mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', size: 890000, modifiedTime: fmt(now), parentId: 'f4' },
  { id: 'file8', name: 'README.txt', type: 'file', mimeType: 'text/plain', size: 2048, modifiedTime: fmt(now), parentId: 'root' },
]

export function getDriveItemsByParentId(parentId: string | null): DriveItem[] {
  return mockDriveItems
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
      return a.name.localeCompare(b.name, 'vi')
    })
}

export function getDriveItemById(id: string): DriveItem | undefined {
  return mockDriveItems.find((item) => item.id === id)
}

export function getBreadcrumb(itemId: string | null): { id: string; name: string }[] {
  if (!itemId) return []
  const item = getDriveItemById(itemId)
  if (!item) return []
  const path: { id: string; name: string }[] = []
  let current: DriveItem | undefined = item
  while (current) {
    path.unshift({ id: current.id, name: current.name })
    current = current.parentId ? getDriveItemById(current.parentId) : undefined
  }
  return path
}
