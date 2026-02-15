export type DriveItemType = 'folder' | 'file'

export type DriveViewMode = 'grid' | 'list'

export interface DriveItem {
  id: string
  name: string
  type: DriveItemType
  mimeType?: string
  size?: number
  modifiedTime: string
  parentId: string | null
  webViewLink?: string
  iconLink?: string
}

export interface DriveBreadcrumb {
  id: string
  name: string
}
