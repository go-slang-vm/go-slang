import { ASTNode } from '../../ast/AST'
import { preprocess } from '../preprocessor'
import { parse } from '../../parser/parser'

describe('Basic compiler test', () => {
  test('basic preprocessor test only 1 declaration so no reordering', async () => {
    const program = `
      func main() (int) {
        var y int = 1
        {
          y int := 2
        }
        return y
      }`

    let expectedAst: any = {
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
                    syms: { tag: 'idents', IDENTS: ['y'] },
                    assignments: { tag: 'exprlist', list: [{ tag: 'lit', val: 1 }] },
                    type: 'int'
                  },
                  {
                    tag: 'blk',
                    body: {
                      tag: 'seq',
                      stmts: [
                        {
                          tag: 'let',
                          syms: { tag: 'idents', IDENTS: ['y'] },
                          assignments: {
                            tag: 'exprlist',
                            list: [{ tag: 'lit', val: 2 }]
                          },
                          type: 'int'
                        }
                      ]
                    }
                  },
                  {
                    tag: 'ret',
                    expr: [{ tag: 'nam', sym: 'y' }],
                    _arity: 1
                  }
                ]
              }
            },
            _arity: 0,
            paramTypes: [],
            returnTypes: ['int']
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

    const inputAst: ASTNode = parse(program);
    const postProcessedAst: ASTNode = preprocess(inputAst);
    expect(postProcessedAst).toStrictEqual(expectedAst)
  })

  test('basic preprocessor test 3 declaration no reordering', async () => {
    const program = `
      var x int = 2
      func main() {
        sz int :=1
      }
      var y int = 3
      `

    let expectedAst: any = {
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
                    syms: { tag: 'idents', IDENTS: ['sz'] },
                    assignments: { tag: 'exprlist', list: [{ tag: 'lit', val: 1 }] },
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
            tag: 'let',
            syms: { tag: 'idents', IDENTS: ['x'] },
            assignments: { tag: 'exprlist', list: [{ tag: 'lit', val: 2 }] },
            type: 'int'
          },
          {
            tag: 'let',
            syms: { tag: 'idents', IDENTS: ['y'] },
            assignments: { tag: 'exprlist', list: [{ tag: 'lit', val: 3 }] },
            type: 'int'
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

    const inputAst: ASTNode = parse(program);
    const postProcessedAst: ASTNode = preprocess(inputAst);
    expect(postProcessedAst).toStrictEqual(expectedAst)
  })

  test('basic preprocessor test 3 declaration with reordering', async () => {
    const program = `
      var x int = y
      func main() {
        sz int :=1
      }
      var y int = 3
      `

    let expectedAst: any = {
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
                    syms: { tag: 'idents', IDENTS: ['sz'] },
                    assignments: { tag: 'exprlist', list: [{ tag: 'lit', val: 1 }] },
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
            tag: 'let',
            syms: { tag: 'idents', IDENTS: ['y'] },
            assignments: { tag: 'exprlist', list: [{ tag: 'lit', val: 3 }] },
            type: 'int'
          },
          {
            tag: 'let',
            syms: { tag: 'idents', IDENTS: ['x'] },
            assignments: { tag: 'exprlist', list: [{ tag: 'nam', sym: 'y' }] },
            type: 'int'
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

    const inputAst: ASTNode = parse(program);
    const postProcessedAst: ASTNode = preprocess(inputAst);
    expect(postProcessedAst).toStrictEqual(expectedAst)
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

    let expectedAst: any = {
      tag: 'blk',
      body: {
        tag: 'seq',
        stmts: [
          {
            tag: 'fun',
            sym: 'inc',
            prms: [],
            body: {
              tag: 'blk',
              body: {
                tag: 'seq',
                stmts: [
                  {
                    tag: 'ret',
                    expr: [{ tag: 'nam', sym: 'y' }],
                    _arity: 1
                  }
                ]
              }
            },
            _arity: 0,
            paramTypes: [],
            returnTypes: []
          },
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
                    syms: { tag: 'idents', IDENTS: ['sz'] },
                    assignments: { tag: 'exprlist', list: [{ tag: 'lit', val: 1 }] },
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
            tag: 'let',
            syms: { tag: 'idents', IDENTS: ['y'] },
            assignments: { tag: 'exprlist', list: [{ tag: 'lit', val: 3 }] },
            type: 'int'
          },
          {
            tag: 'let',
            syms: { tag: 'idents', IDENTS: ['x'] },
            assignments: {
              tag: 'exprlist',
              list: [
                {
                  tag: 'app',
                  fun: { tag: 'nam', sym: 'inc' },
                  args: [],
                  _arity: 0
                }
              ]
            },
            type: 'int'
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

    const inputAst: ASTNode = parse(program);
    const postProcessedAst: ASTNode = preprocess(inputAst);
    expect(postProcessedAst).toStrictEqual(expectedAst)
  })

  test("basic init cycle present should throw", async () => {
    const program = `
      var x int = inc()
      func inc() {
        return y
      }
      func main() {
        sz int :=1
      }
      var y int = x
      `;

    const inputAst: ASTNode = parse(program);
    expect(() => preprocess(inputAst)).toThrow("initialization cycle present");
  })

  test("basic redeclaration should throw", async () => {
    const program = `
      var x int = 1
      func main() {
        sz int :=1
      }
      var x int = 1
      `;

    const inputAst: ASTNode = parse(program);
    expect(() => preprocess(inputAst)).toThrow("redeclaration of x");
  })
  test("basic redeclaration in different scope should not throw", async () => {
    const program = `
      var x int = 1
      func main() {
        x int := 1
      }
      var y int = 1
      `;

    const inputAst: ASTNode = parse(program);
    expect(() => preprocess(inputAst)).not.toThrow("redeclaration of x");
  })
  test("basic redeclaration of function name should throw", async () => {
    const program = `
      var x int = 1
      func main() {
        x int :=1
      }
      func x() {

      }
      `;

    const inputAst: ASTNode = parse(program);
    expect(() => preprocess(inputAst)).toThrow("redeclaration of x");
  })

  test("basic recursive cycle present should not throw", async () => {
    const program = `
    func recurse1(o int) int {
      if o == 0 {
        return y
      }
      return recurse2(o - 1)
    }
    
    var x int = recurse1(4)
    
    func recurse2(t int) int {
      return recurse1(t - 1)
    }
    func main() {
      Println(x)
    }
    
    var y int = 1
      `;

    const expectedAst = {
      tag: 'blk',
      body: {
        tag: 'seq',
        stmts: [
          {
            tag: 'fun',
            sym: 'recurse1',
            prms: [ 'o' ],
            body: {
              tag: 'blk',
              body: {
                tag: 'seq',
                stmts: [
                  {
                    tag: 'cond',
                    pred: {
                      tag: 'binop',
                      sym: '==',
                      frst: { tag: 'nam', sym: 'o' },
                      scnd: { tag: 'lit', val: 0 }
                    },
                    cons: {
                      tag: 'blk',
                      body: {
                        tag: 'seq',
                        stmts: [
                          {
                            tag: 'ret',
                            expr: [ { tag: 'nam', sym: 'y' } ],
                            _arity: 1
                          }
                        ]
                      }
                    },
                    alt: { tag: 'blk', body: { tag: 'seq', stmts: [] } }
                  },
                  {
                    tag: 'ret',
                    expr: [
                      {
                        tag: 'app',
                        fun: { tag: 'nam', sym: 'recurse2' },
                        args: [
                          {
                            tag: 'binop',
                            sym: '-',
                            frst: { tag: 'nam', sym: 'o' },
                            scnd: { tag: 'lit', val: 1 }
                          }
                        ],
                        _arity: 1
                      }
                    ],
                    _arity: 1
                  }
                ]
              }
            },
            _arity: 1,
            paramTypes: [ 'int' ],
            returnTypes: [ 'int' ]
          },
          {
            tag: 'fun',
            sym: 'recurse2',
            prms: [ 't' ],
            body: {
              tag: 'blk',
              body: {
                tag: 'seq',
                stmts: [
                  {
                    tag: 'ret',
                    expr: [
                      {
                        tag: 'app',
                        fun: { tag: 'nam', sym: 'recurse1' },
                        args: [
                          {
                            tag: 'binop',
                            sym: '-',
                            frst: { tag: 'nam', sym: 't' },
                            scnd: { tag: 'lit', val: 1 }
                          }
                        ],
                        _arity: 1
                      }
                    ],
                    _arity: 1
                  }
                ]
              }
            },
            _arity: 1,
            paramTypes: [ 'int' ],
            returnTypes: [ 'int' ]
          },
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
                    tag: 'app',
                    fun: { tag: 'nam', sym: 'Println' },
                    args: [ { tag: 'nam', sym: 'x' } ],
                    _arity: 1
                  }
                ]
              }
            },
            _arity: 0,
            paramTypes: [],
            returnTypes: []
          },
          {
            tag: 'let',
            syms: { tag: 'idents', IDENTS: [ 'y' ] },
            assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 1 } ] },
            type: 'int'
          },
          {
            tag: 'let',
            syms: { tag: 'idents', IDENTS: [ 'x' ] },
            assignments: {
              tag: 'exprlist',
              list: [
                {
                  tag: 'app',
                  fun: { tag: 'nam', sym: 'recurse1' },
                  args: [ { tag: 'lit', val: 4 } ],
                  _arity: 1
                }
              ]
            },
            type: 'int'
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

    const inputAst: ASTNode = parse(program);
    const outputAst: ASTNode = preprocess(inputAst);
    expect(() => preprocess(inputAst)).not.toThrow("initialization cycle present");
    expect(outputAst).toStrictEqual(expectedAst);
  })

  test("shadowed redeclaraction should not throw", async () => {
    const program = `
    func inc1() int {
      Println(1)
      return y
    }
    
    func inc2() int {
      Println(2)
      var x int = 5
      return x
    }
    
    var x int = inc1()
    var y int = inc2()
    
    func main() {

    }
          `;

    const expectedAst ={
      tag: 'blk',
      body: {
        tag: 'seq',
        stmts: [
          {
            tag: 'fun',
            sym: 'inc1',
            prms: [],
            body: {
              tag: 'blk',
              body: {
                tag: 'seq',
                stmts: [
                  {
                    tag: 'app',
                    fun: { tag: 'nam', sym: 'Println' },
                    args: [ { tag: 'lit', val: 1 } ],
                    _arity: 1
                  },
                  {
                    tag: 'ret',
                    expr: [ { tag: 'nam', sym: 'y' } ],
                    _arity: 1
                  }
                ]
              }
            },
            _arity: 0,
            paramTypes: [],
            returnTypes: [ 'int' ]
          },
          {
            tag: 'fun',
            sym: 'inc2',
            prms: [],
            body: {
              tag: 'blk',
              body: {
                tag: 'seq',
                stmts: [
                  {
                    tag: 'app',
                    fun: { tag: 'nam', sym: 'Println' },
                    args: [ { tag: 'lit', val: 2 } ],
                    _arity: 1
                  },
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'x' ] },
                    assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 5 } ] },
                    type: 'int'
                  },
                  {
                    tag: 'ret',
                    expr: [ { tag: 'nam', sym: 'x' } ],
                    _arity: 1
                  }
                ]
              }
            },
            _arity: 0,
            paramTypes: [],
            returnTypes: [ 'int' ]
          },
          {
            tag: 'fun',
            sym: 'main',
            prms: [],
            body: { tag: 'blk', body: { tag: 'seq', stmts: [] } },
            _arity: 0,
            paramTypes: [],
            returnTypes: []
          },
          {
            tag: 'let',
            syms: { tag: 'idents', IDENTS: [ 'y' ] },
            assignments: {
              tag: 'exprlist',
              list: [
                {
                  tag: 'app',
                  fun: { tag: 'nam', sym: 'inc2' },
                  args: [],
                  _arity: 0
                }
              ]
            },
            type: 'int'
          },
          {
            tag: 'let',
            syms: { tag: 'idents', IDENTS: [ 'x' ] },
            assignments: {
              tag: 'exprlist',
              list: [
                {
                  tag: 'app',
                  fun: { tag: 'nam', sym: 'inc1' },
                  args: [],
                  _arity: 0
                }
              ]
            },
            type: 'int'
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

    const inputAst: ASTNode = parse(program);
    const outputAst: ASTNode = preprocess(inputAst);
    expect(() => preprocess(inputAst)).not.toThrow("initialization cycle present");
    expect(outputAst).toStrictEqual(expectedAst);
  })

  test("basic recursive cycle present with cyclic definition should throw", async () => {
    const program = `
    func recurse1(o int) int {
      if o == 0 {
        return y
      }
      return recurse2(o - 1)
    }
    
    var x int = recurse1(4)
    
    func recurse2(t int) int {
      if t == 0 {
        return x
      }
      return recurse1(t - 1)
    }
    func main() {
      Println(x)
    }
    
    var y int = 1
      `;

    const inputAst: ASTNode = parse(program);
    expect(() => preprocess(inputAst)).toThrow("initialization cycle present");
  })
})
