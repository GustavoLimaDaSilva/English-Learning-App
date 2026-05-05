import type { ApiResponse } from "./index.js";
import type { DeckType } from "./deck.js";

export interface LessonType extends ApiResponse {

    videoUrl: string,
    explanation: string,
    videoScript: string,
    requiredLevel: number,
    flashcardDeck: DeckType
}

export interface LessonVideo {
    kind: "youtube#playlistItem";
    etag: string;
    id: string;
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            [key: string]: {
                url: string;
                width: number;
                height: number;
            };
        };
        channelTitle: string;
        playlistId: string;
        position: number;
        resourceId: {
            kind: string;
            videoId: string;
        };
    };
}