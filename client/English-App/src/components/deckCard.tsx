import { Link } from "@tanstack/react-router";
import { nanoid } from "nanoid";
import type { DeckCardType } from "../types/index.ts";
import { rightPhraseCartao } from "../utils.ts";

type props = {
    deckInfo: DeckCardType,
    uid?: string
}

export default function DeckCard({ deckInfo, uid }: props) {

    return (
        <div className="card deck-link">
            <Link to={`../${uid ? uid : "lessonDecks"}/${deckInfo.id}`} key={nanoid()}></Link>
            <h3>{deckInfo.name}</h3>
            <p className="deck-link-description">{deckInfo.deckDescription}</p>
            <hr />
            <div className="inline-elements">
                <p>{rightPhraseCartao(deckInfo.cardLength)}</p>
                <p>{deckInfo.lastSeen.charAt(0) === "0" ? "ainda não acessado" : `última vez visto em ${deckInfo.lastSeen}`}</p>
            </div>
        </div>
    )
}