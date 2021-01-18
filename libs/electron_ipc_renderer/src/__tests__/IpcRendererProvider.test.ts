import { IpcRendererProvider } from '../IpcRendererProvider'
import { BaseDefine } from 'electron_ipc_type'

describe.skip('测试 IpcRendererProvider', () => {
    interface HelloApiDefine extends BaseDefine<'HelloApi'> {
        hello(name: string): string
    }

    const ipcRendererProvider = new IpcRendererProvider<HelloApiDefine>('HelloApi')
    it('基本示例', () => {
        ipcRendererProvider.register('hello', async (e, name) => {
            return `hello ${name}`
        })
        ipcRendererProvider.unregister('hello')
    })
    it('测试 hooks', () => {
        ipcRendererProvider.useIpcProvider('hello', async (e, name) => {
            return `hello ${name}`
        })
    })
})
