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
                      syms: { tag: 'idents', IDENTS: [ 'y' ] },
                      assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 1 } ] },
                      type: 'int'
                    },
                    {
                      tag: 'blk',
                      body: {
                        tag: 'seq',
                        stmts: [
                          {
                            tag: 'let',
                            syms: { tag: 'idents', IDENTS: [ 'y' ] },
                            assignments: {
                              tag: 'exprlist',
                              list: [ { tag: 'lit', val: 2 } ]
                            },
                            type: 'int'
                          }
                        ]
                      }
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
            tag: 'let',
            syms: { tag: 'idents', IDENTS: [ 'x' ] },
            assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 2 } ] },
            type: 'int'
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
                    syms: { tag: 'idents', IDENTS: [ 'sz' ] },
                    assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 1 } ] },
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
            syms: { tag: 'idents', IDENTS: [ 'y' ] },
            assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 3 } ] },
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
                    syms: { tag: 'idents', IDENTS: [ 'sz' ] },
                    assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 1 } ] },
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
            syms: { tag: 'idents', IDENTS: [ 'y' ] },
            assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 3 } ] },
            type: 'int'
          },
          {
            tag: 'let',
            syms: { tag: 'idents', IDENTS: [ 'x' ] },
            assignments: { tag: 'exprlist', list: [ { tag: 'nam', sym: 'y' } ] },
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
            sym: 'main',
            prms: [],
            body: {
              tag: 'blk',
              body: {
                tag: 'seq',
                stmts: [
                  {
                    tag: 'let',
                    syms: { tag: 'idents', IDENTS: [ 'sz' ] },
                    assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 1 } ] },
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
            syms: { tag: 'idents', IDENTS: [ 'y' ] },
            assignments: { tag: 'exprlist', list: [ { tag: 'lit', val: 3 } ] },
            type: 'int'
          },
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
                    expr: [ { tag: 'nam', sym: 'y' } ],
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
            syms: { tag: 'idents', IDENTS: [ 'x' ] },
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
})
