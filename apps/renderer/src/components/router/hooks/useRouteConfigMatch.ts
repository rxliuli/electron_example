import { useLocation } from 'react-router'
import { useMemo } from 'react'
import { matchRoutes, RouteConfig } from 'react-router-config'
import { treeToList } from '@liuli-util/tree'

/**
 * 获取当前路由匹配的路由定义配置，用以获取配置中的元数据（{@link RouteConfig.meta} 字段）
 * @param routeList
 */
export function useRouteConfigMatch<T extends string>(routeList: RouteConfig[]): RouteConfig | null {
    const location = useLocation()
    //获取严格匹配的路由
    const [route] = useMemo(() => matchRoutes(routeList, location.pathname).filter((route) => route.match.isExact), [
        location.pathname,
        routeList,
    ])
    if (!route) {
        return null
    }
    const routeAllList = treeToList(routeList, { id: 'path', children: 'routes', path: 'path' })
    return routeAllList.find((ro) => {
        const path = route.route.path as string
        if (Array.isArray(ro.path)) {
            return ro.path.includes(path)
        }
        return ro.path === path
    })!
}
