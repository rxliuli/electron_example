import { app, BrowserWindow, IpcMainInvokeEvent, Notification } from 'electron'
import path = require('path')
import { IpcMainProvider } from 'electron_ipc_main'
import { HelloDefine, WindowDefine } from 'shared_type'
import { IpcMainClient } from 'electron_ipc_main'
import { autoUpdater } from 'electron-updater'

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
        frame: false,
        autoHideMenuBar: true,
    })
    // 载入生产环境的 url
    await mainWindow.loadURL(process.env.ELECTRON_START_URL || path.join(__dirname, './dist/index.html'))
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools()
    }
    return mainWindow
}

class HelloApi {
    async hello(e: IpcMainInvokeEvent, name: string) {
        return `hello ${name}`
    }
}

class WindowApi {
    async action(e: IpcMainInvokeEvent, type: 'min' | 'max' | 'close') {
        const win = BrowserWindow.fromWebContents(e.sender)
        switch (type) {
            case 'min':
                win.minimize()
                break
            case 'max':
                win.isMaximized() ? win.unmaximize() : win.maximize()
                break
            case 'close':
                win.close()
                break
        }
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
        ipcMainProvider.register<WindowDefine>('WindowApi', new WindowApi())
        const mainWindow = await createMainWindow()
        const helloApi = IpcMainClient.gen<HelloDefine>('HelloApi', mainWindow)
        const resp = await helloApi.hello('liuli')
        console.log('resp: ', resp)

        await autoUpdater.checkForUpdates()
        autoUpdater.addListener('update-downloaded', (info) => {
            new Notification({
                title: '更新提醒',
                body: `新版本 ${info.version} 已经准备好，点击立刻更新！`,
            })
                .addListener('click', () => {
                    autoUpdater.quitAndInstall()
                })
                .show()
        })
    })
}

main()
