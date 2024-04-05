import { CharStreams, CommonTokenStream } from 'antlr4ts'

import { GoLexer } from '../lang/GoLexer'
import { SimpleParser } from '../lang/SimpleParser'
import { ParseTree_To_AST } from './ParseTree_To_AST'
import { ASTNode } from '../ast/AST'
import { Context } from '../..'
import { FatalSyntaxError } from '../../parser/errors'
import { positionToSourceLocation } from '../../parser/utils'

export function parse(inputString: string, context: Context): ASTNode | null {
  const inputStream = CharStreams.fromString(inputString)
  const lexer = new GoLexer(inputStream)
  const tokenStream = new CommonTokenStream(lexer)
  const parser = new SimpleParser(tokenStream)

  // Error handling taken from https://stackoverflow.com/questions/30276048/handling-errors-in-antlr4-javascript
  parser.buildParseTree = true
  // parser.removeErrorListeners()
  // parser.addErrorListener({
  //   syntaxError: (recognizer, offendingSymbol, line, column, msg, err) => {
  //     throw new Error(`Syntax Error at line ${line}, col ${column}: ${msg}`)
  //   }
  // })

  try {
    const tree = parser.global_scope()
    const visitor = new ParseTree_To_AST()
    const res = visitor.visit(tree)
    return res
  } catch (error) {
    if (error instanceof SyntaxError) {
      error = new FatalSyntaxError(positionToSourceLocation((error as any).loc), error.toString())
    }

    context.errors.push(error)
    return null
  }
}
