import type { ApiResponse } from "./index.js"

export interface DecksType {
    lesson_decks: DeckType[],
    personal_decks: DeckType[]
}

export interface DeckType extends ApiResponse {

    deckDescription?: string,
    cards: FlashcardType[]
}


export const Opts = ['a', 'b', 'c', 'd'] as const
export interface FlashcardType {
    cardFront: string,
    options: { [prop in typeof Opts[number]]: string },
    addedAt: string,
    id: string
    lastReviewedAt?: string
    imageFile?: FileList | {} | undefined,
    imageUrl?: string | undefined,
    correctAnswer?: typeof Opts[number] | undefined,
    difficulty?: 'easy' | 'medium' | 'hard' | undefined,
}

export interface DeckCardType extends Omit<DeckType, "cards"> {
    lastSeen: string,
    cardLength: number
}