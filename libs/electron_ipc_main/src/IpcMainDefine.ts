import type { IpcMainInvokeEvent } from 'electron'

type FilteredKeys<T, U> = {
    [P in keyof T]: T[P] extends U ? P : never
}[keyof T]

/**
 * 转换为一个主进程可以实现的接口
 */
export type IpcMainDefine<T> = {
    [P in FilteredKeys<T, (...args: any[]) => void>]: (
        e: IpcMainInvokeEvent,
        ...args: Parameters<T[P]>
    ) => Promise<ReturnType<T[P]>>
}
