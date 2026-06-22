import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react"
import Explanation from "../../components/explanation.tsx"
import Video from "../../components/video.tsx"
import type { LessonType } from "../../types/index.ts"
import type { Ids } from '../../types/lesson.ts'
import DeckContext from '../../components/flashcardComponents/DeckContext.tsx'

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

  const children = [Explanation, Video]
  const [componentIndex, setComponentIndex] = useState(0)

  return (
    <div className="lesson-container">
      {children.map((Child, index) => <Child childIndex={index}
        index={componentIndex} setIndex={setComponentIndex}
        lesson={lesson} ids={ids} />
      )}
    </div>
  )
} 
