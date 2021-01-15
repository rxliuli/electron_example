import { IpcMainProvider } from '../IpcMainProvider'
import { IpcMainDefine } from '../IpcMainDefine'
import { ipcRenderer } from 'electron'

describe('测试 IpcProvider', () => {
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

        const res = await ipcRenderer.invoke('HelloApi.hello', 'liuli')
        expect(res).toBe('hello liuli')
    })
})
