import { ErrorNode } from 'antlr4ts/tree/ErrorNode'
import { ParseTree } from 'antlr4ts/tree/ParseTree'
import { RuleNode } from 'antlr4ts/tree/RuleNode'
import { TerminalNode } from 'antlr4ts/tree/TerminalNode'

import {
  ArgumentsContext,
  Assign_opContext,
  AssignmentContext,
  BINOPContext,
  BlockContext,
  EosContext,
  ExpressionContext,
  ExpressionListContext,
  ForStmtContext,
  FUNCAPPContext,
  FuncAppContext,
  FuncDeclContext,
  Global_scopeContext,
  IdentifierListContext,
  IfStmtContext,
  LiteralContext,
  LOGOPContext,
  MultiAssignmentContext,
  MultiVarDeclContext,
  OperandContext,
  OperandNameContext,
  ParameterDeclContext,
  ParametersContext,
  PRIMARYContext,
  PrimaryExprContext,
  RELOPContext,
  ReturnStmtContext,
  SignatureContext,
  SimpleStmtContext,
  StatementContext,
  StatementListContext,
  UNARYOPContext,
  VarDeclContext
} from '../lang/SimpleParser'
import { SimpleParserVisitor } from '../lang/SimpleParserVisitor'

export class Cst_To_Json implements SimpleParserVisitor<any> {
  visitGlobal_scope(ctx: Global_scopeContext): any {
    const nodes = this.visitChildren(ctx)
    nodes.push({
      tag: 'app',
      func: 'main',
      args: []
    })
    return {
      tag: 'blk',
      stmts: nodes
    }
  }
  visitForStmt(ctx: ForStmtContext) {
    return {
      tag: 'while',
      pred: this.visitExpression(ctx.expression()),
      body: this.visitBlock(ctx.block())
    }
  }
  visitFUNCAPP(ctx: FUNCAPPContext): any {
    return this.visitFuncApp(ctx.funcApp())
  }
  //take note that expr here is a list of return expression and not just a singular one like in cs4215 homeworks
  visitReturnStmt(ctx: ReturnStmtContext): any {
    const expr = ctx.expressionList()
    return {
      tag: 'ret',
      expr: expr ? this.visitExpressionList(expr) : []
    }
  }
  visitIfStmt(ctx: IfStmtContext): any {
    // empty block by default
    let alt: any = { tag: 'blk', stmts: [] }
    if (ctx.ELSE()) {
      let k
      if ((k = ctx.ifStmt())) {
        alt = this.visitIfStmt(k)
      } else if ((k = ctx.block(1))) {
        alt = this.visitBlock(k)
      }
    }
    return {
      tag: 'cond',
      pred: this.visitExpression(ctx.expression()),
      cons: this.visitBlock(ctx.block(0)),
      alt: alt
    }
  }
  visitPRIMARY(ctx: PRIMARYContext) {
    return this.visitPrimaryExpr(ctx.primaryExpr())
  }

  visitUNARYOP(ctx: UNARYOPContext): any {
    return {
      tag: 'unop',
      sym: ctx.EXCLAMATION() ? '!' : '-',
      frst: this.visitExpression(ctx.expression())
    }
  }

  visitBINOP(ctx: BINOPContext): any {
    return {
      tag: 'binop',
      sym: ctx._bin_op.text,
      frst: this.visitExpression(ctx.expression()[0]),
      scnd: this.visitExpression(ctx.expression()[1])
    }
  }

  visitRELOP(ctx: RELOPContext) {
    return {
      tag: 'relop',
      sym: ctx._rel_op.text,
      frst: this.visitExpression(ctx.expression()[0]),
      scnd: this.visitExpression(ctx.expression()[1])
    }
  }

  visitLOGOP(ctx: LOGOPContext): any {
    return {
      tag: 'logop',
      sym: ctx.LOGICAL_AND() ? '&&' : '||',
      frst: this.visitExpression(ctx.expression()[0]),
      scnd: this.visitExpression(ctx.expression()[1])
    }
  }
  visitFuncDecl(ctx: FuncDeclContext): any {
    return {
      tag: 'fun',
      sym: this.visitTerminal(ctx.IDENTIFIER()),
      prms: this.visitSignature(ctx.signature()),
      body: this.visitBlock(ctx.block())
    }
  }

  visitSignature(ctx: SignatureContext) {
    let k
    if ((k = ctx.parameters())) {
      return this.visitParameters(k)
    }
    return []
  }

  visitParameters(ctx: ParametersContext): any[] {
    const list = ctx.parameterDecl()
    const params: any[] = []
    for (let i = 0; i < list.length; ++i) {
      params.concat(this.visitParameterDecl(list[i]))
    }
    return params
  }

  visitParameterDecl(ctx: ParameterDeclContext): any[] {
    const k = ctx.identifierList()
    if (k === undefined) return []
    return this.visitIdentifierList(k)
  }

  visitBlock(ctx: BlockContext): any {
    const stmts = ctx.statementList()
    return {
      tag: 'blk',
      stmts: stmts == undefined ? [] : this.visitStatementList(stmts)
    }
  }
  visitVarDecl(ctx: VarDeclContext): any {
    return {
      tag: 'varDecl',
      sym: this.visitTerminal(ctx.IDENTIFIER()),
      expr: this.visitExpression(ctx.expression())
    }
  }

