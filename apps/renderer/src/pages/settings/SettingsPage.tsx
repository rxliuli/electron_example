import * as React from 'react'
import { Suspense } from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { Layout, Menu } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import { useHistory } from 'react-router'
import css from './SettingsPage.module.css'

type SettingsPageProps = {}

export const SettingsPage: React.FC<SettingsPageProps & RouteConfigComponentProps> = (
    props,
) => {
    const history = useHistory()

    function onGoto(info: MenuInfo) {
        console.log('onGoto: ', info.key)
        history.push(info.key as string)
    }

    return (
        <Layout className={css.settingsPage}>
            <Layout.Sider className={css.sider}>
                <h2 className={css.logo}>设置</h2>
                <Menu onClick={onGoto}>
                    <Menu.Item key={'/settings'}>通用</Menu.Item>
                    <Menu.Item key={'/settings/about'}>关于</Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout.Content className={css.content}>
                <Suspense fallback={'loading...'}>
                    {renderRoutes(props.route!.routes)}
                </Suspense>
            </Layout.Content>
        </Layout>
    )
}
