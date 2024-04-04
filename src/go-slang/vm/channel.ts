import { Thread } from './thread'

export class Channel {
  idx: number
  capacity: number
  // this contains the Thread objects that blocked on a send call
  sendBlockedQueue: Thread[]
  // this contains the Thread objects that blocked on a recv call
  recvBlockedQueue: Thread[]
  constructor(idx: number, capacity: number) {
    this.idx = idx
    this.capacity = capacity
    this.sendBlockedQueue = []
    this.recvBlockedQueue = []
  }

  getSendQueue(): Thread[] {
    return this.sendBlockedQueue
  }

  getRecvQueue(): Thread[] {
    return this.recvBlockedQueue
  }
}
