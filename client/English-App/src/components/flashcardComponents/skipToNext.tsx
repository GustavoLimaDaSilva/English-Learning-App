import { Link } from "@tanstack/react-router";
import type { DeckType, FlashcardType, StateSetter } from "../../types/index.ts";
import { putUpdatedDeck } from "../../utils.ts";

type SkipToNextProps = {
    isCorrect: boolean | null,
    setIsCorrect: StateSetter<boolean | null>,
    skipToNext: (() => void) | undefined,
    updateLevel: (() => void) | undefined,
    isLastCard: boolean,
    cards: DeckType['cards'],
    setCards: StateSetter<FlashcardType[]>
    resetSelectedOpt: (() => void)
}

export default function SkipToNext({ isCorrect, setIsCorrect, skipToNext, isLastCard, updateLevel, resetSelectedOpt, cards }: SkipToNextProps) {

    return (
        <div>
            <p>{isLastCard ?
                'Muito Bem'
                :
                isCorrect ? 'Correto' : 'Errado'}!</p>
            {isLastCard ?
                <Link to={'/dashboard'} onClick={() => {
                    const updatedDeck = cards.map(card => {
                        return { ...card, lastReviewedAt: new Date().toLocaleString('pt-br', { day: "numeric", month: "numeric", year: "numeric" }) }
                    })
                    putUpdatedDeck(updatedDeck, 'wqfewd')
                    if (updateLevel) updateLevel()
                }}>Finalizar</Link>
                :
                <button onClick={() => {
                    if (skipToNext) skipToNext()
                    setIsCorrect(null)
                    resetSelectedOpt()
                }}>Avançar</button>
            }
        </div>
    )
}