  visitMultiVarDecl(ctx: MultiVarDeclContext) {
    const variables = this.visitIdentifierList(ctx.identifierList())
    const assignments = this.visitExpressionList(ctx.expressionList())
    const nodes = []
    for (let i = 0; i < variables.length; ++i) {
      nodes.push({
        tag: 'varDecl',
        sym: variables[i],
        expr: assignments[i]
      })
    }
    return nodes
  }

  visitMultiAssignment(ctx: MultiAssignmentContext) {
    const variables = this.visitIdentifierList(ctx.identifierList())
    const assignments = this.visitExpressionList(ctx.expressionList())
    const nodes = []
    for (let i = 0; i < variables.length; ++i) {
      nodes.push({
        tag: 'assign',
        sym: variables[i],
        expr: assignments[i]
      })
    }
    return nodes
  }
  visitIdentifierList(list: IdentifierListContext) {
    const id = []
    const nList = list.IDENTIFIER()
    for (let i = 0; i < nList.length; ++i) {
      id.push({
        tag: 'nam',
        sym: this.visitTerminal(nList[i])
      })
    }
    return id
  }
  visitAssignment(ctx: AssignmentContext): any {
    return {
      tag: 'assign',
      sym: this.visitTerminal(ctx.IDENTIFIER()),
      expr: this.visitExpression(ctx.expression())
    }
  }
  visitAssign_op(ctx: Assign_opContext): any {
    return
  }
  visitExpression(ctx: ExpressionContext): any {
    return ctx.accept(this)
  }
  visitPrimaryExpr(ctx: PrimaryExprContext): any {
    let k
    if ((k = ctx.operand())) {
      return this.visitOperand(k)
    }
  }

  visitArguments(ctx: ArgumentsContext): any {
    let k
    if ((k = ctx.expressionList())) {
      return this.visitExpressionList(k)
    }
    return []
  }

  visitFuncApp(ctx: FuncAppContext): any {
    return {
      tag: 'app',
      func: this.visitTerminal(ctx.IDENTIFIER()),
      args: this.visitArguments(ctx.arguments())
    }
  }

  visitOperand(ctx: OperandContext): any {
    let k
    if ((k = ctx.literal())) {
      return this.visitLiteral(k)
    } else if ((k = ctx.operandName())) {
      return this.visitOperandName(k)
    } else if ((k = ctx.expression())) {
      return this.visitExpression(k)
    }
  }
  visitOperandName(ctx: OperandNameContext) {
    return {
      tag: 'nam',
      val: this.visitTerminal(ctx.IDENTIFIER())
    }
  }
  visitLiteral(ctx: LiteralContext): any {
    let k
    if ((k = ctx.NIL_LIT())) {
      return {
        tag: 'lit',
        val: this.visitTerminal(k)
      }
    } else if ((k = ctx.FLOAT_LIT())) {
      return {
        tag: 'lit',
        val: parseFloat(this.visitTerminal(k))
      }
    } else if ((k = ctx.DECIMAL_LIT())) {
      return {
        tag: 'lit',
        val: parseInt(this.visitTerminal(k), 10)
      }
    }
  }
  visitStatementList(ctx: StatementListContext): any {
    const stmt = ctx.statement()
    const stmts = []
    for (let i = 0; i < stmt.length; ++i) {
      const res = this.visitStatement(stmt[i])
      if (stmt[i].simpleStmt()) {
        stmts.push(res)
      } else if (stmt[i].ifStmt()) {
        stmts.push(res)
      } else if (stmt[i].returnStmt()) {
        stmts.push(res)
      } else if (stmt[i].forStmt()) {
        stmts.push(res)
      } else {
        stmts.push(...res)
      }
    }
    return {
      tag: 'seq',
      stmts: stmts
    }
  }
  visitStatement(ctx: StatementContext): any {
    let k
    if ((k = ctx.simpleStmt())) {
      return this.visitSimpleStmt(k)
    } else if ((k = ctx.multiAssignment())) {
      return this.visitMultiAssignment(k)
    } else if ((k = ctx.multiVarDecl())) {
      return this.visitMultiVarDecl(k)
    } else if ((k = ctx.ifStmt())) {
      return this.visitIfStmt(k)
    } else if ((k = ctx.returnStmt())) {
      return this.visitReturnStmt(k)
    } else if ((k = ctx.forStmt())) {
      return this.visitForStmt(k)
    }
  }
  visitSimpleStmt(ctx: SimpleStmtContext): any {
    let k
    if ((k = ctx.assignment())) {
      return this.visitAssignment(k)
    } else if ((k = ctx.expressionStmt())) {
      return this.visitExpression(k)
    } else if ((k = ctx.varDecl())) {
      return this.visitVarDecl(k)
    } else if ((k = ctx.funcDecl())) {
      return this.visitFuncDecl(k)
    }
  }

  visitExpressionList(ctx: ExpressionListContext): any {
    const list = ctx.expression()
    const exprList = []
    for (let i = 0; i < list.length; ++i) {
      exprList.push(this.visitExpression(list[i]))
    }
    return exprList
  }
  visitEos(ctx: EosContext): any {
    return
  }
  visit(tree: ParseTree): any {
    return tree.accept(this)
  }
  visitChildren(node: RuleNode): any {
    const nodes = []
    for (let i = 0; i < node.childCount; i++) {
      const res = node.getChild(i).accept(this)
      if (res) {
        if (Array.isArray(res)) nodes.push(...res)
        else nodes.push(res)
      }
    }
    return nodes
  }
  visitTerminal(node: TerminalNode): any {
    return node.toString()
  }
  visitErrorNode(node: ErrorNode) {
    throw new Error('Method not implemented.')
  }
}
