import { ASTNode } from '../../ast/AST'
import { parse } from '../../parser/parser'

describe('Basic parser test', () => {
  test('basic channel and make tests', async () => {
    const program = `
      func main(){
        var channel1 chan int = make(chan int, 10)
        channel2 chan int := make(chan int)
        channel1 <- 1 + 2
        <-channel2
      }`

    const expectedAst = {
        tag: 'blk',
        body: {
          tag: 'seq',
          stmts: [
            {
              tag: 'fun',
              sym: 'main',
              prms: [],
              body: {
                tag: 'blk',
                body: {
                  tag: 'seq',
                  stmts: [
                    {
                      tag: 'let',
                      syms: { tag: 'idents', IDENTS: [ 'channel1' ] },
                      assignments: {
                        tag: 'exprlist',
                        list: [
                          {
                            tag: 'make',
                            chanType: 'chan int',
                            buffered: true,
                            capacity: 10
                          }
                        ]
                      },
                      type: 'chan int'
                    },
                    {
                      tag: 'let',
                      syms: { tag: 'idents', IDENTS: [ 'channel2' ] },
                      assignments: {
                        tag: 'exprlist',
                        list: [
                          {
                            tag: 'make',
                            chanType: 'chan int',
                            buffered: false,
                            capacity: 0
                          }
                        ]
                      },
                      type: 'chan int'
                    },
                    {
                      tag: 'send',
                      frst: { tag: 'nam', sym: 'channel1' },
                      scnd: {
                        tag: 'binop',
                        sym: '+',
                        frst: { tag: 'lit', val: 1 },
                        scnd: { tag: 'lit', val: 2 }
                      }
                    },
                    {
                      tag: 'recv',
                      sym: '<-',
                      frst: { tag: 'nam', sym: 'channel2' }
                    }
                  ]
                }
              },
              _arity: 0,
              paramTypes: [],
              returnTypes: []
            },
            {
              tag: 'app',
              fun: { tag: 'nam', sym: 'main' },
              args: [],
              _arity: 0
            }
          ]
        }
      };
    const outputAst: ASTNode = parse(program)
    expect(outputAst).toStrictEqual(expectedAst)
  })

  test('higher order channel and make tests', async () => {
    const program = `
      func main(){
        var channel1 chan chan chan int = make(chan chan chan int, 10)
        channel2 chan int := make(chan int)
        channel1 <- 1 + 2
        <-channel2
      }`

    const expectedAst = {
        tag: 'blk',
        body: {
          tag: 'seq',
          stmts: [
            {
              tag: 'fun',
              sym: 'main',
              prms: [],
              body: {
                tag: 'blk',
                body: {
                  tag: 'seq',
                  stmts: [
                    {
                      tag: 'let',
                      syms: { tag: 'idents', IDENTS: [ 'channel1' ] },
                      assignments: {
                        tag: 'exprlist',
                        list: [
                          {
                            tag: 'make',
                            chanType: 'chan chan chan int',
                            buffered: true,
                            capacity: 10
                          }
                        ]
                      },
                      type: 'chan chan chan int'
                    },
                    {
                      tag: 'let',
                      syms: { tag: 'idents', IDENTS: [ 'channel2' ] },
                      assignments: {
                        tag: 'exprlist',
                        list: [
                          {
                            tag: 'make',
                            chanType: 'chan int',
                            buffered: false,
                            capacity: 0
                          }
                        ]
                      },
                      type: 'chan int'
                    },
                    {
                      tag: 'send',
                      frst: { tag: 'nam', sym: 'channel1' },
                      scnd: {
                        tag: 'binop',
                        sym: '+',
                        frst: { tag: 'lit', val: 1 },
                        scnd: { tag: 'lit', val: 2 }
                      }
                    },
                    {
                      tag: 'recv',
                      sym: '<-',
                      frst: { tag: 'nam', sym: 'channel2' }
                    }
                  ]
                }
              },
              _arity: 0,
              paramTypes: [],
              returnTypes: []
            },
            {
              tag: 'app',
              fun: { tag: 'nam', sym: 'main' },
              args: [],
              _arity: 0
            }
          ]
        }
      };
    const outputAst: ASTNode = parse(program)
    expect(outputAst).toStrictEqual(expectedAst)
  })

  test('make without channel type should throw syntax error', async () => {
    const program = `
      func main(){
        var channel1 int = make(int, 10)
      }`

    expect(()=>parse(program)).toThrow("Syntax Error at line 3, col 32: missing 'chan' at 'int'");
  })

  test('weird channel types should throw syntax error', async () => {
    const program = `func main(){var channel1 chan int int chan int = make(chan int, 10)}`

    expect(()=>parse(program)).toThrow("Syntax Error at line 1, col 34: mismatched input 'int' expecting '='");
  })

  test('=== should throw parser error', async () => {
    const program = `
    func main(){
      x int := 1
      if x === 1 {
        x = x + 1
      }
    }`
    expect(()=>parse(program)).toThrow("Syntax Error at line 4, col 13: extraneous input '=' expecting {'func', 'true', 'false', 'make', 'nil', IDENTIFIER, '(', '!', '-', '<-', DECIMAL_LIT, FLOAT_LIT, RAW_STRING_LIT, INTERPRETED_STRING_LIT}");
  })

  test('!== should throw parser error', async () => {
    const program = `
    func main(){
      x int := 1
      if x !== 1 {
        x = x + 1
      }
    }`
    expect(()=>parse(program)).toThrow("Syntax Error at line 4, col 13: extraneous input '=' expecting {'func', 'true', 'false', 'make', 'nil', IDENTIFIER, '(', '!', '-', '<-', DECIMAL_LIT, FLOAT_LIT, RAW_STRING_LIT, INTERPRETED_STRING_LIT}");
  })
})
