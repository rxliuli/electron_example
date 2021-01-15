import type { IpcRenderer } from 'electron'
import isElectron from 'is-electron'
import { IpcRendererDefine } from './IpcRendererDefine'

export class IpcRendererClient {
    /**
     * 生成一个客户端实例
     * @param namespace
     * @param apiList
     */
    static gen<T>(namespace: string, apiList: (keyof T)[]): IpcRendererDefine<T> {
        return apiList.reduce((res, api) => {
            const key = namespace + '.' + api
            res[api] = (...args: any[]) => {
                const ipcRenderer = IpcRendererClient.getRenderer()
                if (!ipcRenderer) {
                    throw new Error('当前你不在 electron 进程中')
                }
                return ipcRenderer.invoke(key, ...args)
            }
            return res
        }, {} as any)
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
