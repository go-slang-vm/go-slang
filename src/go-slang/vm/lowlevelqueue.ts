// NOTE NO BOUNDS CHECKING, ASSUMED TO ONLY BE USED IN CHANNEL WHICH ALREADY DOES BOUNDS CHECKING
export class LowLevelQueue {
  // first 2 words of the byte array are the head and tail respectively
  byteArray: ArrayBuffer | null
  dataView: DataView | null
  word_size = 8
  // sz in number of words
  sz: number
  BUFFER = 7

  constructor(sz: number) {
    this.byteArray = new ArrayBuffer((sz + this.BUFFER + 2) * this.word_size)
    this.dataView = new DataView(this.byteArray)
    this.sz = sz + this.BUFFER
    this.setHead(0)
    this.setTail(0)
  }

  size(): number {
    return (this.getTail() - this.getHead() + this.sz) % this.sz
  }

  push(val: number) {
    const tailIdx = this.getTail()
    this.setWordAtIndex(tailIdx + 2, val)
    this.setTail((tailIdx + 1) % this.sz)
  }

  pop(): number {
    const headIdx = this.getHead()
    const tailIdx = this.getTail()
    if (tailIdx - headIdx <= 1) {
      // note: it should never be possible for the difference to be less than 1
      throw new Error('low level queue is empty')
    }
    const res = this.getWordAtIndex(headIdx + 2)
    this.setHead((headIdx + 1) % this.sz)
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
    return view.getFloat64(idx * this.word_size)
  }

  setWordAtIndex(idx: number, val: number) {
    const view = this.getDataView()
    view.setFloat64(idx * this.word_size, val)
  }

  clear() {
    this.byteArray = null
    this.dataView = null
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
      const item = this.getWordAtIndex(curPointer + 2)
      items.push(item)
      curPointer = (curPointer + 1) % this.sz
    }
    return items
  }
}
