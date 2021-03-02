import type { IpcMain, IpcRenderer } from 'electron'
import { DeepPartial } from 'utility-types'

const map = new Map<string, (...args: any[]) => void>()

export const ipcMain: DeepPartial<IpcMain> = {
    handle: jest.fn((type: string, cb) => map.set(type, cb)),
}

export const ipcRenderer: DeepPartial<IpcRenderer> = {
    invoke: jest.fn(async (type: string, ...args: any) => {
        if (!map.has(type)) {
            throw new Error('未注册: ' + type)
        }
        return map.get(type)!(null, ...args)
    }),
}
