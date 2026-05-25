
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>
export type { DecksType, DeckType, FlashcardType } from "../../../../shared-types/deck.js"
export type { LessonType } from "../../../../shared-types/lesson.js"
export type { ProfileData } from "../../../../shared-types/user.js"
export { Opts } from "../../../../shared-types/deck.ts"
export type { DeckCardType } from "../../../../shared-types/deck.js"
export type { PlaylistType } from "../../../../shared-types/lesson.js"
export type { LessonVideo } from "../../../../shared-types/lesson.js"

export type KeyboardKey =
    // Alphanumeric & Modifier Keys
    | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m"
    | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
    | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M"
    | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"
    | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
    // Control & Navigation Keys
    | "Enter" | "Backspace" | "Tab" | "Escape" | "Space" | " "
    | "Control" | "Shift" | "Alt" | "Meta" | "CapsLock"
    | "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
    | "Home" | "End" | "PageUp" | "PageDown" | "Delete" | "Insert"
    // Function Keys
    | "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" | "F10" | "F11" | "F12"
    // Punctuation & Symbols
    | "`" | "~" | "!" | "@" | "#" | "$" | "%" | "^" | "&" | "*" | "(" | ")"
    | "-" | "_" | "=" | "+" | "[" | "]" | "{" | "}" | ";" | ":" | "'" | '"'
    | "," | "." | "<" | ">" | "/" | "?" | "\\" | "|";