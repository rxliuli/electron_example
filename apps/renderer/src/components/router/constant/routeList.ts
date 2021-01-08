import { RouteConfig } from 'react-router-config'
import { createElement, lazy } from 'react'

export const routeList: RouteConfig[] = [
    {
        path: '/',
        component: lazy(() => import('../../../pages/home/App')),
        exact: true,
    },
    {
        path: '/home',
        component: () => createElement('div', { children: 'home' }),
    },
]
