import { Link } from "@tanstack/react-router";
import { useGoogleUser, useProfileData } from "../userStore.ts";

export default function Nav() {

    const user = useGoogleUser((state) => state.googleUser)
    const profileData = useProfileData((state) => state.profileData)
    if (!user) return

    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link to={'/dashboard'}>dashboard</Link>
                </li>
                <li>
                    <Link to={`/decks/${user.uid}`} search={{ level: profileData.level ?? 0 }}>decks</Link>
                </li>
                <li>
                    <Link to={'/chat'}>chat</Link>
                </li>
            </ul>
        </nav>
    )
}