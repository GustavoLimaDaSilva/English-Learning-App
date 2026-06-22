import * as React from 'react'
import '../App.css'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useGoogleUser } from '../userStore.ts'
import type { TanstackRouterContext } from '../types/tanstack.ts'
import Nav from '../components/nav.tsx'
import useBeforeRefresh from '../hooks/useBeforeRefresh.tsx'
import Loading from '../components/loading.tsx'

export const Route = createRootRouteWithContext<TanstackRouterContext>()({
    component: RootComponent
})

function RootComponent() {

    const user = useGoogleUser((state) => state.googleUser)
    const isLoading = useBeforeRefresh()

    return (
        <React.Fragment>
            {user && <Nav />}
            <div className="grandient-background">
                {isLoading ?
                    <Loading />
                    :
                    <Outlet />}
            </div>
            <TanStackRouterDevtools />
        </React.Fragment>
    )
}
