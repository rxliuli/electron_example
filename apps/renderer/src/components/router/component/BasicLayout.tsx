import * as React from 'react'
import css from './BasicLayout.module.css'
import isElectron from 'is-electron'
import { IpcRendererClient } from 'electron_ipc_renderer'
import { WindowDefine } from 'shared_type/src'

type BasicLayoutProps = {}

const windowApi = IpcRendererClient.gen<WindowDefine>('WindowApi')

/**
 * 封装 electron 的窗口控制 hooks
 */
function useElectronWindowControl() {
    return {
        handleMin: () => windowApi.action('min'),
        handleMax: () => windowApi.action('max'),
        handleClose: () => windowApi.action('close'),
    }
}

function ElectronWindowControl() {
    const { handleMin, handleMax, handleClose } = useElectronWindowControl()
    return (
        <div>
            <button className={css.button} onClick={handleMin}>
                min
            </button>
            <button className={css.button} onClick={handleMax}>
                max
            </button>
            <button className={css.button} onClick={handleClose}>
                close
            </button>
        </div>
    )
}

/**
 * 基本的布局组件
 */
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
    return (
        <div className={css.basicLayout}>
            <div className={css.toolbar}>
                <header>electron_example</header>
                {isElectron() && <ElectronWindowControl />}
            </div>
            <div>{props.children}</div>
        </div>
    )
}

export default BasicLayout
