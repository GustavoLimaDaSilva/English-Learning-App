import type { ReactLessonProps } from "../types/lesson.ts"
import useFormatText from "../hooks/useFormatText.tsx"
import { speak } from '../utils.ts'
import { useOutletContext } from "react-router"

type VideoProps = ReactLessonProps & {
    ids: { videoId: string, playlistId: string }
}

export default function Video(props: VideoProps) {

    const outletLesson = useOutletContext<any>()
    const lesson = props?.lesson ?? outletLesson
    const setIndex = props?.setIndex

    const formattedText = useFormatText(lesson?.video_script ?? '', null, speak)

    return (
        <div>
            <iframe src={`https://www.youtube.com/embed/${props.ids.videoId}?list=${props.ids.playlistId}`} frameborder="0"></iframe>
            <div>{formattedText}</div>
            <button onClick={() => setIndex ? setIndex((prev: number) => prev - 1) : undefined}>Voltar</button>
            <button onClick={() => setIndex ? setIndex((prev: number) => prev + 1) : undefined}>Revisar Lição</button>
        </div>
    )
}