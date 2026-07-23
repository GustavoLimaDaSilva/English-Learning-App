import { Link } from "@tanstack/react-router"
import type { LessonType, LessonVideo } from "../types/index.ts"
import { useProfileData } from "../userStore.ts"
import { nanoid } from "nanoid"
import { Route } from "../routes/dashboard/index.tsx"
import Spinner from "./spinner.tsx"

type LessonData = {
    lessons: LessonType[],
    lessonVideos: LessonVideo[],
    playlistId: string
}


export default function LessonsTable() {

    const profileData = useProfileData((state) => state.profileData)
    const { lessons, lessonVideos, playlistId } = Route.useLoaderData() satisfies LessonData

    return (
        <section className="lessons-container">
            <h2>Lições</h2>
            <ul>
                {lessons &&
                    lessons.toSorted((curr, acc) => curr.requiredLevel - acc.requiredLevel)
                        .map((l, index) => {
                            const thisVideo = lessonVideos[index]?.snippet
                            return <li className={l.requiredLevel > profileData.level ? "lesson unavailable animated-background" : "lesson animated-background"} >
                                <Link to={`/lessons/${l.id}`} search={{ videoId: thisVideo?.resourceId.videoId, playlistId: playlistId }} key={nanoid()}>
                                    <span>{l.name}</span>
                                    <img src={thisVideo?.thumbnails.medium?.url ?? undefined} />
                                </Link>
                            </li>
                        }
                        )}
            </ul>
            {!lessons && <Spinner/>}
        </section>
    )
}