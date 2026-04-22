import { isCardOptions } from "../../../../../typeGuards.ts";
import { useContext, type RefObject } from "react";
import type { DeckContextType } from "../../types/deck.ts";
import { DeckContext } from "./deck.tsx";


export default function Flashcard({ flashcardRef }: { flashcardRef: RefObject<HTMLDivElement | null> }) {

    if (!DeckContext) return
    const { cards, offset, isCorrect, setIsCorrect, setShowAnswer, selectedOption, isMultipleOption } = useContext(DeckContext) as DeckContextType
    const card = cards[offset]
    if (!card) return

    return (
        <>
            <div className="front">
                {card.cardFront && <p>{card.cardFront}</p>}
                {card.imageUrl && <img src={card.imageUrl} />}
                {isMultipleOption ? <p>assinale a alternativa correta: </p> : <button className="flashcard-btn" onClick={() => {
                    setShowAnswer(true)
                    if (flashcardRef.current) flashcardRef.current.classList.add("rotate")
                }}>Mostar a parte de trás</button>}
            </div>
            {isMultipleOption ?
                <>
                    <div className="opts-wrapper">
                        {renderOptions()}
                    </div>
                    <button className="confirm" disabled={!selectedOption ? true : false} onClick={() => {
                        if (card && selectedOption) {
                            setIsCorrect(card.correctAnswer === selectedOption.dataset.key)
                        }
                    }}>Confirmar</button>
                </>
                :
                <div className="back">
                    <p className='answer'>{card?.options['a']}</p>
                </div>
            }
        </>
    )

    function renderOptions() {

        if (!card) return

        const optButtons = []
        for (const opt of Object.keys(card.options)) {
            if (!isCardOptions(opt)) return

            optButtons.push(
                <button key={opt} data-key={opt} className={opt === selectedOption?.dataset.key && isCorrect !== null ?
                    isCorrect ? 'flashcard-opts correct' : 'flashcard-opts wrong'
                    : 'flashcard-opts'}>
                    {card.options[opt]}
                </button>)
        }
        return optButtons
    }
}
