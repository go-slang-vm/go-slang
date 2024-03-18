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

const pop = (array: number[]): number => {
  if (array.length === 0) {
    throw new Error('pop: empty list')
  }
  return array.pop()!
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

// *************************
// HEAP
// *************************/

// HEAP is an array of bytes (JS ArrayBuffer)

const word_size = 8

// heap_make allocates a heap of given size
// (in bytes) and returns a DataView of that,
// see https://www.javascripture.com/DataView
const heap_make = (words: number): DataView => {
  const data = new ArrayBuffer(words * word_size)
  const view = new DataView(data)
  return view
}

// for convenience, HEAP is global variable
// initialized in initialize_machine()
let HEAP: DataView
let heap_size: number

// free is the next free index in the free list
let free: number
// instrs: instruction array
let instrs: Instruction[]

// heap_allocate allocates a given number of words
// on the heap and marks the first word with a 1-byte tag.
// the last two bytes of the first word indicate the number
// of children (addresses) that follow the tag word:
// [1 byte tag, 4 bytes payload (depending on node type),
//  2 bytes #children, 1 byte unused]
// Note: payload depends on the type of node
const size_offset = 5

const node_size = 10

const heap_allocate = (tag: number, size: number): number => {
  if (size > node_size) {
    throw new Error('limitation: nodes cannot be larger than 10 words')
  }
  // a value of -1 in free indicates the
  // end of the free list
  if (free === -1) {
    mark_sweep()
  }

  // allocate
  const address = free
  free = heap_get(free)
  HEAP.setInt8(address * word_size, tag)
  HEAP.setUint16(address * word_size + size_offset, size)
  return address
}

// modified
const mark_bit = 7

const UNMARKED = 0
const MARKED = 1

let HEAP_BOTTOM: number
let ALLOCATING: number[]

const mark_sweep = (): void => {
  // mark r for r in roots
  const roots = [...OS, E, ...RTS, ...ALLOCATING]
  for (let i = 0; i < roots.length; i++) {
    mark(roots[i])
  }

  sweep()

  if (free === -1) {
    throw new Error('heap memory exhausted')
  }
}

const mark = (node: number): void => {
  if (node >= heap_size) {
    return
  }

  if (is_unmarked(node)) {
    heap_set_byte_at_offset(node, mark_bit, MARKED)

    const num_of_children = heap_get_number_of_children(node)

    for (let i = 0; i < num_of_children; i++) {
      mark(heap_get_child(node, i))
    }
  }
}

const sweep = (): void => {
  let v = HEAP_BOTTOM

  while (v < heap_size) {
    if (is_unmarked(v)) {
      free_node(v)
    } else {
      heap_set_byte_at_offset(v, mark_bit, UNMARKED)
    }

    v = v + node_size
  }
}

const is_unmarked = (node: number): boolean => heap_get_byte_at_offset(node, mark_bit) === UNMARKED

const free_node = (node: number): void => {
  // heap set is used for retrieving the next free node
  heap_set(node, free)
  free = node
}

// get and set a word in heap at given address
const heap_get = (address: number): number => HEAP.getFloat64(address * word_size)

const heap_set = (address: number, x: number): void => HEAP.setFloat64(address * word_size, x)

// child index starts at 0
const heap_get_child = (address: number, child_index: number): number =>
  heap_get(address + 1 + child_index)

const heap_set_child = (address: number, child_index: number, value: number): void =>
  heap_set(address + 1 + child_index, value)

const heap_get_tag = (address: number): number => HEAP.getInt8(address * word_size)

const heap_get_size = (address: number): number => HEAP.getUint16(address * word_size + size_offset)

// the number of children is one less than the size
// except for number nodes:
//                 they have size 2 but no children
const heap_get_number_of_children = (address: number): number =>
  heap_get_tag(address) === Number_tag ? 0 : heap_get_size(address) - 1

// access byte in heap, using address and offset
const heap_set_byte_at_offset = (address: number, offset: number, value: number): void =>
  HEAP.setUint8(address * word_size + offset, value)

const heap_get_byte_at_offset = (address: number, offset: number): number =>
  HEAP.getUint8(address * word_size + offset)

// access byte in heap, using address and offset
const heap_set_2_bytes_at_offset = (address: number, offset: number, value: number): void =>
  HEAP.setUint16(address * word_size + offset, value)

const heap_get_2_bytes_at_offset = (address: number, offset: number): number =>
  HEAP.getUint16(address * word_size + offset)

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

// values

// All values are allocated on the heap as nodes. The first
// word of the node is a header, and the first byte of the
// header is a tag that identifies the type of node

// a little trick: tags are all negative so that we can use
// the first 4 bytes of the header as forwarding address
// in garbage collection: If the (signed) Int32 is
// non-negative, the node has been forwarded already.

const False_tag = 0
const True_tag = 1
const Number_tag = 2
const Null_tag = 3
const Unassigned_tag = 4
const Undefined_tag = 5
const Blockframe_tag = 6
const Callframe_tag = 7
const Closure_tag = 8
const Frame_tag = 9 // 0000 1001
const Environment_tag = 10 // 0000 1010
const Pair_tag = 11
const Builtin_tag = 12

// all values (including literals) are allocated on the heap.

// We allocate canonical values for
// true, false, undefined, null, and unassigned
// and make sure no such values are created at runtime

// boolean values carry their value (0 for false, 1 for true)
// in the byte following the tag

let False: number
const is_False = (address: number): boolean => heap_get_tag(address) === False_tag
let True: number
const is_True = (address: number): boolean => heap_get_tag(address) === True_tag

const is_Boolean = (address: number): boolean => is_True(address) || is_False(address)

let Null: number
const is_Null = (address: number): boolean => heap_get_tag(address) === Null_tag

let Unassigned: number
const is_Unassigned = (address: number): boolean => heap_get_tag(address) === Unassigned_tag

let Undefined: number
const is_Undefined = (address: number): boolean => heap_get_tag(address) === Undefined_tag

const allocate_literal_values = (): void => {
  False = heap_allocate(False_tag, 1)
  True = heap_allocate(True_tag, 1)
  Null = heap_allocate(Null_tag, 1)
  Unassigned = heap_allocate(Unassigned_tag, 1)
  Undefined = heap_allocate(Undefined_tag, 1)
}

// builtins: builtin id is encoded in second byte
// [1 byte tag, 1 byte id, 3 bytes unused,
//  2 bytes #children, 1 byte unused]
// Note: #children is 0

const is_Builtin = (address: number): boolean => heap_get_tag(address) === Builtin_tag

const heap_allocate_Builtin = (id: number): number => {
  const address = heap_allocate(Builtin_tag, 1)
  heap_set_byte_at_offset(address, 1, id)
  return address
}

const heap_get_Builtin_id = (address: number): number => heap_get_byte_at_offset(address, 1)

// closure
// [1 byte tag, 1 byte arity, 2 bytes pc, 1 byte unused,
//  2 bytes #children, 1 byte unused]
// followed by the address of env
// note: currently bytes at offset 4 and 7 are not used;
//   they could be used to increase pc and #children range

const heap_allocate_Closure = (arity: number, pc: number, env: number): number => {
  ALLOCATING = [env]
  const address = heap_allocate(Closure_tag, 2)
  ALLOCATING = []
  heap_set_byte_at_offset(address, 1, arity)
  heap_set_2_bytes_at_offset(address, 2, pc)
  heap_set(address + 1, env)
  return address
}

const heap_get_Closure_pc = (address: number): number => heap_get_2_bytes_at_offset(address, 2)

const heap_get_Closure_environment = (address: number): number => heap_get_child(address, 0)

const is_Closure = (address: number): boolean => heap_get_tag(address) === Closure_tag

// block frame
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]

