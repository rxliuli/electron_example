import * as React from 'react'
import { Route } from 'react-router'
import { routeList } from '../constant/routeList'
import { useRouteConfigMatch } from '../hooks/useRouteConfigMatch'

type RouteRenderProps = {}

const RouteRender: React.FC<RouteRenderProps> = () => {
    const routeConfigMatch = useRouteConfigMatch(routeList)
    return <Route {...routeConfigMatch} />
}

export default RouteRender
