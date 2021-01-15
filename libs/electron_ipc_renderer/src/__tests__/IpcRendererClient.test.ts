import { IpcMainDefine, IpcMainProvider } from 'electron_ipc_main'
import { IpcRendererClient } from '../IpcRendererClient'
import { IpcRendererDefine } from '../IpcRendererDefine'

describe('测试 IpcRendererClient', () => {
    it('基本示例', async () => {
        interface HelloApiDefine {
            hello(name: string): string
        }

        class HelloApi {
            async hello(e, name: string) {
                return `hello ${name}`
            }
        }

        const ipcProvider = new IpcMainProvider()
        ipcProvider.register<IpcMainDefine<HelloApiDefine>>('HelloApi', new HelloApi())

        const client = IpcRendererClient.gen<IpcRendererDefine<HelloApiDefine>>('HelloApi', ['hello'])
        expect(await client.hello('liuli')).toBe('hello liuli')
    })
})
