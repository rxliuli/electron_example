import { app, BrowserWindow, IpcMainInvokeEvent } from 'electron'
import path = require('path')
import { IpcMainProvider } from 'electron_ipc_main'
import { HelloDefine } from 'shared_type'

//添加热更新功能
if (process.env.NODE_ENV === 'development') {
    require('electron-reloader')(module)
}

async function createMainWindow() {
    // 创建新的 electron 窗口
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
    })
    // 载入生产环境的 url
    await mainWindow.loadURL(process.env.ELECTRON_START_URL || path.join(__dirname, './build/index.html'))
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools()
    }
}

class HelloApi {
    async hello(e: IpcMainInvokeEvent, name: string) {
        return `hello ${name}`
    }
}

const ipcMainProvider = new IpcMainProvider()

/**
 * main 函数
 */
async function main() {
    app.addListener('ready', async () => {
        if (process.env.NODE_ENV === 'development') {
            // 安装 devtool 扩展
            const {
                default: installExtension,
                REACT_DEVELOPER_TOOLS,
            } = require('electron-devtools-installer') as typeof import('electron-devtools-installer')
            await installExtension(REACT_DEVELOPER_TOOLS)
        }

        ipcMainProvider.register<HelloDefine>('HelloApi', new HelloApi())
        await createMainWindow()
    })
}

main()
