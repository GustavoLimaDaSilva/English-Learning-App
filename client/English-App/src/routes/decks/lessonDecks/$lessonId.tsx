import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import Deck from "../../../components/flashcardComponents/deck.tsx";

export const Route = createFileRoute('/decks/lessonDecks/$lessonId')({
    component: DeckLoader,
    loader: async ({ params }) => {

        const raw = await fetch(`https://default-o37g4y27ua-uc.a.run.app/decks/lessonDecks/${params.lessonId}`)
        return await raw.json()
    }
})

export default function DeckLoader() {
    
    const data = Route.useLoaderData()

    return (
        <Deck setIndex={null} loaderDeck={data} />
    )
}