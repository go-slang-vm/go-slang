import { Channel } from "./channel"
import { Thread } from "./thread"

export class GlobalState {
  OS: number[] = []
  E: number = 0
  RTS: number[] = []
  ALLOCATING: number[] = []
  THREADQUEUE: Thread[] = []
  CHANNELARRAY: Channel[] = []
}

export const globalState = new GlobalState()
