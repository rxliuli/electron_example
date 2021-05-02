import { RouteConfig } from 'react-router-config'
import { lazy } from 'react'

export const routeList: RouteConfig[] = [
    {
        path: '/',
        component: lazy(() => import('../../pages/home')),
        exact: true,
    },
    {
        path: '/settings',
        component: lazy(() => import('../../pages/settings')),
        routes: [
            {
                path: '/settings',
                component: lazy(() => import('../../pages/settings/pages/basic')),
                exact: true,
            },
            {
                path: '/settings/about',
                component: lazy(() => import('../../pages/settings/pages/about')),
            },
        ],
    },
]
