import { ElectronStore } from '../ElectronStore'
import { Expect } from '@liuli-util/test'

describe('测试 ElectronStore', () => {
    beforeEach(() => {
        localStorage.clear()
    })
    it('基本示例', () => {
        const userStore = ElectronStore.getInstance<{ name: string; age: number }>()
        expect(userStore.name).toBeNull()
        expect(userStore.age).toBeNull()
        userStore.name = 'liuli'
        console.log(userStore.name === 'liuli')
        expect(userStore.name).toBe('liuli')
        userStore.age = 1
        expect(userStore.age).toBe(1)
    })

    it('测试对象', () => {
        type Info = { address: { city: string } }
        const store = ElectronStore.getInstance<{ info: Info }>()
        expect(store.info as Expect<typeof store.info, Info | null>).toBeNull()
        store.info = {
            address: {
                city: '',
            },
        }
        expect(store.info.address.city).toBe('')
    })
})
