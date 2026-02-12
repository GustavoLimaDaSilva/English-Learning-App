import type React from "react"
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>

export type { ProfileData, LessonType, DecksType, DeckType, FlashcardType, SingleOptionCard } from "../../../../shared-types/API.ts"
export { Opts } from "../../../../shared-types/API.ts"

export type MessageOrigin = 'user' | 'AI'
export interface ChatMessage {
    from: MessageOrigin,
    content: string
}

type linkProps = { name: string, id: string }
export type DeckLinks = {
    lessonDecksData: linkProps[],
    personalDecksData: linkProps[]
}

import type { User } from "firebase/auth"
import type { LessonType, ProfileData } from "../../../../shared-types/API.ts"
export interface TanstackRouterContext {
    getUser: () => User | null,
    getProfileData: () => ProfileData
}

export type ReactLessonProps = {
    setIndex: StateSetter<number>,
    lesson: LessonType
}