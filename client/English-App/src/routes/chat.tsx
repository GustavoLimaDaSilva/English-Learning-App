import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from "react"
import { model } from "../../../../firebaseConfig.ts"
import type { ChatMessage } from "../types/AI.ts"
import Message from '../components/Message.tsx'
import { scrollToBottom } from '../utils.ts'
import useKeyEvent from '../hooks/useKeyEvent.tsx'

export const Route = createFileRoute('/chat')({
    component: ChatWithAI,
})

export default function ChatWithAI() {

    const promptRef = useRef<null | HTMLTextAreaElement>(null)
    const chatContainerRef = useRef<null | HTMLDivElement>(null)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [inputIsEmpty, setInputIsEmpty] = useState(true)
    const keyEvent = useKeyEvent("Enter", sendPrompt)

    useEffect(() => {

        const chatContainer = chatContainerRef.current
        if (chatContainer) {

            scrollToBottom(chatContainer)
        }
    }, [messages])

    useEffect(() => {

        if (keyEvent?.key === "Enter") {
            keyEvent.preventDefault()
        }
    }, [keyEvent])

    return (
        <div className="chat-container" ref={chatContainerRef}>
            {messages.map(msg => {

                return <Message role={msg.role} content={msg.content} />
            })}
            <div className='chat-input-area'>
                <textarea className='chat-input' onChange={e => setInputIsEmpty(e.target.value === '')} placeholder="chat about anything..." ref={promptRef}
                    contentEditable={true}
                />
                <button disabled={inputIsEmpty} onClick={sendPrompt}><span className="material-symbols-outlined">
                    arrow_upward
                </span></button>
            </div>
        </div>
    )

    function sendPrompt() {

        if (!promptRef.current) return

        const prompt = promptRef.current?.value
        promptRef.current.value = ''

        if (prompt) {
            setMessages(prevMessages => [...prevMessages, {
                role: 'user',
                content: prompt
            }])
            reply(prompt)
        }
    }

    async function reply(prompt: string) {

        const result = await model.generateContent({
            contents: [
                ...messages.map(message => {
                    return {
                        role: message.role,
                        parts: [{ text: message.content }]
                    }
                }),
                {
                    role: 'user',
                    parts: [{ text: prompt }]
                }
            ],

            generationConfig: {
                responseMimeType: ""
            }
        })

        const response = result.response
        const text = response.text()

        setMessages(prevMessages => [...prevMessages, {
            role: 'model',
            content: text
        }])
    }
}