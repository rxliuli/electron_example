import { BaseDefine } from 'electron-ipc-type'

export interface HelloDefine extends BaseDefine<'HelloApi'> {
    hello(name: string): string
}
