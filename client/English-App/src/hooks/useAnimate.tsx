import { useEffect, useState } from "react"

export default function useAnimate(elements: Array<Record<string, React.ReactNode>> = []) {

    const ONSCREEN_DURATION = 3500
    const [animatedEl, setAnimatedEl] = useState<React.ReactNode[] | undefined>()
    const [offset, setOffset] = useState(0)

    useEffect(() => {

        if (offset === elements.length) return
                
        const currentEl = elements[offset]
        const JSXchildren = []
        const intervalID = setInterval(() => setOffset(prev => prev + 1), ONSCREEN_DURATION)

        for (const key in currentEl) {

            JSXchildren.push(currentEl[key])
        }
        setAnimatedEl(JSXchildren)
        return () => {
            clearInterval(intervalID)
        }
    }, [offset])


    return [animatedEl]
}