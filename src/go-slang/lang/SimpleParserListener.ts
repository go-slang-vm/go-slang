// Generated from src/go-slang/lang/SimpleParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
import { RegVarDeclContext } from "./SimpleParser";
import { VarMutexDeclContext } from "./SimpleParser";
import { VarWaitGroupDeclContext } from "./SimpleParser";
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
 * This interface defines a complete listener for a parse tree produced by
 * `SimpleParser`.
 */
export interface SimpleParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `MAKEOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMAKEOP?: (ctx: MAKEOPContext) => void;
	/**
	 * Exit a parse tree produced by the `MAKEOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMAKEOP?: (ctx: MAKEOPContext) => void;

	/**
	 * Enter a parse tree produced by the `FUNCAPP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	enterFUNCAPP?: (ctx: FUNCAPPContext) => void;
	/**
	 * Exit a parse tree produced by the `FUNCAPP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	exitFUNCAPP?: (ctx: FUNCAPPContext) => void;

	/**
	 * Enter a parse tree produced by the `UNARYOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	enterUNARYOP?: (ctx: UNARYOPContext) => void;
	/**
	 * Exit a parse tree produced by the `UNARYOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	exitUNARYOP?: (ctx: UNARYOPContext) => void;

	/**
	 * Enter a parse tree produced by the `BINOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	enterBINOP?: (ctx: BINOPContext) => void;
	/**
	 * Exit a parse tree produced by the `BINOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	exitBINOP?: (ctx: BINOPContext) => void;

	/**
	 * Enter a parse tree produced by the `RELOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	enterRELOP?: (ctx: RELOPContext) => void;
	/**
	 * Exit a parse tree produced by the `RELOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	exitRELOP?: (ctx: RELOPContext) => void;

	/**
	 * Enter a parse tree produced by the `LOGOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	enterLOGOP?: (ctx: LOGOPContext) => void;
	/**
	 * Exit a parse tree produced by the `LOGOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	exitLOGOP?: (ctx: LOGOPContext) => void;

	/**
	 * Enter a parse tree produced by the `PRIMARY`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	enterPRIMARY?: (ctx: PRIMARYContext) => void;
	/**
	 * Exit a parse tree produced by the `PRIMARY`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	exitPRIMARY?: (ctx: PRIMARYContext) => void;

	/**
	 * Enter a parse tree produced by the `RECVOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	enterRECVOP?: (ctx: RECVOPContext) => void;
	/**
	 * Exit a parse tree produced by the `RECVOP`
	 * labeled alternative in `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	exitRECVOP?: (ctx: RECVOPContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.global_scope`.
	 * @param ctx the parse tree
	 */
	enterGlobal_scope?: (ctx: Global_scopeContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.global_scope`.
	 * @param ctx the parse tree
	 */
	exitGlobal_scope?: (ctx: Global_scopeContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.arguments`.
	 * @param ctx the parse tree
	 */
	enterArguments?: (ctx: ArgumentsContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.arguments`.
	 * @param ctx the parse tree
	 */
	exitArguments?: (ctx: ArgumentsContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.funcApp`.
	 * @param ctx the parse tree
	 */
	enterFuncApp?: (ctx: FuncAppContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.funcApp`.
	 * @param ctx the parse tree
	 */
	exitFuncApp?: (ctx: FuncAppContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.funcDecl`.
	 * @param ctx the parse tree
	 */
	enterFuncDecl?: (ctx: FuncDeclContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.funcDecl`.
	 * @param ctx the parse tree
	 */
	exitFuncDecl?: (ctx: FuncDeclContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.signature`.
	 * @param ctx the parse tree
	 */
	enterSignature?: (ctx: SignatureContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.signature`.
	 * @param ctx the parse tree
	 */
	exitSignature?: (ctx: SignatureContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.result`.
	 * @param ctx the parse tree
	 */
	enterResult?: (ctx: ResultContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.result`.
	 * @param ctx the parse tree
	 */
	exitResult?: (ctx: ResultContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.typeList`.
	 * @param ctx the parse tree
	 */
	enterTypeList?: (ctx: TypeListContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.typeList`.
	 * @param ctx the parse tree
	 */
	exitTypeList?: (ctx: TypeListContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.parameters`.
	 * @param ctx the parse tree
	 */
	enterParameters?: (ctx: ParametersContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.parameters`.
	 * @param ctx the parse tree
	 */
	exitParameters?: (ctx: ParametersContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.parameterDecl`.
	 * @param ctx the parse tree
	 */
	enterParameterDecl?: (ctx: ParameterDeclContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.parameterDecl`.
	 * @param ctx the parse tree
	 */
	exitParameterDecl?: (ctx: ParameterDeclContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.block`.
	 * @param ctx the parse tree
	 */
	enterBlock?: (ctx: BlockContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.block`.
	 * @param ctx the parse tree
	 */
	exitBlock?: (ctx: BlockContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.varDecl`.
	 * @param ctx the parse tree
	 */
	enterVarDecl?: (ctx: VarDeclContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.varDecl`.
	 * @param ctx the parse tree
	 */
	exitVarDecl?: (ctx: VarDeclContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.regVarDecl`.
	 * @param ctx the parse tree
	 */
	enterRegVarDecl?: (ctx: RegVarDeclContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.regVarDecl`.
	 * @param ctx the parse tree
	 */
	exitRegVarDecl?: (ctx: RegVarDeclContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.varMutexDecl`.
	 * @param ctx the parse tree
	 */
	enterVarMutexDecl?: (ctx: VarMutexDeclContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.varMutexDecl`.
	 * @param ctx the parse tree
	 */
	exitVarMutexDecl?: (ctx: VarMutexDeclContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.varWaitGroupDecl`.
	 * @param ctx the parse tree
	 */
	enterVarWaitGroupDecl?: (ctx: VarWaitGroupDeclContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.varWaitGroupDecl`.
	 * @param ctx the parse tree
	 */
	exitVarWaitGroupDecl?: (ctx: VarWaitGroupDeclContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.shortVarDecl`.
	 * @param ctx the parse tree
	 */
	enterShortVarDecl?: (ctx: ShortVarDeclContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.shortVarDecl`.
	 * @param ctx the parse tree
	 */
	exitShortVarDecl?: (ctx: ShortVarDeclContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.type_`.
	 * @param ctx the parse tree
	 */
	enterType_?: (ctx: Type_Context) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.type_`.
	 * @param ctx the parse tree
	 */
	exitType_?: (ctx: Type_Context) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.channelType`.
	 * @param ctx the parse tree
	 */
	enterChannelType?: (ctx: ChannelTypeContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.channelType`.
	 * @param ctx the parse tree
	 */
	exitChannelType?: (ctx: ChannelTypeContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.assignment`.
	 * @param ctx the parse tree
	 */
	enterAssignment?: (ctx: AssignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.assignment`.
	 * @param ctx the parse tree
	 */
	exitAssignment?: (ctx: AssignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.assign_op`.
	 * @param ctx the parse tree
	 */
	enterAssign_op?: (ctx: Assign_opContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.assign_op`.
	 * @param ctx the parse tree
	 */
	exitAssign_op?: (ctx: Assign_opContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.expressionStmt`.
	 * @param ctx the parse tree
	 */
	enterExpressionStmt?: (ctx: ExpressionStmtContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.expressionStmt`.
	 * @param ctx the parse tree
	 */
	exitExpressionStmt?: (ctx: ExpressionStmtContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.primaryExpr`.
	 * @param ctx the parse tree
	 */
	enterPrimaryExpr?: (ctx: PrimaryExprContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.primaryExpr`.
	 * @param ctx the parse tree
	 */
	exitPrimaryExpr?: (ctx: PrimaryExprContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.operand`.
	 * @param ctx the parse tree
	 */
	enterOperand?: (ctx: OperandContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.operand`.
	 * @param ctx the parse tree
	 */
	exitOperand?: (ctx: OperandContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.operandName`.
	 * @param ctx the parse tree
	 */
	enterOperandName?: (ctx: OperandNameContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.operandName`.
	 * @param ctx the parse tree
	 */
	exitOperandName?: (ctx: OperandNameContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLiteral?: (ctx: LiteralContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.statementList`.
	 * @param ctx the parse tree
	 */
	enterStatementList?: (ctx: StatementListContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.statementList`.
	 * @param ctx the parse tree
	 */
	exitStatementList?: (ctx: StatementListContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.simpleStmt`.
	 * @param ctx the parse tree
	 */
	enterSimpleStmt?: (ctx: SimpleStmtContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.simpleStmt`.
	 * @param ctx the parse tree
	 */
	exitSimpleStmt?: (ctx: SimpleStmtContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.sendStmt`.
	 * @param ctx the parse tree
	 */
	enterSendStmt?: (ctx: SendStmtContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.sendStmt`.
	 * @param ctx the parse tree
	 */
	exitSendStmt?: (ctx: SendStmtContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.makeExpr`.
	 * @param ctx the parse tree
	 */
	enterMakeExpr?: (ctx: MakeExprContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.makeExpr`.
	 * @param ctx the parse tree
	 */
	exitMakeExpr?: (ctx: MakeExprContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.expressionList`.
	 * @param ctx the parse tree
	 */
	enterExpressionList?: (ctx: ExpressionListContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.expressionList`.
	 * @param ctx the parse tree
	 */
	exitExpressionList?: (ctx: ExpressionListContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.eos`.
	 * @param ctx the parse tree
	 */
	enterEos?: (ctx: EosContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.eos`.
	 * @param ctx the parse tree
	 */
	exitEos?: (ctx: EosContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.identifierList`.
	 * @param ctx the parse tree
	 */
	enterIdentifierList?: (ctx: IdentifierListContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.identifierList`.
	 * @param ctx the parse tree
	 */
	exitIdentifierList?: (ctx: IdentifierListContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.ifStmt`.
	 * @param ctx the parse tree
	 */
	enterIfStmt?: (ctx: IfStmtContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.ifStmt`.
	 * @param ctx the parse tree
	 */
	exitIfStmt?: (ctx: IfStmtContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.returnStmt`.
	 * @param ctx the parse tree
	 */
	enterReturnStmt?: (ctx: ReturnStmtContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.returnStmt`.
	 * @param ctx the parse tree
	 */
	exitReturnStmt?: (ctx: ReturnStmtContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.forStmt`.
	 * @param ctx the parse tree
	 */
	enterForStmt?: (ctx: ForStmtContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.forStmt`.
	 * @param ctx the parse tree
	 */
	exitForStmt?: (ctx: ForStmtContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.string_`.
	 * @param ctx the parse tree
	 */
	enterString_?: (ctx: String_Context) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.string_`.
	 * @param ctx the parse tree
	 */
	exitString_?: (ctx: String_Context) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.functionLit`.
	 * @param ctx the parse tree
	 */
	enterFunctionLit?: (ctx: FunctionLitContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.functionLit`.
	 * @param ctx the parse tree
	 */
	exitFunctionLit?: (ctx: FunctionLitContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleParser.goStmt`.
	 * @param ctx the parse tree
	 */
	enterGoStmt?: (ctx: GoStmtContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleParser.goStmt`.
	 * @param ctx the parse tree
	 */
	exitGoStmt?: (ctx: GoStmtContext) => void;
}

