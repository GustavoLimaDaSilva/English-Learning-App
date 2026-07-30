export type MessageOrigin = 'user' | 'model'
export interface ChatMessage {
    role: MessageOrigin,
    content: string
}