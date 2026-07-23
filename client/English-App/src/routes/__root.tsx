import * as React from 'react'
import '../App.css'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Nav from '../components/nav.tsx'
import useBeforeRefresh from '../hooks/useBeforeRefresh.tsx'
import Loading from '../components/loading.tsx'
import GlobalError from '../components/globalError.tsx'

export const Route = createRootRouteWithContext()({
    component: RootComponent,
    errorComponent: GlobalError
})

function RootComponent() {

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
