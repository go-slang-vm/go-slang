export const pop = (array: number[]): number => {
  if (array.length === 0) {
    throw new Error('pop: empty list')
  }
  return array.pop()!
}

// strings:
// [1 byte tag, 4 byte hash to stringPool,
// 2 bytes #children, 1 byte unused]
// Note: #children is 0

// Hash any string to a 32-bit unsigned integer
export const hashString = (str: string) => {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) + hash + char
    hash = hash & hash
  }
  return hash >>> 0
}
