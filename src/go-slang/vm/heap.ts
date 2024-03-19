import { globalState } from './globals'
import { pop } from './utils'
import {
  False_tag,
  True_tag,
  Number_tag,
  Null_tag,
  Unassigned_tag,
  Undefined_tag,
  Blockframe_tag,
  Callframe_tag,
  Closure_tag,
  Frame_tag,
  Environment_tag,
  Pair_tag,
  Builtin_tag
} from './constants'

export class Heap {
  private heap_size: number
  private word_size = 8
  private size_offset = 5
  private mark_bit = 7
  private UNMARKED = 0
  private MARKED = 1
  False: number
  True: number
  Null: number
  Unassigned: number
  Undefined: number
  heap: DataView
  node_size = 10
  free: number
  heap_bottom: number
  // builtins: builtin id is encoded in second byte
  // [1 byte tag, 1 byte id, 3 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // Note: #children is 0
  builtins: { [key: string]: { tag: string; id: number; arity: number } } = {}
  builtin_array: (() => number | void)[] = []

  constructor(heapsize_words: number) {
    let i = 0
    for (const key in this.builtin_implementation) {
      this.builtins[key] = { tag: 'BUILTIN', id: i, arity: this.builtin_implementation[key].length }
      this.builtin_array[i++] = this.builtin_implementation[key]
    }

    this.initialise_heap(heapsize_words)
  }

  is_Builtin = (address: number): boolean => this.heap_get_tag(address) === Builtin_tag

  heap_allocate_Builtin = (id: number): number => {
    const address = this.heap_allocate(Builtin_tag, 1)
    this.heap_set_byte_at_offset(address, 1, id)
    return address
  }

  heap_get_Builtin_id = (address: number): number => this.heap_get_byte_at_offset(address, 1)

  // in this machine, the builtins take their
  // arguments directly from the operand stack,
  // to save the creation of an intermediate
  // argument array
  builtin_implementation: { [key: string]: () => number | void } = {
    pair: () => {
      const tl = pop(globalState.OS)
      const hd = pop(globalState.OS)
      return this.heap_allocate_Pair(hd, tl)
    },
    is_pair: () => (this.is_Pair(pop(globalState.OS)) ? this.True : this.False),
    head: () => this.heap_get_child(pop(globalState.OS), 0),
    tail: () => this.heap_get_child(pop(globalState.OS), 1),
    is_null: () => (this.is_Null(pop(globalState.OS)) ? this.True : this.False),
    set_head: () => {
      const val = pop(globalState.OS)
      const p = pop(globalState.OS)
      this.heap_set_child(p, 0, val)
    },
    set_tail: () => {
      const val = pop(globalState.OS)
      const p = pop(globalState.OS)
      this.heap_set_child(p, 1, val)
    }
  }

  allocate_builtin_frame(): number {
    const builtin_values = Object.values(this.builtins)
    const frame_address = this.heap_allocate_Frame(builtin_values.length)
    for (let i = 0; i < builtin_values.length; i++) {
      const builtin = builtin_values[i]
      this.heap_set_child(frame_address, i, this.heap_allocate_Builtin(builtin.id))
    }
    return frame_address
  }

  allocate_constant_frame(): number {
    const constants = {
      undefined: this.Undefined
    }
    const constant_values = Object.values(constants)
    const frame_address = this.heap_allocate_Frame(constant_values.length)
    for (let i = 0; i < constant_values.length; i++) {
      const constant_value = constant_values[i]
      if (this.is_Undefined(constant_value)) {
        this.heap_set_child(frame_address, i, this.Undefined)
      } else {
        this.heap_set_child(frame_address, i, this.heap_allocate_Number(constant_value))
      }
    }
    return frame_address
  }

  // closure
  // [1 byte tag, 1 byte arity, 2 bytes pc, 1 byte unused,
  //  2 bytes #children, 1 byte unused]
  // followed by the address of env
  // note: currently bytes at offset 4 and 7 are not used;
  //   they could be used to increase pc and #children range

  heap_allocate_Closure = (arity: number, pc: number, env: number): number => {
    globalState.ALLOCATING = [env]
    const address = this.heap_allocate(Closure_tag, 2)
    globalState.ALLOCATING = []
    this.heap_set_byte_at_offset(address, 1, arity)
    this.heap_set_2_bytes_at_offset(address, 2, pc)
    this.heap_set(address + 1, env)
    return address
  }

  heap_get_Closure_pc = (address: number): number => this.heap_get_2_bytes_at_offset(address, 2)

  heap_get_Closure_environment = (address: number): number => this.heap_get_child(address, 0)

