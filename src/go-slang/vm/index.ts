import { Heap } from './heap'
import { globalState } from './globals'
import { pop } from './utils'

function is_number(v: any) {
  return typeof v === 'number'
}

function is_undefined(xs: any) {
  return typeof xs === 'undefined'
}

function is_string(xs: any) {
  return typeof xs === 'string'
}

function is_boolean(xs: any) {
  return typeof xs === 'boolean'
}
// Translated to TypeScript by Evan Sebastian
type Pair<H, T> = [H, T]
type List = null | NonEmptyList
type NonEmptyList = Pair<any, any>
// is_null returns true if arg is exactly null
// LOW-LEVEL FUNCTION, NOT SOURCE
function is_null(xs: List): xs is null {
  return xs === null
}

// add values destructively to the end of
// given array; return the array
const push = <T>(array: T[], ...items: T[]): T[] => {
  // fixed by Liew Zhao Wei, see Discussion 5
  for (let item of items) {
    array.push(item)
  }
  return array
}

// return the last element of given array
// without changing the array
const peek = <T>(array: T[], address: number): T => array.slice(-1 - address)[0]

// *************
// parse to JSON
// *************/

// for debugging: return a string that shows the bits
// of a given word
const word_to_string = (word: number): string => {
  const buf = new ArrayBuffer(8)
  const view = new DataView(buf)
  view.setFloat64(0, word)
  let binStr = ''
  for (let i = 0; i < 8; i++) {
    binStr += ('00000000' + view.getUint8(i).toString(2)).slice(-8) + ' '
  }
  return binStr
}
//
// conversions between addresses and JS_value
//
interface Instruction {
  tag: string
  [key: string]: any
}

class VM {
  heapInstance: Heap
  PC: number = 0

  constructor(heapsize_words: number) {
    this.heapInstance = new Heap(heapsize_words)
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
      this.binop_microcode[op](
        Number(this.address_to_TS_value(v1)),
        Number(this.address_to_TS_value(v2))
      )
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
        throw new Error('access of unassigned variable')
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
    }
  }

  run(instrs: Instruction[]): any {
    // reset PC to 0 for each set of instructions (i.e. each program)
    this.PC = 0
    while (!(instrs[this.PC].tag === 'DONE')) {
      // this.print_OS('\noperands: ')
      const instr = instrs[this.PC++]
      this.microcode[instr.tag](instr)
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

// UNCOMMENT TO TEST
// expected result: 120
const instrs1: Instruction[] = [
  { tag: 'ENTER_SCOPE', num: 2 },
  { tag: 'LDF', arity: undefined, addr: 3 },
  { tag: 'GOTO', addr: 10 },
  { tag: 'LD', sym: 'fact_iter', pos: [2, 1] },
  { tag: 'LD', sym: 'n', pos: [3, 0] },
  { tag: 'LDC', val: 1 },
  { tag: 'LDC', val: 1 },
  { tag: 'TAIL_CALL', arity: 3 },
  { tag: 'LDC', val: undefined },
  { tag: 'RESET' },
  { tag: 'ASSIGN', pos: [2, 0] },
  { tag: 'POP' },
  { tag: 'LDF', arity: undefined, addr: 14 },
  { tag: 'GOTO', addr: 32 },
  { tag: 'LD', sym: 'i', pos: [3, 1] },
  { tag: 'LD', sym: 'n', pos: [3, 0] },
  { tag: 'BINOP', sym: '>' },
  { tag: 'JOF', addr: 21 },
  { tag: 'LD', sym: 'acc', pos: [3, 2] },
  { tag: 'RESET' },
  { tag: 'GOTO', addr: 30 },
  { tag: 'LD', sym: 'fact_iter', pos: [2, 1] },
  { tag: 'LD', sym: 'n', pos: [3, 0] },
  { tag: 'LD', sym: 'i', pos: [3, 1] },
  { tag: 'LDC', val: 1 },
  { tag: 'BINOP', sym: '+' },
  { tag: 'LD', sym: 'acc', pos: [3, 2] },
  { tag: 'LD', sym: 'i', pos: [3, 1] },
  { tag: 'BINOP', sym: '*' },
  { tag: 'TAIL_CALL', arity: 3 },
  { tag: 'LDC', val: undefined },
  { tag: 'RESET' },
  { tag: 'ASSIGN', pos: [2, 1] },
  { tag: 'POP' },
  { tag: 'LD', sym: 'fact', pos: [2, 0] },
  { tag: 'LDC', val: 5 },
  { tag: 'CALL', arity: 1 },
  { tag: 'EXIT_SCOPE' },
  { tag: 'DONE' }
]

const instrs2: Instruction[] = [
  { tag: 'ENTER_SCOPE', num: 1 },
  { tag: 'LDF', arity: undefined, addr: 3 },
  { tag: 'GOTO', addr: 17 },
  { tag: 'ENTER_SCOPE', num: 1 },
  { tag: 'LDC', val: 5 },
  { tag: 'ASSIGN', pos: [4, 0] },
  { tag: 'POP' },
  { tag: 'ENTER_SCOPE', num: 1 },
  { tag: 'LDC', val: 10 },
  { tag: 'ASSIGN', pos: [5, 0] },
  { tag: 'EXIT_SCOPE' },
  { tag: 'POP' },
  { tag: 'LD', sym: 'x', pos: [4, 0] },
  { tag: 'RESET' },
  { tag: 'EXIT_SCOPE' },
  { tag: 'LDC', val: undefined },
  { tag: 'RESET' },
  { tag: 'ASSIGN', pos: [2, 0] },
  { tag: 'POP' },
  { tag: 'LD', sym: 'main', pos: [2, 0] },
  { tag: 'CALL', arity: 0 },
  { tag: 'EXIT_SCOPE' },
  { tag: 'DONE' }
]

const vm = new VM(1500)
// EXPECTED RESULT: 120
console.log(vm.run(instrs1))
// EXPECTED RESULT: 5
console.log(vm.run(instrs2))
