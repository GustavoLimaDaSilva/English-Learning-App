import type { FlashcardType, StateSetter } from "../types/index.ts"

type props = {
    cards: FlashcardType[],
    setCards: StateSetter<FlashcardType[]>
    offset: number,
    toLastSlot: () => void,
    skip: (() => void) | undefined
}

export default function assignDifficulty({offset, setCards, skip, toLastSlot}: props) {

    const addDifficulty = (diff: FlashcardType["difficulty"]) => {

        setCards(prev => {

            const copy = [...prev]
            copy[offset] = { ...copy[offset] as FlashcardType, difficulty: diff }

            return copy
        })
        if (skip) skip()
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