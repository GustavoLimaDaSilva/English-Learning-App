import { useNavigate } from "@tanstack/react-router";
import { useOutletContext } from "react-router"
import type { ReactLessonProps } from "../types/lesson.ts";
import useFormatText from "../hooks/useFormatText.tsx";

type ExplanationProps = ReactLessonProps & {
    ids?: { videoId: string, playlistId: string } 

}

export default function Explanation(props: ExplanationProps) {

    const outletLesson = useOutletContext<any>()
    const lesson = props?.lesson ?? outletLesson
    const setIndex = props?.setIndex

    const formattedExplanation = useFormatText(lesson?.explanation ?? '', null, null)
    const navigate = useNavigate()
    return (
        <div>
            <div>{formattedExplanation}</div>
            <button onClick={() => navigate({ to: '/' })}>Voltar</button>
            <button onClick={() => setIndex ? setIndex((prev: number) => prev + 1) : undefined}>Avançar</button>
        </div>
    )
}