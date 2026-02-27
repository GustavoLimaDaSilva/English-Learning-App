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

    video_url: string,
    explanation: string,
    video_script: string,
    level: number,
    flashcard_deck: DeckType
}

export interface DecksType {
    lesson_decks: DeckType[],
    personal_decks: DeckType[]
}

export interface DeckType extends ApiResponse {

    deckDescription?: string,
    cards: FlashcardType[] | SingleOptionCard[]
}

interface SingleOptionCard extends FlashcardType {

    difficulty?: 'easy' | 'medium' | 'hard' | undefined
} 


export const Opts = ['a', 'b', 'c', 'd'] as const
interface FlashcardType {
    cardType: 'image' | 'written',
    cardFront: string,
    options: { [prop in typeof Opts[number]]: string },
    lastReviewedAt?: string
    imageFile?: FileList | {} | undefined,
    imageUrl?: string | undefined,
    correct_answer?: typeof Opts[number] | undefined
}