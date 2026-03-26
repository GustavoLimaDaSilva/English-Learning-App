import { ApiResponse } from ".";
import { DeckType } from "./deck";

export interface LessonType extends ApiResponse {

    videoUrl: string,
    explanation: string,
    videoScript: string,
    requiredLevel: number,
    flashcardDeck: DeckType
}