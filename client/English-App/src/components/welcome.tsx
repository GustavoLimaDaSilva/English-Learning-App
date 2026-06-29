import { useEffect } from "react"
import { useGoogleUser } from "../userStore.ts"

export default function Welcome() {

    useEffect(() => {

        const timeoutID = setTimeout(() => sessionStorage.setItem("welcomeFired", JSON.stringify(true)), 1000)

        return () => clearTimeout(timeoutID)
    }, [])

    const user = useGoogleUser((state) => state.googleUser)
    if (!user) return

    return (
    <div className="welcome-message">
        {separateLetters("Welcome")}
        </div>
        )
}

function separateLetters(word: string) {

    const spans = []
    let delay = 0

    for (let i = 0; i < word.length; i++) {

        spans.push(
            <span className="welcome-letter"
                style={{ animationDelay: `${delay}ms` }}>
                {word[i]}
            </span >
        )

        const rando = Number(Math.random()
                                 .toFixed(2)
                                 .slice(2))
        delay = delay + rando
    }

    return spans
}