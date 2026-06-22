import { useEffect, useRef, useState, type Dispatch, type HTMLElementType, type Ref, type SetStateAction } from "react"
import type { StateSetter } from "../types/index.ts"


// type RetValue = <T extends HTMLElementType>(value: StateSetter<boolean>) => Ref<T | null> 

export default function useClickOutside<T extends Element>(showElement: StateSetter<boolean>): Ref<T | null> {

    const elRef = useRef<T | null>(null)
    const [clickToggle, setclickToggle] = useState(false)

    useEffect(() => {

        const checkClickedEl = (e: Event) => {

            const target = e.target as HTMLElement
            setclickToggle(prev => !prev)

            if (e.target !== elRef.current && target.nodeName !== "BUTTON") {
                showElement(false)
            }
        }

        document.body.addEventListener("click", checkClickedEl)
        return () => document.body.removeEventListener("click", checkClickedEl)
    }, [clickToggle])

    return elRef
}