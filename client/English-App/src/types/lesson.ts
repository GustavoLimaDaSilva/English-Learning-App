import type { LessonType, StateSetter } from "./index.js"

export type ReactLessonProps = {
    setIndex: StateSetter<number>,
    lesson: LessonType
}

export type Ids = {
    videoId: string,
    playlistId: string
}