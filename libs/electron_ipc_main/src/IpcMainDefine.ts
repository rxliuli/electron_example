import type { IpcMainInvokeEvent } from 'electron'
import { FunctionKeys } from 'utility-types'

/**
 * 转换为一个主进程可以实现的接口
 */
export type IpcMainDefine<T extends object> = {
    [P in FunctionKeys<T>]: (e: IpcMainInvokeEvent, ...args: Parameters<T[P]>) => Promise<ReturnType<T[P]>>
}
