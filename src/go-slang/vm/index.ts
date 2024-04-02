import { Heap } from './heap'
import { globalState } from './globals'
import {
  pop,
  push,
  peek,
  is_boolean,
  is_null,
  is_number,
  is_string,
  is_undefined,
  word_to_string
} from './utils'
import { Instruction } from './types'
import { Thread } from './thread'
import { Channel_tag, numInstructions } from './constants'
import { Channel } from './channel'

export class VM {
  heapInstance: Heap
  curThread: Thread
  lastInstructionIndex: number
  globalTime: number // a global counter to keep track of number of steps executed by the VM
  // builtins: builtin id is encoded in second byte
  // [1 byte tag, 1 byte id, 3 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // Note: #children is 0
  builtins: { [key: string]: { tag: string; id: number; arity: number } } = {}
  builtin_array: (() => number | void)[] = []

  constructor(heapsize_words: number) {
    this.heapInstance = new Heap()
    let i = 0
    for (const key in this.builtin_implementation) {
      this.builtins[key] = { tag: 'BUILTIN', id: i, arity: this.builtin_implementation[key].length }
      this.builtin_array[i++] = this.builtin_implementation[key]
    }
    this.initialise_machine(heapsize_words)
    this.curThread = new Thread(
      globalState.OS,
      globalState.E,
      globalState.RTS,
      0, // PC
      0, // wakeTime
      numInstructions, // sleepStartTime
      true
    )
    this.globalTime = 0
  }

  // in this machine, the builtins take their
  // arguments directly from the operand stack,
  // to save the creation of an intermediate
  // argument array
  builtin_implementation: { [key: string]: () => number | void } = {
    Println: () => {
      const address = pop(globalState.OS)
      const value = this.address_to_TS_value(address)
      console.log({ value })
    },
    sleep: () => {
      const address = pop(globalState.OS)
      // before switching threads, we complete the apply_builtin() function by popping fun off the stack and pushing undefined
      pop(globalState.OS) // pop fun
      push(globalState.OS, undefined)
      const steps: number = this.address_to_TS_value(address)
      this.curThread.sleepEndTime = this.globalTime + steps

      // if the current thread has slept past the time allocated to it
      if (this.curThread.sleepEndTime >= this.curThread.sleepStartTime) {
        // while the current thread is sleeping
        while (this.curThread.sleepEndTime >= this.curThread.sleepStartTime) {
          // swap out the current thread
          this.contextSwitch()
        }
      } else {
        // otherwise, we fast-forward globalTime by the number of steps the current thread is supposed to sleep
        this.globalTime = this.curThread.sleepEndTime
      }
    },
    is_number: () =>
      this.heapInstance.is_Number(pop(globalState.OS))
        ? this.heapInstance.True
        : this.heapInstance.False,
    is_boolean: () =>
      this.heapInstance.is_Boolean(pop(globalState.OS))
        ? this.heapInstance.True
        : this.heapInstance.False,
    is_undefined: () =>
      this.heapInstance.is_Undefined(pop(globalState.OS))
        ? this.heapInstance.True
        : this.heapInstance.False,
    is_string: () =>
      this.heapInstance.is_String(pop(globalState.OS))
        ? this.heapInstance.True
        : this.heapInstance.False,
    is_function: () =>
      this.heapInstance.is_Closure(pop(globalState.OS))
        ? this.heapInstance.True
        : this.heapInstance.False,
    pair: () => {
      const tl = pop(globalState.OS)
      const hd = pop(globalState.OS)
      return this.heapInstance.heap_allocate_Pair(hd, tl)
    },
    is_pair: () =>
      this.heapInstance.is_Pair(pop(globalState.OS))
        ? this.heapInstance.True
        : this.heapInstance.False,
    head: () => this.heapInstance.heap_get_child(pop(globalState.OS), 0),
    tail: () => this.heapInstance.heap_get_child(pop(globalState.OS), 1),
    is_null: () =>
      this.heapInstance.is_Null(pop(globalState.OS))
        ? this.heapInstance.True
        : this.heapInstance.False,
    set_head: () => {
      const val = pop(globalState.OS)
      const p = pop(globalState.OS)
      this.heapInstance.heap_set_child(p, 0, val)
    },
    set_tail: () => {
      const val = pop(globalState.OS)
      const p = pop(globalState.OS)
      this.heapInstance.heap_set_child(p, 1, val)
    }
  }

