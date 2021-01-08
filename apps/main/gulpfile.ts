import { copy, readFile, remove } from 'fs-extra'
import * as path from 'path'
import { parse } from 'yaml'

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

interface LastVersionInfo {
    version: string
    files: [
        {
            url: string
            sha512: string
            size: number
        },
    ]
    path: string
    sha512: string
    releaseDate: string
}

/**
 * 复制需要的二进制资源
 */
export async function copyBuilderInfo() {
    const baseUrl = __dirname
    const yml = await readFile(path.resolve(baseUrl, './release/latest.yml'), {
        encoding: 'utf8',
    })
    const lastInfo = parse(yml) as LastVersionInfo
    const copyFileNameList = ['builder-effective-config.yaml', 'latest.yml', lastInfo.path, `${lastInfo.path}.blockmap`]
    await Promise.all(
        copyFileNameList.map((fileName) =>
            copy(path.resolve(baseUrl, `./release/${fileName}`), path.resolve(baseUrl, `./dist/build/${fileName}`)),
        ),
    )
}

