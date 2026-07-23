import { Link, createFileRoute } from "@tanstack/react-router"
import { decksSearchSchema } from "../../../schemas/searchParams.ts";
import DeckCard from "../../../components/deckCard.tsx";
import type { DeckLinks } from "../../../types/deck.ts";
import { getFromStorage } from "../../../utils.ts";
import { useEffect, useState } from "react";



export const Route = createFileRoute('/decks/$uid/')({
    component: FlashcardsIndex,
    validateSearch: decksSearchSchema,
    loaderDeps: ({ search: { level } }) => ({
        level //adicionar validação com zod
    }),
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
    const [animationEnded, setAnimationEnded] = useState<null | boolean>(null)

    useEffect(() => {

        if (getFromStorage("levelUpToastFired")) return

        const timeoutId = setTimeout(() => {

            localStorage.setItem("levelUpToastFired", JSON.stringify(true))
            setAnimationEnded(true)
        }, 2000)


        return () => clearTimeout(timeoutId)
    }, [])

    return (
        <div className="fit-all">
            <section className="section-margin">
                <h2>Decks desbloqueados</h2>
                <div className="inline-elements">
                    {decksData.lessonDecksData && decksData.lessonDecksData.map(d => <DeckCard deckInfo={d}
                        animationEnded={animationEnded}
                    />)}
                </div>
            </section>
            <section className="section-margin">
                <h2>Seus decks personalizados</h2>
                <div className="inline-elements">
                    <Link to={`createDeck`} className='add-deck-button'><span className="add-symbol">+</span>criar deck</Link>
                    {decksData.personalDecksData?.map(d => <DeckCard deckInfo={d} uid={uid} />)}
                </div>
            </section>
        </div>)
}