  allocate_builtin_frame(): number {
    const builtin_values = Object.values(this.builtins)
    const frame_address = this.heapInstance.heap_allocate_Frame(builtin_values.length)
    for (let i = 0; i < builtin_values.length; i++) {
      const builtin = builtin_values[i]
      this.heapInstance.heap_set_child(
        frame_address,
        i,
        this.heapInstance.heap_allocate_Builtin(builtin.id)
      )
    }
    return frame_address
  }

  // set up registers, including free list
  initialise_machine(heapsize_words: number) {
    // GLOBAL VARIABLES
    globalState.OS = []
    globalState.RTS = []
    globalState.ALLOCATING = []
    globalState.THREADQUEUE = []
    globalState.CHANNELARRAY = []

    this.heapInstance.heap = this.heapInstance.heap_make(heapsize_words)
    this.heapInstance.heap_size = heapsize_words

    // initialize free list:
    // every free node carries the address
    // of the next free node as its first word
    let i = 0
    for (
      i = 0;
      i <= heapsize_words - this.heapInstance.node_size;
      i = i + this.heapInstance.node_size
    ) {
      this.heapInstance.heap_set(i, i + this.heapInstance.node_size)
    }
    // the empty free list is represented by -1
    this.heapInstance.heap_set(i - this.heapInstance.node_size, -1)
    this.heapInstance.free = 0
    this.heapInstance.allocate_literal_values()
    const builtins_frame = this.allocate_builtin_frame()
    const constants_frame = this.heapInstance.allocate_constant_frame()
    globalState.E = this.heapInstance.heap_allocate_Environment(0)
    globalState.E = this.heapInstance.heap_Environment_extend(builtins_frame, globalState.E)
    globalState.E = this.heapInstance.heap_Environment_extend(constants_frame, globalState.E)

    this.heapInstance.heap_bottom = this.heapInstance.free
  }

  // TODO: null is nil in Go figure out how to deal with this

  address_to_TS_value = (x: number): any =>
    this.heapInstance.is_Boolean(x)
      ? this.heapInstance.is_True(x)
        ? true
        : false
      : this.heapInstance.is_Number(x)
        ? this.heapInstance.heap_get(x + 1)
        : this.heapInstance.is_Undefined(x)
          ? undefined
          : this.heapInstance.is_Unassigned(x)
            ? '<unassigned>'
            : this.heapInstance.is_Null(x)
              ? null
              : this.heapInstance.is_String(x)
                ? this.heapInstance.heap_get_string(x)
                : this.heapInstance.is_Pair(x)
                  ? [
                    this.address_to_TS_value(this.heapInstance.heap_get_child(x, 0)),
                    this.address_to_TS_value(this.heapInstance.heap_get_child(x, 1))
                  ]
                  : this.heapInstance.is_Closure(x)
                    ? '<closure>'
                    : this.heapInstance.is_Builtin(x)
                      ? '<builtin>'
                      : this.heapInstance.is_Channel(x)
                        ? '<channel>'
                        : 'unknown word tag: ' + word_to_string(x)

  TS_value_to_address = (x: any): string | number =>
    is_boolean(x)
      ? x
        ? this.heapInstance.True
        : this.heapInstance.False
      : is_number(x)
        ? this.heapInstance.heap_allocate_Number(x)
        : is_undefined(x)
          ? this.heapInstance.Undefined
          : is_null(x)
            ? this.heapInstance.Null
            : is_string(x)
              ? this.heapInstance.heap_allocate_String(x)
              : 'unknown word tag: ' + word_to_string(x)

  // ********
  // **********************
  // operators and builtins
  // **********************/

  binop_microcode: { [key: string]: (x: any, y: any) => any } = {
    '+': (x, y) =>
      (is_number(x) && is_number(y)) || (is_string(x) && is_string(y))
        ? x + y
        : new Error(`+ expects two numbers or two strings, got: ${[x, y]}`),
    // todo: add error handling to JS for the following, too
    '*': (x, y) => (x as number) * (y as number),
    '-': (x, y) => (x as number) - (y as number),
    '/': (x, y) => (x as number) / (y as number),
    '%': (x, y) => (x as number) % (y as number),
    '<': (x, y) => x < y,
    '<=': (x, y) => x <= y,
    '>=': (x, y) => x >= y,
    '>': (x, y) => x > y,
    '==': (x, y) => x === y,
    '!=': (x, y) => x !== y
  }

