
type props = {
    isCorrect: boolean,
    isLastCard: boolean
}

export default function DisplayFeedback({ isCorrect, isLastCard }: props) {

    return (
        <p>{isLastCard ? 'Muito bem' 
            :
            isCorrect ?  'Correto'
            :
                         'Errado' 
            }!
        </p>
    )
}