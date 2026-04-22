import { useContext } from "react"
import type { DeckContextType } from "../types/deck.ts"
import type { FlashcardType, StateSetter } from "../types/index.ts"
import { DeckContext } from "./flashcardComponents/deck.tsx"

export default function assignDifficulty({ setHasFinished }: { setHasFinished: StateSetter<boolean> }) {

    if (!DeckContext) return
    const { offset, setCards, setOffset, cards, isLastCard } = useContext(DeckContext) as DeckContextType


    const addDifficulty = (diff: FlashcardType["difficulty"]) => {

        setCards(prev => {

            const copy = [...prev]
            copy[offset] = { ...copy[offset] as FlashcardType, difficulty: diff }

            return copy
        })
        if (!isLastCard) setOffset(prev => prev + 1)
        else setHasFinished(true)
    }

    return (
        <div className="difficulty-options">
            <button className="easy" onClick={() => addDifficulty('easy')}>fácil</button>
            <button className="medium" onClick={() => addDifficulty('medium')}>médio</button>
            <button className="hard" onClick={() => {
                addDifficulty('hard')
                setOffset(cards.length - 1)
            }}>difícil</button>
        </div>
    )
}