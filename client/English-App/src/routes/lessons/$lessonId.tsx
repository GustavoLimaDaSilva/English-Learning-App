import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react"
import Explanation from "../../components/explanation.tsx"
import Video from "../../components/video.tsx"
import Deck from "../../components/flashcardComponents/deck.tsx"
import type { LessonType } from "../../types/index.ts"
import type { Ids } from '../../types/lesson.ts'

export const Route = createFileRoute('/lessons/$lessonId')({
  component: Lesson,
  loader: async ({ params }) => {

    const raw = await fetch(`https://api-o37g4y27ua-uc.a.run.app/lessons/${params.lessonId}`)
    const lesson = await raw.json()

    return lesson
  },
})

export default function Lesson() {

  const lesson: LessonType = Route.useLoaderData()
  const ids: Ids = Route.useSearch()

  const children = [Explanation, Video, Deck]
  const [index, setIndex] = useState(0)
  const Current = children[index]
  return (
    <div className="lesson-overview">
      {Current && <Current setIndex={setIndex} lesson={lesson} ids={ids} />}
    </div>
  )
} 
