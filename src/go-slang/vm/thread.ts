export class Thread {
  OS: number[]
  E: number
  RTS: number[]
  PC: number
  wakeTime: number // denotes the time when the thread was woken up
  sleepStartTime: number // denotes the time that the thread would be put to sleep
  sleepEndTime: number // denotes the time that the thread will sleep until (inclusive)
  isMainThread: boolean

  // sleepEndTime is not in the constructor because it should only be updated in the sleep() builtin function
  constructor(
    OS: number[],
    E: number,
    RTS: number[],
    PC: number,
    wakeTime: number,
    sleepStartTime: number,
    isMainThread: boolean = false
  ) {
    this.OS = OS
    this.E = E
    this.RTS = RTS
    this.PC = PC
    this.wakeTime = wakeTime
    this.sleepStartTime = sleepStartTime
    this.isMainThread = isMainThread
  }
}
