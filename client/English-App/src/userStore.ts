import type { User } from 'firebase/auth'
import { create } from 'zustand'
import type { ProfileData } from './types/index.ts'

type UseGoogleUser = {
    googleUser: null | User,
    setGoogleUser: (params: User | null) => void
}

type UseProfileData = {
    profileData: null | ProfileData,
    setProfileData: (params: ProfileData | null) => void
}

export const useGoogleUser = create<UseGoogleUser>((set) => ({
    googleUser: null,
    setGoogleUser: (actualUser: User | null) => set({ googleUser: actualUser }),
}))

export const useProfileData = create<UseProfileData>((set) => ({
    profileData: { uid: '', level: 0 },
    setProfileData: (actualData: ProfileData | null) => set({ profileData: actualData })
}))