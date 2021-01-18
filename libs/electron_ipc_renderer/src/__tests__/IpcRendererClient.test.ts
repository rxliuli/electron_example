import { IpcRendererClient } from '../IpcRendererClient'
import { IpcMainInvokeEvent } from 'electron'
import { IpcMainProvider } from 'electron_ipc_main'

describe('测试 IpcRendererClient', () => {
    it.skip('基本示例', async () => {
        interface HelloApiDefine {
            namespace: 'HelloApi'

            hello(name: string): string
        }

        class HelloApi {
            async hello(e: IpcMainInvokeEvent, name: string) {
                return `hello ${name}`
            }
        }

        const ipcProvider = new IpcMainProvider()
        ipcProvider.register<HelloApiDefine>('HelloApi', new HelloApi())

        const client = IpcRendererClient.gen<HelloApiDefine>('HelloApi')
        expect(await client.hello('liuli')).toBe('hello liuli')
    })
})
