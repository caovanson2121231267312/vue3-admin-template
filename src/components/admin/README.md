# Admin Components (AdminLTE-style)

Bộ component giao diện tái sử dụng, kiểu AdminLTE. Import tập trung từ `@/components/admin` hoặc từng file.

## Import

```ts
// Tất cả component
import {
  AdminSmallBox,
  AdminInfoBox,
  AdminCard,
  AdminAlert,
  AdminCallout,
  AdminProgress,
  AdminBadge,
  AdminTable,
  AdminTimeline,
  AdminDirectChat,
} from '@/components/admin'

// Hoặc từng component
import AdminCard from '@/components/admin/AdminCard.vue'
```

## Danh sách component

| Component | Mô tả |
|-----------|--------|
| **AdminSmallBox** | Hộp thống kê nhỏ: icon, số, tiêu đề, link footer. Props: `title`, `value`, `icon`, `variant`, `href`, `linkText` |
| **AdminInfoBox** | Hộp thông tin: icon, tiêu đề, giá trị, progress (optional). Props: `title`, `value`, `icon`, `variant`, `progress`, `progressText` |
| **AdminCard** | Card có header (title, collapse, remove), body, variant. Props: `title`, `variant`, `collapsible`, `removable`, `loading`; v-model: `collapsed` |
| **AdminAlert** | Alert Bootstrap-style, dismissible. Props: `variant`, `dismissible`, `title`; v-model: `visible` |
| **AdminCallout** | Khối ghi chú/cảnh báo bên trái. Props: `variant`, `title` |
| **AdminProgress** | Thanh tiến trình. Props: `value`, `variant`, `striped`, `animated`, `height`, `showLabel` |
| **AdminBadge** | Badge. Props: `variant`, `rounded` |
| **AdminTable** | Bọc table (striped, hover, bordered, small). Slot: thead/tbody |
| **AdminTimeline** | Timeline theo thời gian. Props: `items` (time, icon, variant, title); slot `#item-0`, `#item-1`... cho nội dung từng mục |
| **AdminDirectChat** | Khung chat: header, body (slot), footer (slot). Props: `title`, `status` |

## Trang demo

Vào **Demo Components → UI Components (AdminLTE)** trong menu sidebar hoặc route `/demo/components` để xem demo tất cả component.