  is_Closure = (address: number): boolean => this.heap_get_tag(address) === Closure_tag

  // block frame
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]

  heap_allocate_Blockframe = (env: number): number => {
    globalState.ALLOCATING = [env]
    const address = this.heap_allocate(Blockframe_tag, 2)
    this.heap_set(address + 1, env)
    globalState.ALLOCATING = []
    return address
  }

  heap_get_Blockframe_environment = (address: number): number => this.heap_get_child(address, 0)

  // call frame
  // [1 byte tag, 1 byte unused, 2 bytes pc,
  //  1 byte unused, 2 bytes #children, 1 byte unused]
  // followed by the address of env

  heap_allocate_Callframe = (env: number, pc: number): number => {
    globalState.ALLOCATING = [env]
    const address = this.heap_allocate(Callframe_tag, 2)
    globalState.ALLOCATING = []
    this.heap_set_2_bytes_at_offset(address, 2, pc)
    this.heap_set(address + 1, env)
    return address
  }

  heap_get_Callframe_environment = (address: number): number => this.heap_get_child(address, 0)

  heap_get_Callframe_pc = (address: number): number => this.heap_get_2_bytes_at_offset(address, 2)

  is_Callframe = (address: number): boolean => this.heap_get_tag(address) === Callframe_tag

  // environment frame
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by the addresses of its values

  heap_allocate_Frame = (number_of_values: number): number =>
    this.heap_allocate(Frame_tag, number_of_values + 1)

  // environment
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by the addresses of its frames

  heap_allocate_Environment = (number_of_frames: number): number =>
    this.heap_allocate(Environment_tag, number_of_frames + 1)

  // access environment given by address
  // using a "position", i.e. a pair of
  // frame index and value index
  heap_get_Environment_value = (env_address: number, position: [number, number]): number => {
    const [frame_index, value_index] = position
    const frame_address = this.heap_get_child(env_address, frame_index)
    return this.heap_get_child(frame_address, value_index)
  }

  heap_set_Environment_value = (
    env_address: number,
    position: [number, number],
    value: number
  ): void => {
    const [frame_index, value_index] = position
    const frame_address = this.heap_get_child(env_address, frame_index)
    this.heap_set_child(frame_address, value_index, value)
  }

  // extend a given environment by a new frame:
  // create a new environment that is bigger by 1
  // frame slot than the given environment.
  // copy the frame numberes of the given
  // environment to the new environment.
  // enter the address of the new frame to end
  // of the new environment
  heap_Environment_extend = (frame_address: number, env_address: number): number => {
    const old_size = this.heap_get_size(env_address)
    // modified: should not free frame address and env address here
    globalState.ALLOCATING = [frame_address, env_address]
    const new_env_address = this.heap_allocate_Environment(old_size)
    globalState.ALLOCATING = []
    let i: number
    for (i = 0; i < old_size - 1; i++) {
      this.heap_set_child(new_env_address, i, this.heap_get_child(env_address, i))
    }
    this.heap_set_child(new_env_address, i, frame_address)
    return new_env_address
  }

  // pair
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by head and tail addresses, one word each
  heap_allocate_Pair = (hd: number, tl: number): number => {
    const pair_address = this.heap_allocate(Pair_tag, 3)
    this.heap_set_child(pair_address, 0, hd)
    this.heap_set_child(pair_address, 1, tl)
    return pair_address
  }

  is_Pair = (address: number): boolean => this.heap_get_tag(address) === Pair_tag

  // number
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by the number, one word
  // note: #children is 0

  heap_allocate_Number = (n: number): number => {
    const number_address = this.heap_allocate(Number_tag, 2)
    this.heap_set(number_address + 1, n)
    return number_address
  }

  is_Number = (address: number): boolean => this.heap_get_tag(address) === Number_tag

  allocate_literal_values = () => {
    this.False = this.heap_allocate(False_tag, 1)
    this.True = this.heap_allocate(True_tag, 1)
    this.Null = this.heap_allocate(Null_tag, 1)
    this.Unassigned = this.heap_allocate(Unassigned_tag, 1)
    this.Undefined = this.heap_allocate(Undefined_tag, 1)
  }

  is_False(address: number): boolean {
    return this.heap_get_tag(address) === False_tag
  }

  is_True(address: number): boolean {
    return this.heap_get_tag(address) === True_tag
  }

  is_Boolean(address: number): boolean {
    return this.is_True(address) || this.is_False(address)
  }

  is_Null(address: number): boolean {
    return this.heap_get_tag(address) === Null_tag
  }

  is_Unassigned(address: number): boolean {
    return this.heap_get_tag(address) === Unassigned_tag
  }

  is_Undefined(address: number): boolean {
    return this.heap_get_tag(address) === Undefined_tag
  }

  heap_make(words: number): DataView {
    const data = new ArrayBuffer(words * this.word_size)
    return new DataView(data)
  }

  heap_get(address: number): number {
    return this.heap.getFloat64(address * this.word_size)
  }

  heap_set(address: number, value: number): void {
    this.heap.setFloat64(address * this.word_size, value)
  }

  heap_get_child(address: number, child_index: number): number {
    return this.heap_get(address + 1 + child_index)
  }

  heap_set_child(address: number, child_index: number, value: number): void {
    this.heap_set(address + 1 + child_index, value)
  }

  heap_get_tag(address: number): number {
    return this.heap.getInt8(address * this.word_size)
  }

  private heap_get_size(address: number): number {
    return this.heap.getUint16(address * this.word_size + this.size_offset)
  }

  private heap_get_number_of_children(address: number): number {
    return this.heap_get_tag(address) === Number_tag ? 0 : this.heap_get_size(address) - 1
  }

  private heap_set_byte_at_offset(address: number, offset: number, value: number): void {
    this.heap.setUint8(address * this.word_size + offset, value)
  }

  private heap_get_byte_at_offset(address: number, offset: number): number {
    return this.heap.getUint8(address * this.word_size + offset)
  }

  private heap_set_2_bytes_at_offset(address: number, offset: number, value: number): void {
    this.heap.setUint16(address * this.word_size + offset, value)
  }

  private heap_get_2_bytes_at_offset(address: number, offset: number): number {
    return this.heap.getUint16(address * this.word_size + offset)
  }

  // MEMORY MANAGEMENT

  private heap_allocate(tag: number, size: number): number {
    if (size > this.node_size) {
      throw new Error('limitation: nodes cannot be larger than 10 words')
    }

    if (this.free === -1) {
      this.mark_sweep()
    }
    const address = this.free
    this.free = this.heap_get(this.free)
    this.heap.setInt8(address * this.word_size, tag)
    this.heap.setUint16(address * this.word_size + this.size_offset, size)
    return address
  }

  private mark_sweep = (): void => {
    // mark r for r in roots
    const roots = [...globalState.OS, globalState.E, ...globalState.RTS, ...globalState.ALLOCATING]
    for (let i = 0; i < roots.length; i++) {
      this.mark(roots[i])
    }

    this.sweep()

    if (this.free === -1) {
      throw new Error('heap memory exhausted')
    }
  }

  private mark = (node: number): void => {
    if (node >= this.heap_size) {
      return
    }

    if (this.is_unmarked(node)) {
      this.heap_set_byte_at_offset(node, this.mark_bit, this.MARKED)

      const num_of_children = this.heap_get_number_of_children(node)

      for (let i = 0; i < num_of_children; i++) {
        this.mark(this.heap_get_child(node, i))
      }
    }
  }

  private sweep = (): void => {
    let v = this.heap_bottom

    while (v < this.heap_size) {
      if (this.is_unmarked(v)) {
        this.free_node(v)
      } else {
        this.heap_set_byte_at_offset(v, this.mark_bit, this.UNMARKED)
      }

      v = v + this.node_size
    }
  }

  private is_unmarked = (node: number): boolean =>
    this.heap_get_byte_at_offset(node, this.mark_bit) === this.UNMARKED

  private free_node = (node: number): void => {
    // heap set is used for retrieving the next free node
    this.heap_set(node, this.free)
    this.free = node
  }

  // set up registers, including free list
  initialise_heap(heapsize_words: number) {
    // GLOBAL VARIABLES
    globalState.OS = []
    globalState.RTS = []
    globalState.ALLOCATING = []

    this.heap = this.heap_make(heapsize_words)
    this.heap_size = heapsize_words

    // initialize free list:
    // every free node carries the address
    // of the next free node as its first word
    let i = 0
    for (i = 0; i <= heapsize_words - this.node_size; i = i + this.node_size) {
      this.heap_set(i, i + this.node_size)
    }
    // the empty free list is represented by -1
    this.heap_set(i - this.node_size, -1)
    this.free = 0
    this.allocate_literal_values()
    const builtins_frame = this.allocate_builtin_frame()
    const constants_frame = this.allocate_constant_frame()
    globalState.E = this.heap_allocate_Environment(0)
    globalState.E = this.heap_Environment_extend(builtins_frame, globalState.E)
    globalState.E = this.heap_Environment_extend(constants_frame, globalState.E)

    this.heap_bottom = this.free
  }
}
