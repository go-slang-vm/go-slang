import { channel_buffer, word_size } from "./constants"

// NOTE NO BOUNDS CHECKING, ASSUMED TO ONLY BE USED IN CHANNEL WHICH ALREADY DOES BOUNDS CHECKING
export class LowLevelQueue {
    // first 3 words of the byte array are the head, tail and size (sz in number of words) respectively
    // byteArray: ArrayBuffer | null
    dataView: DataView | null


    constructor(sz: number, data: DataView) {
        // this.byteArray = new ArrayBuffer((sz + channel_buffer + 3) * word_size)
        this.dataView = data
        this.setSize(sz + channel_buffer)
        this.setHead(0)
        this.setTail(0)
    }

    setSize(sz: number) {
        this.setWordAtIndex(2, sz)
    }

    getSize(): number {
        return this.getWordAtIndex(2)
    }

    size(): number {
        return (this.getTail() - this.getHead() + this.getSize()) % this.getSize()
    }

    push(val: number) {
        // IMPORTANT NOTE, WE ARE NOT CHECKING THAT QUEUE IS FULL AND ASSUME THAT CHANNEL IMPLEMENTATION IS CORRECT
        // IF CHANNEL IMPLEMENTATION IS WRONG, THIS IS POTENTIALLY WRONG AND WILL CAUSE OVERRIDING ERRORS
        const tailIdx = this.getTail()
        this.setWordAtIndex(tailIdx + 3, val)
        this.setTail((tailIdx + 1) % this.getSize())
    }

    pop(): number {
        if (this.empty()) {
            throw new Error('low level queue is empty')
        }
        const headIdx = this.getHead()
        const res = this.getWordAtIndex(headIdx + 3)
        this.setHead((headIdx + 1) % this.getSize())
        return res
    }

    getTail(): number {
        return this.getWordAtIndex(1)
    }

    getHead(): number {
        return this.getWordAtIndex(0)
    }

    setHead(val: number) {
        this.setWordAtIndex(0, val)
    }

    setTail(val: number) {
        this.setWordAtIndex(1, val)
    }

    getWordAtIndex(idx: number): number {
        const view = this.getDataView()
        return view.getFloat64(idx * word_size)
    }

    setWordAtIndex(idx: number, val: number) {
        const view = this.getDataView()
        view.setFloat64(idx * word_size, val)
    }

    clear() {
        // this.byteArray = null
        this.dataView = null
    }

    peek(): number {
        return this.getWordAtIndex(this.getHead() + 3)
    }

    empty(): boolean {
        return this.getHead() == this.getTail()
    }

    getDataView(): DataView {
        if (this.dataView === null) {
            throw new Error('low level queue has either not been initialized or has been freed')
        } else {
            return this.dataView
        }
    }

    getAllItems(): number[] {
        const items: number[] = []
        let curPointer = this.getHead()
        while (curPointer != this.getTail()) {
            const item = this.getWordAtIndex(curPointer + 3)
            items.push(item)
            curPointer = (curPointer + 1) % this.getSize()
        }
        return items
    }
}
