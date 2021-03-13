import { BaseDefine } from 'electron-ipc-type'

export interface WindowDefine extends BaseDefine<'WindowApi'> {
    action(type: 'min' | 'max' | 'close'): void
}
