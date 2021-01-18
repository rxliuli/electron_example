import { FunctionKeys } from 'utility-types'

/**
 * 转换为一个渲染进程可以调用的 Proxy 对象
 */
export type IpcRendererDefine<T extends object> = {
    [P in FunctionKeys<T>]: (...args: Parameters<T[P]>) => Promise<ReturnType<T[P]>>
}
