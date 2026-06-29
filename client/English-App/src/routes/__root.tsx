import * as React from 'react'
import '../App.css'
import { Outlet, createRootRouteWithContext, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useEffect, useState } from 'react'
import { useGoogleUser } from '../userStore.ts'
import type { TanstackRouterContext } from '../types/tanstack.ts'
import Nav from '../components/nav.tsx'
import useBeforeRefresh from '../hooks/useBeforeRefresh.tsx'
import Loading from '../components/loading.tsx'

export const Route = createRootRouteWithContext()({
    component: RootComponent
})

function RootComponent() {

    const user = useGoogleUser((state) => state.googleUser)
    const isLoading = useBeforeRefresh()

    return (
        <React.Fragment>
            {!isLoading && <Nav />}
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
