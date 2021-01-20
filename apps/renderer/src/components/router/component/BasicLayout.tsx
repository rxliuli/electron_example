import * as React from 'react'
import css from './BasicLayout.module.css'
import isElectron from 'is-electron'

type BasicLayoutProps = {}

/**
 * 封装 electron 的窗口控制 hooks
 */
function useElectronWindowControl() {
    function handleMin() {
        throw new Error('no impl')
    }

    function handleMax() {
        throw new Error('no impl')
    }

    function handleClose() {
        throw new Error('no impl')
    }

    return { handleMin, handleMax, handleClose }
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
