import type { IpcRenderer } from 'electron'
import isElectron from 'is-electron'
import { IpcRendererDefine } from './IpcRendererDefine'
import { NotElectronEnvError } from './NotElectronEnvError'
import { BaseDefine } from 'electron-ipc-type'

export class IpcRendererClient {
    /**
     * 生成一个客户端实例
     * @param namespace
     */
    static gen<T extends BaseDefine<string>>(namespace: T['namespace']): IpcRendererDefine<T> {
        return new Proxy(Object.create(null), {
            get(target: any, api: string): any {
                const key = namespace + '.' + api
                return function (...args: any[]) {
                    const ipcRenderer = IpcRendererClient.getRenderer()
                    if (!ipcRenderer) {
                        throw new NotElectronEnvError('当前你不在 electron 进程中')
                    }
                    return ipcRenderer.invoke(key, ...args)
                }
            },
        })
    }

    /**
     * 获取 electron ipc renderer 实例
     */
    static getRenderer(): IpcRenderer | null {
        if (!isElectron()) {
            return null
        }
        return window.require('electron').ipcRenderer as IpcRenderer
    }
}
