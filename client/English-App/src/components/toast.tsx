import type { ReactElement } from "react"

type ToastProps = {
    toastFired?: boolean,
    msg: ReactElement<HTMLParagraphElement>,
    className: string,
    buttonText?: string,
    cb?: () => void
} 
export default function Toast({ msg, className, cb, buttonText }: ToastProps) {

    return (
        <div className={className}>
            {msg}
            {cb &&
                <button onClick={() => cb()}>
                    {buttonText}
                </button>
            }
        </div>
    )
}