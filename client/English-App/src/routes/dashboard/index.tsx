import { Link } from "@tanstack/react-router"
import type { LessonType, LessonVideo, ProfileData } from "../../types/index.ts"
import Toast from "../../components/toast.tsx"
import DashboardLogic from "../../components/dashboardLogic.tsx"
import { createFileRoute } from "@tanstack/react-router"
import { useGoogleUser, useProfileData } from "../../userStore.ts"
import { nanoid } from "nanoid"
import type { decksSearchSchema } from "../../schemas/searchParams.ts"
import type z from "zod"
import Welcome from "../../components/welcome.tsx"

export const Route = createFileRoute('/dashboard/')({
    component: DashBoardOverview,
    shouldReload: () => true,
    loader: async ({ context }) => {

        const user = context.getUser()

        if (!user) {
            return { storedProfile: null }
        }
        const rawProfile = await fetch(`https://api-o37g4y27ua-uc.a.run.app/users/${user.uid}`)
        const storedProfile = await rawProfile.json()

        const rawLesson = await fetch('https://api-o37g4y27ua-uc.a.run.app/lessons')
        const lessons = rawProfile.ok ? await rawLesson.json() : []

        const res = await fetch("https://api-o37g4y27ua-uc.a.run.app/lessons/allVideos")
        const { lessonVideos, playlistId } = await res.json()
        return { storedProfile: storedProfile, lessons: lessons, lessonVideos: lessonVideos, playlistId }
    },
})

function DashBoardOverview() {

    const { storedProfile, lessons, lessonVideos, playlistId } = Route.useLoaderData() satisfies { storedProfile: ProfileData, lessons: LessonType[], lessonVideos: LessonVideo[], playlistId: string }
    const profileData = useProfileData((state) => state.profileData)
    const user = useGoogleUser((state) => state.googleUser)
    if (!user) return

    const localData = localStorage.getItem('toastFired')
    const toastFired = localData ? JSON.parse(localData) : false

    const sessionData = sessionStorage.getItem("welcomeFired")
    const welcomeFired = sessionData ? JSON.parse(sessionData) : false

    return (
        <DashboardLogic storedProfile={storedProfile}>
            <div className="dashboard-wrapper">
                {profileData.level === 1 && !toastFired ? <Toast toastFired={toastFired} className="toast" msg="agora você já pode encontrar o deck da sua lição na área de flashcards!" /> : null}
                {!welcomeFired && <Welcome />}
                <main className="main grandient-background">
                    <div key={nanoid()} className="card has-background studying-illustration">
                        <Link to={`/decks/${user.uid}`} search={{ level: profileData.level ?? 0 } satisfies z.infer<typeof decksSearchSchema>}>Ver Flashcards</Link>
                    </div>
                    <div key={nanoid()} className="card has-background AI-illustration">
                        <Link to={'/chat'}> Converse com a nossa IA em inglês</Link>
                    </div>
                    <section className="lessons-container">
                        <h2>Lições</h2>
                        <ul>
                            {lessons && lessons.map((l, index) => {
                                const thisVideo = lessonVideos[index]?.snippet
                                return <li className="lesson" >
                                    <Link to={`/lessons/${l.id}`} search={{ videoId: thisVideo?.resourceId.videoId, playlistId: playlistId }} key={nanoid()}>
                                        <span>{l.name}</span>
                                        <img src={thisVideo?.thumbnails.medium?.url ?? undefined} />
                                    </Link>
                                </li>
                            }
                            )}
                        </ul>
                    </section>
                </main>
            </div>
        </DashboardLogic >
    )
}