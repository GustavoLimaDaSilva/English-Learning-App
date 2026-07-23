export default function GlobalError() {

    return (
        <div className="grandient-background">
            <div className="internal-error">
                <p>
                    Oops! Parece que algo deu errado!
                </p>
                <p className='reload' onClick={() => {
                    window.location.reload()
                }}>
                    Recarregue a página
                </p>
            </div>
        </div>
    )
}