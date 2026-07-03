import { Link } from "@tanstack/react-router";
import { nanoid } from "nanoid";
import type { DeckCardType } from "../types/index.ts";
import { getFromStorage, rightPhraseCartao } from "../utils.ts";

type props = {
    deckInfo: DeckCardType,
    uid?: string,
    animationEnded?: boolean | null
}

export default function DeckCard({ deckInfo, uid, animationEnded }: props) {

    const classNames = "card deck-link average-width"

    return (<>
        <div className={!getFromStorage("levelUpToastFired") ? classNames + " sliding-border" : classNames} style={{
            pointerEvents: (animationEnded === null  || animationEnded === undefined) || animationEnded ?
                "all" : "none"
        }}>
            <Link to={`../${uid ? uid : "lessonDecks"}/${deckInfo.id}`} key={nanoid()}></Link>
            <h3>{deckInfo.name}</h3>
            <p className="deck-link-description">{deckInfo.deckDescription}</p>
            <hr />
            <div className="inline-elements">
                <p>{rightPhraseCartao(deckInfo.cardLength)}</p>
                {deckInfo.lastSeen.charAt(0) !== "0" && <p>última vez visto em {deckInfo.lastSeen}</p>}
            </div>
        </div>
    </>
    )
}