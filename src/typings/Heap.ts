import { Collection } from 'discord.js'

export default class Heap<K, V> extends Collection<K, V> {
    public static readonly default: typeof Heap = Heap

    getArr(...keys: K[]): V[] {
        const valArr: V[] = []

        keys.forEach(key => {
            valArr.push(this.get(key) as V) 
        })

        return valArr
    }
}

export type ReadonlyHeap<K, V> = ReadonlyMap<K, V> & Omit<Heap<K, V>, 'forEach' | 'ensure' | 'reverse' | 'sweep' | 'sort' | 'get' | 'set' | 'delete'>