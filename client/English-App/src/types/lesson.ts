import type { LessonType, StateSetter } from "./index.js"

export type ReactLessonProps = {
    setIndex: StateSetter<number>,
    index: number,
    childIndex: number,
    lesson: LessonType,
    ids:Ids
}

export type Ids = {
    videoId: string,
    playlistId: string
}