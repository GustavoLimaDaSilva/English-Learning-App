import { useState } from "react"
import Explanation from "./explanation.tsx"
import Video from "./video.tsx"
import { Outlet, useLoaderData } from "react-router"
import type { LessonType } from "../types/index.ts"
import Deck from "./flashcardComponents/deck.tsx"

export default function Lesson() {

    // const children = [Explanation, Video, Deck]
    // const [index, setIndex] = useState(0)
    // const Current = children[index]
    const lesson: LessonType = useLoaderData()
    return (
        <div className="lesson-overview">
            <Outlet context={lesson}/>
            {/* <Current setIndex={setIndex} lesson={lesson} /> */}
        </div>
    )
} 