import { numInstructions } from './constants'

export class Thread {
  OS: number[]
  E: number
  RTS: number[]
  PC: number
  stepsLeft: number
  isMainThread: boolean
  sleepCount: number
  sleptAt: number

  constructor(
    OS: number[],
    E: number,
    RTS: number[],
    PC: number,
    isMainThread: boolean = false,
    sleptAt: number = 0
  ) {
    this.OS = OS
    this.E = E
    this.RTS = RTS
    this.PC = PC
    this.stepsLeft = numInstructions
    this.isMainThread = isMainThread
    this.sleepCount = 0
    this.sleptAt = sleptAt
  }
}
