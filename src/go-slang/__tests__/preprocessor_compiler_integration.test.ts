import { ASTNode } from '../ast/AST'
import { preprocess } from '../preprocessor/preprocessor'
import { compile_program } from '../compiler/compiler'
import { parse } from '../parser/parser'

describe('Basic preprocessor and compiler integration test', () => {
  test('basic preprocessor test only 1 declaration so no reordering', async () => {
    const program = `
      func main() (int) {
        var y int = 1
        {
          y int := 2
        }
        return y
      }`

    const expectedInstr = [
      { tag: 'ENTER_SCOPE', num: 1 },
      { tag: 'LDF', arity: 0, addr: 3 },
      { tag: 'GOTO', addr: 17 },
      { tag: 'ENTER_SCOPE', num: 1 },
      { tag: 'LDC', val: 1 },
      { tag: 'ASSIGN', pos: [4, 0] },
      { tag: 'POP' },
      { tag: 'ENTER_SCOPE', num: 1 },
      { tag: 'LDC', val: 2 },
      { tag: 'ASSIGN', pos: [5, 0] },
      { tag: 'EXIT_SCOPE' },
      { tag: 'POP' },
      { tag: 'LD', sym: 'y', pos: [4, 0] },
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
    ];

    const inputAst: ASTNode = parse(program)
    const postProcessedAst: ASTNode = preprocess(inputAst)
    const outputInstr: any[] = compile_program(postProcessedAst)
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  test('basic preprocessor test 3 declaration no reordering', async () => {
    // note functions are hoisted up
    const program = `
      var x int = 2
      func main() {
        sz int :=1
      }
      var y int = 3
      `

    const expectedInstr = [{ "tag": "ENTER_SCOPE", "num": 3 },
    { "tag": "LDF", "arity": 0, "addr": 3 },
    { "tag": "GOTO", "addr": 9 },
    { "tag": "ENTER_SCOPE", "num": 1 },
    { "tag": "LDC", "val": 1 },
    { "tag": "ASSIGN", "pos": [4, 0] },
    { "tag": "EXIT_SCOPE" },
    { "tag": "LDC", "val": undefined },
    { "tag": "RESET" },
    { "tag": "ASSIGN", "pos": [2, 0] },
    { "tag": "POP" },
    { "tag": "LDC", "val": 2 },
    { "tag": "ASSIGN", "pos": [2, 1] },
    { "tag": "POP" },
    { "tag": "LDC", "val": 3 },
    { "tag": "ASSIGN", "pos": [2, 2] },
    { "tag": "POP" },
    { "tag": "LD", "sym": "main", "pos": [2, 0] },
    { "tag": "CALL", "arity": 0 },
    { "tag": "EXIT_SCOPE" },
    { "tag": "DONE" }];

    const inputAst: ASTNode = parse(program);
    const postProcessedAst: ASTNode = preprocess(inputAst);
    const outputInstr: any[] = compile_program(postProcessedAst)
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  test('basic preprocessor test 3 declaration with reordering', async () => {
    const program = `
      var x int = y
      func main() {
        sz int :=1
      }
      var y int = 3
      `

    const expectedInstr = [{ "tag": "ENTER_SCOPE", "num": 3 },
    { "tag": "LDF", "arity": 0, "addr": 3 },
    { "tag": "GOTO", "addr": 9 },
    { "tag": "ENTER_SCOPE", "num": 1 },
    { "tag": "LDC", "val": 1 },
    { "tag": "ASSIGN", "pos": [4, 0] },
    { "tag": "EXIT_SCOPE" },
    { "tag": "LDC", "val": undefined },
    { "tag": "RESET" },
    { "tag": "ASSIGN", "pos": [2, 0] },
    { "tag": "POP" },
    { "tag": "LDC", "val": 3 },
    { "tag": "ASSIGN", "pos": [2, 1] },
    { "tag": "POP" },
    { "tag": "LD", "sym": "y", "pos": [2, 1] },
    { "tag": "ASSIGN", "pos": [2, 2] },
    { "tag": "POP" },
    { "tag": "LD", "sym": "main", "pos": [2, 0] },
    { "tag": "CALL", "arity": 0 },
    { "tag": "EXIT_SCOPE" },
    { "tag": "DONE" }];

    const inputAst: ASTNode = parse(program);
    const postProcessedAst: ASTNode = preprocess(inputAst);
    const outputInstr: any[] = compile_program(postProcessedAst)
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  test('basic preprocessor test 4 declaration with reordering in func', async () => {
    const program = `
      var x int = inc()
      func inc() {
        return y
      }
      func main() {
        sz int :=1
      }
      var y int = 3
      `

    const expectedInstr = [{ "tag": "ENTER_SCOPE", "num": 4 },
    { "tag": "LDF", "arity": 0, "addr": 3 },
    { "tag": "GOTO", "addr": 7 },
    { "tag": "LD", "sym": "y", "pos": [2, 2] },
    { "tag": "RESET" },
    { "tag": "LDC", "val": undefined },
    { "tag": "RESET" },
    { "tag": "ASSIGN", "pos": [2, 0] },
    { "tag": "POP" },
    { "tag": "LDF", "arity": 0, "addr": 11 },
    { "tag": "GOTO", "addr": 17 },
    { "tag": "ENTER_SCOPE", "num": 1 },
    { "tag": "LDC", "val": 1 },
    { "tag": "ASSIGN", "pos": [4, 0] },
    { "tag": "EXIT_SCOPE" },
    { "tag": "LDC", "val": undefined },
    { "tag": "RESET" },
    { "tag": "ASSIGN", "pos": [2, 1] },
    { "tag": "POP" },
    { "tag": "LDC", "val": 3 },
    { "tag": "ASSIGN", "pos": [2, 2] },
    { "tag": "POP" },
    { "tag": "LD", "sym": "inc", "pos": [2, 0] },
    { "tag": "CALL", "arity": 0 },
    { "tag": "ASSIGN", "pos": [2, 3] },
    { "tag": "POP" },
    { "tag": "LD", "sym": "main", "pos": [2, 1] },
    { "tag": "CALL", "arity": 0 },
    { "tag": "EXIT_SCOPE" },
    { "tag": "DONE" }];

    const inputAst: ASTNode = parse(program);
    const postProcessedAst: ASTNode = preprocess(inputAst);
    const outputInstr: any[] = compile_program(postProcessedAst)
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  test('basic fact with no reordering', async () => {
    const program = `
        func fact(n int) (int) {
            return fact_iter(n,1,1)
          }
          func fact_iter(n, i, acc int) (int) {
            if i > n {
              return acc
            } else {
              return fact_iter(n,i+1,acc*i)
            }
          }
          func main() (int) {
            return fact(5)
          }
          `

    const expectedInstr = [
      { tag: 'ENTER_SCOPE', num: 3 },
      { tag: 'LDF', arity: 1, addr: 3 },
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
      { tag: 'LDF', arity: 3, addr: 14 },
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
      { tag: 'LDF', arity: 0, addr: 36 },
      { tag: 'GOTO', addr: 41 },
      { tag: 'LD', sym: 'fact', pos: [2, 0] },
      { tag: 'LDC', val: 5 },
      { tag: 'TAIL_CALL', arity: 1 },
      { tag: 'LDC', val: undefined },
      { tag: 'RESET' },
      { tag: 'ASSIGN', pos: [2, 2] },
      { tag: 'POP' },
      { tag: 'LD', sym: 'main', pos: [2, 2] },
      { tag: 'CALL', arity: 0 },
      { tag: 'EXIT_SCOPE' },
      { tag: 'DONE' }
    ]

    const inputAst: ASTNode = parse(program);
    const postProcessedAst: ASTNode = preprocess(inputAst);
    const outputInstr: any[] = compile_program(postProcessedAst)
    expect(outputInstr).toStrictEqual(expectedInstr)
  })
})
