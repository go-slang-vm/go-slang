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

    expect(()=>parse(program)).toThrow("Syntax Error at line 1, col 34: rule eos failed predicate: {this.closingBracket()}?");
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

  test('uninit var decl with type channel should throw error', async () => {
    const program = `
    func main(){
      var x chan int
    }`
    expect(()=>parse(program)).toThrow("channels should be initialized!");
  })

  test('uninit var decl test', async () => {
    const program = `
    func main(){
      var x int;
      var y float;
      var b bool;
      var s string;
      var a, b, c int;
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
                    syms: { tag: 'idents', IDENTS: [ 'x' ] },
                    assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 0 } ] },
                    type: 'int'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'y' ] },
                    assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 0 } ] },
                    type: 'float'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'b' ] },
                    assignments: {
                      tag: 'exprlist',
                      list: [ { tag: 'lit', val: false } ]
                    },
                    type: 'bool'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 's' ] },
                    assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: '' } ] },
                    type: 'string'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'a', 'b', 'c' ] },
                    assignments: {
                      tag: 'exprlist',
                      list: [
                        { tag: 'lit', val: 0 },
                        { tag: 'lit', val: 0 },
                        { tag: 'lit', val: 0 }
                      ]
                    },
                    type: 'int'
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
    }
    const outputAst: ASTNode = parse(program)
    expect(outputAst).toStrictEqual(expectedAst) 
  })

  test('var decl test', async () => {
    const program = `
    func main(){
      var x int = 1;
      var y float = 1;
      var b bool = false;
      var s string = "hello";
      var a, b, c int = 1, 2, 3;
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
                    syms: { tag: 'idents', IDENTS: [ 'x' ] },
                    assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 1 } ] },
                    type: 'int'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'y' ] },
                    assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 1 } ] },
                    type: 'float'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'b' ] },
                    assignments: {
                      tag: 'exprlist',
                      list: [ { tag: 'lit', val: false } ]
                    },
                    type: 'bool'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 's' ] },
                    assignments: {
                      tag: 'exprlist',
                      list: [ { tag: 'lit', val: 'hello' } ]
                    },
                    type: 'string'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'a', 'b', 'c' ] },
                    assignments: {
                      tag: 'exprlist',
                      list: [
                        { tag: 'lit', val: 1 },
                        { tag: 'lit', val: 2 },
                        { tag: 'lit', val: 3 }
                      ]
                    },
                    type: 'int'
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
    }
    const outputAst: ASTNode = parse(program)
    console.dir(outputAst, {depth: 100})
    expect(outputAst).toStrictEqual(expectedAst) 
  })

  test('short decl test', async () => {
    const program = `
    func main(){
      x int := 1;
      y float := 1;
      b bool := false;
      s string := "hello";
      a, b, c int := 1, 2, 3;
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
                    syms: { tag: 'idents', IDENTS: [ 'x' ] },
                    assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 1 } ] },
                    type: 'int'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'y' ] },
                    assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 1 } ] },
                    type: 'float'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'b' ] },
                    assignments: {
                      tag: 'exprlist',
                      list: [ { tag: 'lit', val: false } ]
                    },
                    type: 'bool'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 's' ] },
                    assignments: {
                      tag: 'exprlist',
                      list: [ { tag: 'lit', val: 'hello' } ]
                    },
                    type: 'string'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'a', 'b', 'c' ] },
                    assignments: {
                      tag: 'exprlist',
                      list: [
                        { tag: 'lit', val: 1 },
                        { tag: 'lit', val: 2 },
                        { tag: 'lit', val: 3 }
                      ]
                    },
                    type: 'int'
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
    }
    const outputAst: ASTNode = parse(program)
    console.dir(outputAst, {depth: 100})
    expect(outputAst).toStrictEqual(expectedAst) 
  })

  test('mixture decl test', async () => {
    const program = `
    func main(){
      var x int = 1;
      y float := 1;
      var b bool;
      var s string;
      a, bb, c int := 1, 2, 3;
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
                    syms: { tag: 'idents', IDENTS: [ 'x' ] },
                    assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 1 } ] },
                    type: 'int'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'y' ] },
                    assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 1 } ] },
                    type: 'float'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'b' ] },
                    assignments: {
                      tag: 'exprlist',
                      list: [ { tag: 'lit', val: false } ]
                    },
                    type: 'bool'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 's' ] },
                    assignments: {
                      tag: 'exprlist',
                      list: [ { tag: 'lit', val: '' } ]
                    },
                    type: 'string'
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'a', 'bb', 'c' ] },
                    assignments: {
                      tag: 'exprlist',
                      list: [
                        { tag: 'lit', val: 1 },
                        { tag: 'lit', val: 2 },
                        { tag: 'lit', val: 3 }
                      ]
                    },
                    type: 'int'
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
    }
    const outputAst: ASTNode = parse(program)
    console.dir(outputAst, {depth: 100})
    expect(outputAst).toStrictEqual(expectedAst) 
  })
})
