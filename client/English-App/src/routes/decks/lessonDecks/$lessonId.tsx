import { createFileRoute } from "@tanstack/react-router";
import DeckContext from "../../../components/flashcardComponents/DeckContext.tsx";

export const Route = createFileRoute('/decks/lessonDecks/$lessonId')({
    component: DeckLoader,
    loader: async ({ params }) => {

        const raw = await fetch(`https://api-o37g4y27ua-uc.a.run.app/decks/lessonDecks/${params.lessonId}`)
        return await raw.json()
    }
})

export default function DeckLoader() {

    const data = Route.useLoaderData()

    return (
        <DeckContext setIndex={null} lesson={data} />
    )
}