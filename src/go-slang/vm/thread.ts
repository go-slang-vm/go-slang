import { numInstructions } from './constants'

export class Thread {
  OS: number[]
  E: number
  RTS: number[]
  PC: number
  instructionsRemaining: number
  isMainThread: boolean

  constructor(OS: number[], E: number, RTS: number[], PC: number, isMainThread: boolean = false) {
    this.OS = OS
    this.E = E
    this.RTS = RTS
    this.PC = PC
    this.instructionsRemaining = numInstructions
    this.isMainThread = isMainThread
  }
}
