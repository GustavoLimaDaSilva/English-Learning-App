import { useEffect } from "react"
import { useGoogleUser } from "../userStore.ts"

export default function Welcome() {

    useEffect(() => {

        const timeoutID = setTimeout(() => sessionStorage.setItem("welcomeFired", JSON.stringify(true)), 1000)

        return () => clearTimeout(timeoutID)
    }, [])

    const user = useGoogleUser((state) => state.googleUser)
    if (!user) return

    return (
        <div className="welcome animate">
            <p><span className="message">Welcome,</span><br /> <span className="name">{user.displayName?.slice(0, user.displayName.indexOf(' '))}!</span></p>
        </div>
    )
}