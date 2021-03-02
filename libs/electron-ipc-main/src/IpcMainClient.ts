import { BaseDefine } from 'electron-ipc-type'
import { BrowserWindow, ipcMain } from 'electron'
import { FunctionKeys } from 'utility-types'

/**
 * 转换为一个渲染进程可以调用的 Proxy 对象
 */
export type IpcClientDefine<T extends object> = {
    [P in FunctionKeys<T>]: (...args: Parameters<T[P]>) => Promise<ReturnType<T[P]>>
}

/**
 * 客户端
 */
export class IpcMainClient {
    /**
     * 生成一个客户端实例
     * @param namespace
     * @param win
     */
    static gen<T extends BaseDefine<string>>(namespace: T['namespace'], win: BrowserWindow): IpcClientDefine<T> {
        return new Proxy(Object.create(null), {
            get<K extends FunctionKeys<T>>(target: any, api: K): any {
                const key = namespace + '.' + api
                return function (...args: any[]) {
                    return new Promise<ReturnType<T[K]>>((resolve, reject) => {
                        const id = Date.now() + '-' + Math.random()
                        ipcMain.once(id, (event, err, res) => {
                            console.log('callback: ', err, res)
                            if (err) {
                                reject(err)
                                return
                            }
                            resolve(res)
                        })
                        console.log('send: ', key, id, args)
                        win.webContents.send(key, id, ...(args as any))
                    })
                }
            },
        })
    }
}
