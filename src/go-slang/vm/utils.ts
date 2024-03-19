export const pop = (array: number[]): number => {
  if (array.length === 0) {
    throw new Error('pop: empty list')
  }
  return array.pop()!
}
