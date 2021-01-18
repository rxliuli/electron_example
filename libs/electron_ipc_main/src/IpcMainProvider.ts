import { ClassUtil } from '@liuli-util/object'
import { ipcMain } from 'electron'
import { IpcMainDefine } from './IpcMainDefine'

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

    register<T extends { namespace: string }>(
        namespace: IpcMainDefine<T>[0],
        api: IpcMainDefine<T>[1],
    ): IpcMainDefine<T>[1] {
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

    unregister<T extends { namespace: string }>(namespace: IpcMainDefine<T>[0], api: IpcMainDefine<T>[1]): void {
        const methods = ClassUtil.scan(api)
        methods.forEach((method) => {
            const key = IpcMainProvider.getKey(namespace, method)
            ipcMain.removeHandler(key)
        })
        this.clazzMap.delete(namespace)
    }
}