  // v2 is popped before v1
  apply_binop = (op: string, v2: number, v1: number): string | number =>
    this.TS_value_to_address(
      this.binop_microcode[op](this.address_to_TS_value(v1), this.address_to_TS_value(v2))
    )
  unop_microcode: { [key: string]: (x: any) => any } = {
    '-unary': x => -(x as number),
    '!': x => !x
  }

  apply_unop = (op: string, v: number): string | number =>
    this.TS_value_to_address(this.unop_microcode[op](this.address_to_TS_value(v)))

  apply_builtin = (builtin_id: number) => {
    const result = this.builtin_array[builtin_id]()

    // workaround: only pop and push if builtin is not sleep
    // sleep is a special case because threads might be swapped out when it is called
    if (this.builtins['sleep'].id !== builtin_id) {
      pop(globalState.OS) // pop fun
      push(globalState.OS, result)
    }
  }

  // *******
  // machine
  // *******

  microcode: { [key: string]: (instr: Instruction) => void } = {
    LDC: instr => push(globalState.OS, this.TS_value_to_address(instr.val)),
    UNOP: instr => push(globalState.OS, this.apply_unop(instr.sym, pop(globalState.OS))),
    BINOP: instr =>
      push(globalState.OS, this.apply_binop(instr.sym, pop(globalState.OS), pop(globalState.OS))),
    POP: _ => pop(globalState.OS),
    JOF: instr =>
    (this.curThread.PC = this.heapInstance.is_True(pop(globalState.OS))
      ? this.curThread.PC
      : instr.addr),
    GOTO: instr => (this.curThread.PC = instr.addr),
    ENTER_SCOPE: instr => {
      push(globalState.RTS, this.heapInstance.heap_allocate_Blockframe(globalState.E))
      const frame_address = this.heapInstance.heap_allocate_Frame(instr.num)
      globalState.E = this.heapInstance.heap_Environment_extend(frame_address, globalState.E)
      for (let i = 0; i < instr.num; i++) {
        this.heapInstance.heap_set_child(frame_address, i, this.heapInstance.Unassigned)
      }
    },
    EXIT_SCOPE: _ =>
      (globalState.E = this.heapInstance.heap_get_Blockframe_environment(globalState.RTS.pop()!)),
    LD: instr => {
      const val = this.heapInstance.heap_get_Environment_value(globalState.E, instr.pos)
      if (this.heapInstance.is_Unassigned(val)) {
        throw new Error('access of unassigned variable ' + instr.sym)
      }
      push(globalState.OS, val)
    },
    ASSIGN: instr =>
      this.heapInstance.heap_set_Environment_value(
        globalState.E,
        instr.pos,
        peek(globalState.OS, 0)
      ),
    LDF: instr => {
      const closure_address = this.heapInstance.heap_allocate_Closure(
        instr.arity,
        instr.addr,
        globalState.E
      )
      push(globalState.OS, closure_address)
    },
    CALL: instr => {
      const arity = instr.arity
      const fun = peek(globalState.OS, arity)
      if (this.heapInstance.is_Builtin(fun)) {
        return this.apply_builtin(this.heapInstance.heap_get_Builtin_id(fun))
      }
      const new_PC = this.heapInstance.heap_get_Closure_pc(fun)
      const new_frame = this.heapInstance.heap_allocate_Frame(arity)
      for (let i = arity - 1; i >= 0; i--) {
        this.heapInstance.heap_set_child(new_frame, i, pop(globalState.OS))
      }
      push(
        globalState.RTS,
        this.heapInstance.heap_allocate_Callframe(globalState.E, this.curThread.PC)
      )
      pop(globalState.OS) // pop fun
      globalState.E = this.heapInstance.heap_Environment_extend(
        new_frame,
        this.heapInstance.heap_get_Closure_environment(fun)
      )
      this.curThread.PC = new_PC
    },
    TAIL_CALL: instr => {
      const arity = instr.arity
      const fun = peek(globalState.OS, arity)
      if (this.heapInstance.is_Builtin(fun)) {
        return this.apply_builtin(this.heapInstance.heap_get_Builtin_id(fun))
      }
      const new_PC = this.heapInstance.heap_get_Closure_pc(fun)
      const new_frame = this.heapInstance.heap_allocate_Frame(arity)
      for (let i = arity - 1; i >= 0; i--) {
        this.heapInstance.heap_set_child(new_frame, i, pop(globalState.OS))
      }
      pop(globalState.OS) // pop fun
      // don't push on RTS here
      globalState.E = this.heapInstance.heap_Environment_extend(
        new_frame,
        this.heapInstance.heap_get_Closure_environment(fun)
      )
      this.curThread.PC = new_PC
    },
    RESET: instr => {
      // keep popping...
      const top_frame = globalState.RTS.pop()!
      if (top_frame === undefined) {
        console.log({ erroneousThread: this.curThread })
        throw new Error('RESET: empty RTS')
      }

      if (this.heapInstance.is_Callframe(top_frame)) {
        // ...until top frame is a call frame
        this.curThread.PC = this.heapInstance.heap_get_Callframe_pc(top_frame)
        globalState.E = this.heapInstance.heap_get_Callframe_environment(top_frame)
      } else {
        this.curThread.PC--
      }
    },
    GOCALL: instr => {
      // these are the same as CALL instruction from homwork
      const arity = instr.arity
      const fun = peek(globalState.OS, arity)
      // TODO: still need to handle this
      if (this.heapInstance.is_Builtin(fun)) {
        return this.apply_builtin(this.heapInstance.heap_get_Builtin_id(fun))
      }

      if (this.heapInstance.is_Closure(fun)) {
        // store our function in the heap
        const newFrame = this.heapInstance.heap_allocate_Frame(arity)
        for (let i = arity - 1; i >= 0; i--) {
          this.heapInstance.heap_set_child(newFrame, i, pop(globalState.OS))
        }
        // remove function from the stack
        pop(globalState.OS)
        const newPC = this.heapInstance.heap_get_Closure_pc(fun)

        const newRTS: any[] = []
        push(
          newRTS,
          this.heapInstance.heap_allocate_Callframe(globalState.E, this.lastInstructionIndex)
        )

        const newThread: Thread = new Thread(
          [],
          this.heapInstance.heap_Environment_extend(
            newFrame,
            this.heapInstance.heap_get_Closure_environment(fun)
          ),
          newRTS,
          newPC,
          -1, // to denote that the thread has never woken up
          -1 // if the thread has never woken up, it cannot have a sleep start time
        )
        globalState.THREADQUEUE.push(newThread)
        return
      }

      throw new Error(`GOCALL expects a function, got: ${fun}`)
    },

    MAKE: instr => {
      const idx = globalState.CHANNELARRAY.length
      this.createNewChannel(instr.capacity, idx)
      const addr = this.heapInstance.heap_allocate_Channel(
        instr.capacity,
        instr.type,
        instr.elemType,
        idx
      )
      // if it is a mutex, we populate it with 1 UNDEFINED
      if(instr.type === 2) {
        globalState.CHANNELARRAY[idx].pushToItemQueue(this.heapInstance.Undefined)
      }
      push(this.curThread.OS, addr)
    },

    SEND: instr => {
      //OS top should have the address of the channel... maybe change names cus might be mutex instead of channel also
      const channel = peek(this.curThread.OS, 0)
      if (this.heapInstance.heap_get_tag(channel) !== Channel_tag) {
        throw Error('calling channel operations on non channel')
      }

      // this is for buffered Channels
      const counter = this.heapInstance.heap_get_channel_counter(channel)
      // counter == capacity means queue is full
      if (this.shouldSendBlock(channel)) {
        // add myself to blocked queue for this sem
        const semId = this.heapInstance.heap_get_channel_idx(channel);
        // note that at this point the channel and expr are still at the top of the OS
        this.addCurrentGoRoutineToBlockedQueue("send", semId);
        this.loadNextThread();
      } else {
        // we write into the channel first
        this.curThread.OS.pop() //pop channel from the top
        // put val in the queue
        const val = this.curThread.OS.pop() // pop val from the top
        const semId = this.heapInstance.heap_get_channel_idx(channel)
        // add item to the channel itemQueue
        this.addItemToChannel(semId, val as number)
        // wake up a receiver if any else increment counter
        if (this.hasBlockedGoRoutines("recv", semId)) {
          this.unblockOne("recv", semId)
        } else {
          //increment counter
          this.heapInstance.heap_set_channel_counter(channel, counter + 1)
        }
      }
    },

    RECV: instr => {
      //OS top should have the address of the channel
      const channel = peek(this.curThread.OS, 0)
      if (this.heapInstance.heap_get_tag(channel) !== Channel_tag) {
        throw Error('calling channel operations on non channel')
      }

      // this is for buffered Channels
      const counter = this.heapInstance.heap_get_channel_counter(channel)

      // counter should start at 0 to indicate an empty channel
      if (this.shouldRecvBlock(channel)) {
        // the queue is empty
        // add myself to blocked queue for this channel
        const semId = this.heapInstance.heap_get_channel_idx(channel);
        // note that we did PC++ in the main loop and this is fine, when we unblock from this we do not want the PC to come back here and just move on
        // note that at this point we have the channel on the top of the OS
        this.addCurrentGoRoutineToBlockedQueue("recv", semId);
        // contextSwitch or run next thread?
        this.loadNextThread();
      } else {
        // in the non blocking case we need to read from the queue. We know at this point that the queue is not empty
        // should we wake up a sending thread first then read or? Is there a case where we need the send to go first even if we know something is in the queue? maybe unbuffered channels?
        // wake up a sender if any else increment counter
        this.curThread.OS.pop() // pop channel from OS
        // read val from the channel
        const semId = this.heapInstance.heap_get_channel_idx(channel)
        if (this.hasBlockedGoRoutines("send", semId)) {
          this.unblockOne("send", semId);
        } else {
          // decrement counter
          this.heapInstance.heap_set_channel_counter(channel, counter - 1)
        }
        // now as receivers we read from the channel
        // read val from the channel
        const val = this.getItemFromChannel(semId);
        push(this.curThread.OS, val);
      }
    },
  }

