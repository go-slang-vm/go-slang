import { globalState } from './globals'
import { hashString } from './utils'
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
  Builtin_tag,
  String_tag,
  Channel_tag,
  Waitgroup_tag
} from './constants'

export class Heap {
  heap_size: number
  private word_size = 8
  private size_offset = 5
  private mark_bit = 7
  private UNMARKED = 0
  private MARKED = 1
  private stringPool: { [key: number]: [number, string] }
  False: number
  True: number
  Null: number
  Unassigned: number
  Undefined: number
  String: number
  heap: DataView
  node_size = 20
  free: number
  heap_bottom: number

  constructor() {
    this.stringPool = {}
  }

  get_string_pool_size = () => Object.keys(this.stringPool).length

  is_String = (address: number) => this.heap_get_tag(address) === String_tag

  heap_allocate_String = (str: string) => {
    const hash = hashString(str)
    const address_or_undefined = this.stringPool[hash]

    if (address_or_undefined !== undefined) {
      return address_or_undefined[0]
    }

    const address = this.heap_allocate(String_tag, 1)
    this.heap_set_4_bytes_at_offset(address, 1, hash)

    // store the string in the string pool
    this.stringPool[hash] = [address, str]

    return address
  }

  heap_get_string_hash = (address: number) => this.heap_get_4_bytes_at_offset(address, 1)

  heap_get_string = (address: number) => this.stringPool[this.heap_get_string_hash(address)][1]

  is_Builtin = (address: number): boolean => this.heap_get_tag(address) === Builtin_tag

  heap_allocate_Builtin = (id: number): number => {
    const address = this.heap_allocate(Builtin_tag, 1)
    this.heap_set_byte_at_offset(address, 1, id)
    return address
  }

  heap_get_Builtin_id = (address: number): number => this.heap_get_byte_at_offset(address, 1)

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

  // waitgroup
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by the internal counter, one word
  // note: #children is 0

  heap_allocate_Waitgroup = (): number => {
    const waitgroup_address = this.heap_allocate(Waitgroup_tag, 2)
    this.heap_set(waitgroup_address + 1, 0)
    return waitgroup_address
  }

  is_Waitgroup = (address: number): boolean => this.heap_get_tag(address) === Waitgroup_tag

  // channel
  // [1 byte tag, 4 bytes channel idx,
  //  2 bytes #children, 1 byte unused]
  // followed by the counter
  // followed by the capacity
  // CHANNEL TYPES: 0 = unbuffered, 1 = buffered, 2 = mutex
  // note: #children is 0
  TYPE_OFFSET: number = 7
  heap_allocate_Channel = (
    capacity: number,
    type: number,
    elemType: string,
    idx: number
  ): number => {
    const address = this.heap_allocate(Channel_tag, 3)
    this.heap_set_4_bytes_at_offset(address, 1, idx)

    this.heap_set_channel_type(address, type)
    // mutex start counter at 1
    const initialCounter = type === 2 ? 1 : 0
    this.heap_set_channel_counter(address, initialCounter)
    this.heap_set_channel_capacity(address, capacity)
    return address
  }

  heap_get_channel_idx = (address: number): number => this.heap_get_4_bytes_at_offset(address, 1)

  heap_get_channel_counter = (address: number): number => this.heap_get_child(address, 0)

  heap_get_channel_capacity = (address: number): number => this.heap_get_child(address, 1)

  heap_get_channel_type = (address: number): number =>
    this.heap_get_byte_at_offset(address, this.TYPE_OFFSET)

  heap_set_channel_counter = (address: number, val: number) => this.heap_set_child(address, 0, val)

  heap_set_channel_capacity = (address: number, val: number) => this.heap_set_child(address, 1, val)

  heap_set_channel_type = (address: number, type: number) =>
    this.heap_set_byte_at_offset(address, this.TYPE_OFFSET, type)

  is_Channel = (address: number): boolean => this.heap_get_tag(address) === Channel_tag

  allocate_literal_values = () => {
    this.False = this.heap_allocate(False_tag, 1)
    this.True = this.heap_allocate(True_tag, 1)
    this.Null = this.heap_allocate(Null_tag, 1)
    this.Unassigned = this.heap_allocate(Unassigned_tag, 1)
    this.Undefined = this.heap_allocate(Undefined_tag, 1)
    this.String = this.heap_allocate(String_tag, 1)
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
    if (new Set([Number_tag, Waitgroup_tag, Channel_tag]).has(this.heap_get_tag(address))) {
      return 0
    }

    return this.heap_get_size(address) - 1
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

  private heap_set_4_bytes_at_offset(address: number, offset: number, value: number): void {
    this.heap.setUint32(address * this.word_size + offset, value)
  }
  private heap_get_4_bytes_at_offset(address: number, offset: number): number {
    return this.heap.getUint32(address * this.word_size + offset)
  }

  // MEMORY MANAGEMENT

  private heap_allocate(tag: number, size: number): number {
    if (size > this.node_size) {
      throw new Error(
        `limitation: nodes cannot be larger than ${this.node_size} words. Current size: ${size}`
      )
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

    // current thread
    let roots = [...globalState.OS, globalState.E, ...globalState.RTS, ...globalState.ALLOCATING]
    for (let i = 0; i < roots.length; i++) {
      this.mark(roots[i])
    }
    // rest of the threads
    for (const thread of globalState.THREADQUEUE) {
      // no allocating
      roots = [...thread.OS, thread.E, ...thread.RTS]
      for (let i = 0; i < roots.length; i++) {
        this.mark(roots[i])
      }
    }

    // blocked threads
    for (const channel of globalState.CHANNELARRAY) {
      for (const thread of channel.getRecvQueue()) {
        // no allocating
        roots = [...thread.OS, thread.E, ...thread.RTS]
        for (let i = 0; i < roots.length; i++) {
          this.mark(roots[i])
        }
      }
      for (const thread of channel.getSendQueue()) {
        // no allocating
        roots = [...thread.OS, thread.E, ...thread.RTS]
        for (let i = 0; i < roots.length; i++) {
          this.mark(roots[i])
        }
      }
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
}
