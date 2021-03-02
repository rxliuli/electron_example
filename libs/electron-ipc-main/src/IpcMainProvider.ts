import { ClassUtil } from '@liuli-util/object'
import { ipcMain } from 'electron'
import { IpcMainDefine } from './IpcMainDefine'
import { BaseDefine } from 'electron-ipc-type'

export class IpcMainProvider {
    private readonly clazzMap = new Map<string, object>()

    /**
     * 计算主进程监听的 key
     * @param namespace
     * @param method
     * @private
     */
    private static getKey<T>(namespace: string, method: PropertyKey) {
        return namespace + '.' + method.toString()
    }

    register<T extends BaseDefine<string>>(namespace: T['namespace'], api: IpcMainDefine<T>): IpcMainDefine<T> {
        const instance = ClassUtil.bindMethodThis(api)
        const methods = ClassUtil.scan(instance)
        methods.forEach((method) => {
            const key = IpcMainProvider.getKey(namespace, method)
            ipcMain.handle(key, instance[method] as any)
            console.log('Register ipcMain.handle: ', key)
        })
        this.clazzMap.set(namespace, instance)
        return instance
    }

    unregister<T extends BaseDefine<string>>(namespace: T['namespace'], api: IpcMainDefine<T>): void {
        const methods = ClassUtil.scan(api)
        methods.forEach((method) => {
            const key = IpcMainProvider.getKey(namespace, method)
            ipcMain.removeHandler(key)
        })
        this.clazzMap.delete(namespace)
    }
}
