import { useContext } from "react"
import type { DeckContextType } from "../../types/deck.ts"
import { DeckContext } from "./deck.tsx"

export default function DisplayFeedback() {

    if (!DeckContext) return
    const { isCorrect, isLastCard } = useContext(DeckContext) as DeckContextType

    return (
        <h2 className={isCorrect ? 'green-highlight' : 'red-highlight'}>{isLastCard ? 'Muito bem'
            :
            isCorrect ? 'Correto'
                :
                'Errado'
        }!
        </h2>
    )
}