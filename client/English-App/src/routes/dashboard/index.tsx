import { Link } from "@tanstack/react-router"
import type { LessonType, ProfileData } from "../../types/index.ts"
import Toast from "../../components/toast.tsx"
import DashboardLogic from "../../components/dashboardLogic.tsx"
import { createFileRoute } from "@tanstack/react-router"
import { useGoogleUser, useProfileData } from "../../userStore.ts"
import { nanoid } from "nanoid"
import type { decksSearchSchema } from "../../schemas/searchParams.ts"
import type z from "zod"

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
        return { storedProfile: storedProfile, lessons: lessons }
    },
})

function DashBoardOverview() {

    const { storedProfile, lessons } = Route.useLoaderData() satisfies { storedProfile: ProfileData, lessons: LessonType[] }

    const profileData = useProfileData((state) => state.profileData)
    const user = useGoogleUser((state) => state.googleUser)

    if (!user) return

    const data = localStorage.getItem('toastFired')
    const toastFired = data ? JSON.parse(data) : false
    return (
        <DashboardLogic storedProfile={storedProfile}>
            <div className="dashboard-wrapper">
            {profileData.level === 1 && !toastFired ? <Toast toastFired={toastFired} className="toast" msg="agora você já pode encontrar o deck da sua lição na área de flashcards!" /> : null}
            <div className="welcome">
                <p><span className="message">Welcome,</span><br /> <span className="name">{user.displayName?.slice(0, user.displayName.indexOf(' '))}!</span></p>
            </div>
            <main className="main">
                    <div key={nanoid()} className="card studying-illustration">
                        <Link to={`/decks/${user.uid}`} search={{level: profileData.level ?? 0} satisfies z.infer<typeof decksSearchSchema>}>Ver Flashcards</Link>
                    </div>
                    <div key={nanoid()} className="card AI-illustration">
                        <Link to={'/chat'}> Converse com a nossa IA em inglês</Link>
                    </div>
                <section className="lessons-container">
                    <h2>Lições</h2>
                    <ul>
                        {lessons && lessons.map((l, index) => <li className="lesson"><Link to={`/lessons/${l.id}`} key={index}>{l.name}</Link></li>)}
                        <li className="lesson"><a href="#">futuro do indicativo</a></li>
                        <li className="lesson"><a>present continuous</a></li>
                        <li className="lesson"><a>past actions</a></li>
                        <li className="lesson"><a>past actions</a></li>
                        <li className="lesson"><a>past actions</a></li>
                        <li className="lesson"><a>past actions</a></li>
                        <li className="lesson"><a>past actions</a></li>
                    </ul>
                </section>
            </main>
            </div>
            </DashboardLogic>
    )
}