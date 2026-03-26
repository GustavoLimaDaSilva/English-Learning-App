import { useEffect, useState } from "react"
import { useProfileData, useGoogleUser } from "../../userStore.ts"
import type { StateSetter } from "../../types/index.ts"
import type { DeckType, FlashcardType } from "../../types/index.ts"
import type { LessonType } from "../../types/index.ts"
import Flashcard from "./flashcard.tsx"
import SkipToNext from "./skipToNext.tsx"
import AssignDifficulty from "../assignDifficulty.tsx"
import { Link } from "@tanstack/react-router"
import { putUpdatedDeck } from "../../utils.ts"
import DisplayFeedback from "./displayFeedback.tsx"
type DeckProps = {
    setIndex?: StateSetter<number> | null,
    lesson?: LessonType,
    loaderDeck?: DeckType
}
export default function Deck({ setIndex, lesson, loaderDeck }: DeckProps) {

    if (!lesson && !loaderDeck) return

    const profileData = useProfileData((state) => state.profileData)
    const user = useGoogleUser((state) => state.googleUser)

    const [offset, setOffset] = useState(0)
    const [selectedOption, setSelectedOption] = useState<HTMLButtonElement | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [cards, setCards] = useState<FlashcardType[]>(lesson?.flashcardDeck.cards ?? (loaderDeck!.cards))
    const [showAnswer, setShowAnswer] = useState(false)
    const isMultipleOption = cards[offset]?.options ? Object.keys(cards[offset]?.options).length > 1 : false

    const updateLevel = () => localStorage.setItem('new_level', JSON.stringify(profileData.level + 1))
    const skip = () => setOffset(prev => prev + 1)
    const isLastCard = offset === (cards.length - 1)

    useEffect(() => {

        if (cards[offset] && isCorrect === false) {

            setCards([...cards, cards[offset]])
        }
    }, [isCorrect])

    useEffect(() => {

        setIsCorrect(null)
        setSelectedOption(null)
    }, [offset])

    return (<>
        <div onClick={(e) => {
            const clickedEl = e.target as HTMLElement
            if (clickedEl.tagName === 'BUTTON') setSelectedOption(clickedEl as HTMLButtonElement)
        }}>
            <Flashcard card={cards[offset]} isMultipleOption={isMultipleOption} selectedOption={selectedOption}
                isCorrect={isCorrect} showAnswer={showAnswer} setShowAnswer={setShowAnswer} />
        </div>
        <div>
            {isMultipleOption &&
                <>
                    <button disabled={!selectedOption ? true : false} onClick={() => {
                        if (cards[offset] && selectedOption) {
                            console.log()
                            setIsCorrect(cards[offset].correctAnswer === selectedOption.dataset.key)
                        }
                    }}>Confirmar</button>
                </>
            }
            {showAnswer || isCorrect !== null ?
                <>
                    <DisplayFeedback isCorrect={isCorrect as boolean} isLastCard={isLastCard} />
                    {
                        isCorrect || showAnswer?
                            <AssignDifficulty
                                cards={cards}
                                setCards={setCards}
                                offset={offset}
                                skip={!isLastCard ? () => setOffset(prev => prev + 1) : undefined}
                                toLastSlot={() => setOffset(cards.length - 1)}
                            />
                            :
                            <SkipToNext skip={skip} />
                    }
                </>
                :
                null
            }
            {isLastCard && (isCorrect || showAnswer) ?
                <Link to={'/dashboard'} onClick={() => {
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
                    
                    putUpdatedDeck({...loaderDeck!, cards: updatedCards}, user?.uid)
                    if (lesson?.requiredLevel && lesson.requiredLevel > profileData.level) updateLevel()
                }}>Finalizar</Link> : null}
        </div>
    </>
    )
}
