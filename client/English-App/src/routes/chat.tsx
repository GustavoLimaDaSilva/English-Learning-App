import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from "react"
import { model } from "../../../../firebaseConfig.ts"
import type { ChatMessage } from "../types/AI.ts"
import Message from '../components/Message.tsx'

export const Route = createFileRoute('/chat')({
    component: ChatWithAI,
})

export default function ChatWithAI() {

    const promptRef = useRef<null | HTMLTextAreaElement>(null)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [inputIsEmpty, setInputIsEmpty] = useState(true)

    return (
        <div className='grandient-background chat-wrapper'>
        <div className="chat-container">
            {messages.map(msg => {

                return <Message from={msg.from} content={msg.content} />
            })}
            <div className='chat-input-area'>
                <input onChange={e => setInputIsEmpty(e.target.value === '')} type="text" placeholder="chat about anything..." ref={promptRef}></input>
                <button disabled={inputIsEmpty} onClick={() => {

                    if (!promptRef.current) return
                    
                    const prompt = promptRef.current?.value
                    promptRef.current.value = ''

                    if (prompt) {
                        setMessages(prevMessages => [...prevMessages, {
                            from: 'user',
                            content: prompt
                        }])
                        reply(prompt)
                    }
                }}><span className="material-symbols-outlined">
                        send
                    </span></button>
            </div>
        </div>
    </div>
    )

    async function reply(prompt: string) {

        const result = await model.generateContent({
            contents: [{
                role: 'user',
                parts: [{ text: prompt }]
            }],
            generationConfig: {
                responseMimeType: ""
            }
        })

        const response = result.response
        const text = response.text()

        setMessages(prevMessages => [...prevMessages, {
            from: 'AI',
            content: text
        }])
    }
}