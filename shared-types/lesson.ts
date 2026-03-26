import type { ApiResponse } from "./index.js";
import type { DeckType } from "./deck.js";

export interface LessonType extends ApiResponse {

    videoUrl: string,
    explanation: string,
    videoScript: string,
    requiredLevel: number,
    flashcardDeck: DeckType
}