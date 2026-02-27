import { Opts, type FlashcardType,  } from "./shared-types/API.ts"

export function IsCardSingleOption(card: FlashcardType | undefined): card is FlashcardType {

    if ((card as FlashcardType).difficulty) return true
    else return false
}


export function isCardOptions(opt: string): opt is keyof FlashcardType["options"]  {

    return Opts.includes(opt as typeof Opts[number])
} 

export function isObjEmpty(obj: object): obj is {} {

    return Object.keys(obj).length === 0 
}