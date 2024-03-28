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
import { numInstructions } from './constants'

export class VM {
  heapInstance: Heap
  threadQueue: Thread[]
  curThread: Thread
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
    this.curThread = new Thread(globalState.OS, globalState.E, globalState.RTS, 0, true)
    this.threadQueue = []
  }

  // in this machine, the builtins take their
  // arguments directly from the operand stack,
  // to save the creation of an intermediate
  // argument array
  builtin_implementation: { [key: string]: () => number | void } = {
    sleep: () => {
      const address = pop(globalState.OS)
      // before switching threads, we complete the apply_builtin() function by popping fun off the stack and pushing undefined
      pop(globalState.OS) // pop fun
      push(globalState.OS, undefined)
      let steps: number = this.address_to_TS_value(address)
      this.curThread.sleepCount += steps
      // if the thread sleeps >= number of instructions allocated to it
      if (this.curThread.sleepCount >= numInstructions) {
        this.curThread.sleepCount -= numInstructions
        // we need to swap out the current thread
        this.contextSwitch()
      } else {
        // otherwise, we can simply decrement the number of instructions remaining
        this.curThread.instructionsRemaining -= steps
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
    '===': (x, y) => x === y,
    '!==': (x, y) => x !== y
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
        this.loadNextThread()
        return
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
      // this has to change to be called on the new thread -> how to do this?
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
        const newThread: Thread = new Thread(
          [],
          this.heapInstance.heap_Environment_extend(
            newFrame,
            this.heapInstance.heap_get_Closure_environment(fun)
          ),
          [],
          newPC
        )
        this.threadQueue.push(newThread)
        return
      }

      throw new Error(`GOCALL expects a function, got: ${fun}`)
    }
  }

  saveThread = () => {
    const curThread: Thread = new Thread(
      [...globalState.OS],
      globalState.E,
      [...globalState.RTS],
      this.curThread.PC,
      this.curThread.isMainThread
    )
    this.threadQueue.push(curThread)
  }

  loadNextThread = () => {
    let nextThread: Thread | undefined = this.threadQueue.shift()
    while (nextThread && nextThread.sleepCount > 0) {
      // if the thread sleeps for more than the number of instructions allocated to it
      if (nextThread.sleepCount > numInstructions) {
        nextThread.sleepCount -= numInstructions
        // put the thread back to the end of the queue
        this.threadQueue.push(nextThread)
        nextThread = this.threadQueue.shift()
      } else {
        // otherwise, decrement the number of instructions remaining
        nextThread.instructionsRemaining -= nextThread.sleepCount
        // reset sleep count to 0
        nextThread.sleepCount = 0
      }
    }
    if (!nextThread) {
      return undefined
    }
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
    // console.log({ instrs })
    // only break out of loop if we reach DONE on the main thread
    while (!(instrs[this.curThread.PC].tag === 'DONE' && this.curThread.isMainThread)) {
      // if we reach DONE on a non-main thread, load next thread
      if (instrs[this.curThread.PC].tag === 'DONE') {
        this.loadNextThread()
      }
      // this.print_OS('\noperands: ')
      const instr = instrs[this.curThread.PC++]
      this.microcode[instr.tag](instr)
      this.curThread.instructionsRemaining -= 1
      if (this.curThread.instructionsRemaining === 0) {
        this.contextSwitch()
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
