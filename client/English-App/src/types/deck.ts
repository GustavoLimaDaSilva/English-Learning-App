import type { DeckCardType, DeckType, FlashcardType } from "../../../../shared-types/deck.ts";
import type { LessonType, StateSetter } from "./index.ts";

export interface DeckContextType {
    isCorrect: boolean | null,
    lesson: LessonType | undefined,
    setIsCorrect: StateSetter<boolean | null>,
    isLastCard: boolean,
    showAnswer: boolean,
    setShowAnswer: StateSetter<boolean>,
    deck: DeckType | undefined,
    cards: FlashcardType[],
    setCards: StateSetter<FlashcardType[]>,
    isMultipleOption: boolean,
    selectedOption: HTMLButtonElement | null,
    setSelectedOption: StateSetter<HTMLButtonElement | null>,
    offset: number,
    setOffset: StateSetter<number>,
    saveNewLevel: (() => void) | null
}

export type DeckLinks = {
    lessonDecksData: DeckCardType[],
    personalDecksData: DeckCardType[]
}