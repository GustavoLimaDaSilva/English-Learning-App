import type { DeckType, FlashcardType } from "../../../../shared-types/deck.ts";
import type { StateSetter } from "./index.ts";

export interface DeckContextType {
    isCorrect: boolean | null,
    setIsCorrect: StateSetter<boolean | null>,
    isLastCard: boolean,
    showAnswer: boolean,
    setShowAnswer: StateSetter<boolean>,
    deck: DeckType | undefined,
    cards: FlashcardType[],
    setCards: StateSetter<FlashcardType[]>,
    isMultipleOption: boolean,
    selectedOption: HTMLButtonElement | null,
    offset: number,
    setOffset: StateSetter<number>,
    saveNewLevel: (() => void) | null
}