  shouldRecvBlock(channel: number): boolean {
    const type = this.heapInstance.heap_get_channel_type(channel)
    if(type == 1 || type == 2) {
      const counter = this.heapInstance.heap_get_channel_counter(channel)
      return counter == 0
    } else {
      // unbuffered we check if there is no corresponding sender
      const semId = this.heapInstance.heap_get_channel_idx(channel)
      // if there are blocked go routines on the send queue this receive should not block
      return !this.hasBlockedGoRoutines("send", semId)
    }
  }
  
  shouldSendBlock(channel: number): boolean {
    const type = this.heapInstance.heap_get_channel_type(channel)
    if(type === 1) {
      const counter = this.heapInstance.heap_get_channel_counter(channel);
      const capacity = this.heapInstance.heap_get_channel_capacity(channel);
      return counter == capacity
    } else if(type === 0){
      // unbuffered we check if there is no corresponding receiver
      const semId = this.heapInstance.heap_get_channel_idx(channel)
      // if there are blocked go routines on the recv queue this send should not block
      return !this.hasBlockedGoRoutines("recv", semId)
    } else {
      // type is 2 which is mutex
      const counter = this.heapInstance.heap_get_channel_counter(channel);
      const capacity = this.heapInstance.heap_get_channel_capacity(channel);
      // if counter == 1 == capacity, means mutex is unlocked
      if(counter == capacity) {
        throw new Error("unlock of unlocked mutex")
      }
      return false;
    }
  }

