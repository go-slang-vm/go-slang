export class Thread {
  OS: number[]
  E: number
  RTS: number[]
  PC: number
  wakeTime: number // denotes the time when the thread was woken up
  sleepStartTime: number // denotes the time that the thread would be put to sleep
  sleepEndTime: number // denotes the time that the thread will sleep until (inclusive)
  isMainThread: boolean

  constructor(
    OS: number[],
    E: number,
    RTS: number[],
    PC: number,
    wakeTime: number,
    sleepStartTime: number,
    sleepEndTime: number,
    isMainThread: boolean = false
  ) {
    this.OS = OS
    this.E = E
    this.RTS = RTS
    this.PC = PC
    this.wakeTime = wakeTime
    this.sleepStartTime = sleepStartTime
    this.sleepEndTime = sleepEndTime
    this.isMainThread = isMainThread
  }
}