const heap_allocate_Blockframe = (env: number): number => {
  ALLOCATING = [env]
  const address = heap_allocate(Blockframe_tag, 2)
  heap_set(address + 1, env)
  ALLOCATING = []
  return address
}

const heap_get_Blockframe_environment = (address: number): number => heap_get_child(address, 0)

// call frame
// [1 byte tag, 1 byte unused, 2 bytes pc,
//  1 byte unused, 2 bytes #children, 1 byte unused]
// followed by the address of env

const heap_allocate_Callframe = (env: number, pc: number): number => {
  ALLOCATING = [env]
  const address = heap_allocate(Callframe_tag, 2)
  ALLOCATING = []
  heap_set_2_bytes_at_offset(address, 2, pc)
  heap_set(address + 1, env)
  return address
}

const heap_get_Callframe_environment = (address: number): number => heap_get_child(address, 0)

const heap_get_Callframe_pc = (address: number): number => heap_get_2_bytes_at_offset(address, 2)

const is_Callframe = (address: number): boolean => heap_get_tag(address) === Callframe_tag

// environment frame
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]
// followed by the addresses of its values

const heap_allocate_Frame = (number_of_values: number): number =>
  heap_allocate(Frame_tag, number_of_values + 1)

// environment
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]
// followed by the addresses of its frames