  hasBlockedGoRoutines(queue: string, idx: number): boolean {
    if (queue == "send") {
      return globalState.CHANNELARRAY[idx].getSendQueue().length > 0
    } else if (queue == "recv") {
      return globalState.CHANNELARRAY[idx].getRecvQueue().length > 0
    } else {
      throw new Error("accessing unknown queue in channel: " + queue)
    }
  }

  addCurrentGoRoutineToBlockedQueue(queue: string, idx: number) {
    this.saveThread()
    // after saveThread is called, the current thread context is at the back of the threadQueue
    // pop off this thread from the threadQueue and add it to the back of the sem queue
    // check if pop removes the last or first element
    // should be safe cast since we just called saveThread
    const thread = globalState.THREADQUEUE.pop() as Thread

    // add to the respective queues
    if (queue == "send") {
      globalState.CHANNELARRAY[idx].getSendQueue().push(thread);
    } else if (queue == "recv") {
      globalState.CHANNELARRAY[idx].getRecvQueue().push(thread);
    } else {
      throw new Error("accessing unknown queue in channel: " + queue)
    }
  }

  unblockOne(queue: string, idx: number) {
    let thread = undefined;
    if (queue == "send") {
      // should be safe cast as we check for non empty before this and since the instruction is atomic, it will not be swapped out for another thread
      thread = globalState.CHANNELARRAY[idx].getSendQueue().shift() as Thread
      // since we are unblocking send, let us make the write call
      thread.OS.pop() // pop channel from this thread's OS
      const val = thread.OS.pop() // pop val from this thread's OS

      // add item to the channel itemQueue
      this.addItemToChannel(idx, val as number)
    } else if (queue == "recv") {
      // should be safe cast as we check for non empty before this and since the instruction is atomic, it will not be swapped out for another thread
      thread = globalState.CHANNELARRAY[idx].getRecvQueue().shift() as Thread
      // we assume that the sender that unblocks this receiver already wrote to the item queue
      const val = this.getItemFromChannel(idx)
      thread.OS.pop(); // pop channel from OS
      // push val on OS as the return value
      push(thread.OS, val);
    } else {
      throw new Error("accessing unknown queue in channel: " + queue)
    }
    // add thread back to the global state THREADQUEUE
    // check if i need to change anything here
    if (thread === undefined) {
      throw new Error("trying to unblock an empty " + queue + " queue")
    }
    globalState.THREADQUEUE.push(thread);
  }

