import Toast from "./toast.tsx";

export default function FirstLevelUp() {
    
    return (
        <div className="unavailable decks-available">
        <Toast className="toast levelUp-toast"
            msg={<p>Muito bem! Agora clique em <b>ver flashcards</b> para acessar o quiz da lição que você acabou de completar!</p>}
            />
            </div>
    )
}