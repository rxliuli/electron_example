import React, { useState } from 'react'
import { IpcRendererClient, IpcRendererProvider, NotElectronEnvError } from 'electron-ipc-renderer'
import { HelloDefine } from 'shared-type'

const helloApi = IpcRendererClient.gen<HelloDefine>('HelloApi')
const ipcRendererProvider = new IpcRendererProvider<HelloDefine>('HelloApi')

export const App: React.FC = () => {
    const [text, setText] = useState('')

    async function onSend() {
        try {
            const str = await helloApi.hello('liuli')
            console.log('onSend: ', str)
            setText(str)
        } catch (e) {
            if (e instanceof NotElectronEnvError) {
                window.alert('发送失败，当前不是 Electron 环境')
            }
        }
    }

    function onClear() {
        setText('')
    }

    ipcRendererProvider.useIpcProvider(
        'hello',
        async (e, name) => {
            console.log('ipcRendererProvider.useIpcProvider: ', name)
            return `hello ${name}`
        },
        [],
    )

    return (
        <div>
            <header>
                <h2>App</h2>
            </header>
            <div>
                <div>
                    <button onClick={onSend}>发送</button>
                    <button onClick={onClear}>清理</button>
                </div>
                <p>{text}</p>
            </div>
        </div>
    )
}
