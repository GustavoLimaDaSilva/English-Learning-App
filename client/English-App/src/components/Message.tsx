import type { ChatMessage } from "../types/AI.ts"
import useFormatAIMessage from "../hooks/useFormatText.tsx"
import { memo } from "react"

export default memo(function Message({ content, role }: ChatMessage) {

    const textFormattor = useFormatAIMessage(role)

    return (
        <div className={role === 'user' ? 'user-msg' : 'AI-msg'}>
            {textFormattor(content)}
        </div>
    )
})