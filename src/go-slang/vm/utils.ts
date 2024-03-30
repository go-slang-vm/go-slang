export const pop = (array: number[]): number => {
  if (array.length === 0) {
    throw new Error('pop: empty list')
  }
  return array.pop()!
}

export const is_number = (v: any) => {
  return typeof v === 'number'
}

export const is_undefined = (xs: any) => {
  return typeof xs === 'undefined'
}

export const is_string = (xs: any) => {
  return typeof xs === 'string'
}

export const is_boolean = (xs: any) => {
  return typeof xs === 'boolean'
}
// Translated to TypeScript by Evan Sebastian
type Pair<H, T> = [H, T]
type List = null | NonEmptyList
type NonEmptyList = Pair<any, any>
// is_null returns true if arg is exactly null
// LOW-LEVEL FUNCTION, NOT SOURCE
export const is_null = (xs: List) => {
  return xs === null
}

// add values destructively to the end of
// given array; return the array
export const push = <T>(array: T[], ...items: T[]): T[] => {
  // fixed by Liew Zhao Wei, see Discussion 5
  for (let item of items) {
    array.push(item)
  }
  return array
}

// return the last element of given array
// without changing the array
export const peek = <T>(array: T[], address: number): T => array.slice(-1 - address)[0]

// *************
// parse to JSON
// *************/

// for debugging: return a string that shows the bits
// of a given word
export const word_to_string = (word: number): string => {
  const buf = new ArrayBuffer(8)
  const view = new DataView(buf)
  view.setFloat64(0, word)
  let binStr = ''
  for (let i = 0; i < 8; i++) {
    binStr += ('00000000' + view.getUint8(i).toString(2)).slice(-8) + ' '
  }
  return binStr
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
