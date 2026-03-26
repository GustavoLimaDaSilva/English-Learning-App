import type {  ReactLessonProps } from "../types/lesson.ts"
import useFormatText from "../hooks/useFormatText.tsx"
import { speak } from '../utils.ts'
import { useOutletContext } from "react-router"

export default function Video(props: any) {

    const outletLesson = useOutletContext<any>()
    const lesson = props?.lesson ?? outletLesson
    const setIndex = props?.setIndex

    const formattedText = useFormatText(lesson?.video_script ?? '', null, speak)

    return (
        <div>
            <video width='400' height='400' controls muted>
                <source src={lesson?.video_url} type="video/mp4"></source>
                Your broswer does not support videos.
            </video>
            <div>{formattedText}</div>
            <button onClick={() => setIndex ? setIndex((prev: number) => prev - 1) : undefined}>Voltar</button>
            <button onClick={() => setIndex ? setIndex((prev: number) => prev + 1) : undefined}>Revisar Lição</button>
        </div>
    )
}