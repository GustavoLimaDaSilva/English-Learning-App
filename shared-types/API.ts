/// <reference lib="dom" />

export interface ProfileData {
    uid: string,
    level: number
}

interface ApiResponse {

    name: string,
    id: string,
}

export interface LessonType extends ApiResponse {

    videoUrl: string,
    explanation: string,
    videoScript: string,
    requiredLevel: number,
    flashcardDeck: DeckType
}

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