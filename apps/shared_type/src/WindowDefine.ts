import { BaseDefine } from 'electron_ipc_type'

export interface WindowDefine extends BaseDefine<'WindowApi'> {
    action(type: 'min' | 'max' | 'close'): void
}
