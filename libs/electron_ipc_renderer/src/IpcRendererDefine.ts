type FilteredKeys<T, U> = {
    [P in keyof T]: T[P] extends U ? P : never
}[keyof T]

/**
 * 转换为一个渲染进程可以调用的 Proxy 对象
 */
export type IpcRendererDefine<T> = {
    [P in FilteredKeys<T, (...args: any[]) => void>]: (...args: Parameters<T[P]>) => Promise<ReturnType<T[P]>>
}