const heap_allocate_Environment = (number_of_frames: number): number =>
  heap_allocate(Environment_tag, number_of_frames + 1)

// access environment given by address
// using a "position", i.e. a pair of
// frame index and value index
const heap_get_Environment_value = (env_address: number, position: [number, number]): number => {
  const [frame_index, value_index] = position
  const frame_address = heap_get_child(env_address, frame_index)
  return heap_get_child(frame_address, value_index)
}

const heap_set_Environment_value = (
  env_address: number,
  position: [number, number],
  value: number
): void => {
  const [frame_index, value_index] = position
  const frame_address = heap_get_child(env_address, frame_index)
  heap_set_child(frame_address, value_index, value)
}

// extend a given environment by a new frame:
// create a new environment that is bigger by 1
// frame slot than the given environment.
// copy the frame numberes of the given
// environment to the new environment.
// enter the address of the new frame to end
// of the new environment
const heap_Environment_extend = (frame_address: number, env_address: number): number => {
  const old_size = heap_get_size(env_address)
  // modified: should not free frame address and env address here
  ALLOCATING = [frame_address, env_address]
  const new_env_address = heap_allocate_Environment(old_size)
  ALLOCATING = []
  let i: number
  for (i = 0; i < old_size - 1; i++) {
    heap_set_child(new_env_address, i, heap_get_child(env_address, i))
  }
  heap_set_child(new_env_address, i, frame_address)
  return new_env_address
}

// pair
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]
// followed by head and tail addresses, one word each
const heap_allocate_Pair = (hd: number, tl: number): number => {
  const pair_address = heap_allocate(Pair_tag, 3)
  heap_set_child(pair_address, 0, hd)
  heap_set_child(pair_address, 1, tl)
  return pair_address
}

const is_Pair = (address: number): boolean => heap_get_tag(address) === Pair_tag

// number
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]
// followed by the number, one word
// note: #children is 0

const heap_allocate_Number = (n: number): number => {
  const number_address = heap_allocate(Number_tag, 2)
  heap_set(number_address + 1, n)
  return number_address
}

const is_Number = (address: number): boolean => heap_get_tag(address) === Number_tag

//
// conversions between addresses and JS_value
//

const address_to_TS_value = (x: number): any =>
  is_Boolean(x)
    ? is_True(x)
      ? true
      : false
    : is_Number(x)
    ? heap_get(x + 1)
    : is_Undefined(x)
    ? undefined
    : is_Unassigned(x)
    ? '<unassigned>'
    : is_Null(x)
    ? null
    : is_Pair(x)
    ? [address_to_TS_value(heap_get_child(x, 0)), address_to_TS_value(heap_get_child(x, 1))]
    : is_Closure(x)
    ? '<closure>'
    : is_Builtin(x)
    ? '<builtin>'
    : 'unknown word tag: ' + word_to_string(x)

const TS_value_to_address = (x: any): string | number =>
  is_boolean(x)
    ? x
      ? True
      : False
    : is_number(x)
    ? heap_allocate_Number(x)
    : is_undefined(x)
    ? Undefined
    : is_null(x)
    ? Null
    : 'unknown word tag: ' + word_to_string(x)

// in this machine, the builtins take their
// arguments directly from the operand stack,
// to save the creation of an intermediate
// argument array
const builtin_implementation: { [key: string]: () => number | void } = {
  error: () => {
    throw new Error(address_to_TS_value(pop(OS)))
  },
  pair: () => {
    const tl = pop(OS)
    const hd = pop(OS)
    return heap_allocate_Pair(hd, tl)
  },
  is_pair: () => (is_Pair(pop(OS)) ? True : False),
  head: () => heap_get_child(pop(OS), 0),
  tail: () => heap_get_child(pop(OS), 1),
  is_null: () => (is_Null(pop(OS)) ? True : False),
  set_head: () => {
    const val = pop(OS)
    const p = pop(OS)
    heap_set_child(p, 0, val)
  },
  set_tail: () => {
    const val = pop(OS)
    const p = pop(OS)
    heap_set_child(p, 1, val)
  }
}

