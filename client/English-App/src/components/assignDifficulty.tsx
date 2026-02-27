import type { FlashcardType, StateSetter } from "../types/index.ts"
import { IsCardSingleOption } from "../../../../typeGuards.ts"

type props = {
    cards: FlashcardType[],
    setCards: StateSetter<FlashcardType[]>
    offset: number,
    toLastSlot: () => void,
    skipToNext: (() => void) | undefined
}

export default function assignDifficulty({ offset, setCards, skipToNext, toLastSlot, }: props) {

    const addDifficulty = (diff: FlashcardType["difficulty"]) => {

        setCards(prev => {

            const copy = [...prev]
            if (IsCardSingleOption(copy[offset]))
            copy[offset] = { ...(copy[offset]), difficulty: diff, addedAt: (copy[offset] as FlashcardType).addedAt ?? Date.now() }

            return copy
        })
        if (skipToNext) skipToNext()
    }

    return (
                    <>
                        <button onClick={() => addDifficulty('easy')}>fácil</button>
                        <button onClick={() => addDifficulty('medium')}>médio</button>
                        <button onClick={() => {
                            addDifficulty('hard')
                            toLastSlot()
                        }}>difícil</button>
                    </>
    )
}