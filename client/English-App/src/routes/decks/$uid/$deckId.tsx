import { createFileRoute } from "@tanstack/react-router"
import Deck from "../../../components/flashcardComponents/deck.tsx"
import type { DeckType } from "../../../../../../shared-types/API.ts"

export const Route = createFileRoute('/decks/$uid/$deckId')({
    component: DeckLoader,
    loader: async ({ params }) => {

        const raw = await fetch(`https://default-o37g4y27ua-uc.a.run.app/decks/personalDecks/${params.uid}/${params.deckId}`)
        return await raw.json()
    }
})

export default function DeckLoader() {
    
    const data: DeckType = Route.useLoaderData()

    return (
        <Deck setIndex={null} loaderDeck={data}/>
    )
}