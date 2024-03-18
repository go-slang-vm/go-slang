import { CharStreams, CommonTokenStream } from 'antlr4ts'

import { GoLexer } from '../lang/GoLexer'
import { SimpleParser } from '../lang/SimpleParser'
import { ParseTree_To_AST } from './ParseTree_To_AST'
import { ASTNode } from '../ast/AST'

export function parse(inputString: string): ASTNode {
  const inputStream = CharStreams.fromString(inputString)
  const lexer = new GoLexer(inputStream)
  const tokenStream = new CommonTokenStream(lexer)
  const parser = new SimpleParser(tokenStream)
  const tree = parser.global_scope()
  const visitor = new ParseTree_To_AST()
  const res = visitor.visit(tree)
  return res
}
