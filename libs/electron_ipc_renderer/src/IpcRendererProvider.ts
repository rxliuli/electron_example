import { IpcRendererClient } from './IpcRendererClient'
import { DependencyList, useEffect } from 'react'
import { BaseDefine } from 'electron_ipc_type'
import { FunctionKeys } from 'utility-types'

type IpcRendererProviderDefine<T extends BaseDefine<string>, P extends FunctionKeys<T> = FunctionKeys<T>> = [
    type: P,
    callback: (e: any, ...args: Parameters<T[P]>) => Promise<ReturnType<T[P]>>,
]

type IpcRendererProviderHooksDefine<T extends BaseDefine<string>, P extends FunctionKeys<T> = FunctionKeys<T>> = [
    type: P,
    callback: (e: any, ...args: Parameters<T[P]>) => Promise<ReturnType<T[P]>>,
    deps?: DependencyList,
]

/**
 * 在渲染层管理提供者
 */
export class IpcRendererProvider<T extends BaseDefine<any>> {
    private apiMap = new Map<string, (...args: any[]) => any>()

    constructor(private namespace: T['namespace']) {}

    register(...[type, callback]: IpcRendererProviderDefine<T>) {
        const ipcRenderer = IpcRendererClient.getRenderer()
        if (ipcRenderer === null) {
            console.warn('不在 electron 环境，取消注册: ', type)
            return
        }
        const key = this.namespace + '.' + type
        console.log('IpcRendererProvider.register: ', key)
        const listener = async (event: any, id: string, ...args: any[]) => {
            try {
                console.log('IpcRendererProvider.listener: ', event, id, args)
                const res = await callback(event, ...(args as any))
                await ipcRenderer.send(id, null, res)
            } catch (e) {
                await ipcRenderer.send(id, e)
            }
        }
        ipcRenderer.on(key, listener)
        this.apiMap.set(key, listener)
    }

    unregister(type: IpcRendererProviderDefine<T>[0]) {
        const ipcRenderer = IpcRendererClient.getRenderer()
        if (ipcRenderer === null) {
            return
        }
        const key = this.namespace + '.' + type
        ipcRenderer.off(key, this.apiMap.get(key)!)
        this.apiMap.delete(key)
    }

    /**
     * react 中的注册钩子，自动管理清理的操作
     * @param type
     * @param callback
     * @param deps
     */
    useIpcProvider(...[type, callback, deps = []]: IpcRendererProviderHooksDefine<T>) {
        useEffect(() => {
            this.register(type, callback)
            return () => this.unregister(type)
        }, deps)
    }
}
