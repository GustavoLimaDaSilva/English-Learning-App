import { useEffect, useRef } from "react"
import type { MessageOrigin } from "../types/AI.ts"
import { nanoid } from "nanoid"
import { speak } from "../utils.ts"

export default function useFormatText(role?: MessageOrigin) {

    const pRef = useRef<HTMLParagraphElement | null>(null)

    useEffect(() => {

        if (!pRef.current || role === 'user' || !role) return

        flowingTextEffect(pRef.current)
    }, [pRef.current])

    return textFormattor



    function textFormattor(raw: string) {

        return raw.split(/\n+/)
            .map((para) => {

                if (para === '\n') return

                const el = <p key={nanoid()} ref={pRef}>{
                    formatTextStyling(
                        para
                    )}
                </p>

                flowingTextEffect(pRef.current)
                return el
            });
    }


    function flowingTextEffect(pRef: HTMLParagraphElement | null) {

        if (!pRef || !pRef.parentElement) return

        const words = pRef.parentElement.querySelectorAll("span")
        let flowing_delay = 20

        words.forEach(w => {
            setTimeout(() => {
                w.classList.add('visible')
            }, flowing_delay)

            flowing_delay = flowing_delay + 20
        })
    }


    function formatTextStyling(raw: string) {

        const words = raw.split(/(<i>.*?<\/i>|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|[^\s\w<>]|[\w]+)/g);

        const parsedText = words.map((w, i) => {

            if ((w.startsWith('***') && w.endsWith('***'))) {

                return <b><i key={i}>{spanCharacters(w.slice(3, -3))}</i></b>;

            }
            else if (w.startsWith('**') && w.endsWith('**')) {

                return <b key={i}>{spanCharacters(w.slice(2, -2))}</b>;
            }
            else if (w.startsWith('*') && w.endsWith('*')) {

                return <i key={i}>{spanCharacters(w.slice(1, -1))}</i>;
            }

            else if (w.match(/<i>(.*?)/)) {

                const closingTagIndex = words.slice(i).findIndex(el => el.match(/<\/i>/g)) + 1
                const englishSentence = words.slice(i, closingTagIndex + i).join("")
                    .split(/<i>(.*?)<\/i>/)
                    .join("")


                return <i key={nanoid()}>{spanCharacters(englishSentence, true)}</i>
            }
            return spanCharacters(w);
        });
        return parsedText
    }

    function spanCharacters(word: string, isEnglish?: boolean) {
        return (
                <span onClick={word !== ' ' && isEnglish ?
                    () => speak(word) : undefined}
                    className={role === 'model' && isEnglish ? "AI-words english-word" :
                        isEnglish ? "english-word" : role === "model" ? "AI-words" : ''}>
                    {word}
                </span>
        )
    }
}
