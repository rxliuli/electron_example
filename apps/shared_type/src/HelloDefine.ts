import { BaseDefine } from 'electron_ipc_type'

export interface HelloDefine extends BaseDefine<'HelloApi'> {
    hello(name: string): string
}
