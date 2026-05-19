import { useContext } from "react"
import type { DeckContextType } from "../../types/deck.ts"
import { DeckReactContext } from "./DeckContext.tsx"

export default function ConfirmButton() {

    const { cards, offset, selectedOption, setIsCorrect } = useContext(DeckReactContext) as DeckContextType

    const card = cards[offset]

    return (
        <>
            <button className="confirm" disabled={!selectedOption ? true : false} onClick={() => {
                if (card && selectedOption) {
                    setIsCorrect(card.correctAnswer === selectedOption.dataset.key)
                }
            }}>Confirmar</button>
        </>
    )
}