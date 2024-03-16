import { ErrorNode } from 'antlr4ts/tree/ErrorNode'
import { ParseTree } from 'antlr4ts/tree/ParseTree'
import { RuleNode } from 'antlr4ts/tree/RuleNode'
import { TerminalNode } from 'antlr4ts/tree/TerminalNode'

import { ASTNode, AssignNode, BINOP, BinOpNode, BlockNode, ExprNode, ExpressionListNode, ForStmtNode, FuncAppNode, FuncDeclNode, IdListNode, IfStmtNode, LOGOP, LiteralNode, LogicalNode, MultiAssmtNode, MultiVarDeclNode, NameNode, ParamListNode, ReturnStmtNode, SequenceNode, StmtListNode, StmtNode, Tag, UNOP, UnOpNode, VarDeclNode } from '../ast/ast'
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
import exp from 'constants'

export class ParseTree_To_AST implements SimpleParserVisitor<ASTNode> {
  visitGlobal_scope(ctx: Global_scopeContext): BlockNode {
    const nodes: SequenceNode = this.visitChildren(ctx);

    const mainCall: FuncAppNode = {
        tag: Tag.APP,
        fun: {tag: Tag.NAME, sym: 'main'},
        args: [],
        _arity: 0
      };
    nodes.body.push(mainCall);

    return {
      tag: Tag.BLOCK,
      body: nodes
    };
  }

  visitForStmt(ctx: ForStmtContext): ForStmtNode {
    return {
      tag: Tag.FOR,
      pred: this.visitExpression(ctx.expression()),
      body: this.visitBlock(ctx.block())
    };
  }

  visitFUNCAPP(ctx: FUNCAPPContext): FuncAppNode {
    return this.visitFuncApp(ctx.funcApp());
  }

  //take note that expr here is a list of return expression and not just a singular one like in cs4215 homeworks
  visitReturnStmt(ctx: ReturnStmtContext): ReturnStmtNode {
    const expr = ctx.expressionList();
    const exprList: ExprNode[] = expr ? this.visitExpressionList(expr).list : []; 

    return {
      tag: Tag.RET,
      expr: exprList, 
      _arity: exprList.length
    };
  }

  visitIfStmt(ctx: IfStmtContext): IfStmtNode {
    // empty block by default
    let alt: BlockNode | IfStmtNode = { tag: Tag.BLOCK, body: { tag: Tag.SEQ, body: [] } };

    if (ctx.ELSE()) {
      let k = undefined;
      if ((k = ctx.ifStmt())) {
        alt = this.visitIfStmt(k)
      } else if ((k = ctx.block(1))) {
        alt = this.visitBlock(k)
      } else {
        //TODO: should probably throw a parsing error here
      }
    }

    return {
      tag: Tag.COND,
      pred: this.visitExpression(ctx.expression()),
      cons: this.visitBlock(ctx.block(0)),
      alt: alt
    };
  }

  visitPRIMARY(ctx: PRIMARYContext): ExprNode {
    return this.visitPrimaryExpr(ctx.primaryExpr())
  }

  visitUNARYOP(ctx: UNARYOPContext): UnOpNode {
    return {
      tag: Tag.UNOP,
      sym: ctx.EXCLAMATION() ? UNOP.BOOL_NEGATE : UNOP.INT_NEGATE,
      frst: this.visitExpression(ctx.expression())
    };
  }

  visitBINOP(ctx: BINOPContext): BinOpNode {
    // can probably refactor this but eh..... maybe next time
    const sym: BINOP = ctx._bin_op.text === "+"
                        ? BINOP.PLUS
                        : ctx._bin_op.text === "-"
                        ? BINOP.MINUS
                        : ctx._bin_op.text === "*"
                        ? BINOP.TIMES
                        : BINOP.MINUS;
    return {
      tag: Tag.BINOP,
      sym: sym,
      frst: this.visitExpression(ctx.expression()[0]),
      scnd: this.visitExpression(ctx.expression()[1])
    };
  }

  // Note: relational operators like < are treated as Binary Operations inline with prof's implementation
  visitRELOP(ctx: RELOPContext): BinOpNode {
    const sym: BINOP = ctx._rel_op.text === "<"
                        ? BINOP.LT
                        : ctx._rel_op.text === ">"
                        ? BINOP.GT
                        : ctx._rel_op.text === "<="
                        ? BINOP.LTE
                        : ctx._rel_op.text === ">="
                        ? BINOP.GTE
                        : BINOP.EQ;

    return {
      tag: Tag.BINOP,
      sym: sym,
      frst: this.visitExpression(ctx.expression()[0]),
      scnd: this.visitExpression(ctx.expression()[1])
    }
  }

