import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useGoogleUser } from '../userStore.ts'
import type { TanstackRouterContext } from '../types/tanstack.ts'

export const Route = createRootRouteWithContext<TanstackRouterContext>()({
    component: RootComponent
})

function RootComponent() {

    const user = useGoogleUser((state) => state.googleUser)
    const navigate = useNavigate()

    useEffect(() => {
        user ? navigate({ to: '/dashboard' }) : navigate({ to: '/login' })

    }, [user])

    return (
        <React.Fragment>
            <Outlet />
            <TanStackRouterDevtools />
        </React.Fragment>
    )
}
