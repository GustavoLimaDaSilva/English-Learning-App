import { Link, createFileRoute } from "@tanstack/react-router"
import { decksSearchSchema } from "../../../schemas/searchParams.ts";
import DeckCard from "../../../components/deckCard.tsx";
import type { DeckLinks } from "../../../types/deck.ts";



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

    const decksData: DeckLinks = Route.useLoaderData()
    const { uid } = Route.useParams()

    return (
        <div className="fit-all">
            <section className="section-margin">
                <h2>Decks desbloqueados</h2>
                <div className="inline-elements">
                    {decksData.lessonDecksData.map(d => <DeckCard deckInfo={d}/>)}
                </div>
            </section>
            <section className="section-margin">
                <h2>Seus decks personalizados</h2>
                <div className="inline-elements">
                        <Link to={`createDeck`}><span className="add-symbol">+</span> criar deck</Link>
                    {decksData.personalDecksData.map(d => <DeckCard deckInfo={d} uid={uid} />)}
                </div>
            </section>
        </div>)
}