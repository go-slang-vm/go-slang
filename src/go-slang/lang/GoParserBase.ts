import { Parser } from 'antlr4ts'

import { GoLexer } from './GoLexer'

export abstract class GoParserBase extends Parser {
  closingBracket(): boolean {
    const la = this._input.LA(1)
    return la === GoLexer.R_PAREN || la === GoLexer.R_CURLY
  }
}
