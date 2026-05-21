import { useEffect, useRef } from "react"
import type { MessageOrigin } from "../types/AI.ts"
import { nanoid } from "nanoid"
import { speak } from "../utils.ts"

export default function useFormatText(from?: MessageOrigin) {

    const pRef = useRef<HTMLParagraphElement | null>(null)

    useEffect(() => {

        if (!pRef.current || from === 'user' || !from) return

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

        const words = raw.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|[^\s]+)/g);

        return words.map((w, i) => {

            if ((w.startsWith('***') && w.endsWith('***'))) {

                return <b><i key={i}>{spanCharacters(w.slice(3, -3))}</i></b>;

            }
            else if (w.startsWith('**') && w.endsWith('**')) {

                return <b key={i}>{spanCharacters(w.slice(2, -2))}</b>;
            }
            else if (w.startsWith('*') && w.endsWith('*')) {

                return <i key={i}>{spanCharacters(w.slice(1, -1))}</i>;
            }

            else if (w.startsWith('<i>') && w.endsWith('</i>',
                w.endsWith("</i>") ? w.length + 1 : w.length - 1)) {

                const hasPunctuation = !w.endsWith("</i>")
                return <i key={i}>
                    {spanCharacters(w.slice(3, hasPunctuation ? -5 : -4),
                        hasPunctuation ? w[w.length - 1] : '',
                        true)}</i>;
            }
            return spanCharacters(w);
        });
    }

    function spanCharacters(word: string, punctuation?: string, isEnglish?: boolean) {
        console.log(word)
        return (
            <>
                <span onClick={word !== ' ' && isEnglish ?
                    () => speak(word) : undefined}
                    className={from === 'AI' && isEnglish ? "AI-words english-word" :
                        isEnglish ? "english-word" : from === "AI" ? "AI-words" : ''}>
                    {word}
                </span>
                <span>
                    {punctuation}
                </span>
            </>
        )
    }
}
