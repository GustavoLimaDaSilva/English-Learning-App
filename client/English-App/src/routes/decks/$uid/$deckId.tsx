import { createFileRoute } from "@tanstack/react-router"
import type { DeckType } from "../../../types/index.ts"
import DeckContext from "../../../components/flashcardComponents/DeckContext.tsx"

export const Route = createFileRoute('/decks/$uid/$deckId')({
    component: DeckLoader,
    loader: async ({ params }) => {

        const raw = await fetch(`https://api-o37g4y27ua-uc.a.run.app/decks/personalDecks/${params.uid}/${params.deckId}`)
        return await raw.json()
    }
})

export default function DeckLoader() {

    const data: DeckType = Route.useLoaderData()

    return (
        <DeckContext setIndex={null} loaderDeck={data} />
    )
}