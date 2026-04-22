import { Link } from "@tanstack/react-router"
import { useContext } from "react"
import type { DeckContextType } from "../../types/deck.ts"
import { DeckContext } from "./deck.tsx"
import type { FlashcardType } from "../../types/index.ts"
import { putDeck } from "../../utils.ts"
import { useGoogleUser } from "../../userStore.ts"

export default function SkipToNext() {

    if (!DeckContext) return
    const { setOffset, isLastCard, deck, cards, saveNewLevel } = useContext(DeckContext) as DeckContextType
    const user = useGoogleUser((state) => state.googleUser)

    return (
        <button onClick={() => {
            if (isLastCard) {
                updateCards()
                if (saveNewLevel) saveNewLevel()
                return
            }
            setOffset(prev => prev + 1)
        }}>
            {isLastCard ?
                <Link to={'/dashboard'}>Finalizar</Link>
                :
                "Avançar"
            }</button>
    )

    function updateCards() {
        const updatedCards = cards.reduce((acc: FlashcardType[], curr) => {

            const outdatedCardIndex = acc.findIndex(card => card.id === curr.id)
            if (outdatedCardIndex >= 0) {
                acc.splice(outdatedCardIndex, 1)
            }
            const copy = { ...curr }
            copy.lastReviewedAt = new Date()
                .toLocaleString('pt-br', { day: "numeric", month: "numeric", year: "numeric" })
            acc.push(copy)

            return acc
        }, [])

        putDeck({ ...deck!, cards: updatedCards }, user?.uid)
    }
}