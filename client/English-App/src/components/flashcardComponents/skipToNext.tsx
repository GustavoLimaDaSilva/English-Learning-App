type SkipToNextProps = {
    skip: (() => void),
}

export default function SkipToNext({ skip }: SkipToNextProps) {

    return (
        <button onClick={() => skip()}>Avançar</button>
    )
}