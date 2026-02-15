export interface MessengerParticipant {
  id: string
  name: string
  avatar?: string
  online?: boolean
}

export interface MessengerMessage {
  id: string
  conversationId: string
  senderId: string
  text: string
  sentAt: string
  readAt?: string
}

export interface MessengerConversation {
  id: string
  participants: MessengerParticipant[]
  lastMessage?: {
    text: string
    sentAt: string
    senderId: string
  }
  unreadCount: number
}
