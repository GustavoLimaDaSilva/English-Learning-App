import type { User } from "firebase/auth"
import type { DeckType, ProfileData } from "../../../shared-types/API.ts"
let LengthParamsTurple: [number, { error: string }]

export function streamTextEffect(text: string) {

    const everyWord = text.split(' ')

    const el = everyWord.map(w => `<span class='visible'>${w}</span>`).join('')

    return el
}

export function speak(word: string) {

    const utterThis = new SpeechSynthesisUtterance(word)
    utterThis.lang = "en-US"
    window.speechSynthesis.speak(utterThis)
}

export function isEmpty<T extends object>(obj: T): obj is T & Record<string, unknown> {

    return Object.keys(obj).length === 0
}

export async function postProfile(profileData: ProfileData | {}) {

    if (isEmpty(profileData)) return

    await fetch(`https://api-o37g4y27ua-uc.a.run.app/users`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            profile_data: profileData
        })
    })
}

export function postNewLevel(profileData: ProfileData) {

    if (isEmpty(profileData)) return

    fetch(`https://api-o37g4y27ua-uc.a.run.app/users/${profileData.uid}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            profileLevel: profileData.level
        })
    })
}

export async function putUpdatedDeck(updatedDeck: DeckType['cards'], id: string) {

    const req = await fetch(`https://api-o37g4y27ua-uc.a.run.app/decks/updateDeck/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            updatedDeck: updatedDeck
        })
    })
    const res = await req.json()
    console.log(res)
    return res
}

export function minLengthParams(min: number = 4) {

    LengthParamsTurple = [min, { error: 'muito curto' }]
    return LengthParamsTurple
}

export function maxLengthParams(max: number = 80) {

    LengthParamsTurple = [max, { error: 'muito longo' }]
    return LengthParamsTurple
}

