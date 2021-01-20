import * as React from 'react'
import css from './BasicLayout.module.css'
import isElectron from 'is-electron'
import { IpcRendererClient } from 'electron_ipc_renderer'
import { WindowDefine } from 'shared_type/src'
import minimize from '../asset/minimize.svg'
import maximize from '../asset/maximize.svg'
import close from '../asset/close.svg'

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
                <img src={minimize} alt={'minimize'} />
            </button>
            <button className={css.button} onClick={handleMax}>
                <img src={maximize} alt={'maximize'} />
            </button>
            <button className={css.button} onClick={handleClose}>
                <img src={close} alt={'close'} />
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
