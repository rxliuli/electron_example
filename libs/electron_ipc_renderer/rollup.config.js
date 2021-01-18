import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default [
    {
        // 入口文件
        input: './src/index.ts',
        output: [
            {
                file: './dist/index.js',
                format: 'cjs',
            },
            {
                file: './dist/index.esm.js',
                format: 'esm',
            },
        ],
        external: [...Object.keys(pkg.dependencies || {})],
        plugins: [
            typescript({
                typescript: require('typescript'),
            }),
        ],
    },
    {
        input: './src/mock/electron.ts',
        output: {
            file: './dist/mock/electron.js',
            format: 'cjs',
        },
        external: [...Object.keys(pkg.dependencies || {})],
        plugins: [
            typescript({
                typescript: require('typescript'),
            }),
        ],
    },
]