const builtins: { [key: string]: { tag: string; id: number; arity: number } } = {}
const builtin_array: (() => number | void)[] = []

{
  let i = 0
  for (const key in builtin_implementation) {
    builtins[key] = { tag: 'BUILTIN', id: i, arity: builtin_implementation[key].length }
    builtin_array[i++] = builtin_implementation[key]
  }
}

// ********
// **********************
// operators and builtins
// **********************/

interface Instruction {
  tag: string
  [key: string]: any
}

const binop_microcode: { [key: string]: (x: any, y: any) => any } = {
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
const apply_binop = (op: string, v2: number, v1: number): string | number =>
  TS_value_to_address(
    binop_microcode[op](Number(address_to_TS_value(v1)), Number(address_to_TS_value(v2)))
  )

const unop_microcode: { [key: string]: (x: any) => any } = {
  '-unary': x => -(x as number),
  '!': x => !x
}

const apply_unop = (op: string, v: number): string | number =>
  TS_value_to_address(unop_microcode[op](address_to_TS_value(v)))

const apply_builtin = (builtin_id: number) => {
  console.log(`apply_builtin: builtin_id: ${builtin_array[builtin_id]}`)
  const result = builtin_array[builtin_id]()
  pop(OS) // pop fun
  push(OS, result)
}

const allocate_builtin_frame = (): number => {
  const builtin_values = Object.values(builtins)
  const frame_address = heap_allocate_Frame(builtin_values.length)
  for (let i = 0; i < builtin_values.length; i++) {
    const builtin = builtin_values[i]
    heap_set_child(frame_address, i, heap_allocate_Builtin(builtin.id))
  }
  return frame_address
}

// *******
// machine
// *******

// machine registers
let OS: number[] // JS array (stack) of words (numberes,
// word-encoded literals, numbers)
let PC: number // JS number
let E: number // heap number
let RTS: number[] // JS array (stack) of numberes

const microcode: { [key: string]: (instr: Instruction) => void } = {
  LDC: instr => push(OS, TS_value_to_address(instr.val)),
  UNOP: instr => push(OS, apply_unop(instr.sym, pop(OS))),
  BINOP: instr => push(OS, apply_binop(instr.sym, pop(OS), pop(OS))),
  POP: _ => pop(OS),
  JOF: instr => (PC = is_True(pop(OS)) ? PC : instr.addr),
  GOTO: instr => (PC = instr.addr),
  ENTER_SCOPE: instr => {
    push(RTS, heap_allocate_Blockframe(E))
    const frame_address = heap_allocate_Frame(instr.num)
    E = heap_Environment_extend(frame_address, E)
    for (let i = 0; i < instr.num; i++) {
      heap_set_child(frame_address, i, Unassigned)
    }
  },
  EXIT_SCOPE: _ => (E = heap_get_Blockframe_environment(RTS.pop()!)),
  LD: instr => {
    const val = heap_get_Environment_value(E, instr.pos)
    if (is_Unassigned(val)) {
      throw new Error('access of unassigned variable')
    }
    push(OS, val)
  },
  ASSIGN: instr => heap_set_Environment_value(E, instr.pos, peek(OS, 0)),
  LDF: instr => {
    const closure_address = heap_allocate_Closure(instr.arity, instr.addr, E)
    push(OS, closure_address)
  },
  CALL: instr => {
    const arity = instr.arity
    const fun = peek(OS, arity)
    if (is_Builtin(fun)) {
      return apply_builtin(heap_get_Builtin_id(fun))
    }
    const new_PC = heap_get_Closure_pc(fun)
    const new_frame = heap_allocate_Frame(arity)
    for (let i = arity - 1; i >= 0; i--) {
      heap_set_child(new_frame, i, pop(OS))
    }
    push(RTS, heap_allocate_Callframe(E, PC))
    pop(OS) // pop fun
    E = heap_Environment_extend(new_frame, heap_get_Closure_environment(fun))
    PC = new_PC
  },
  TAIL_CALL: instr => {
    const arity = instr.arity
    const fun = peek(OS, arity)
    if (is_Builtin(fun)) {
      return apply_builtin(heap_get_Builtin_id(fun))
    }
    const new_PC = heap_get_Closure_pc(fun)
    const new_frame = heap_allocate_Frame(arity)
    for (let i = arity - 1; i >= 0; i--) {
      heap_set_child(new_frame, i, pop(OS))
    }
    pop(OS) // pop fun
    // don't push on RTS here
    E = heap_Environment_extend(new_frame, heap_get_Closure_environment(fun))
    PC = new_PC
  },
  RESET: instr => {
    // keep popping...
    const top_frame = RTS.pop()!
    if (is_Callframe(top_frame)) {
      // ...until top frame is a call frame
      PC = heap_get_Callframe_pc(top_frame)
      E = heap_get_Callframe_environment(top_frame)
    } else {
      PC--
    }
  }
}

// running the machine

// set up registers, including free list
function initialize_machine(heapsize_words: number) {
  OS = []
  PC = 0
  RTS = []
  // modified
  ALLOCATING = []

  HEAP = heap_make(heapsize_words)
  heap_size = heapsize_words
  // initialize free list:
  // every free node carries the address
  // of the next free node as its first word
  let i = 0
  for (i = 0; i <= heapsize_words - node_size; i = i + node_size) {
    heap_set(i, i + node_size)
  }
  // the empty free list is represented by -1
  heap_set(i - node_size, -1)
  free = 0
  PC = 0
  allocate_literal_values()
  const builtins_frame = allocate_builtin_frame()
  E = heap_allocate_Environment(0)
  E = heap_Environment_extend(builtins_frame, E)
  // modified
  HEAP_BOTTOM = free
}

export function run(heapsize_words: number): any {
  initialize_machine(heapsize_words)
  //print_code()
  while (!(instrs[PC].tag === 'DONE')) {
    //heap_display()
    //display(PC, "PC: ")
    // display(instrs[PC].tag, "instr: ")
    //print_OS("\noperands: ");
    //print_RTS("\nRTS: ");
    const instr = instrs[PC++]
    //display(instrs[PC].tag, "next instruction: ")
    microcode[instr.tag](instr)
    // heap_display()
  }
  //display(OS, "\nfinal operands: ")
  //print_OS()
  return address_to_TS_value(peek(OS, 0))
}

// UNCOMMENT TO TEST
// expected result: 120
// instrs = [
//   { tag: 'ENTER_SCOPE', num: 2 },
//   { tag: 'LDF', arity: undefined, addr: 3 },
//   { tag: 'GOTO', addr: 10 },
//   { tag: 'LD', sym: 'fact_iter', pos: [2, 1] },
//   { tag: 'LD', sym: 'n', pos: [3, 0] },
//   { tag: 'LDC', val: 1 },
//   { tag: 'LDC', val: 1 },
//   { tag: 'TAIL_CALL', arity: 3 },
//   { tag: 'LDC', val: undefined },
//   { tag: 'RESET' },
//   { tag: 'ASSIGN', pos: [2, 0] },
//   { tag: 'POP' },
//   { tag: 'LDF', arity: undefined, addr: 14 },
//   { tag: 'GOTO', addr: 32 },
//   { tag: 'LD', sym: 'i', pos: [3, 1] },
//   { tag: 'LD', sym: 'n', pos: [3, 0] },
//   { tag: 'BINOP', sym: '>' },
//   { tag: 'JOF', addr: 21 },
//   { tag: 'LD', sym: 'acc', pos: [3, 2] },
//   { tag: 'RESET' },
//   { tag: 'GOTO', addr: 30 },
//   { tag: 'LD', sym: 'fact_iter', pos: [2, 1] },
//   { tag: 'LD', sym: 'n', pos: [3, 0] },
//   { tag: 'LD', sym: 'i', pos: [3, 1] },
//   { tag: 'LDC', val: 1 },
//   { tag: 'BINOP', sym: '+' },
//   { tag: 'LD', sym: 'acc', pos: [3, 2] },
//   { tag: 'LD', sym: 'i', pos: [3, 1] },
//   { tag: 'BINOP', sym: '*' },
//   { tag: 'TAIL_CALL', arity: 3 },
//   { tag: 'LDC', val: undefined },
//   { tag: 'RESET' },
//   { tag: 'ASSIGN', pos: [2, 1] },
//   { tag: 'POP' },
//   { tag: 'LD', sym: 'fact', pos: [2, 0] },
//   { tag: 'LDC', val: 5 },
//   { tag: 'CALL', arity: 1 },
//   { tag: 'EXIT_SCOPE' },
//   { tag: 'DONE' }
// ]

// console.log(run(1000))
