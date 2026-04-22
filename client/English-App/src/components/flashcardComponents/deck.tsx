import { createContext, useEffect, useRef, useState } from "react"
import { useProfileData, useGoogleUser } from "../../userStore.ts"
import type { StateSetter } from "../../types/index.ts"
import type { DeckType, FlashcardType } from "../../types/index.ts"
import type { LessonType } from "../../types/index.ts"
import Flashcard from "./flashcard.tsx"
import DeckFooter from "./deckFooter.tsx"
import type { DeckContextType } from "../../types/deck.ts"

type DeckProps = {
    setIndex?: StateSetter<number> | null,
    lesson?: LessonType,
    loaderDeck?: DeckType
}

// eslint-disable-next-line react-refresh/only-export-components
export const DeckContext = createContext<DeckContextType | null>(null)

export default function Deck({ setIndex, lesson, loaderDeck }: DeckProps) {

    if (!lesson && !loaderDeck) return

    const profileData = useProfileData((state) => state.profileData)

    const [offset, setOffset] = useState(0)
    const [selectedOption, setSelectedOption] = useState<HTMLButtonElement | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [cards, setCards] = useState<FlashcardType[]>(lesson?.flashcardDeck.cards ?? (loaderDeck!.cards))
    const [showAnswer, setShowAnswer] = useState(false)
    const isMultipleOption = cards[offset]?.options ? Object.keys(cards[offset]?.options).length > 1 : false
    const flashcardRef = useRef(null)
    const saveNewLevel = () => localStorage.setItem('new_level', JSON.stringify(profileData.level + 1))

    useEffect(() => {

        if (cards[offset] && isCorrect === false) {

            setCards([...cards, cards[offset]])
        }
    }, [isCorrect])

    useEffect(() => {

        setIsCorrect(null)
        setSelectedOption(null)
    }, [offset])

    useEffect(() => {
        if (!selectedOption) return

        selectedOption?.classList.add('selected')

        return () => selectedOption.classList.remove('selected')
    }, [selectedOption])
console.log(showAnswer)
    return (
        <div className="flashcard-wrapper">
            <DeckContext value={{
                isCorrect: isCorrect,
                setIsCorrect: setIsCorrect,
                isLastCard: offset === (cards.length - 1),
                showAnswer: showAnswer,
                setShowAnswer: setShowAnswer,
                deck: loaderDeck ? loaderDeck : lesson?.flashcardDeck,
                cards: cards,
                setCards: setCards,
                offset: offset,
                setOffset: setOffset,
                isMultipleOption: isMultipleOption,
                selectedOption: selectedOption,
                saveNewLevel: (lesson?.requiredLevel ?? 0) > profileData.level ? saveNewLevel : null
            }}>
                <div className="flashcard" ref={flashcardRef} onClick={(e) => select(e.target as HTMLElement)}>
                    <Flashcard flashcardRef={flashcardRef} />
                </div>
                {isCorrect !== null || showAnswer ? 
                <DeckFooter /> 
                :
                 null}
            </DeckContext>
        </div>
    )

    function select(el: HTMLElement) {

            if (el.tagName === 'BUTTON') {
                setSelectedOption(el as HTMLButtonElement)
            }       
    }
}

