import { useEffect, useState, createContext } from "react"
import type { DeckType, FlashcardType, LessonType, StateSetter } from "../../types/index.ts"
import { useProfileData } from "../../userStore.ts"
import type { DeckContextType } from "../../types/deck.ts"
import Deck from "./deck.tsx"

// eslint-disable-next-line react-refresh/only-export-components
export const DeckReactContext = createContext<DeckContextType | null>(null)

type DeckProps = {
    lesson?: LessonType,
    loaderDeck?: DeckType,
    setIndex: StateSetter<number> | null
}

export default function DeckContext({ loaderDeck, lesson }: DeckProps) {

    const profileData = useProfileData((state) => state.profileData)

    const [offset, setOffset] = useState(0)
    const [selectedOption, setSelectedOption] = useState<HTMLButtonElement | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [cards, setCards] = useState<FlashcardType[]>(lesson?.flashcardDeck.cards ?? (loaderDeck!.cards))
    const [showAnswer, setShowAnswer] = useState(false)
    const isMultipleOption = cards[offset]?.options ?? undefined ? Object.keys(cards[offset]?.options ?? {}).length > 1 : false
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

    const JSX =
        <DeckReactContext value={{
            isCorrect: isCorrect,
            lesson: lesson,
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
            setSelectedOption: setSelectedOption,
            saveNewLevel: (lesson?.requiredLevel ?? 0) > profileData.level ? saveNewLevel : null
        }}>
            <Deck />
        </DeckReactContext>

    return (
        lesson ?
            <>
                {JSX}
            </>
            :
            <div className="flashcard-wrapper grandient-background">
                {JSX}
            </div >
    )
}