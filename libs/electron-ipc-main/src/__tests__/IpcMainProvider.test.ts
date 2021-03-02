import { IpcMainProvider } from '../IpcMainProvider'
import { IpcMainInvokeEvent, ipcRenderer } from 'electron'

describe('测试 IpcProvider', () => {
    it('基本示例', async () => {
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

        const res = await ipcRenderer.invoke('HelloApi.hello', 'liuli')
        expect(res).toBe('hello liuli')
    })
})
