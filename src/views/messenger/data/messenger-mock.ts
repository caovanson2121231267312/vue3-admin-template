import type { MessengerConversation, MessengerMessage, MessengerParticipant } from '../../../types/messenger'

const participants: Record<string, MessengerParticipant> = {
  u1: { id: 'u1', name: 'Nguyễn Văn A', online: true },
  u2: { id: 'u2', name: 'Trần Thị B', online: true },
  u3: { id: 'u3', name: 'Lê Văn C', online: false },
  me: { id: 'me', name: 'Tôi', online: true },
}

export const mockConversations: MessengerConversation[] = [
  {
    id: 'c1',
    participants: [participants.me, participants.u1],
    lastMessage: { text: 'Đã gửi tài liệu rồi nhé.', sentAt: '2025-02-13T10:05:00', senderId: 'me' },
    unreadCount: 0,
  },
  {
    id: 'c2',
    participants: [participants.me, participants.u2],
    lastMessage: { text: 'Chiều họp lúc 3h nhé.', sentAt: '2025-02-13T09:48:00', senderId: 'u2' },
    unreadCount: 2,
  },
  {
    id: 'c3',
    participants: [participants.me, participants.u3],
    lastMessage: { text: 'Cảm ơn anh!', sentAt: '2025-02-12T16:20:00', senderId: 'u3' },
    unreadCount: 0,
  },
]

export const mockMessages: Record<string, MessengerMessage[]> = {
  c1: [
    { id: 'm1', conversationId: 'c1', senderId: 'u1', text: 'Anh gửi giúp em file báo cáo tháng 1 được không?', sentAt: '2025-02-13T09:50:00' },
    { id: 'm2', conversationId: 'c1', senderId: 'me', text: 'Để anh tìm xong gửi em nhé.', sentAt: '2025-02-13T09:52:00' },
    { id: 'm3', conversationId: 'c1', senderId: 'u1', text: 'Dạ cảm ơn anh.', sentAt: '2025-02-13T09:53:00' },
    { id: 'm4', conversationId: 'c1', senderId: 'me', text: 'Đã gửi tài liệu rồi nhé.', sentAt: '2025-02-13T10:05:00', readAt: '2025-02-13T10:06:00' },
  ],
  c2: [
    { id: 'm5', conversationId: 'c2', senderId: 'u2', text: 'Hôm nay team mình có họp không nhỉ?', sentAt: '2025-02-13T09:40:00' },
    { id: 'm6', conversationId: 'c2', senderId: 'me', text: 'Có, chiều 3h nhé.', sentAt: '2025-02-13T09:42:00' },
    { id: 'm7', conversationId: 'c2', senderId: 'u2', text: 'Phòng nào vậy anh?', sentAt: '2025-02-13T09:45:00' },
    { id: 'm8', conversationId: 'c2', senderId: 'me', text: 'Phòng họp A, tầng 2.', sentAt: '2025-02-13T09:46:00' },
    { id: 'm9', conversationId: 'c2', senderId: 'u2', text: 'Chiều họp lúc 3h nhé.', sentAt: '2025-02-13T09:48:00' },
  ],
  c3: [
    { id: 'm10', conversationId: 'c3', senderId: 'me', text: 'Phần đó em làm xong gửi anh trước 17h nhé.', sentAt: '2025-02-12T16:15:00' },
    { id: 'm11', conversationId: 'c3', senderId: 'u3', text: 'Cảm ơn anh!', sentAt: '2025-02-12T16:20:00' },
  ],
}

export function getConversations(): MessengerConversation[] {
  return [...mockConversations].sort(
    (a, b) => new Date(b.lastMessage?.sentAt ?? 0).getTime() - new Date(a.lastMessage?.sentAt ?? 0).getTime()
  )
}

export function getMessages(conversationId: string): MessengerMessage[] {
  return mockMessages[conversationId] ?? []
}

export function getOtherParticipant(conversation: MessengerConversation, currentUserId = 'me'): MessengerParticipant | undefined {
  return conversation.participants.find((p) => p.id !== currentUserId)
}

export function formatMessageTime(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const isToday = d.toDateString() === now.toDateString()
  const isYesterday = new Date(now.getTime() - 86400000).toDateString() === d.toDateString()
  if (isToday) return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  if (isYesterday) return 'Hôm qua ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) + ' ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
}

export function formatListTime(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 60000) return 'Vừa xong'
  if (diff < 3600000) return Math.floor(diff / 60000) + ' phút'
  if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  if (diff < 86400000 * 2) return 'Hôm qua'
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
}