  visitLOGOP(ctx: LOGOPContext): LogicalNode {
    return {
      tag: Tag.LOGOP,
      sym: ctx.LOGICAL_AND() ? LOGOP.LOGICAL_AND : LOGOP.LOGICAL_OR,
      frst: this.visitExpression(ctx.expression()[0]),
      scnd: this.visitExpression(ctx.expression()[1])
    };
  }

  visitFuncDecl(ctx: FuncDeclContext): FuncDeclNode {
    const params: string[] = this.visitSignature(ctx.signature()).params;
    return {
      tag: Tag.FUNC,
      sym: this.visitTerminal(ctx.IDENTIFIER()),
      prms: params,
      body: this.visitBlock(ctx.block()),
      _arity: params.length
    };
  }

  visitSignature(ctx: SignatureContext): ParamListNode {
    const k = ctx.parameters();
    if (k) {
      return this.visitParameters(k)
    }
    return { tag: Tag.PARAMS, params: [] };
  }

  visitParameters(ctx: ParametersContext): ParamListNode {
    const list = ctx.parameterDecl()
    const params: string[] = []
    for (let i = 0; i < list.length; ++i) {
      params.concat(this.visitParameterDecl(list[i]).IDENTS);
    }
    return { tag: Tag.PARAMS, params: params };
  }

  visitParameterDecl(ctx: ParameterDeclContext): IdListNode {
    const k = ctx.identifierList()
    if (k === undefined) return { tag: Tag.IDENTS, IDENTS: [] };
    return this.visitIdentifierList(k)
  }

  visitBlock(ctx: BlockContext): BlockNode {
    const stmts = ctx.statementList();

    return {
      tag: Tag.BLOCK,
      body: stmts == undefined ? { tag: Tag.SEQ, body: [] } : this.visitStatementList(stmts)
    };
  }
  visitVarDecl(ctx: VarDeclContext): VarDeclNode {
    return {
      tag: Tag.VAR,
      sym: this.visitTerminal(ctx.IDENTIFIER()),
      expr: this.visitExpression(ctx.expression())
    };
  }

  visitMultiVarDecl(ctx: MultiVarDeclContext): MultiVarDeclNode {
    const variables = this.visitIdentifierList(ctx.identifierList());
    const assignments = this.visitExpressionList(ctx.expressionList());

    const nodes: VarDeclNode[] = [];

    for (let i = 0; i < variables.IDENTS.length; ++i) {
      nodes.push({
        tag: Tag.VAR,
        sym: variables[i],
        expr: assignments[i]
      });
    }

    return {tag: Tag.MULTIVAR, list: nodes };
  }

  visitMultiAssignment(ctx: MultiAssignmentContext): MultiAssmtNode {
    const variables = this.visitIdentifierList(ctx.identifierList());
    const assignments = this.visitExpressionList(ctx.expressionList());

    const nodes: AssignNode[] = [];

    for (let i = 0; i < variables.IDENTS.length; ++i) {
      nodes.push({
        tag: Tag.ASSMT,
        sym: variables[i],
        expr: assignments[i]
      });
    }

    return {tag: Tag.MULTIASSMT, list: nodes };
  }

  visitIdentifierList(list: IdentifierListContext): IdListNode {
    const id: IdListNode = { tag: Tag.IDENTS, IDENTS: [] };
    const nList = list.IDENTIFIER()

    for (let i = 0; i < nList.length; ++i) {
        // TODO: check if this is correct
    //   id.push({
    //     tag: 'nam',
    //     sym: this.visitTerminal(nList[i])
    //   })
        id.IDENTS.push(this.visitTerminal(nList[i]));
    }

    return id
  }

  visitAssignment(ctx: AssignmentContext): AssignNode {
    return {
      tag: Tag.ASSMT,
      sym: this.visitTerminal(ctx.IDENTIFIER()),
      expr: this.visitExpression(ctx.expression())
    };
  }

  // unused function for now. we're only allowing = . can consider -=, +=, etc in the future
  visitAssign_op(ctx: Assign_opContext): any {
    return
  }

