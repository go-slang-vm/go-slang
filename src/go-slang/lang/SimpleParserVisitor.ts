// Generated from src/go-slang/lang/SimpleParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { MAKEOPContext } from "./SimpleParser";
import { FUNCAPPContext } from "./SimpleParser";
import { UNARYOPContext } from "./SimpleParser";
import { BINOPContext } from "./SimpleParser";
import { RELOPContext } from "./SimpleParser";
import { LOGOPContext } from "./SimpleParser";
import { PRIMARYContext } from "./SimpleParser";
import { RECVOPContext } from "./SimpleParser";
import { Global_scopeContext } from "./SimpleParser";
import { ArgumentsContext } from "./SimpleParser";
import { FuncAppContext } from "./SimpleParser";
import { FuncDeclContext } from "./SimpleParser";
import { SignatureContext } from "./SimpleParser";
import { ResultContext } from "./SimpleParser";
import { TypeListContext } from "./SimpleParser";
import { ParametersContext } from "./SimpleParser";
import { ParameterDeclContext } from "./SimpleParser";
import { BlockContext } from "./SimpleParser";
import { VarDeclContext } from "./SimpleParser";
import { VarSpecContext } from "./SimpleParser";
import { ShortVarDeclContext } from "./SimpleParser";
import { Type_Context } from "./SimpleParser";
import { ChannelTypeContext } from "./SimpleParser";
import { AssignmentContext } from "./SimpleParser";
import { Assign_opContext } from "./SimpleParser";
import { ExpressionStmtContext } from "./SimpleParser";
import { ExpressionContext } from "./SimpleParser";
import { PrimaryExprContext } from "./SimpleParser";
import { OperandContext } from "./SimpleParser";
import { OperandNameContext } from "./SimpleParser";
import { LiteralContext } from "./SimpleParser";
import { StatementListContext } from "./SimpleParser";
import { StatementContext } from "./SimpleParser";
import { SimpleStmtContext } from "./SimpleParser";
import { SendStmtContext } from "./SimpleParser";
import { MakeExprContext } from "./SimpleParser";
import { ExpressionListContext } from "./SimpleParser";
import { EosContext } from "./SimpleParser";
import { IdentifierListContext } from "./SimpleParser";
import { IfStmtContext } from "./SimpleParser";
import { ReturnStmtContext } from "./SimpleParser";
import { ForStmtContext } from "./SimpleParser";
import { String_Context } from "./SimpleParser";
import { FunctionLitContext } from "./SimpleParser";
import { GoStmtContext } from "./SimpleParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `SimpleParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface SimpleParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `MAKEOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMAKEOP?: (ctx: MAKEOPContext) => Result;

	/**
	 * Visit a parse tree produced by the `FUNCAPP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFUNCAPP?: (ctx: FUNCAPPContext) => Result;

	/**
	 * Visit a parse tree produced by the `UNARYOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUNARYOP?: (ctx: UNARYOPContext) => Result;

	/**
	 * Visit a parse tree produced by the `BINOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBINOP?: (ctx: BINOPContext) => Result;

	/**
	 * Visit a parse tree produced by the `RELOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRELOP?: (ctx: RELOPContext) => Result;

	/**
	 * Visit a parse tree produced by the `LOGOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLOGOP?: (ctx: LOGOPContext) => Result;

	/**
	 * Visit a parse tree produced by the `PRIMARY`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPRIMARY?: (ctx: PRIMARYContext) => Result;

	/**
	 * Visit a parse tree produced by the `RECVOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRECVOP?: (ctx: RECVOPContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.global_scope`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGlobal_scope?: (ctx: Global_scopeContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.arguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArguments?: (ctx: ArgumentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.funcApp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncApp?: (ctx: FuncAppContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.funcDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncDecl?: (ctx: FuncDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.signature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSignature?: (ctx: SignatureContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.result`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResult?: (ctx: ResultContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.typeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeList?: (ctx: TypeListContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.parameters`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameters?: (ctx: ParametersContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.parameterDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameterDecl?: (ctx: ParameterDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock?: (ctx: BlockContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.varDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarDecl?: (ctx: VarDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.varSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarSpec?: (ctx: VarSpecContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.shortVarDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShortVarDecl?: (ctx: ShortVarDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.type_`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_?: (ctx: Type_Context) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.channelType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChannelType?: (ctx: ChannelTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment?: (ctx: AssignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.assign_op`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssign_op?: (ctx: Assign_opContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.expressionStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionStmt?: (ctx: ExpressionStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.primaryExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimaryExpr?: (ctx: PrimaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.operand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperand?: (ctx: OperandContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.operandName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperandName?: (ctx: OperandNameContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteral?: (ctx: LiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.statementList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatementList?: (ctx: StatementListContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.simpleStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimpleStmt?: (ctx: SimpleStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.sendStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSendStmt?: (ctx: SendStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.makeExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMakeExpr?: (ctx: MakeExprContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.expressionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionList?: (ctx: ExpressionListContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.eos`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEos?: (ctx: EosContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.identifierList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierList?: (ctx: IdentifierListContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.ifStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfStmt?: (ctx: IfStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.returnStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnStmt?: (ctx: ReturnStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.forStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForStmt?: (ctx: ForStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.string_`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitString_?: (ctx: String_Context) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.functionLit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionLit?: (ctx: FunctionLitContext) => Result;

	/**
	 * Visit a parse tree produced by `SimpleParser.goStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGoStmt?: (ctx: GoStmtContext) => Result;
}

