import type { User } from "firebase/auth"
import type { ProfileData } from "./index.ts"

export interface TanstackRouterContext {
    getUser: () => User | null,
    getProfileData: () => ProfileData
}
