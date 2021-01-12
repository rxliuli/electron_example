import { copy, remove } from 'fs-extra'
import * as path from 'path'

async function copyByMap(copyMap: [string, string][]) {
    await Promise.all(
        copyMap.map(async ([src, destDir]) => {
            const srcPath = path.resolve(__dirname, src)
            const destPath = path.resolve(__dirname, destDir, path.basename(srcPath))
            await copy(srcPath, destPath)
        }),
    )
}

/**
 * 清理最终生成目录
 */
export async function clean() {
    await remove(path.resolve(__dirname, 'dist'))
    await remove(path.resolve(__dirname, 'release'))
}

/**
 * 复制一些资源到 dist 目录中
 */
export async function copyStatic() {
    await copyByMap([
        ['../renderer/build', 'dist/build'],
    ])
}

