import type { ChatMessage } from "../types/AI.ts"
import useFormatAIMessage from "../hooks/useFormatText.tsx"

export default function Message({ content, from }: ChatMessage) {

    const textFormattor = useFormatAIMessage(from)

    return (
        <div className={from === 'user' ? 'user-msg' : 'AI-msg'}>
            {textFormattor(content)}
        </div>
    )
}