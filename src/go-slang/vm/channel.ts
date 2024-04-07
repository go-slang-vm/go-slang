import { LowLevelQueue } from "./lowlevelqueue"
import { Thread } from "./thread"

export class Channel {
    idx: number
    capacity: number
    // this contains the heap addresses of the items to be read out
    // items: number[]
    items: LowLevelQueue
    // this contains the Thread objects that blocked on a send call
    sendBlockedQueue: Thread[]
    // this contains the Thread objects that blocked on a recv call
    recvBlockedQueue: Thread[]
    constructor(idx: number, capacity: number) {
        this.idx = idx
        this.capacity = capacity
        this.items = new LowLevelQueue(capacity)
        this.sendBlockedQueue = []
        this.recvBlockedQueue = []
    }

    clear() {
        this.items.clear()
        this.sendBlockedQueue = []
        this.recvBlockedQueue = []
    }

    pushToItemQueue(item: number) {
        this.items.push(item)
    }

    popFromItemQueue(): number {
        if (this.items.getSize() == 0) {
            throw new Error("Channel is empty should not have been popped")
        }
        return this.items.pop()
    }

    getSendQueue(): Thread[] {
        return this.sendBlockedQueue
    }

    getRecvQueue(): Thread[] {
        return this.recvBlockedQueue
    }
}