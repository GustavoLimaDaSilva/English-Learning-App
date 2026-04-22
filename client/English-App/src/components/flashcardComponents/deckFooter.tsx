import { useContext, useState } from "react";
import AssignDifficulty from "../assignDifficulty.tsx";
import DisplayFeedback from "./displayFeedback.tsx";
import SkipToNext from "./skipToNext.tsx";
import { DeckContext } from "./deck.tsx";
import type { DeckContextType } from "../../types/deck.ts";

export default function DeckFooter() {

    if (!DeckContext) return
    const { isCorrect, showAnswer, isLastCard } = useContext(DeckContext) as DeckContextType
    const [hasFinished, setHasFinished] = useState(false)

    return (
        <div className="feedback-wrapper">
            <DisplayFeedback />
            {
                isCorrect || showAnswer ?
                    <>
                        {isLastCard && hasFinished ?
                            <SkipToNext />
                            :
                            <AssignDifficulty setHasFinished={setHasFinished} />}
                    </>
                    :
                    <SkipToNext />
            }
        </div>
    )
}
