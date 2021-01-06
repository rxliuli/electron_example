import { app, BrowserWindow } from 'electron'

async function createMainWindow() {
    // 创建新的 electron 窗口
    const mainWindow = new BrowserWindow()
    // 载入开发环境的 url
    await mainWindow.loadURL('http://localhost:3000/')
}

/**
 * main 函数
 */
async function main() {
    app.on('ready', createMainWindow)
}

main()
