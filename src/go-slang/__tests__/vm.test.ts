import { VM } from '../vm/index'
import { Instruction } from '../vm/types'

describe('Virtual Machine tests', () => {
  const vm = new VM(1500)
  test('block scoped variable', async () => {
    const instructions: Instruction[] = [
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

    expect(vm.run(instructions)).toStrictEqual(5)
  })
  test('factorial using tail recursion', async () => {
    const instructions: Instruction[] = [
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

    expect(vm.run(instructions)).toStrictEqual(120)
  })
})
