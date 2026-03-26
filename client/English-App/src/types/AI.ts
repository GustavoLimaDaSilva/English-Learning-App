export type MessageOrigin = 'user' | 'AI'
export interface ChatMessage {
    from: MessageOrigin,
    content: string
}