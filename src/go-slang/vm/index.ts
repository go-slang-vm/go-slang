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
import { numInstructions } from './constants'

export class VM {
  heapInstance: Heap
  PC: number
  threadQueue: any[]
  instructionsRemaining: number

  constructor(heapsize_words: number) {
    this.PC = 0
    this.heapInstance = new Heap(heapsize_words)
    this.threadQueue = []
    this.instructionsRemaining = numInstructions
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
    const result = this.heapInstance.builtin_array[builtin_id]()
    pop(globalState.OS) // pop fun
    push(globalState.OS, result)
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
    JOF: instr => (this.PC = this.heapInstance.is_True(pop(globalState.OS)) ? this.PC : instr.addr),
    GOTO: instr => (this.PC = instr.addr),
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
      push(globalState.RTS, this.heapInstance.heap_allocate_Callframe(globalState.E, this.PC))
      pop(globalState.OS) // pop fun
      globalState.E = this.heapInstance.heap_Environment_extend(
        new_frame,
        this.heapInstance.heap_get_Closure_environment(fun)
      )
      this.PC = new_PC
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
      this.PC = new_PC
    },
    RESET: instr => {
      // keep popping...
      const top_frame = globalState.RTS.pop()!
      if (this.heapInstance.is_Callframe(top_frame)) {
        // ...until top frame is a call frame
        this.PC = this.heapInstance.heap_get_Callframe_pc(top_frame)
        globalState.E = this.heapInstance.heap_get_Callframe_environment(top_frame)
      } else {
        this.PC--
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
        const newThread = {
          OS: [],
          RTS: [],
          E: this.heapInstance.heap_Environment_extend(
            newFrame,
            this.heapInstance.heap_get_Closure_environment(fun)
          ),
          PC: newPC,
          instructionsRemaining: numInstructions
        }
        this.threadQueue.push(newThread)
        return
      }

      throw new Error(`GOCALL expects a function, got: ${fun}`)
    }
  }

  contextSwitch = () => {
    // save current thread
    const curThread = {
      OS: [...globalState.OS],
      RTS: [...globalState.RTS],
      E: globalState.E,
      PC: this.PC,
      // if context switch happens before expending all instructions, we do not reset the instructions remaining
      // this is to prevent other threads from getting stuck
      instructionsRemaining: this.instructionsRemaining > 0 ? this.instructionsRemaining : 5
    }
    this.threadQueue.push(curThread)

    // get next thread
    const nextThread = this.threadQueue.shift()
    globalState.OS = nextThread.OS
    globalState.RTS = nextThread.RTS
    globalState.E = nextThread.E
    this.PC = nextThread.PC
    this.instructionsRemaining = nextThread.instructionsRemaining
  }

  run(instrs: Instruction[]): any {
    // reset PC to 0 for each set of instructions (i.e. each program)
    this.PC = 0
    while (!(instrs[this.PC].tag === 'DONE')) {
      // this.print_OS('\noperands: ')
      const instr = instrs[this.PC++]
      this.microcode[instr.tag](instr)
      this.instructionsRemaining -= 1
      if (this.instructionsRemaining === 0) {
        this.contextSwitch()
        this.instructionsRemaining = 5
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
