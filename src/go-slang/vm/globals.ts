import { Channel } from './channel'
import { Thread } from './thread'

export class GlobalState {
  OS: number[] = []
  E: number = 0
  RTS: number[] = []
  ALLOCATING: number[] = []
  THREADQUEUE: Thread[] = []
  CHANNELARRAY: Channel[] = []
  BLOCKEDQUEUE: { [key: number]: Set<Thread> } = {}
  WAITGROUPS_COUNT: number = 0
}

export let globalState = new GlobalState()

export function resetGlobalState() {
  globalState = new GlobalState()
}