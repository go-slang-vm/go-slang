// values

// All values are allocated on the heap as nodes. The first
// word of the node is a header, and the first byte of the
// header is a tag that identifies the type of node

// a little trick: tags are all negative so that we can use
// the first 4 bytes of the header as forwarding address
// in garbage collection: If the (signed) Int32 is
// non-negative, the node has been forwarded already.

export const numInstructions = 5

export const False_tag = 0
export const True_tag = 1
export const Number_tag = 2
export const Null_tag = 3
export const Unassigned_tag = 4
export const Undefined_tag = 5
export const Blockframe_tag = 6
export const Callframe_tag = 7
export const Closure_tag = 8
export const Frame_tag = 9 // 0000 1001
export const Environment_tag = 10 // 0000 1010
export const Pair_tag = 11
export const Builtin_tag = 12
export const String_tag = 13
export const Channel_tag = 14
export const Waitgroup_tag = 14


export const ChannelHeapSize = 65536
export const word_size = 8
// NOTE WE NEED THIS TO BE AT LEAST 2 SINCE OUR IMPLEMENTATION MAY TEMPORARILY INCREASE THE SIZE OF QUEUE BY 1 FOR CONVENIENCE AND ALSO FOR CONVENIENCE UNBUFFERED CHANNELS USE 1 SLOT
export const channel_buffer = 2