import { CharStreams, CommonTokenStream } from 'antlr4ts'

import { GoLexer } from '../lang/GoLexer'
import { SimpleParser } from '../lang/SimpleParser'
import { Cst_To_Json } from './Cst_To_Json'
import { Context } from '../../types'
import { Program } from './types'

// import { CharStreams, CommonTokenStream } from 'antlr4';
// import  GoLexer   from './lang2/GoLexer';
// import  GoParser   from './lang2/GoParser';
// Create the lexer and parser

// let inputStream2 = CharStreams.fromString(`
// {
//     var x = 2
//     var y, z = 4, 5
//     x, y, z = 5, 0, 11
//     y = 10
//     k := 999

//     func main(x) {
//         x = x + 1
//         x = x || y
//         y = -y
//         return x, y
//     }

//     if x == 9 {
//         z = 0
//     } else if p != 9 {
//         k = 0
//     } else {
//         k = 1
//     }

//     if x == 10 {
//         return main(p)
//     }

//     i := 0
//     for i < 5 {
//         i = i + 1
//     }
// }
// `);

// const inputStream3 = CharStreams.fromString(`
//     var x = 2
//     var y, z = 4, 5
//     k := 999

//     func main() {
//         x = x + 1
//         x = x || y
//         y = -y
//         z = x + y * p - 2
//         return x, y
//     }
// `)

export function parse(source: string, _context: Context): Program | undefined {
  const inputStream = CharStreams.fromString(source)
  const lexer = new GoLexer(inputStream)
  const tokenStream = new CommonTokenStream(lexer)
  const parser = new SimpleParser(tokenStream)
  parser.buildParseTree = true
  const tree = parser.global_scope()
  const visitor = new Cst_To_Json()
  const content = visitor.visit(tree)

  return {
    type: 'Program',
    body: content
  }
}
