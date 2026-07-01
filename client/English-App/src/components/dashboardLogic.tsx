import { useEffect } from "react";
import { isEmpty, postProfile } from "../utils.ts";
import type { ProfileData } from "../types/index.ts";
import { useGoogleUser, useProfileData } from "../userStore.ts";

export default function DashboardLogic({ children, storedProfile }: { children: React.ReactNode, storedProfile: ProfileData | Record<string, never> }) {

    const user = useGoogleUser((state) => state.googleUser)
    const profileData = useProfileData((state) => state.profileData)
    const setProfileData = useProfileData((state) => state.setProfileData)
   
    useEffect(() => {

        const levelUp = profileData.level > storedProfile.level
        if (levelUp) return

        initializeProfile()
    }, [storedProfile])

    return (
        <>
            {children}
        </>
    )

    async function initializeProfile() {

        if (!user?.uid) return
        const newProfile = { uid: user!.uid, level: 0 }

        if (isEmpty(storedProfile)) {

            setProfileData(newProfile)
            await postProfile(newProfile)
            return
        }
        setProfileData(storedProfile)
    }
}