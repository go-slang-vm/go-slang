// @ts-nocheck
// Generated from src/go-slang/lang/SimpleParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { SimpleParserListener } from "./SimpleParserListener";
import { SimpleParserVisitor } from "./SimpleParserVisitor";
import { GoParserBase } from "./GoParserBase";

export class SimpleParser extends GoParserBase {
	public static readonly BREAK = 1;
	public static readonly DEFAULT = 2;
	public static readonly FUNC = 3;
	public static readonly INTERFACE = 4;
	public static readonly SELECT = 5;
	public static readonly CASE = 6;
	public static readonly DEFER = 7;
	public static readonly GO = 8;
	public static readonly MAP = 9;
	public static readonly STRUCT = 10;
	public static readonly CHAN = 11;
	public static readonly ELSE = 12;
	public static readonly GOTO = 13;
	public static readonly PACKAGE = 14;
	public static readonly SWITCH = 15;
	public static readonly CONST = 16;
	public static readonly FALLTHROUGH = 17;
	public static readonly IF = 18;
	public static readonly RANGE = 19;
	public static readonly TYPE = 20;
	public static readonly CONTINUE = 21;
	public static readonly FOR = 22;
	public static readonly IMPORT = 23;
	public static readonly RETURN = 24;
	public static readonly VAR = 25;
	public static readonly NIL_LIT = 26;
	public static readonly IDENTIFIER = 27;
	public static readonly L_PAREN = 28;
	public static readonly R_PAREN = 29;
	public static readonly L_CURLY = 30;
	public static readonly R_CURLY = 31;
	public static readonly L_BRACKET = 32;
	public static readonly R_BRACKET = 33;
	public static readonly ASSIGN = 34;
	public static readonly COMMA = 35;
	public static readonly SEMI = 36;
	public static readonly COLON = 37;
	public static readonly DOT = 38;
	public static readonly PLUS_PLUS = 39;
	public static readonly MINUS_MINUS = 40;
	public static readonly DECLARE_ASSIGN = 41;
	public static readonly ELLIPSIS = 42;
	public static readonly LOGICAL_OR = 43;
	public static readonly LOGICAL_AND = 44;
	public static readonly EQUALS = 45;
	public static readonly NOT_EQUALS = 46;
	public static readonly LESS = 47;
	public static readonly LESS_OR_EQUALS = 48;
	public static readonly GREATER = 49;
	public static readonly GREATER_OR_EQUALS = 50;
	public static readonly OR = 51;
	public static readonly DIV = 52;
	public static readonly MOD = 53;
	public static readonly LSHIFT = 54;
	public static readonly RSHIFT = 55;
	public static readonly BIT_CLEAR = 56;
	public static readonly UNDERLYING = 57;
	public static readonly EXCLAMATION = 58;
	public static readonly PLUS = 59;
	public static readonly MINUS = 60;
	public static readonly CARET = 61;
	public static readonly STAR = 62;
	public static readonly AMPERSAND = 63;
	public static readonly RECEIVE = 64;
	public static readonly DECIMAL_LIT = 65;
	public static readonly BINARY_LIT = 66;
	public static readonly OCTAL_LIT = 67;
	public static readonly HEX_LIT = 68;
	public static readonly FLOAT_LIT = 69;
	public static readonly DECIMAL_FLOAT_LIT = 70;
	public static readonly HEX_FLOAT_LIT = 71;
	public static readonly IMAGINARY_LIT = 72;
	public static readonly RUNE_LIT = 73;
	public static readonly BYTE_VALUE = 74;
	public static readonly OCTAL_BYTE_VALUE = 75;
	public static readonly HEX_BYTE_VALUE = 76;
	public static readonly LITTLE_U_VALUE = 77;
	public static readonly BIG_U_VALUE = 78;
	public static readonly RAW_STRING_LIT = 79;
	public static readonly INTERPRETED_STRING_LIT = 80;
	public static readonly WS = 81;
	public static readonly COMMENT = 82;
	public static readonly TERMINATOR = 83;
	public static readonly LINE_COMMENT = 84;
	public static readonly WS_NLSEMI = 85;
	public static readonly COMMENT_NLSEMI = 86;
	public static readonly LINE_COMMENT_NLSEMI = 87;
	public static readonly EOS = 88;
	public static readonly OTHER = 89;
	public static readonly RULE_global_scope = 0;
	public static readonly RULE_arguments = 1;
	public static readonly RULE_funcApp = 2;
	public static readonly RULE_funcDecl = 3;
	public static readonly RULE_signature = 4;
	public static readonly RULE_parameters = 5;
	public static readonly RULE_parameterDecl = 6;
	public static readonly RULE_block = 7;
	public static readonly RULE_varDecl = 8;
	public static readonly RULE_assignment = 9;
	public static readonly RULE_assign_op = 10;
	public static readonly RULE_expressionStmt = 11;
	public static readonly RULE_expression = 12;
	public static readonly RULE_primaryExpr = 13;
	public static readonly RULE_operand = 14;
	public static readonly RULE_operandName = 15;
	public static readonly RULE_literal = 16;
	public static readonly RULE_statementList = 17;
	public static readonly RULE_statement = 18;
	public static readonly RULE_simpleStmt = 19;
	public static readonly RULE_expressionList = 20;
	public static readonly RULE_eos = 21;
	public static readonly RULE_identifierList = 22;
	public static readonly RULE_ifStmt = 23;
	public static readonly RULE_returnStmt = 24;
	public static readonly RULE_forStmt = 25;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"global_scope", "arguments", "funcApp", "funcDecl", "signature", "parameters", 
		"parameterDecl", "block", "varDecl", "assignment", "assign_op", "expressionStmt", 
		"expression", "primaryExpr", "operand", "operandName", "literal", "statementList", 
		"statement", "simpleStmt", "expressionList", "eos", "identifierList", 
		"ifStmt", "returnStmt", "forStmt",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'break'", "'default'", "'func'", "'interface'", "'select'", 
		"'case'", "'defer'", "'go'", "'map'", "'struct'", "'chan'", "'else'", 
		"'goto'", "'package'", "'switch'", "'const'", "'fallthrough'", "'if'", 
		"'range'", "'type'", "'continue'", "'for'", "'import'", "'return'", "'var'", 
		"'nil'", undefined, "'('", "')'", "'{'", "'}'", "'['", "']'", "'='", "','", 
		"';'", "':'", "'.'", "'++'", "'--'", "':='", "'...'", "'||'", "'&&'", 
		"'=='", "'!='", "'<'", "'<='", "'>'", "'>='", "'|'", "'/'", "'%'", "'<<'", 
		"'>>'", "'&^'", "'~'", "'!'", "'+'", "'-'", "'^'", "'*'", "'&'", "'<-'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "BREAK", "DEFAULT", "FUNC", "INTERFACE", "SELECT", "CASE", 
		"DEFER", "GO", "MAP", "STRUCT", "CHAN", "ELSE", "GOTO", "PACKAGE", "SWITCH", 
		"CONST", "FALLTHROUGH", "IF", "RANGE", "TYPE", "CONTINUE", "FOR", "IMPORT", 
		"RETURN", "VAR", "NIL_LIT", "IDENTIFIER", "L_PAREN", "R_PAREN", "L_CURLY", 
		"R_CURLY", "L_BRACKET", "R_BRACKET", "ASSIGN", "COMMA", "SEMI", "COLON", 
		"DOT", "PLUS_PLUS", "MINUS_MINUS", "DECLARE_ASSIGN", "ELLIPSIS", "LOGICAL_OR", 
		"LOGICAL_AND", "EQUALS", "NOT_EQUALS", "LESS", "LESS_OR_EQUALS", "GREATER", 
		"GREATER_OR_EQUALS", "OR", "DIV", "MOD", "LSHIFT", "RSHIFT", "BIT_CLEAR", 
		"UNDERLYING", "EXCLAMATION", "PLUS", "MINUS", "CARET", "STAR", "AMPERSAND", 
		"RECEIVE", "DECIMAL_LIT", "BINARY_LIT", "OCTAL_LIT", "HEX_LIT", "FLOAT_LIT", 
		"DECIMAL_FLOAT_LIT", "HEX_FLOAT_LIT", "IMAGINARY_LIT", "RUNE_LIT", "BYTE_VALUE", 
		"OCTAL_BYTE_VALUE", "HEX_BYTE_VALUE", "LITTLE_U_VALUE", "BIG_U_VALUE", 
		"RAW_STRING_LIT", "INTERPRETED_STRING_LIT", "WS", "COMMENT", "TERMINATOR", 
		"LINE_COMMENT", "WS_NLSEMI", "COMMENT_NLSEMI", "LINE_COMMENT_NLSEMI", 
		"EOS", "OTHER",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(SimpleParser._LITERAL_NAMES, SimpleParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return SimpleParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "SimpleParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return SimpleParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return SimpleParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(SimpleParser._ATN, this);
	}
	// @RuleVersion(0)
	public global_scope(): Global_scopeContext {
		let _localctx: Global_scopeContext = new Global_scopeContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, SimpleParser.RULE_global_scope);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 60;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SimpleParser.FUNC) | (1 << SimpleParser.VAR) | (1 << SimpleParser.IDENTIFIER))) !== 0)) {
				{
				{
				this.state = 54;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SimpleParser.VAR:
				case SimpleParser.IDENTIFIER:
					{
					this.state = 52;
					this.varDecl();
					}
					break;
				case SimpleParser.FUNC:
					{
					this.state = 53;
					this.funcDecl();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 56;
				this.eos();
				}
				}
				this.state = 62;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arguments(): ArgumentsContext {
		let _localctx: ArgumentsContext = new ArgumentsContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, SimpleParser.RULE_arguments);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 63;
			this.match(SimpleParser.L_PAREN);
			this.state = 65;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SimpleParser.NIL_LIT) | (1 << SimpleParser.IDENTIFIER) | (1 << SimpleParser.L_PAREN))) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & ((1 << (SimpleParser.EXCLAMATION - 58)) | (1 << (SimpleParser.MINUS - 58)) | (1 << (SimpleParser.DECIMAL_LIT - 58)) | (1 << (SimpleParser.FLOAT_LIT - 58)))) !== 0)) {
				{
				this.state = 64;
				this.expressionList();
				}
			}

			this.state = 67;
			this.match(SimpleParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public funcApp(): FuncAppContext {
		let _localctx: FuncAppContext = new FuncAppContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, SimpleParser.RULE_funcApp);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 69;
			this.match(SimpleParser.IDENTIFIER);
			this.state = 70;
			this.arguments();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public funcDecl(): FuncDeclContext {
		let _localctx: FuncDeclContext = new FuncDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, SimpleParser.RULE_funcDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 72;
			this.match(SimpleParser.FUNC);
			this.state = 73;
			this.match(SimpleParser.IDENTIFIER);
			this.state = 74;
			this.signature();
			this.state = 75;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public signature(): SignatureContext {
		let _localctx: SignatureContext = new SignatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, SimpleParser.RULE_signature);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 77;
			this.match(SimpleParser.L_PAREN);
			this.state = 78;
			this.parameters();
			this.state = 79;
			this.match(SimpleParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameters(): ParametersContext {
		let _localctx: ParametersContext = new ParametersContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, SimpleParser.RULE_parameters);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 92;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				{
				this.state = 81;
				this.parameterDecl();
				this.state = 86;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 82;
						this.match(SimpleParser.COMMA);
						this.state = 83;
						this.parameterDecl();
						}
						}
					}
					this.state = 88;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
				}
				this.state = 90;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SimpleParser.COMMA) {
					{
					this.state = 89;
					this.match(SimpleParser.COMMA);
					}
				}

				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameterDecl(): ParameterDeclContext {
		let _localctx: ParameterDeclContext = new ParameterDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, SimpleParser.RULE_parameterDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 95;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SimpleParser.IDENTIFIER) {
				{
				this.state = 94;
				this.identifierList();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let _localctx: BlockContext = new BlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, SimpleParser.RULE_block);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 97;
			this.match(SimpleParser.L_CURLY);
			this.state = 99;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				{
				this.state = 98;
				this.statementList();
				}
				break;
			}
			this.state = 101;
			this.match(SimpleParser.R_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varDecl(): VarDeclContext {
		let _localctx: VarDeclContext = new VarDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, SimpleParser.RULE_varDecl);
		try {
			this.state = 112;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.VAR:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 103;
				this.match(SimpleParser.VAR);
				this.state = 104;
				this.identifierList();
				this.state = 105;
				this.match(SimpleParser.ASSIGN);
				this.state = 106;
				this.expressionList();
				}
				break;
			case SimpleParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 108;
				this.identifierList();
				this.state = 109;
				this.match(SimpleParser.DECLARE_ASSIGN);
				this.state = 110;
				this.expressionList();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assignment(): AssignmentContext {
		let _localctx: AssignmentContext = new AssignmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, SimpleParser.RULE_assignment);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 114;
			this.identifierList();
			this.state = 115;
			this.assign_op();
			this.state = 116;
			this.expressionList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assign_op(): Assign_opContext {
		let _localctx: Assign_opContext = new Assign_opContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, SimpleParser.RULE_assign_op);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 118;
			this.match(SimpleParser.ASSIGN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionStmt(): ExpressionStmtContext {
		let _localctx: ExpressionStmtContext = new ExpressionStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, SimpleParser.RULE_expressionStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 120;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 24;
		this.enterRecursionRule(_localctx, 24, SimpleParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 127;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				_localctx = new FUNCAPPContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 123;
				this.funcApp();
				}
				break;

			case 2:
				{
				_localctx = new UNARYOPContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 124;
				(_localctx as UNARYOPContext)._unary_op = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(_la === SimpleParser.EXCLAMATION || _la === SimpleParser.MINUS)) {
					(_localctx as UNARYOPContext)._unary_op = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 125;
				this.expression(7);
				}
				break;

			case 3:
				{
				_localctx = new PRIMARYContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 126;
				this.primaryExpr();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 146;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 11, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 144;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
					case 1:
						{
						_localctx = new BINOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 129;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 130;
						(_localctx as BINOPContext)._bin_op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === SimpleParser.DIV || _la === SimpleParser.STAR)) {
							(_localctx as BINOPContext)._bin_op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 131;
						this.expression(7);
						}
						break;

					case 2:
						{
						_localctx = new BINOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 132;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 133;
						(_localctx as BINOPContext)._bin_op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === SimpleParser.PLUS || _la === SimpleParser.MINUS)) {
							(_localctx as BINOPContext)._bin_op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 134;
						this.expression(6);
						}
						break;

					case 3:
						{
						_localctx = new RELOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 135;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 136;
						(_localctx as RELOPContext)._rel_op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & ((1 << (SimpleParser.EQUALS - 45)) | (1 << (SimpleParser.NOT_EQUALS - 45)) | (1 << (SimpleParser.LESS - 45)) | (1 << (SimpleParser.LESS_OR_EQUALS - 45)) | (1 << (SimpleParser.GREATER - 45)) | (1 << (SimpleParser.GREATER_OR_EQUALS - 45)))) !== 0))) {
							(_localctx as RELOPContext)._rel_op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 137;
						this.expression(5);
						}
						break;

					case 4:
						{
						_localctx = new LOGOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 138;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 139;
						this.match(SimpleParser.LOGICAL_AND);
						this.state = 140;
						this.expression(4);
						}
						break;

					case 5:
						{
						_localctx = new LOGOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 141;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 142;
						this.match(SimpleParser.LOGICAL_OR);
						this.state = 143;
						this.expression(3);
						}
						break;
					}
					}
				}
				this.state = 148;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 11, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primaryExpr(): PrimaryExprContext {
		let _localctx: PrimaryExprContext = new PrimaryExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, SimpleParser.RULE_primaryExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 149;
			this.operand();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operand(): OperandContext {
		let _localctx: OperandContext = new OperandContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, SimpleParser.RULE_operand);
		try {
			this.state = 157;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.NIL_LIT:
			case SimpleParser.DECIMAL_LIT:
			case SimpleParser.FLOAT_LIT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 151;
				this.literal();
				}
				break;
			case SimpleParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 152;
				this.operandName();
				}
				break;
			case SimpleParser.L_PAREN:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 153;
				this.match(SimpleParser.L_PAREN);
				this.state = 154;
				this.expression(0);
				this.state = 155;
				this.match(SimpleParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operandName(): OperandNameContext {
		let _localctx: OperandNameContext = new OperandNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, SimpleParser.RULE_operandName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 159;
			this.match(SimpleParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, SimpleParser.RULE_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 161;
			_la = this._input.LA(1);
			if (!(_la === SimpleParser.NIL_LIT || _la === SimpleParser.DECIMAL_LIT || _la === SimpleParser.FLOAT_LIT)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statementList(): StatementListContext {
		let _localctx: StatementListContext = new StatementListContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, SimpleParser.RULE_statementList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 175;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 170;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 15, this._ctx) ) {
					case 1:
						{
						this.state = 164;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === SimpleParser.SEMI) {
							{
							this.state = 163;
							this.match(SimpleParser.SEMI);
							}
						}

						}
						break;

					case 2:
						{
						this.state = 167;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === SimpleParser.EOS) {
							{
							this.state = 166;
							this.match(SimpleParser.EOS);
							}
						}

						}
						break;

					case 3:
						{
						this.state = 169;
						if (!(this.closingBracket())) {
							throw this.createFailedPredicateException("this.closingBracket()");
						}
						}
						break;
					}
					this.state = 172;
					this.statement();
					this.state = 173;
					this.eos();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 177;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 16, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, SimpleParser.RULE_statement);
		try {
			this.state = 184;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.FOR:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 179;
				this.forStmt();
				}
				break;
			case SimpleParser.IF:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 180;
				this.ifStmt();
				}
				break;
			case SimpleParser.RETURN:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 181;
				this.returnStmt();
				}
				break;
			case SimpleParser.FUNC:
			case SimpleParser.VAR:
			case SimpleParser.NIL_LIT:
			case SimpleParser.IDENTIFIER:
			case SimpleParser.L_PAREN:
			case SimpleParser.EXCLAMATION:
			case SimpleParser.MINUS:
			case SimpleParser.DECIMAL_LIT:
			case SimpleParser.FLOAT_LIT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 182;
				this.simpleStmt();
				}
				break;
			case SimpleParser.L_CURLY:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 183;
				this.block();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simpleStmt(): SimpleStmtContext {
		let _localctx: SimpleStmtContext = new SimpleStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, SimpleParser.RULE_simpleStmt);
		try {
			this.state = 190;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 186;
				this.assignment();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 187;
				this.varDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 188;
				this.funcDecl();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 189;
				this.expressionStmt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionList(): ExpressionListContext {
		let _localctx: ExpressionListContext = new ExpressionListContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, SimpleParser.RULE_expressionList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 192;
			this.expression(0);
			this.state = 197;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 193;
					this.match(SimpleParser.COMMA);
					this.state = 194;
					this.expression(0);
					}
					}
				}
				this.state = 199;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eos(): EosContext {
		let _localctx: EosContext = new EosContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, SimpleParser.RULE_eos);
		try {
			this.state = 204;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 200;
				this.match(SimpleParser.SEMI);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 201;
				this.match(SimpleParser.EOF);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 202;
				this.match(SimpleParser.EOS);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 203;
				if (!(this.closingBracket())) {
					throw this.createFailedPredicateException("this.closingBracket()");
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifierList(): IdentifierListContext {
		let _localctx: IdentifierListContext = new IdentifierListContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, SimpleParser.RULE_identifierList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 206;
			this.match(SimpleParser.IDENTIFIER);
			this.state = 211;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 21, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 207;
					this.match(SimpleParser.COMMA);
					this.state = 208;
					this.match(SimpleParser.IDENTIFIER);
					}
					}
				}
				this.state = 213;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 21, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ifStmt(): IfStmtContext {
		let _localctx: IfStmtContext = new IfStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, SimpleParser.RULE_ifStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 214;
			this.match(SimpleParser.IF);
			this.state = 215;
			this.expression(0);
			this.state = 216;
			this.block();
			this.state = 222;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				{
				this.state = 217;
				this.match(SimpleParser.ELSE);
				this.state = 220;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SimpleParser.IF:
					{
					this.state = 218;
					this.ifStmt();
					}
					break;
				case SimpleParser.L_CURLY:
					{
					this.state = 219;
					this.block();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public returnStmt(): ReturnStmtContext {
		let _localctx: ReturnStmtContext = new ReturnStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, SimpleParser.RULE_returnStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 224;
			this.match(SimpleParser.RETURN);
			this.state = 226;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				{
				this.state = 225;
				this.expressionList();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forStmt(): ForStmtContext {
		let _localctx: ForStmtContext = new ForStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, SimpleParser.RULE_forStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 228;
			this.match(SimpleParser.FOR);
			this.state = 229;
			this.expression(0);
			this.state = 230;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 12:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);

		case 17:
			return this.statementList_sempred(_localctx as StatementListContext, predIndex);

		case 21:
			return this.eos_sempred(_localctx as EosContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 6);

		case 1:
			return this.precpred(this._ctx, 5);

		case 2:
			return this.precpred(this._ctx, 4);

		case 3:
			return this.precpred(this._ctx, 3);

		case 4:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}
	private statementList_sempred(_localctx: StatementListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 5:
			return this.closingBracket();
		}
		return true;
	}
	private eos_sempred(_localctx: EosContext, predIndex: number): boolean {
		switch (predIndex) {
		case 6:
			return this.closingBracket();
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03[\xEB\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x03\x02\x03\x02\x05" +
		"\x029\n\x02\x03\x02\x03\x02\x07\x02=\n\x02\f\x02\x0E\x02@\v\x02\x03\x03" +
		"\x03\x03\x05\x03D\n\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x05" +
		"\x03\x05\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07" +
		"\x03\x07\x03\x07\x07\x07W\n\x07\f\x07\x0E\x07Z\v\x07\x03\x07\x05\x07]" +
		"\n\x07\x05\x07_\n\x07\x03\b\x05\bb\n\b\x03\t\x03\t\x05\tf\n\t\x03\t\x03" +
		"\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05\ns\n\n\x03" +
		"\v\x03\v\x03\v\x03\v\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03" +
		"\x0E\x03\x0E\x05\x0E\x82\n\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E" +
		"\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E" +
		"\x03\x0E\x07\x0E\x93\n\x0E\f\x0E\x0E\x0E\x96\v\x0E\x03\x0F\x03\x0F\x03" +
		"\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\xA0\n\x10\x03\x11" +
		"\x03\x11\x03\x12\x03\x12\x03\x13\x05\x13\xA7\n\x13\x03\x13\x05\x13\xAA" +
		"\n\x13\x03\x13\x05\x13\xAD\n\x13\x03\x13\x03\x13\x03\x13\x06\x13\xB2\n" +
		"\x13\r\x13\x0E\x13\xB3\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x05\x14" +
		"\xBB\n\x14\x03\x15\x03\x15\x03\x15\x03\x15\x05\x15\xC1\n\x15\x03\x16\x03" +
		"\x16\x03\x16\x07\x16\xC6\n\x16\f\x16\x0E\x16\xC9\v\x16\x03\x17\x03\x17" +
		"\x03\x17\x03\x17\x05\x17\xCF\n\x17\x03\x18\x03\x18\x03\x18\x07\x18\xD4" +
		"\n\x18\f\x18\x0E\x18\xD7\v\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19" +
		"\x03\x19\x05\x19\xDF\n\x19\x05\x19\xE1\n\x19\x03\x1A\x03\x1A\x05\x1A\xE5" +
		"\n\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x02\x02\x03\x1A\x1C\x02" +
		"\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02" +
		"\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02" +
		",\x02.\x020\x022\x024\x02\x02\x07\x04\x02<<>>\x04\x0266@@\x03\x02=>\x03" +
		"\x02/4\x05\x02\x1C\x1CCCGG\x02\xF6\x02>\x03\x02\x02\x02\x04A\x03\x02\x02" +
		"\x02\x06G\x03\x02\x02\x02\bJ\x03\x02\x02\x02\nO\x03\x02\x02\x02\f^\x03" +
		"\x02\x02\x02\x0Ea\x03\x02\x02\x02\x10c\x03\x02\x02\x02\x12r\x03\x02\x02" +
		"\x02\x14t\x03\x02\x02\x02\x16x\x03\x02\x02\x02\x18z\x03\x02\x02\x02\x1A" +
		"\x81\x03\x02\x02\x02\x1C\x97\x03\x02\x02\x02\x1E\x9F\x03\x02\x02\x02 " +
		"\xA1\x03\x02\x02\x02\"\xA3\x03\x02\x02\x02$\xB1\x03\x02\x02\x02&\xBA\x03" +
		"\x02\x02\x02(\xC0\x03\x02\x02\x02*\xC2\x03\x02\x02\x02,\xCE\x03\x02\x02" +
		"\x02.\xD0\x03\x02\x02\x020\xD8\x03\x02\x02\x022\xE2\x03\x02\x02\x024\xE6" +
		"\x03\x02\x02\x0269\x05\x12\n\x0279\x05\b\x05\x0286\x03\x02\x02\x0287\x03" +
		"\x02\x02\x029:\x03\x02\x02\x02:;\x05,\x17\x02;=\x03\x02\x02\x02<8\x03" +
		"\x02\x02\x02=@\x03\x02\x02\x02><\x03\x02\x02\x02>?\x03\x02\x02\x02?\x03" +
		"\x03\x02\x02\x02@>\x03\x02\x02\x02AC\x07\x1E\x02\x02BD\x05*\x16\x02CB" +
		"\x03\x02\x02\x02CD\x03\x02\x02\x02DE\x03\x02\x02\x02EF\x07\x1F\x02\x02" +
		"F\x05\x03\x02\x02\x02GH\x07\x1D\x02\x02HI\x05\x04\x03\x02I\x07\x03\x02" +
		"\x02\x02JK\x07\x05\x02\x02KL\x07\x1D\x02\x02LM\x05\n\x06\x02MN\x05\x10" +
		"\t\x02N\t\x03\x02\x02\x02OP\x07\x1E\x02\x02PQ\x05\f\x07\x02QR\x07\x1F" +
		"\x02\x02R\v\x03\x02\x02\x02SX\x05\x0E\b\x02TU\x07%\x02\x02UW\x05\x0E\b" +
		"\x02VT\x03\x02\x02\x02WZ\x03\x02\x02\x02XV\x03\x02\x02\x02XY\x03\x02\x02" +
		"\x02Y\\\x03\x02\x02\x02ZX\x03\x02\x02\x02[]\x07%\x02\x02\\[\x03\x02\x02" +
		"\x02\\]\x03\x02\x02\x02]_\x03\x02\x02\x02^S\x03\x02\x02\x02^_\x03\x02" +
		"\x02\x02_\r\x03\x02\x02\x02`b\x05.\x18\x02a`\x03\x02\x02\x02ab\x03\x02" +
		"\x02\x02b\x0F\x03\x02\x02\x02ce\x07 \x02\x02df\x05$\x13\x02ed\x03\x02" +
		"\x02\x02ef\x03\x02\x02\x02fg\x03\x02\x02\x02gh\x07!\x02\x02h\x11\x03\x02" +
		"\x02\x02ij\x07\x1B\x02\x02jk\x05.\x18\x02kl\x07$\x02\x02lm\x05*\x16\x02" +
		"ms\x03\x02\x02\x02no\x05.\x18\x02op\x07+\x02\x02pq\x05*\x16\x02qs\x03" +
		"\x02\x02\x02ri\x03\x02\x02\x02rn\x03\x02\x02\x02s\x13\x03\x02\x02\x02" +
		"tu\x05.\x18\x02uv\x05\x16\f\x02vw\x05*\x16\x02w\x15\x03\x02\x02\x02xy" +
		"\x07$\x02\x02y\x17\x03\x02\x02\x02z{\x05\x1A\x0E\x02{\x19\x03\x02\x02" +
		"\x02|}\b\x0E\x01\x02}\x82\x05\x06\x04\x02~\x7F\t\x02\x02\x02\x7F\x82\x05" +
		"\x1A\x0E\t\x80\x82\x05\x1C\x0F\x02\x81|\x03\x02\x02\x02\x81~\x03\x02\x02" +
		"\x02\x81\x80\x03\x02\x02\x02\x82\x94\x03\x02\x02\x02\x83\x84\f\b\x02\x02" +
		"\x84\x85\t\x03\x02\x02\x85\x93\x05\x1A\x0E\t\x86\x87\f\x07\x02\x02\x87" +
		"\x88\t\x04\x02\x02\x88\x93\x05\x1A\x0E\b\x89\x8A\f\x06\x02\x02\x8A\x8B" +
		"\t\x05\x02\x02\x8B\x93\x05\x1A\x0E\x07\x8C\x8D\f\x05\x02\x02\x8D\x8E\x07" +
		".\x02\x02\x8E\x93\x05\x1A\x0E\x06\x8F\x90\f\x04\x02\x02\x90\x91\x07-\x02" +
		"\x02\x91\x93\x05\x1A\x0E\x05\x92\x83\x03\x02\x02\x02\x92\x86\x03\x02\x02" +
		"\x02\x92\x89\x03\x02\x02\x02\x92\x8C\x03\x02\x02\x02\x92\x8F\x03\x02\x02" +
		"\x02\x93\x96\x03\x02\x02\x02\x94\x92\x03\x02\x02\x02\x94\x95\x03\x02\x02" +
		"\x02\x95\x1B\x03\x02\x02\x02\x96\x94\x03\x02\x02\x02\x97\x98\x05\x1E\x10" +
		"\x02\x98\x1D\x03\x02\x02\x02\x99\xA0\x05\"\x12\x02\x9A\xA0\x05 \x11\x02" +
		"\x9B\x9C\x07\x1E\x02\x02\x9C\x9D\x05\x1A\x0E\x02\x9D\x9E\x07\x1F\x02\x02" +
		"\x9E\xA0\x03\x02\x02\x02\x9F\x99\x03\x02\x02\x02\x9F\x9A\x03\x02\x02\x02" +
		"\x9F\x9B\x03\x02\x02\x02\xA0\x1F\x03\x02\x02\x02\xA1\xA2\x07\x1D\x02\x02" +
		"\xA2!\x03\x02\x02\x02\xA3\xA4\t\x06\x02\x02\xA4#\x03\x02\x02\x02\xA5\xA7" +
		"\x07&\x02\x02\xA6\xA5\x03\x02\x02\x02\xA6\xA7\x03\x02\x02\x02\xA7\xAD" +
		"\x03\x02\x02\x02\xA8\xAA\x07Z\x02\x02\xA9\xA8\x03\x02\x02\x02\xA9\xAA" +
		"\x03\x02\x02\x02\xAA\xAD\x03\x02\x02\x02\xAB\xAD\x06\x13\x07\x02\xAC\xA6" +
		"\x03\x02\x02\x02\xAC\xA9\x03\x02\x02\x02\xAC\xAB\x03\x02\x02\x02\xAD\xAE" +
		"\x03\x02\x02\x02\xAE\xAF\x05&\x14\x02\xAF\xB0\x05,\x17\x02\xB0\xB2\x03" +
		"\x02\x02\x02\xB1\xAC\x03\x02\x02\x02\xB2\xB3\x03\x02\x02\x02\xB3\xB1\x03" +
		"\x02\x02\x02\xB3\xB4\x03\x02\x02\x02\xB4%\x03\x02\x02\x02\xB5\xBB\x05" +
		"4\x1B\x02\xB6\xBB\x050\x19\x02\xB7\xBB\x052\x1A\x02\xB8\xBB\x05(\x15\x02" +
		"\xB9\xBB\x05\x10\t\x02\xBA\xB5\x03\x02\x02\x02\xBA\xB6\x03\x02\x02\x02" +
		"\xBA\xB7\x03\x02\x02\x02\xBA\xB8\x03\x02\x02\x02\xBA\xB9\x03\x02\x02\x02" +
		"\xBB\'\x03\x02\x02\x02\xBC\xC1\x05\x14\v\x02\xBD\xC1\x05\x12\n\x02\xBE" +
		"\xC1\x05\b\x05\x02\xBF\xC1\x05\x18\r\x02\xC0\xBC\x03\x02\x02\x02\xC0\xBD" +
		"\x03\x02\x02\x02\xC0\xBE\x03\x02\x02\x02\xC0\xBF\x03\x02\x02\x02\xC1)" +
		"\x03\x02\x02\x02\xC2\xC7\x05\x1A\x0E\x02\xC3\xC4\x07%\x02\x02\xC4\xC6" +
		"\x05\x1A\x0E\x02\xC5\xC3\x03\x02\x02\x02\xC6\xC9\x03\x02\x02\x02\xC7\xC5" +
		"\x03\x02\x02\x02\xC7\xC8\x03\x02\x02\x02\xC8+\x03\x02\x02\x02\xC9\xC7" +
		"\x03\x02\x02\x02\xCA\xCF\x07&\x02\x02\xCB\xCF\x07\x02\x02\x03\xCC\xCF" +
		"\x07Z\x02\x02\xCD\xCF\x06\x17\b\x02\xCE\xCA\x03\x02\x02\x02\xCE\xCB\x03" +
		"\x02\x02\x02\xCE\xCC\x03\x02\x02\x02\xCE\xCD\x03\x02\x02\x02\xCF-\x03" +
		"\x02\x02\x02\xD0\xD5\x07\x1D\x02\x02\xD1\xD2\x07%\x02\x02\xD2\xD4\x07" +
		"\x1D\x02\x02\xD3\xD1\x03\x02\x02\x02\xD4\xD7\x03\x02\x02\x02\xD5\xD3\x03" +
		"\x02\x02\x02\xD5\xD6\x03\x02\x02\x02\xD6/\x03\x02\x02\x02\xD7\xD5\x03" +
		"\x02\x02\x02\xD8\xD9\x07\x14\x02\x02\xD9\xDA\x05\x1A\x0E\x02\xDA\xE0\x05" +
		"\x10\t\x02\xDB\xDE\x07\x0E\x02\x02\xDC\xDF\x050\x19\x02\xDD\xDF\x05\x10" +
		"\t\x02\xDE\xDC\x03\x02\x02\x02\xDE\xDD\x03\x02\x02\x02\xDF\xE1\x03\x02" +
		"\x02\x02\xE0\xDB\x03\x02\x02\x02\xE0\xE1\x03\x02\x02\x02\xE11\x03\x02" +
		"\x02\x02\xE2\xE4\x07\x1A\x02\x02\xE3\xE5\x05*\x16\x02\xE4\xE3\x03\x02" +
		"\x02\x02\xE4\xE5\x03\x02\x02\x02\xE53\x03\x02\x02\x02\xE6\xE7\x07\x18" +
		"\x02\x02\xE7\xE8\x05\x1A\x0E\x02\xE8\xE9\x05\x10\t\x02\xE95\x03\x02\x02" +
		"\x02\x1B8>CX\\^aer\x81\x92\x94\x9F\xA6\xA9\xAC\xB3\xBA\xC0\xC7\xCE\xD5" +
		"\xDE\xE0\xE4";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SimpleParser.__ATN) {
			SimpleParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(SimpleParser._serializedATN));
		}

		return SimpleParser.__ATN;
	}

}

export class Global_scopeContext extends ParserRuleContext {
	public eos(): EosContext[];
	public eos(i: number): EosContext;
	public eos(i?: number): EosContext | EosContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EosContext);
		} else {
			return this.getRuleContext(i, EosContext);
		}
	}
	public varDecl(): VarDeclContext[];
	public varDecl(i: number): VarDeclContext;
	public varDecl(i?: number): VarDeclContext | VarDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VarDeclContext);
		} else {
			return this.getRuleContext(i, VarDeclContext);
		}
	}
	public funcDecl(): FuncDeclContext[];
	public funcDecl(i: number): FuncDeclContext;
	public funcDecl(i?: number): FuncDeclContext | FuncDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FuncDeclContext);
		} else {
			return this.getRuleContext(i, FuncDeclContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_global_scope; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterGlobal_scope) {
			listener.enterGlobal_scope(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitGlobal_scope) {
			listener.exitGlobal_scope(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitGlobal_scope) {
			return visitor.visitGlobal_scope(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentsContext extends ParserRuleContext {
	public L_PAREN(): TerminalNode { return this.getToken(SimpleParser.L_PAREN, 0); }
	public R_PAREN(): TerminalNode { return this.getToken(SimpleParser.R_PAREN, 0); }
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_arguments; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterArguments) {
			listener.enterArguments(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitArguments) {
			listener.exitArguments(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitArguments) {
			return visitor.visitArguments(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FuncAppContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(SimpleParser.IDENTIFIER, 0); }
	public arguments(): ArgumentsContext {
		return this.getRuleContext(0, ArgumentsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_funcApp; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterFuncApp) {
			listener.enterFuncApp(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitFuncApp) {
			listener.exitFuncApp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitFuncApp) {
			return visitor.visitFuncApp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FuncDeclContext extends ParserRuleContext {
	public FUNC(): TerminalNode { return this.getToken(SimpleParser.FUNC, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(SimpleParser.IDENTIFIER, 0); }
	public signature(): SignatureContext {
		return this.getRuleContext(0, SignatureContext);
	}
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_funcDecl; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterFuncDecl) {
			listener.enterFuncDecl(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitFuncDecl) {
			listener.exitFuncDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitFuncDecl) {
			return visitor.visitFuncDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SignatureContext extends ParserRuleContext {
	public L_PAREN(): TerminalNode { return this.getToken(SimpleParser.L_PAREN, 0); }
	public parameters(): ParametersContext {
		return this.getRuleContext(0, ParametersContext);
	}
	public R_PAREN(): TerminalNode { return this.getToken(SimpleParser.R_PAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_signature; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterSignature) {
			listener.enterSignature(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitSignature) {
			listener.exitSignature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitSignature) {
			return visitor.visitSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParametersContext extends ParserRuleContext {
	public parameterDecl(): ParameterDeclContext[];
	public parameterDecl(i: number): ParameterDeclContext;
	public parameterDecl(i?: number): ParameterDeclContext | ParameterDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParameterDeclContext);
		} else {
			return this.getRuleContext(i, ParameterDeclContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SimpleParser.COMMA);
		} else {
			return this.getToken(SimpleParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_parameters; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterParameters) {
			listener.enterParameters(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitParameters) {
			listener.exitParameters(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitParameters) {
			return visitor.visitParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterDeclContext extends ParserRuleContext {
	public identifierList(): IdentifierListContext | undefined {
		return this.tryGetRuleContext(0, IdentifierListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_parameterDecl; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterParameterDecl) {
			listener.enterParameterDecl(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitParameterDecl) {
			listener.exitParameterDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitParameterDecl) {
			return visitor.visitParameterDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	public L_CURLY(): TerminalNode { return this.getToken(SimpleParser.L_CURLY, 0); }
	public R_CURLY(): TerminalNode { return this.getToken(SimpleParser.R_CURLY, 0); }
	public statementList(): StatementListContext | undefined {
		return this.tryGetRuleContext(0, StatementListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_block; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterBlock) {
			listener.enterBlock(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitBlock) {
			listener.exitBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitBlock) {
			return visitor.visitBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarDeclContext extends ParserRuleContext {
	public VAR(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.VAR, 0); }
	public identifierList(): IdentifierListContext {
		return this.getRuleContext(0, IdentifierListContext);
	}
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.ASSIGN, 0); }
	public expressionList(): ExpressionListContext {
		return this.getRuleContext(0, ExpressionListContext);
	}
	public DECLARE_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.DECLARE_ASSIGN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_varDecl; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterVarDecl) {
			listener.enterVarDecl(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitVarDecl) {
			listener.exitVarDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitVarDecl) {
			return visitor.visitVarDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentContext extends ParserRuleContext {
	public identifierList(): IdentifierListContext {
		return this.getRuleContext(0, IdentifierListContext);
	}
	public assign_op(): Assign_opContext {
		return this.getRuleContext(0, Assign_opContext);
	}
	public expressionList(): ExpressionListContext {
		return this.getRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_assignment; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterAssignment) {
			listener.enterAssignment(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitAssignment) {
			listener.exitAssignment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitAssignment) {
			return visitor.visitAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assign_opContext extends ParserRuleContext {
	public ASSIGN(): TerminalNode { return this.getToken(SimpleParser.ASSIGN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_assign_op; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterAssign_op) {
			listener.enterAssign_op(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitAssign_op) {
			listener.exitAssign_op(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitAssign_op) {
			return visitor.visitAssign_op(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionStmtContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_expressionStmt; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterExpressionStmt) {
			listener.enterExpressionStmt(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitExpressionStmt) {
			listener.exitExpressionStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitExpressionStmt) {
			return visitor.visitExpressionStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_expression; }
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class FUNCAPPContext extends ExpressionContext {
	public funcApp(): FuncAppContext {
		return this.getRuleContext(0, FuncAppContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterFUNCAPP) {
			listener.enterFUNCAPP(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitFUNCAPP) {
			listener.exitFUNCAPP(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitFUNCAPP) {
			return visitor.visitFUNCAPP(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UNARYOPContext extends ExpressionContext {
	public _unary_op!: Token;
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.MINUS, 0); }
	public EXCLAMATION(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.EXCLAMATION, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterUNARYOP) {
			listener.enterUNARYOP(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitUNARYOP) {
			listener.exitUNARYOP(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitUNARYOP) {
			return visitor.visitUNARYOP(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BINOPContext extends ExpressionContext {
	public _bin_op!: Token;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public DIV(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.DIV, 0); }
	public STAR(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.STAR, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.MINUS, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterBINOP) {
			listener.enterBINOP(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitBINOP) {
			listener.exitBINOP(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitBINOP) {
			return visitor.visitBINOP(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RELOPContext extends ExpressionContext {
	public _rel_op!: Token;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public EQUALS(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.EQUALS, 0); }
	public NOT_EQUALS(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.NOT_EQUALS, 0); }
	public LESS(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.LESS, 0); }
	public LESS_OR_EQUALS(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.LESS_OR_EQUALS, 0); }
	public GREATER(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.GREATER, 0); }
	public GREATER_OR_EQUALS(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.GREATER_OR_EQUALS, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterRELOP) {
			listener.enterRELOP(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitRELOP) {
			listener.exitRELOP(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitRELOP) {
			return visitor.visitRELOP(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LOGOPContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public LOGICAL_AND(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.LOGICAL_AND, 0); }
	public LOGICAL_OR(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.LOGICAL_OR, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterLOGOP) {
			listener.enterLOGOP(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitLOGOP) {
			listener.exitLOGOP(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitLOGOP) {
			return visitor.visitLOGOP(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PRIMARYContext extends ExpressionContext {
	public primaryExpr(): PrimaryExprContext {
		return this.getRuleContext(0, PrimaryExprContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterPRIMARY) {
			listener.enterPRIMARY(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitPRIMARY) {
			listener.exitPRIMARY(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitPRIMARY) {
			return visitor.visitPRIMARY(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryExprContext extends ParserRuleContext {
	public operand(): OperandContext {
		return this.getRuleContext(0, OperandContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_primaryExpr; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterPrimaryExpr) {
			listener.enterPrimaryExpr(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitPrimaryExpr) {
			listener.exitPrimaryExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitPrimaryExpr) {
			return visitor.visitPrimaryExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperandContext extends ParserRuleContext {
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public operandName(): OperandNameContext | undefined {
		return this.tryGetRuleContext(0, OperandNameContext);
	}
	public L_PAREN(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.L_PAREN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public R_PAREN(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.R_PAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_operand; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterOperand) {
			listener.enterOperand(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitOperand) {
			listener.exitOperand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitOperand) {
			return visitor.visitOperand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperandNameContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(SimpleParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_operandName; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterOperandName) {
			listener.enterOperandName(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitOperandName) {
			listener.exitOperandName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitOperandName) {
			return visitor.visitOperandName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public NIL_LIT(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.NIL_LIT, 0); }
	public DECIMAL_LIT(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.DECIMAL_LIT, 0); }
	public FLOAT_LIT(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.FLOAT_LIT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_literal; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterLiteral) {
			listener.enterLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitLiteral) {
			listener.exitLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementListContext extends ParserRuleContext {
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	public eos(): EosContext[];
	public eos(i: number): EosContext;
	public eos(i?: number): EosContext | EosContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EosContext);
		} else {
			return this.getRuleContext(i, EosContext);
		}
	}
	public SEMI(): TerminalNode[];
	public SEMI(i: number): TerminalNode;
	public SEMI(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SimpleParser.SEMI);
		} else {
			return this.getToken(SimpleParser.SEMI, i);
		}
	}
	public EOS(): TerminalNode[];
	public EOS(i: number): TerminalNode;
	public EOS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SimpleParser.EOS);
		} else {
			return this.getToken(SimpleParser.EOS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_statementList; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterStatementList) {
			listener.enterStatementList(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitStatementList) {
			listener.exitStatementList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitStatementList) {
			return visitor.visitStatementList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public forStmt(): ForStmtContext | undefined {
		return this.tryGetRuleContext(0, ForStmtContext);
	}
	public ifStmt(): IfStmtContext | undefined {
		return this.tryGetRuleContext(0, IfStmtContext);
	}
	public returnStmt(): ReturnStmtContext | undefined {
		return this.tryGetRuleContext(0, ReturnStmtContext);
	}
	public simpleStmt(): SimpleStmtContext | undefined {
		return this.tryGetRuleContext(0, SimpleStmtContext);
	}
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_statement; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpleStmtContext extends ParserRuleContext {
	public assignment(): AssignmentContext | undefined {
		return this.tryGetRuleContext(0, AssignmentContext);
	}
	public varDecl(): VarDeclContext | undefined {
		return this.tryGetRuleContext(0, VarDeclContext);
	}
	public funcDecl(): FuncDeclContext | undefined {
		return this.tryGetRuleContext(0, FuncDeclContext);
	}
	public expressionStmt(): ExpressionStmtContext | undefined {
		return this.tryGetRuleContext(0, ExpressionStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_simpleStmt; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterSimpleStmt) {
			listener.enterSimpleStmt(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitSimpleStmt) {
			listener.exitSimpleStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitSimpleStmt) {
			return visitor.visitSimpleStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionListContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SimpleParser.COMMA);
		} else {
			return this.getToken(SimpleParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_expressionList; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterExpressionList) {
			listener.enterExpressionList(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitExpressionList) {
			listener.exitExpressionList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitExpressionList) {
			return visitor.visitExpressionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EosContext extends ParserRuleContext {
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.SEMI, 0); }
	public EOF(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.EOF, 0); }
	public EOS(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.EOS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_eos; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterEos) {
			listener.enterEos(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitEos) {
			listener.exitEos(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitEos) {
			return visitor.visitEos(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierListContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SimpleParser.IDENTIFIER);
		} else {
			return this.getToken(SimpleParser.IDENTIFIER, i);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SimpleParser.COMMA);
		} else {
			return this.getToken(SimpleParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_identifierList; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterIdentifierList) {
			listener.enterIdentifierList(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitIdentifierList) {
			listener.exitIdentifierList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitIdentifierList) {
			return visitor.visitIdentifierList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfStmtContext extends ParserRuleContext {
	public IF(): TerminalNode { return this.getToken(SimpleParser.IF, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public block(): BlockContext[];
	public block(i: number): BlockContext;
	public block(i?: number): BlockContext | BlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BlockContext);
		} else {
			return this.getRuleContext(i, BlockContext);
		}
	}
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.ELSE, 0); }
	public ifStmt(): IfStmtContext | undefined {
		return this.tryGetRuleContext(0, IfStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_ifStmt; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterIfStmt) {
			listener.enterIfStmt(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitIfStmt) {
			listener.exitIfStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitIfStmt) {
			return visitor.visitIfStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnStmtContext extends ParserRuleContext {
	public RETURN(): TerminalNode { return this.getToken(SimpleParser.RETURN, 0); }
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_returnStmt; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterReturnStmt) {
			listener.enterReturnStmt(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitReturnStmt) {
			listener.exitReturnStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitReturnStmt) {
			return visitor.visitReturnStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForStmtContext extends ParserRuleContext {
	public FOR(): TerminalNode { return this.getToken(SimpleParser.FOR, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_forStmt; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterForStmt) {
			listener.enterForStmt(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitForStmt) {
			listener.exitForStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitForStmt) {
			return visitor.visitForStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