  createNewChannel(capacity: number, idx: number) {
    globalState.CHANNELARRAY.push(new Channel(idx, capacity))
  }

  addItemToChannel(idx: number, val: number) {
    if (idx >= globalState.CHANNELARRAY.length) {
      throw new Error('adding to non existent channel')
    }
    globalState.CHANNELARRAY[idx].pushToItemQueue(val)
  }

  getItemFromChannel(idx: number): number {
    if (idx >= globalState.CHANNELARRAY.length) {
      throw new Error('popping from non existent channel')
    }
    return globalState.CHANNELARRAY[idx].popFromItemQueue()
  }

  saveThread = () => {
    const curThread: Thread = new Thread(
      [...globalState.OS],
      globalState.E,
      [...globalState.RTS],
      this.curThread.PC,
      this.curThread.wakeTime,
      this.curThread.sleepStartTime,
      this.curThread.isMainThread
    )
    globalState.THREADQUEUE.push(curThread)
  }

  loadNextThread = () => {
    const nextThread: Thread | undefined = globalState.THREADQUEUE.shift()
    if (!nextThread) {
      throw new Error("fatal error: all goroutines are asleep - deadlock!")
    }
    nextThread.wakeTime = this.globalTime
    nextThread.sleepStartTime = this.globalTime + numInstructions
    globalState.OS = nextThread.OS
    globalState.RTS = nextThread.RTS
    globalState.E = nextThread.E
    this.curThread = nextThread
    return undefined
  }

  contextSwitch = () => {
    // save current thread
    this.saveThread()

    // load next thread
    this.loadNextThread()
  }

  run(instrs: Instruction[]): any {
    this.lastInstructionIndex = instrs.length - 1
    // console.log({ instrs })
    // only break out of loop if we reach DONE on the main thread
    while (!(instrs[this.curThread.PC].tag === 'DONE' && this.curThread.isMainThread)) {
      // if we reach DONE on a non-main thread, load next thread
      if (instrs[this.curThread.PC].tag === 'DONE') {
        this.loadNextThread()
        // this is important, we want the main loop to check again in case the next thread is at DONE and then you try to do instrs[this.curThread.PC++] below
        continue
      }
      // this.print_OS('\noperands: ')
      const instr = instrs[this.curThread.PC++]
      //console.log("current PC: " + (this.curThread.PC-1) + " instr tag: " + instr.tag);
      this.microcode[instr.tag](instr)

      // TODO: check this this is correct since the microcode can cause a context switch/ loading of next thread
      this.globalTime += 1
      if (this.globalTime === this.curThread.sleepStartTime) {
        this.contextSwitch()
      } else if (this.globalTime > this.curThread.sleepStartTime) {
        console.log({ erroneousThread: this.curThread })
        throw new Error(`FATAL! This is not possible. Throwing error to prevent infinite loop.`)
      }
    }
    return this.address_to_TS_value(peek(globalState.OS, 0))
  }

  print_OS = (x: any) => {
    console.log(x)
    for (let i = 0; i < globalState.OS.length; i = i + 1) {
      const val = globalState.OS[i]
      console.log(`${globalState.OS[i]}: ${this.address_to_TS_value(val)}`)
    }
  }
}
