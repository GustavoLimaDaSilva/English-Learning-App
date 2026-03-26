import { Outlet, useLoaderData } from "react-router"
import type { DecksType } from "../../types/index.ts"

export default function FlashCardsOverview() {

    const decks: DecksType = useLoaderData()

    return (
        <div className="className">
            <Outlet context={decks}/>
        </div>
    )
}