import { useEffect, useState } from "react";
import type { KeyboardKey } from "../types/index.ts";

export default function useKeyEvent(expectedKey: KeyboardKey, cb: () => void) {

    const [keyEvent, setKey] = useState<undefined | KeyboardEvent>()
    const keySetter = (e: KeyboardEvent) => setKey(e)

    useEffect(() => {
        document.addEventListener("keydown", keySetter)

        return () => document.removeEventListener("keydown", keySetter)
    }, [])

    useEffect(() => {

        if (keyEvent?.key === expectedKey) {
            cb()
        }
    }, [keyEvent])

    return keyEvent
}