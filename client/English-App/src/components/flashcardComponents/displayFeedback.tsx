import { useContext } from "react"
import type { DeckContextType } from "../../types/deck.ts"
import { DeckReactContext } from "./DeckContext.tsx"

export default function DisplayFeedback() {

    const { isCorrect, isLastCard } = useContext(DeckReactContext) as DeckContextType

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