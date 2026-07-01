import Toast from "./toast.tsx";

export default function FirstLevelUp() {

    
    return (
        <div className="unavailable decks-available">
        <Toast className="toast"
            msg={<p>agora você já pode encontrar o deck da sua lição na área de flashcards!</p>}
            cb={() => localStorage.setItem("levelUpToastFired", JSON.stringify("true"))}
            />
            </div>
    )
}