  visitExpression(ctx: ExpressionContext): ExprNode {
    return ctx.accept(this);
  }

  visitPrimaryExpr(ctx: PrimaryExprContext): ExprNode {
    // probably shouldnt have used k as a variable name everywhere... im a degen so we'll stick with this for now
    const k = ctx.operand();
    return this.visitOperand(k)
  }

  visitArguments(ctx: ArgumentsContext): ExpressionListNode {
    let k = undefined;
    if ((k = ctx.expressionList())) {
      return this.visitExpressionList(k)
    }
    return { tag: Tag.EXPRLIST, list: [] };
  }

  visitFuncApp(ctx: FuncAppContext): FuncAppNode {
    const argList: ExprNode[] = this.visitArguments(ctx.arguments()).list;
    return {
      tag: Tag.APP,
      fun: this.visitTerminal(ctx.IDENTIFIER()),
      args: argList,
      _arity: argList.length
    };
  }

  visitOperand(ctx: OperandContext): ExprNode {
    let k = undefined;
    if ((k = ctx.literal())) {
      return this.visitLiteral(k)
    } else if ((k = ctx.operandName())) {
      return this.visitOperandName(k)
    } else {
        k = ctx.expression();
        // should be a safe cast since Operand can only be a literal, or a name, or an expression
        return this.visitExpression(k as ExpressionContext);
    }
  }

  visitOperandName(ctx: OperandNameContext): NameNode {
    return {
      tag: Tag.NAME,
      sym: this.visitTerminal(ctx.IDENTIFIER())
    };
  }

  visitLiteral(ctx: LiteralContext): LiteralNode {
    let k = undefined
    const ret: LiteralNode = { tag: Tag.LIT, val: false};

    if ((k = ctx.NIL_LIT())) {
        ret.val = this.visitTerminal(k);
    } else if ((k = ctx.FLOAT_LIT())) {
      ret.val = parseFloat(this.visitTerminal(k));
    } else {
        k = ctx.DECIMAL_LIT();
        // should be safe cast
        ret.val = parseInt(this.visitTerminal(k as TerminalNode), 10);
    }

    return ret;
  }

  visitStatementList(ctx: StatementListContext): SequenceNode {
    const stmtContextes = ctx.statement();
    const stmts: StmtNode[] = [];

    for (let i = 0; i < stmtContextes.length; ++i) {
      const res = this.visitStatement(stmtContextes[i]);
      if (stmtContextes[i].simpleStmt()) {
        stmts.push(res)
      } else if (stmtContextes[i].ifStmt()) {
        stmts.push(res)
      } else if (stmtContextes[i].returnStmt()) {
        stmts.push(res)
      } else if (stmtContextes[i].forStmt()) {
        stmts.push(res)
      } else {
        stmts.push(...(res as MultiAssmtNode).list);
      }
    }

    return {
      tag: Tag.SEQ,
      body: stmts
    }
  }

  visitStatement(ctx: StatementContext): StmtNode {
    let k = undefined;
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
    } else {
        k = ctx.forStmt();
        // should be safe cast
        return this.visitForStmt(k as ForStmtContext);
    }
  }

  visitSimpleStmt(ctx: SimpleStmtContext): StmtNode {
    let k = undefined;
    if ((k = ctx.assignment())) {
      return this.visitAssignment(k)
    } else if ((k = ctx.expressionStmt())) {
      return this.visitExpression(k)
    } else if ((k = ctx.varDecl())) {
      return this.visitVarDecl(k)
    } else {
        k = ctx.funcDecl();
        // should be safe cast
        return this.visitFuncDecl(k as FuncDeclContext);
    }
  }

  visitExpressionList(ctx: ExpressionListContext): ExpressionListNode {
    const list = ctx.expression();
    const exprList: ExprNode[] = [];

    for (let i = 0; i < list.length; ++i) {
      exprList.push(this.visitExpression(list[i]));
    }
    
    return { tag: Tag.EXPRLIST, list: exprList };
  }

  //unused for now
  visitEos(ctx: EosContext): any {
    return
  }

  visit(tree: ParseTree): ASTNode {
    return tree.accept(this);
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
    return node.toString();
  }

  visitErrorNode(node: ErrorNode): any {
    throw new Error('Method not implemented.')
  }
}
