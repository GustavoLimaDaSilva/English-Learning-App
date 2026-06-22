import { useContext, useState } from "react";
import AssignDifficulty from "../assignDifficulty.tsx";
import DisplayFeedback from "./displayFeedback.tsx";
import SkipToNext from "./skipToNext.tsx";
import { DeckReactContext } from "./DeckContext.tsx";
import type { DeckContextType } from "../../types/deck.ts";

export default function DeckFooter() {

    const { isCorrect, showAnswer, isLastCard, saveNewLevel } = useContext(DeckReactContext) as DeckContextType
    const [hasFinished, setHasFinished] = useState(false)
console.log(saveNewLevel)
    return (
        <div className="feedback-wrapper">
            <DisplayFeedback />
            <div className="difficulty-options">
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
        </div>
    )
}
