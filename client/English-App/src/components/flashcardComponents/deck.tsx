import { useContext, useRef } from "react"
import Flashcard from "./flashcard.tsx"
import DeckFooter from "./deckFooter.tsx"
import type { DeckContextType } from "../../types/deck.ts"
import { DeckReactContext } from "./DeckContext.tsx"


export default function Deck() {

    const { isCorrect, showAnswer, setSelectedOption } = useContext(DeckReactContext) as DeckContextType
    const flashcardRef = useRef(null)

    return (
        <>
            <div className="flashcard" ref={flashcardRef} onClick={(e) => select(e.target as HTMLElement)}>
                <Flashcard flashcardRef={flashcardRef} />
            </div>
            {
                isCorrect !== null || showAnswer ?
                    <DeckFooter />
                    :
                    null
            }
        </>
    )

    function select(el: HTMLElement) {

        if (el.tagName === 'BUTTON') {
            setSelectedOption(el as HTMLButtonElement)
        }
    }
}

