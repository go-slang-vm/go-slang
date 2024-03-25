import { ASTNode } from '../../ast/AST'
import { compile_program } from '../../compiler/compiler'
import { parse } from '../../parser/parser'

describe('Basic compiler test', () => {
  test('basic variable declaration in a new block scope', async () => {
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
    ]

    const inputAst: ASTNode = parse(program)
    const outputInstr: any[] = compile_program(inputAst)
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  test('basic variable declaration in a new block scope 2', async () => {
    const program = `
      func main() (int) {
        var y int = 1
        {
          y int := 2
          return y
        }
        
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
      { tag: 'POP' },
      { tag: 'LD', sym: 'y', pos: [5, 0] },
      { tag: 'RESET' },
      { tag: 'EXIT_SCOPE' },
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

    const inputAst: ASTNode = parse(program)
    const outputInstr: any[] = compile_program(inputAst)
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  test('basic fact', async () => {
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
      }`

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

    const inputAst: ASTNode = parse(program)
    const outputInstr: any[] = compile_program(inputAst)
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  test('basic multiple variable declaration', async () => {
    const program = `
      var x,y,z int = 1, 2, 3
      func main() (int) {
        sx, sy, sz int := 11, 22, 33
      }`

    const expectedInstr = [
      { tag: 'ENTER_SCOPE', num: 4 },
      { tag: 'LDC', val: 1 },
      { tag: 'LDC', val: 2 },
      { tag: 'LDC', val: 3 },
      { tag: 'ASSIGN', pos: [2, 2] },
      { tag: 'POP' },
      { tag: 'ASSIGN', pos: [2, 1] },
      { tag: 'POP' },
      { tag: 'ASSIGN', pos: [2, 0] },
      { tag: 'POP' },
      { tag: 'LDF', arity: 0, addr: 12 },
      { tag: 'GOTO', addr: 24 },
      { tag: 'ENTER_SCOPE', num: 3 },
      { tag: 'LDC', val: 11 },
      { tag: 'LDC', val: 22 },
      { tag: 'LDC', val: 33 },
      { tag: 'ASSIGN', pos: [4, 2] },
      { tag: 'POP' },
      { tag: 'ASSIGN', pos: [4, 1] },
      { tag: 'POP' },
      { tag: 'ASSIGN', pos: [4, 0] },
      { tag: 'EXIT_SCOPE' },
      { tag: 'LDC', val: undefined },
      { tag: 'RESET' },
      { tag: 'ASSIGN', pos: [2, 3] },
      { tag: 'POP' },
      { tag: 'LD', sym: 'main', pos: [2, 3] },
      { tag: 'CALL', arity: 0 },
      { tag: 'EXIT_SCOPE' },
      { tag: 'DONE' }
    ]

    const inputAst: ASTNode = parse(program)
    const outputInstr: any[] = compile_program(inputAst)
    //console.log(JSON.stringify(outputInstr));
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  test('basic multiple assignment', async () => {
    const program = `
      var x,y,z int = 1, 2, 3
      func main() (int) {
        x, y, z = 11, 22, 33
      }`

    const expectedInstr = [
      { tag: 'ENTER_SCOPE', num: 4 },
      { tag: 'LDC', val: 1 },
      { tag: 'LDC', val: 2 },
      { tag: 'LDC', val: 3 },
      { tag: 'ASSIGN', pos: [2, 2] },
      { tag: 'POP' },
      { tag: 'ASSIGN', pos: [2, 1] },
      { tag: 'POP' },
      { tag: 'ASSIGN', pos: [2, 0] },
      { tag: 'POP' },
      { tag: 'LDF', arity: 0, addr: 12 },
      { tag: 'GOTO', addr: 22 },
      { tag: 'LDC', val: 11 },
      { tag: 'LDC', val: 22 },
      { tag: 'LDC', val: 33 },
      { tag: 'ASSIGN', pos: [2, 2] },
      { tag: 'POP' },
      { tag: 'ASSIGN', pos: [2, 1] },
      { tag: 'POP' },
      { tag: 'ASSIGN', pos: [2, 0] },
      { tag: 'LDC', val: undefined },
      { tag: 'RESET' },
      { tag: 'ASSIGN', pos: [2, 3] },
      { tag: 'POP' },
      { tag: 'LD', sym: 'main', pos: [2, 3] },
      { tag: 'CALL', arity: 0 },
      { tag: 'EXIT_SCOPE' },
      { tag: 'DONE' }
    ]

    const inputAst: ASTNode = parse(program)
    const outputInstr: any[] = compile_program(inputAst)
    expect(outputInstr).toStrictEqual(expectedInstr)
  })
  // NOTE TO US, there is no way to express this in js/source to check with HOMEWORK compiler, but use eye check
  test('basic multiple variable declaration multiple return from function', async () => {
    const program = `
      func inc() (int, int, int) {
        return 1, 2, 3
      }
      var x,y,z int = inc()
      func main() (int) {}`

    const expectedInstr = [
      { tag: 'ENTER_SCOPE', num: 5 },
      { tag: 'LDF', arity: 0, addr: 3 },
      { tag: 'GOTO', addr: 9 },
      { tag: 'LDC', val: 1 },
      { tag: 'LDC', val: 2 },
      { tag: 'LDC', val: 3 },
      { tag: 'RESET' },
      { tag: 'LDC', val: undefined },
      { tag: 'RESET' },
      { tag: 'ASSIGN', pos: [2, 0] },
      { tag: 'POP' },
      { tag: 'LD', sym: 'inc', pos: [2, 0] },
      { tag: 'CALL', arity: 0 },
      { tag: 'ASSIGN', pos: [2, 3] },
      { tag: 'POP' },
      { tag: 'ASSIGN', pos: [2, 2] },
      { tag: 'POP' },
      { tag: 'ASSIGN', pos: [2, 1] },
      { tag: 'POP' },
      { tag: 'LDF', arity: 0, addr: 21 },
      { tag: 'GOTO', addr: 24 },
      { tag: 'LDC', val: undefined },
      { tag: 'LDC', val: undefined },
      { tag: 'RESET' },
      { tag: 'ASSIGN', pos: [2, 4] },
      { tag: 'POP' },
      { tag: 'LD', sym: 'main', pos: [2, 4] },
      { tag: 'CALL', arity: 0 },
      { tag: 'EXIT_SCOPE' },
      { tag: 'DONE' }
    ]

    const inputAst: ASTNode = parse(program)
    const outputInstr: any[] = compile_program(inputAst)
    // console.log(JSON.stringify(outputInstr));
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  test('basic while loop', async () => {
    const program = `
      func main() (int) {
        var x int = 0
        var y int = 0
        for x < 10 {
          x = x + 1
          y = y + x
        }
        return y
      }`

    const expectedInstr = [
      { tag: 'ENTER_SCOPE', num: 1 },
      { tag: 'LDF', arity: 0, addr: 3 },
      { tag: 'GOTO', addr: 32 },
      { tag: 'ENTER_SCOPE', num: 2 },
      { tag: 'LDC', val: 0 },
      { tag: 'ASSIGN', pos: [4, 0] },
      { tag: 'POP' },
      { tag: 'LDC', val: 0 },
      { tag: 'ASSIGN', pos: [4, 1] },
      { tag: 'POP' },
      { tag: 'LD', sym: 'x', pos: [4, 0] },
      { tag: 'LDC', val: 10 },
      { tag: 'BINOP', sym: '<' },
      { tag: 'JOF', addr: 25 },
      { tag: 'LD', sym: 'x', pos: [4, 0] },
      { tag: 'LDC', val: 1 },
      { tag: 'BINOP', sym: '+' },
      { tag: 'ASSIGN', pos: [4, 0] },
      { tag: 'POP' },
      { tag: 'LD', sym: 'y', pos: [4, 1] },
      { tag: 'LD', sym: 'x', pos: [4, 0] },
      { tag: 'BINOP', sym: '+' },
      { tag: 'ASSIGN', pos: [4, 1] },
      { tag: 'POP' },
      { tag: 'GOTO', addr: 10 },
      { tag: 'LDC', val: undefined },
      { tag: 'POP' },
      { tag: 'LD', sym: 'y', pos: [4, 1] },
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

    const inputAst: ASTNode = parse(program)
    const outputInstr: any[] = compile_program(inputAst)
    // console.log(JSON.stringify(outputInstr));
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  test('basic if statment with nesting and empty else', async () => {
    const program = `
      func main() (int) {
        x int := 1
        if(false) {
          x = 10
        } else if(true) {
          if(x < 10) {
            x = 20;
          }
        } else {
          x = 30
        }
        return x
      }`

    const expectedInstr = [
      { tag: 'ENTER_SCOPE', num: 1 },
      { tag: 'LDF', arity: 0, addr: 3 },
      { tag: 'GOTO', addr: 31 },
      { tag: 'ENTER_SCOPE', num: 1 },
      { tag: 'LDC', val: 1 },
      { tag: 'ASSIGN', pos: [4, 0] },
      { tag: 'POP' },
      { tag: 'LDC', val: false },
      { tag: 'JOF', addr: 12 },
      { tag: 'LDC', val: 10 },
      { tag: 'ASSIGN', pos: [4, 0] },
      { tag: 'GOTO', addr: 25 },
      { tag: 'LDC', val: true },
      { tag: 'JOF', addr: 23 },
      { tag: 'LD', sym: 'x', pos: [4, 0] },
      { tag: 'LDC', val: 10 },
      { tag: 'BINOP', sym: '<' },
      { tag: 'JOF', addr: 21 },
      { tag: 'LDC', val: 20 },
      { tag: 'ASSIGN', pos: [4, 0] },
      { tag: 'GOTO', addr: 22 },
      { tag: 'LDC', val: undefined },
      { tag: 'GOTO', addr: 25 },
      { tag: 'LDC', val: 30 },
      { tag: 'ASSIGN', pos: [4, 0] },
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

    const inputAst: ASTNode = parse(program)
    // console.dir(inputAst, {depth : 100});
    const outputInstr: any[] = compile_program(inputAst)
    // console.log(JSON.stringify(outputInstr));
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  test('basic empty return', async () => {
    const program = `
      func main() {
        x int := 1
        if(false) {
          x = 10
        } else if(true) {
          if(x < 10) {
            x = 20;
          }
        } else {
          x = 30
        }
      }`

    const expectedInstr = [
      { tag: 'ENTER_SCOPE', num: 1 },
      { tag: 'LDF', arity: 0, addr: 3 },
      { tag: 'GOTO', addr: 28 },
      { tag: 'ENTER_SCOPE', num: 1 },
      { tag: 'LDC', val: 1 },
      { tag: 'ASSIGN', pos: [4, 0] },
      { tag: 'POP' },
      { tag: 'LDC', val: false },
      { tag: 'JOF', addr: 12 },
      { tag: 'LDC', val: 10 },
      { tag: 'ASSIGN', pos: [4, 0] },
      { tag: 'GOTO', addr: 25 },
      { tag: 'LDC', val: true },
      { tag: 'JOF', addr: 23 },
      { tag: 'LD', sym: 'x', pos: [4, 0] },
      { tag: 'LDC', val: 10 },
      { tag: 'BINOP', sym: '<' },
      { tag: 'JOF', addr: 21 },
      { tag: 'LDC', val: 20 },
      { tag: 'ASSIGN', pos: [4, 0] },
      { tag: 'GOTO', addr: 22 },
      { tag: 'LDC', val: undefined },
      { tag: 'GOTO', addr: 25 },
      { tag: 'LDC', val: 30 },
      { tag: 'ASSIGN', pos: [4, 0] },
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

    const inputAst: ASTNode = parse(program)
    // console.dir(inputAst, {depth : 100});
    const outputInstr: any[] = compile_program(inputAst)
    // console.log(JSON.stringify(outputInstr));
    expect(outputInstr).toStrictEqual(expectedInstr)
  })
  test('basic string', async () => {
    const program = `
      func main() {
        x string := "this is a string"
        return x
      }`

    const expectedInstr = [
      { tag: 'ENTER_SCOPE', num: 1 },
      { tag: 'LDF', arity: 0, addr: 3 },
      { tag: 'GOTO', addr: 12 },
      { tag: 'ENTER_SCOPE', num: 1 },
      { tag: 'LDC', val: 'this is a string' },
      { tag: 'ASSIGN', pos: [4, 0] },
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

    const inputAst: ASTNode = parse(program)
    // console.dir(inputAst, {depth : 100});
    const outputInstr: any[] = compile_program(inputAst)
    // console.log(JSON.stringify(outputInstr));
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  // TODO: DECIDE IF WE WANT NIL TO BE A NAME IN GLOBAL ENV OR A LITERAL
  /*
  test('basic nil test should be a name instead of a literal', async () => {
    const program = `
      func main() {
        x int := nil
        return x;
      }`

    const expectedInstr = 
    [ {"tag": "ENTER_SCOPE", "num": 1},
  {"tag": "LDF", "arity": 0, "addr": 3},
  {"tag": "GOTO", "addr": 12},
  {"tag": "ENTER_SCOPE", "num": 1},
  {"tag": "LD", "sym": "nil", "pos": [1, 0]},
  {"tag": "ASSIGN", "pos": [4, 0]},
  {"tag": "POP"},
  {"tag": "LD", "sym": "x", "pos": [4, 0]},
  {"tag": "RESET"},
  {"tag": "EXIT_SCOPE"},
  {"tag": "LDC", "val": undefined},
  {"tag": "RESET"},
  {"tag": "ASSIGN", "pos": [2, 0]},
  {"tag": "POP"},
  {"tag": "LD", "sym": "main", "pos": [2, 0]},
  {"tag": "CALL", "arity": 0},
  {"tag": "EXIT_SCOPE"},
  {"tag": "DONE"}];

    const inputAst: ASTNode = parse(program)
   // console.dir(inputAst, {depth : 100});
    const outputInstr: any[] = compile_program(inputAst)
    // console.log(JSON.stringify(outputInstr));
    expect(outputInstr).toStrictEqual(expectedInstr)
  });
  */
  test('basic Println statement', async () => {
    const program = `
      func main() {
        x string := "this is a string"
        Println(x)
      }`

    const expectedInstr = [
      { tag: 'ENTER_SCOPE', num: 1 },
      { tag: 'LDF', arity: 0, addr: 3 },
      { tag: 'GOTO', addr: 13 },
      { tag: 'ENTER_SCOPE', num: 1 },
      { tag: 'LDC', val: 'this is a string' },
      { tag: 'ASSIGN', pos: [4, 0] },
      { tag: 'POP' },
      { tag: 'LD', sym: 'Println', pos: [0, 0] },
      { tag: 'LD', sym: 'x', pos: [4, 0] },
      { tag: 'CALL', arity: 1 },
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

    const inputAst: ASTNode = parse(program)
    //console.dir(inputAst, {depth : 100});
    const outputInstr: any[] = compile_program(inputAst)
    //console.log(JSON.stringify(outputInstr));
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  test('basic go statement', async () => {
    const program = `
      func inc(x int) {
        return x
      }
      func main() {
        go inc(1);
      }`

    const expectedInstr = [
      { tag: 'ENTER_SCOPE', num: 2 },
      { tag: 'LDF', arity: 1, addr: 3 },
      { tag: 'GOTO', addr: 7 },
      { tag: 'LD', sym: 'x', pos: [3, 0] },
      { tag: 'RESET' },
      { tag: 'LDC', val: undefined },
      { tag: 'RESET' },
      { tag: 'ASSIGN', pos: [2, 0] },
      { tag: 'POP' },
      { tag: 'LDF', arity: 0, addr: 11 },
      { tag: 'GOTO', addr: 16 },
      { tag: 'LD', sym: 'inc', pos: [2, 0] },
      { tag: 'LDC', val: 1 },
      { tag: 'GOCALL', arity: 1 },
      { tag: 'LDC', val: undefined },
      { tag: 'RESET' },
      { tag: 'ASSIGN', pos: [2, 1] },
      { tag: 'POP' },
      { tag: 'LD', sym: 'main', pos: [2, 1] },
      { tag: 'CALL', arity: 0 },
      { tag: 'EXIT_SCOPE' },
      { tag: 'DONE' }
    ]

    const inputAst: ASTNode = parse(program)
    //console.dir(inputAst, {depth : 100});
    const outputInstr: any[] = compile_program(inputAst)
    //console.log(JSON.stringify(outputInstr));
    expect(outputInstr).toStrictEqual(expectedInstr)
  })

  test('basic go statement with lambda', async () => {
    const program = `
      func main() {
        go func(x int){
          return x
        }(1);
      }`

    const expectedInstr = [
      { tag: 'ENTER_SCOPE', num: 1 },
      { tag: 'LDF', arity: 0, addr: 3 },
      { tag: 'GOTO', addr: 13 },
      { tag: 'LDF', arity: 1, addr: 5 },
      { tag: 'GOTO', addr: 9 },
      { tag: 'LD', sym: 'x', pos: [4, 0] },
      { tag: 'RESET' },
      { tag: 'LDC', val: undefined },
      { tag: 'RESET' },
      { tag: 'LDC', val: 1 },
      { tag: 'GOCALL', arity: 1 },
      { tag: 'LDC', val: undefined },
      { tag: 'RESET' },
      { tag: 'ASSIGN', pos: [2, 0] },
      { tag: 'POP' },
      { tag: 'LD', sym: 'main', pos: [2, 0] },
      { tag: 'CALL', arity: 0 },
      { tag: 'EXIT_SCOPE' },
      { tag: 'DONE' }
    ]

    const inputAst: ASTNode = parse(program)
    //console.dir(inputAst, {depth : 100});
    const outputInstr: any[] = compile_program(inputAst)
    //console.log(JSON.stringify(outputInstr));
    expect(outputInstr).toStrictEqual(expectedInstr)
  })
})
