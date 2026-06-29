import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from "react"
import Explanation from "../../components/explanation.tsx"
import Video from "../../components/video.tsx"
import type { LessonType } from "../../types/index.ts"
import type { Ids } from '../../types/lesson.ts'
import Toast from '../../components/toast.tsx'
import { getFromStorage } from '../../utils.ts'

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
  const [showToast, setShowToast] = useState(false)
  const lessonToastFired = getFromStorage("lessonToastFired")
 
  useEffect(() => {
    
    let timeoutId: NodeJS.Timeout | undefined
    const isNewUser = getFromStorage<boolean | undefined>("tutorialToastFired")

    if (isNewUser && !lessonToastFired) {
      timeoutId = setTimeout(() => setShowToast(true), 500)
    }

    const detectInteraction = (e: PointerEvent) => {
      if (e.target && "classList" in e.target) {

        const classList = e.target.classList as DOMStringList
        if (classList.contains("english-word")) {
          setShowToast(false)
          sessionStorage.setItem("lessonToastFired", JSON.stringify(true))
        }
      }
    }
    document.addEventListener("click", detectInteraction)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener("click", detectInteraction)
    }
  }, [])

  return (
    <div className="lesson-container">
      {showToast &&
        <>
          <div className="unavailable"></div>
          <Toast msg={<p>As palavras em inglês ficam sempre <span className='english-word'>destacadas assim</span>. Você pode clicar nelas para escutar sua pronúncia.<br /> Faça um teste!</p>} className="toast" />
        </>}
      {children.map((Child, index) => <Child childIndex={index}
        index={componentIndex} setIndex={setComponentIndex}
        lesson={lesson} ids={ids} />
      )}
    </div>
  )
} 
