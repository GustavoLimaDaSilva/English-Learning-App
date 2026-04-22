import { createFileRoute } from '@tanstack/react-router'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../../../firebaseConfig.ts'
import { useGoogleUser } from '../userStore.ts'
import useAnimate from '../hooks/useAnimate.tsx'
import loginElements from '../toBeAnimated/loginElements.tsx'
import googleIcon from "../assets/icons8-google-logo.svg"

export const Route = createFileRoute('/login')({
    component: Login
})

function Login() {

    const setUser = useGoogleUser((state) => state.setGoogleUser)
    const [animatedEl] = useAnimate(loginElements)

    return (
        <div className='body-wrapper'>
        <div className='login-wrapper'>
            <div className='login-actions'>
                <h1>Login</h1>
                <small className='disclaimer'>Priorizamos seu conforto.</small>
                <small>Apenas entre com sua conta Google para iniciarmos.</small>
                <small> Não se preocupe, não teremos acesso a nenhum dado sensível.</small>
                </div>
                <button className='login-button' onClick={loginGoogle}>Entrar com o Google<img src={googleIcon} /></button>
                {animatedEl}
            </div>
        </div>
    )

    async function loginGoogle() {

        const provider = new GoogleAuthProvider()

        try {
            const data = await signInWithPopup(auth, provider)
            setUser(data.user)

        } catch (err) {
            console.error("the following happened at loginGoogle: " + err)
        }
    }
}