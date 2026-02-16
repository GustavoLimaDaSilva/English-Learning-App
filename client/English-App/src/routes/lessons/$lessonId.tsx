import {createFileRoute} from '@tanstack/react-router'
import {useState} from "react"
import Explanation from "../../components/explanation.tsx"
import Video from "../../components/video.tsx"
import type {LessonType} from "../../types/index.ts"
import Deck from "../../components/flashcardComponents/deck.tsx"

export const Route = createFileRoute('/lessons/$lessonId')({
  component: Lesson,
  loader: async ({params}) => {

    const raw = await fetch(`https://default-o37g4y27ua-uc.a.run.app/lessons/${params.lessonId}`)
    return await raw.json()
  },
})





export default function Lesson() {

  const lesson: LessonType = Route.useLoaderData()
  const children = [Explanation, Video, Deck]
  const [index, setIndex] = useState(0)
  const Current = children[index]

  return (
    <div className="lesson-overview">
      {Current && <Current setIndex={setIndex} lesson={lesson} />}
    </div>
  )
} 
