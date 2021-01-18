import { IpcMainClient } from '../IpcMainClient'
import { BaseDefine } from 'electron_ipc_type'
import { BrowserWindow } from 'electron'

describe.skip('测试 IpcMainClient', () => {
    it('基本示例', async () => {
        interface HelloApiDefine extends BaseDefine<'HelloApi'> {
            hello(name: string): string
        }

        const helloApi = IpcMainClient.gen<HelloApiDefine>('HelloApi', new BrowserWindow())
        const str = await helloApi.hello('liuli')
        expect(typeof str).toBe('string')
    })
})
