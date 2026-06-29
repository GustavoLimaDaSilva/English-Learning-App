import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { browserSessionPersistence, getAuth, type Auth } from "firebase/auth";
import { useGoogleUser, useProfileData } from "../userStore.ts";
import { getStoredProfile, isEmpty } from "../utils.ts";

export default function useBeforeRefresh() {

    const [isLoading, setIsLoading] = useState(true)
    const auth = getAuth();
    const setGoogleUser = useGoogleUser(state => state.setGoogleUser)
    const googleUser = useGoogleUser(state => state.googleUser)
    const setProfileData = useProfileData(state => state.setProfileData)

    const location = useLocation()
    sessionStorage.setItem("location", JSON.stringify(`${location.href}`))

    const navigate = useNavigate({})

    useEffect(() => {


        auth.setPersistence(browserSessionPersistence).then(async () => {

            const persistedUser = getPersistedUser(auth)
            if (persistedUser) {
                const storedProfile = await getStoredProfile(persistedUser.uid)
                if (!isEmpty(storedProfile)) {
                    setProfileData(storedProfile)
                }
            }
            setGoogleUser(persistedUser)
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {

        const pastLocation = getPastLocation()
        if (isLoading && pastLocation === "/") navigate({ to: "/login" })
        else if (isLoading) return

        if (!googleUser) {
            navigate({ to: "/login" })
        }
        else if (googleUser && pastLocation === "/login") {
            navigate({ to: "/dashboard" })
        }
        else {
            navigate({ to: pastLocation })
        }
    }, [googleUser, isLoading])

    return isLoading
}

function getPastLocation() {
    const raw = sessionStorage.getItem("location")
    if (!raw) return

    const pastLocation = JSON.parse(raw)
    return pastLocation
}

function getPersistedUser(auth: Auth) {

    return auth.currentUser
}