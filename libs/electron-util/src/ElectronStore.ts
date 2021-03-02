import type Store from 'electron-store'
import isElectron from 'is-electron'
import { DeepReadonly } from 'utility-types'

interface BaseStore {
    get(key: string): string | null

    set(key: string, value: string): void
}

class ElectronStoreImpl implements BaseStore {
    private store: Store

    constructor() {
        const Store = window.require('electron-store')
        this.store = new Store()
    }

    set(key: string, value: string): void {
        this.store.set(key, value)
    }

    get(key: string) {
        return this.store.get(key) as string
    }
}

class LocalStorageImpl implements BaseStore {
    get(key: string) {
        return localStorage.getItem(key)
    }

    set(key: string, value: string) {
        localStorage.setItem(key, value)
    }
}

const symbol = Symbol('ElectronStore.store')

export class ElectronStore {
    private readonly [symbol]: BaseStore = isElectron() ? new ElectronStoreImpl() : new LocalStorageImpl()

    static getInstance<T extends object>(init?: Partial<T>): Partial<{ [P in keyof T]: DeepReadonly<T[P]> }> {
        const electronStore = new ElectronStore()

        const proxy = new Proxy({} as any, {
            get(target: any, p: string): any {
                const text = electronStore[symbol].get(p)
                try {
                    if (text === null || text === undefined) {
                        return null
                    }
                    return JSON.parse(text)
                } catch (e) {
                    return null
                }
            },
            set(target: any, p: string, value: any): boolean {
                electronStore[symbol].set(p, value !== undefined && value !== null ? JSON.stringify(value) : value)
                return true
            },
        })
        if (init) {
            Object.entries(init).forEach(([k, v]) => {
                const text = electronStore[symbol].get(k)
                if (text === null || text === undefined) {
                    proxy[k] = v
                }
            })
        }
        return proxy
    }
}
