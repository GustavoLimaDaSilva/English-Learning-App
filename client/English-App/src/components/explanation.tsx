import { useNavigate } from "@tanstack/react-router";
import type { Ids, ReactLessonProps } from "../types/lesson.ts";
import useFormatText from "../hooks/useFormatText.tsx";

type ExplanationProps = ReactLessonProps & {
    ids?: Ids

}

export default function Explanation(props: ExplanationProps) {

    const lesson = props?.lesson
    const setIndex = props?.setIndex
    const formattedExplanation = useFormatText(lesson?.explanation ?? '', null, null)
    const navigate = useNavigate()

  
    return (
        <div className={props.childIndex === props.index ? "lesson-el current" : "lesson-el previous-el non-clickable"}>
            <p>{formattedExplanation}</p>
            <div className="align-buttons">
                <button onClick={() => navigate({ to: '/dashboard' })}>Voltar</button>
                <button onClick={() => setIndex ? setIndex((prev: number) => prev + 1) : undefined}>Avançar</button>
            </div>
        </div>
    )
}