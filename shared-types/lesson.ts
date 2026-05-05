import type { ApiResponse } from "./index.js";
import type { DeckType } from "./deck.js";

export interface LessonType extends ApiResponse {
    explanation: string,
    videoScript: string,
    requiredLevel: number,
    flashcardDeck: DeckType
}

export interface PlaylistType {
    kind: "youtube#playlistItemListResponse";
    etag: string;
    nextPageToken?: string;
    prevPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: LessonVideo[];
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