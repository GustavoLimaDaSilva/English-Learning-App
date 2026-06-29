import { useEffect, useState, type ReactElement } from "react";
import Toast from "./toast.tsx";
import { useGoogleUser } from "../userStore.ts";

type StepProps = {
    className: string,
    msg: ReactElement<HTMLParagraphElement>,
    buttonText: string
}

type Steps = StepProps[]

export default function Tutorial() {

    const [index, setIndex] = useState(0)
    const googleUser = useGoogleUser((state) => state.googleUser)
    const username = googleUser?.displayName?.slice(0, googleUser.displayName.indexOf(" "))
    
    useEffect(() => {
        
        if (index < steps.length) return

        sessionStorage.setItem("tutorialToastFired", JSON.stringify(true))
    },[index])

    const steps = [
        {
            className: "unavailable",
            msg: <p>Welcome {username}!<br /> Estamos muito felizes por você ter se juntado a nós!</p>,
            buttonText: "Prosseguir"
        },
        {
            className: "unavailable lessons-available",
            msg: <p>Na área inferior da tela, você encontrará as lições.<br /> Elas sempre são divididas em três partes: <b>explicação</b> da matéria, um <b>vídeo</b> para praticar o listening e um <b>quiz</b> no final.</p>,
            buttonText: "Alright!"
        },
        {
            className: "unavailable decks-available",
            msg: <p>No cartão ao lado esquerdo da tela, é onde você sempre encontrará os <b>quizzes</b> das lições que tiverem sido concluídas e os <b>flashcards</b> criados por você mesmo.</p>,
            buttonText: "Understood!"
        },
        {
            className: "unavailable AI-available",
            msg: <p>Por fim, se você tiver uma dúvida ou só quiser praticar seu inglês, você pode <b>conversar</b> com a nossa IA ao clicar no cartão do lado direito.</p>,
            buttonText: "Okay, let's go!"
        }
    ] satisfies Steps

    return (
        steps[index] &&
        <>
            <div className={`${steps[index].className}`}>
                <Toast msg={steps[index].msg} className="toast tutorial-toast"
                    cb={() => setIndex(prev => prev + 1)} buttonText={steps[index].buttonText} />
            </div>
        </>
    )
}