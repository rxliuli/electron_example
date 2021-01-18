import React, { useState } from 'react'
import { IpcRendererClient, NotElectronEnvError } from 'electron_ipc_renderer'
import { HelloDefine } from 'shared_type'

const helloApi = IpcRendererClient.gen<HelloDefine>('HelloApi', ['hello'])

function App() {
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

export default App
