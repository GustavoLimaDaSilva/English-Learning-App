import { Link, createFileRoute } from "@tanstack/react-router"
import { decksSearchSchema } from "../../../schemas/searchParams.ts";

type linkProps = { name: string, id: string }
type DeckLinks = {
    lessonDecksData: linkProps[],
    personalDecksData: linkProps[]
}

export const Route = createFileRoute('/decks/$uid/')({
    component: FlashcardsIndex,
    validateSearch: decksSearchSchema,
    loaderDeps: ({ search: { level } }) => ({
        level //adicionar validação com zod
    }),
    errorComponent: () => <div>this is a custom error component</div>,
    loader: async ({ params, deps: { level } }) => {

        if (level === undefined || level === null) return

        const raw = await fetch(`https://api-o37g4y27ua-uc.a.run.app/decks/${params.uid}?level=${level}`)
        const data = await raw.json()

        return data
    }
})

export default function FlashcardsIndex() {

    const decksData : DeckLinks = Route.useLoaderData()
    const { uid } = Route.useParams()

    return (
        <>
            <h2>Decks desbloqueados</h2>
            {decksData.lessonDecksData.map((d, index: number) => <Link to={`../lessonDecks/${d.id}`} key={index}>{d.name}</Link>)}
            <h2>Seus decks personalizados</h2>
            {decksData.personalDecksData.map((d, index: number) => <Link to={`../${uid}/${d.id}`} key={index}>{d.name}</Link>)}
            <div>
                <Link to={`criarDeck`}>+ criar deck</Link>
            </div>
        </>)
}