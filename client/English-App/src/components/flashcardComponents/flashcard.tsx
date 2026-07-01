import { isCardOptions } from "../../../../../typeGuards.ts";
import { useNavigate } from "@tanstack/react-router"
import { useContext, type RefObject } from "react";
import type { DeckContextType } from "../../types/deck.ts";
import { DeckReactContext } from "./DeckContext.tsx";
import ConfirmButton from "./ConfirmButton.tsx";
import useFormatText from "../../hooks/useFormatText.tsx";


export default function Flashcard({ flashcardRef }: { flashcardRef: RefObject<HTMLDivElement | null> }) {

    const { cards, offset, lesson, isCorrect, setShowAnswer, selectedOption, isMultipleOption } = useContext(DeckReactContext) as DeckContextType
    const card = cards[offset]
    const navigate = useNavigate({})
    const textFormattor = useFormatText()
    if (!card) return
    
    return (
        <>
            <div className="front">
                {card.cardFront && <p>{textFormattor(card.cardFront)}</p>}
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
                    {lesson ?
                        <div className="align-buttons">
                            <button onClick={() => navigate({ to: '/' })}>Voltar</button>
                            <ConfirmButton />
                        </div>
                        :
                        <ConfirmButton />
                    }
                </>
                :
                <div className="back">
                    <p className='answer'>{textFormattor(card?.options['a'])}</p>
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
