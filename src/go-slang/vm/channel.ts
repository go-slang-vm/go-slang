import { LowLevelQueue } from './lowlevelqueue'
import { Thread } from './thread'

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
  constructor(idx: number, capacity: number, buffer: DataView) {
    this.idx = idx
    this.capacity = capacity
    this.items = new LowLevelQueue(capacity, buffer)
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
      throw new Error('Channel is empty should not have been popped')
    }
    // NOTE: this pop method removes the item from the FRONT of the queue; it is not the same as the pop method in the JS array class
    return this.items.pop()
  }

  getSendQueue(): Thread[] {
    return this.sendBlockedQueue
  }

  getRecvQueue(): Thread[] {
    return this.recvBlockedQueue
  }
}
