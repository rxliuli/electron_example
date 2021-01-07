import { app, BrowserWindow } from 'electron'
import path = require('path')
import { URL } from 'url'

async function createMainWindow() {
    // 创建新的 electron 窗口
    const mainWindow = new BrowserWindow()
    // 载入生产环境的 url
    await mainWindow.loadURL(new URL(path.join(__dirname, './build/index.html')).href)
}

/**
 * main 函数
 */
async function main() {
    app.on('ready', createMainWindow)
}

main()
