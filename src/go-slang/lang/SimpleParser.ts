/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
	public static readonly TRUE = 26;
	public static readonly FALSE = 27;
	public static readonly MAKE = 28;
	public static readonly MUTEX = 29;
	public static readonly WAITGROUP = 30;
	public static readonly LOCK = 31;
	public static readonly UNLOCK = 32;
	public static readonly ADD = 33;
	public static readonly Done = 34;
	public static readonly WAIT = 35;
	public static readonly INT = 36;
	public static readonly BOOL = 37;
	public static readonly STRING = 38;
	public static readonly FLOAT = 39;
	public static readonly NIL_LIT = 40;
	public static readonly IDENTIFIER = 41;
	public static readonly L_PAREN = 42;
	public static readonly R_PAREN = 43;
	public static readonly L_CURLY = 44;
	public static readonly R_CURLY = 45;
	public static readonly L_BRACKET = 46;
	public static readonly R_BRACKET = 47;
	public static readonly ASSIGN = 48;
	public static readonly COMMA = 49;
	public static readonly SEMI = 50;
	public static readonly COLON = 51;
	public static readonly DOT = 52;
	public static readonly PLUS_PLUS = 53;
	public static readonly MINUS_MINUS = 54;
	public static readonly DECLARE_ASSIGN = 55;
	public static readonly ELLIPSIS = 56;
	public static readonly LOGICAL_OR = 57;
	public static readonly LOGICAL_AND = 58;
	public static readonly EQUALS = 59;
	public static readonly NOT_EQUALS = 60;
	public static readonly LESS = 61;
	public static readonly LESS_OR_EQUALS = 62;
	public static readonly GREATER = 63;
	public static readonly GREATER_OR_EQUALS = 64;
	public static readonly OR = 65;
	public static readonly DIV = 66;
	public static readonly MOD = 67;
	public static readonly LSHIFT = 68;
	public static readonly RSHIFT = 69;
	public static readonly BIT_CLEAR = 70;
	public static readonly UNDERLYING = 71;
	public static readonly EXCLAMATION = 72;
	public static readonly PLUS = 73;
	public static readonly MINUS = 74;
	public static readonly CARET = 75;
	public static readonly STAR = 76;
	public static readonly AMPERSAND = 77;
	public static readonly RECEIVE = 78;
	public static readonly DECIMAL_LIT = 79;
	public static readonly BINARY_LIT = 80;
	public static readonly OCTAL_LIT = 81;
	public static readonly HEX_LIT = 82;
	public static readonly FLOAT_LIT = 83;
	public static readonly DECIMAL_FLOAT_LIT = 84;
	public static readonly HEX_FLOAT_LIT = 85;
	public static readonly IMAGINARY_LIT = 86;
	public static readonly RUNE_LIT = 87;
	public static readonly BYTE_VALUE = 88;
	public static readonly OCTAL_BYTE_VALUE = 89;
	public static readonly HEX_BYTE_VALUE = 90;
	public static readonly LITTLE_U_VALUE = 91;
	public static readonly BIG_U_VALUE = 92;
	public static readonly RAW_STRING_LIT = 93;
	public static readonly INTERPRETED_STRING_LIT = 94;
	public static readonly WS = 95;
	public static readonly COMMENT = 96;
	public static readonly TERMINATOR = 97;
	public static readonly LINE_COMMENT = 98;
	public static readonly WS_NLSEMI = 99;
	public static readonly COMMENT_NLSEMI = 100;
	public static readonly LINE_COMMENT_NLSEMI = 101;
	public static readonly EOS = 102;
	public static readonly OTHER = 103;
	public static readonly RULE_global_scope = 0;
	public static readonly RULE_arguments = 1;
	public static readonly RULE_funcApp = 2;
	public static readonly RULE_funcDecl = 3;
	public static readonly RULE_signature = 4;
	public static readonly RULE_result = 5;
	public static readonly RULE_typeList = 6;
	public static readonly RULE_parameters = 7;
	public static readonly RULE_parameterDecl = 8;
	public static readonly RULE_block = 9;
	public static readonly RULE_varDecl = 10;
	public static readonly RULE_regVarDecl = 11;
	public static readonly RULE_varMutexDecl = 12;
	public static readonly RULE_varWaitGroupDecl = 13;
	public static readonly RULE_shortVarDecl = 14;
	public static readonly RULE_type_ = 15;
	public static readonly RULE_channelType = 16;
	public static readonly RULE_assignment = 17;
	public static readonly RULE_assign_op = 18;
	public static readonly RULE_expressionStmt = 19;
	public static readonly RULE_expression = 20;
	public static readonly RULE_primaryExpr = 21;
	public static readonly RULE_operand = 22;
	public static readonly RULE_operandName = 23;
	public static readonly RULE_literal = 24;
	public static readonly RULE_statementList = 25;
	public static readonly RULE_statement = 26;
	public static readonly RULE_simpleStmt = 27;
	public static readonly RULE_sendStmt = 28;
	public static readonly RULE_makeExpr = 29;
	public static readonly RULE_expressionList = 30;
	public static readonly RULE_eos = 31;
	public static readonly RULE_identifierList = 32;
	public static readonly RULE_ifStmt = 33;
	public static readonly RULE_returnStmt = 34;
	public static readonly RULE_forStmt = 35;
	public static readonly RULE_string_ = 36;
	public static readonly RULE_functionLit = 37;
	public static readonly RULE_goStmt = 38;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"global_scope", "arguments", "funcApp", "funcDecl", "signature", "result", 
		"typeList", "parameters", "parameterDecl", "block", "varDecl", "regVarDecl", 
		"varMutexDecl", "varWaitGroupDecl", "shortVarDecl", "type_", "channelType", 
		"assignment", "assign_op", "expressionStmt", "expression", "primaryExpr", 
		"operand", "operandName", "literal", "statementList", "statement", "simpleStmt", 
		"sendStmt", "makeExpr", "expressionList", "eos", "identifierList", "ifStmt", 
		"returnStmt", "forStmt", "string_", "functionLit", "goStmt",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'break'", "'default'", "'func'", "'interface'", "'select'", 
		"'case'", "'defer'", "'go'", "'map'", "'struct'", "'chan'", "'else'", 
		"'goto'", "'package'", "'switch'", "'const'", "'fallthrough'", "'if'", 
		"'range'", "'type'", "'continue'", "'for'", "'import'", "'return'", "'var'", 
		"'true'", "'false'", "'make'", "'Mutex'", "'WaitGroup'", "'Lock'", "'Unlock'", 
		"'Add'", "'Done'", "'Wait'", "'int'", "'bool'", "'string'", "'float'", 
		"'nil'", undefined, "'('", "')'", "'{'", "'}'", "'['", "']'", "'='", "','", 
		"';'", "':'", "'.'", "'++'", "'--'", "':='", "'...'", "'||'", "'&&'", 
		"'=='", "'!='", "'<'", "'<='", "'>'", "'>='", "'|'", "'/'", "'%'", "'<<'", 
		"'>>'", "'&^'", "'~'", "'!'", "'+'", "'-'", "'^'", "'*'", "'&'", "'<-'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "BREAK", "DEFAULT", "FUNC", "INTERFACE", "SELECT", "CASE", 
		"DEFER", "GO", "MAP", "STRUCT", "CHAN", "ELSE", "GOTO", "PACKAGE", "SWITCH", 
		"CONST", "FALLTHROUGH", "IF", "RANGE", "TYPE", "CONTINUE", "FOR", "IMPORT", 
		"RETURN", "VAR", "TRUE", "FALSE", "MAKE", "MUTEX", "WAITGROUP", "LOCK", 
		"UNLOCK", "ADD", "Done", "WAIT", "INT", "BOOL", "STRING", "FLOAT", "NIL_LIT", 
		"IDENTIFIER", "L_PAREN", "R_PAREN", "L_CURLY", "R_CURLY", "L_BRACKET", 
		"R_BRACKET", "ASSIGN", "COMMA", "SEMI", "COLON", "DOT", "PLUS_PLUS", "MINUS_MINUS", 
		"DECLARE_ASSIGN", "ELLIPSIS", "LOGICAL_OR", "LOGICAL_AND", "EQUALS", "NOT_EQUALS", 
		"LESS", "LESS_OR_EQUALS", "GREATER", "GREATER_OR_EQUALS", "OR", "DIV", 
		"MOD", "LSHIFT", "RSHIFT", "BIT_CLEAR", "UNDERLYING", "EXCLAMATION", "PLUS", 
		"MINUS", "CARET", "STAR", "AMPERSAND", "RECEIVE", "DECIMAL_LIT", "BINARY_LIT", 
		"OCTAL_LIT", "HEX_LIT", "FLOAT_LIT", "DECIMAL_FLOAT_LIT", "HEX_FLOAT_LIT", 
		"IMAGINARY_LIT", "RUNE_LIT", "BYTE_VALUE", "OCTAL_BYTE_VALUE", "HEX_BYTE_VALUE", 
		"LITTLE_U_VALUE", "BIG_U_VALUE", "RAW_STRING_LIT", "INTERPRETED_STRING_LIT", 
		"WS", "COMMENT", "TERMINATOR", "LINE_COMMENT", "WS_NLSEMI", "COMMENT_NLSEMI", 
		"LINE_COMMENT_NLSEMI", "EOS", "OTHER",
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
			this.state = 86;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SimpleParser.FUNC || _la === SimpleParser.VAR) {
				{
				{
				this.state = 80;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SimpleParser.VAR:
					{
					this.state = 78;
					this.varDecl();
					}
					break;
				case SimpleParser.FUNC:
					{
					this.state = 79;
					this.funcDecl();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 82;
				this.eos();
				}
				}
				this.state = 88;
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
			this.state = 89;
			this.match(SimpleParser.L_PAREN);
			this.state = 91;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SimpleParser.FUNC) | (1 << SimpleParser.TRUE) | (1 << SimpleParser.FALSE) | (1 << SimpleParser.MAKE))) !== 0) || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & ((1 << (SimpleParser.NIL_LIT - 40)) | (1 << (SimpleParser.IDENTIFIER - 40)) | (1 << (SimpleParser.L_PAREN - 40)))) !== 0) || ((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & ((1 << (SimpleParser.EXCLAMATION - 72)) | (1 << (SimpleParser.MINUS - 72)) | (1 << (SimpleParser.RECEIVE - 72)) | (1 << (SimpleParser.DECIMAL_LIT - 72)) | (1 << (SimpleParser.FLOAT_LIT - 72)) | (1 << (SimpleParser.RAW_STRING_LIT - 72)) | (1 << (SimpleParser.INTERPRETED_STRING_LIT - 72)))) !== 0)) {
				{
				this.state = 90;
				this.expressionList();
				}
			}

			this.state = 93;
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
			this.state = 100;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 95;
				this.match(SimpleParser.IDENTIFIER);
				this.state = 96;
				this.arguments();
				}
				break;
			case SimpleParser.FUNC:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 97;
				this.functionLit();
				this.state = 98;
				this.arguments();
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
	public funcDecl(): FuncDeclContext {
		let _localctx: FuncDeclContext = new FuncDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, SimpleParser.RULE_funcDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 102;
			this.match(SimpleParser.FUNC);
			this.state = 103;
			this.match(SimpleParser.IDENTIFIER);
			this.state = 104;
			this.signature();
			this.state = 105;
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
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 107;
			this.match(SimpleParser.L_PAREN);
			this.state = 108;
			this.parameters();
			this.state = 109;
			this.match(SimpleParser.R_PAREN);
			this.state = 111;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 11)) & ~0x1F) === 0 && ((1 << (_la - 11)) & ((1 << (SimpleParser.CHAN - 11)) | (1 << (SimpleParser.INT - 11)) | (1 << (SimpleParser.BOOL - 11)) | (1 << (SimpleParser.STRING - 11)) | (1 << (SimpleParser.FLOAT - 11)) | (1 << (SimpleParser.L_PAREN - 11)))) !== 0)) {
				{
				this.state = 110;
				this.result();
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
	public result(): ResultContext {
		let _localctx: ResultContext = new ResultContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, SimpleParser.RULE_result);
		try {
			this.state = 118;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.L_PAREN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 113;
				this.match(SimpleParser.L_PAREN);
				this.state = 114;
				this.typeList();
				this.state = 115;
				this.match(SimpleParser.R_PAREN);
				}
				break;
			case SimpleParser.CHAN:
			case SimpleParser.INT:
			case SimpleParser.BOOL:
			case SimpleParser.STRING:
			case SimpleParser.FLOAT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 117;
				this.type_();
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
	public typeList(): TypeListContext {
		let _localctx: TypeListContext = new TypeListContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, SimpleParser.RULE_typeList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 122;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.CHAN:
			case SimpleParser.INT:
			case SimpleParser.BOOL:
			case SimpleParser.STRING:
			case SimpleParser.FLOAT:
				{
				this.state = 120;
				this.type_();
				}
				break;
			case SimpleParser.NIL_LIT:
				{
				this.state = 121;
				this.match(SimpleParser.NIL_LIT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 131;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SimpleParser.COMMA) {
				{
				{
				this.state = 124;
				this.match(SimpleParser.COMMA);
				this.state = 127;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SimpleParser.CHAN:
				case SimpleParser.INT:
				case SimpleParser.BOOL:
				case SimpleParser.STRING:
				case SimpleParser.FLOAT:
					{
					this.state = 125;
					this.type_();
					}
					break;
				case SimpleParser.NIL_LIT:
					{
					this.state = 126;
					this.match(SimpleParser.NIL_LIT);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 133;
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
	public parameters(): ParametersContext {
		let _localctx: ParametersContext = new ParametersContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, SimpleParser.RULE_parameters);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 145;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 11, this._ctx) ) {
			case 1:
				{
				this.state = 134;
				this.parameterDecl();
				this.state = 139;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 135;
						this.match(SimpleParser.COMMA);
						this.state = 136;
						this.parameterDecl();
						}
						}
					}
					this.state = 141;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
				}
				this.state = 143;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SimpleParser.COMMA) {
					{
					this.state = 142;
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
		this.enterRule(_localctx, 16, SimpleParser.RULE_parameterDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 150;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SimpleParser.IDENTIFIER) {
				{
				this.state = 147;
				this.identifierList();
				this.state = 148;
				this.type_();
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
		this.enterRule(_localctx, 18, SimpleParser.RULE_block);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 152;
			this.match(SimpleParser.L_CURLY);
			this.state = 154;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				{
				this.state = 153;
				this.statementList();
				}
				break;
			}
			this.state = 156;
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
		this.enterRule(_localctx, 20, SimpleParser.RULE_varDecl);
		try {
			this.state = 161;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 158;
				this.varMutexDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 159;
				this.varWaitGroupDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 160;
				this.regVarDecl();
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
	public regVarDecl(): RegVarDeclContext {
		let _localctx: RegVarDeclContext = new RegVarDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, SimpleParser.RULE_regVarDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 163;
			this.match(SimpleParser.VAR);
			this.state = 164;
			this.identifierList();
			this.state = 165;
			this.type_();
			this.state = 168;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 15, this._ctx) ) {
			case 1:
				{
				this.state = 166;
				this.match(SimpleParser.ASSIGN);
				this.state = 167;
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
	public varMutexDecl(): VarMutexDeclContext {
		let _localctx: VarMutexDeclContext = new VarMutexDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, SimpleParser.RULE_varMutexDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 170;
			this.match(SimpleParser.VAR);
			this.state = 171;
			this.identifierList();
			this.state = 172;
			this.match(SimpleParser.MUTEX);
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
	public varWaitGroupDecl(): VarWaitGroupDeclContext {
		let _localctx: VarWaitGroupDeclContext = new VarWaitGroupDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, SimpleParser.RULE_varWaitGroupDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 174;
			this.match(SimpleParser.VAR);
			this.state = 175;
			this.identifierList();
			this.state = 176;
			this.match(SimpleParser.WAITGROUP);
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
	public shortVarDecl(): ShortVarDeclContext {
		let _localctx: ShortVarDeclContext = new ShortVarDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, SimpleParser.RULE_shortVarDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 178;
			this.identifierList();
			this.state = 179;
			this.type_();
			this.state = 180;
			this.match(SimpleParser.DECLARE_ASSIGN);
			this.state = 181;
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
	public type_(): Type_Context {
		let _localctx: Type_Context = new Type_Context(this._ctx, this.state);
		this.enterRule(_localctx, 30, SimpleParser.RULE_type_);
		try {
			this.state = 188;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.INT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 183;
				this.match(SimpleParser.INT);
				}
				break;
			case SimpleParser.BOOL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 184;
				this.match(SimpleParser.BOOL);
				}
				break;
			case SimpleParser.STRING:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 185;
				this.match(SimpleParser.STRING);
				}
				break;
			case SimpleParser.FLOAT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 186;
				this.match(SimpleParser.FLOAT);
				}
				break;
			case SimpleParser.CHAN:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 187;
				this.channelType();
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
	public channelType(): ChannelTypeContext {
		let _localctx: ChannelTypeContext = new ChannelTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, SimpleParser.RULE_channelType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 190;
			this.match(SimpleParser.CHAN);
			this.state = 191;
			this.type_();
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
		this.enterRule(_localctx, 34, SimpleParser.RULE_assignment);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 193;
			this.identifierList();
			this.state = 194;
			this.assign_op();
			this.state = 195;
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
		this.enterRule(_localctx, 36, SimpleParser.RULE_assign_op);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 197;
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
		this.enterRule(_localctx, 38, SimpleParser.RULE_expressionStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 199;
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
		let _startState: number = 40;
		this.enterRecursionRule(_localctx, 40, SimpleParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 209;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				{
				_localctx = new MAKEOPContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 202;
				this.makeExpr();
				}
				break;

			case 2:
				{
				_localctx = new FUNCAPPContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 203;
				this.funcApp();
				}
				break;

			case 3:
				{
				_localctx = new UNARYOPContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 204;
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
				this.state = 205;
				this.expression(8);
				}
				break;

			case 4:
				{
				_localctx = new PRIMARYContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 206;
				this.primaryExpr();
				}
				break;

			case 5:
				{
				_localctx = new RECVOPContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 207;
				this.match(SimpleParser.RECEIVE);
				this.state = 208;
				this.expression(1);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 228;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 226;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
					case 1:
						{
						_localctx = new BINOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 211;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 212;
						(_localctx as BINOPContext)._bin_op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (SimpleParser.DIV - 66)) | (1 << (SimpleParser.MOD - 66)) | (1 << (SimpleParser.STAR - 66)))) !== 0))) {
							(_localctx as BINOPContext)._bin_op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 213;
						this.expression(8);
						}
						break;

					case 2:
						{
						_localctx = new BINOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 214;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 215;
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
						this.state = 216;
						this.expression(7);
						}
						break;

					case 3:
						{
						_localctx = new RELOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 217;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 218;
						(_localctx as RELOPContext)._rel_op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & ((1 << (SimpleParser.EQUALS - 59)) | (1 << (SimpleParser.NOT_EQUALS - 59)) | (1 << (SimpleParser.LESS - 59)) | (1 << (SimpleParser.LESS_OR_EQUALS - 59)) | (1 << (SimpleParser.GREATER - 59)) | (1 << (SimpleParser.GREATER_OR_EQUALS - 59)))) !== 0))) {
							(_localctx as RELOPContext)._rel_op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 219;
						this.expression(6);
						}
						break;

					case 4:
						{
						_localctx = new LOGOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 220;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 221;
						this.match(SimpleParser.LOGICAL_AND);
						this.state = 222;
						this.expression(5);
						}
						break;

					case 5:
						{
						_localctx = new LOGOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 223;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 224;
						this.match(SimpleParser.LOGICAL_OR);
						this.state = 225;
						this.expression(4);
						}
						break;
					}
					}
				}
				this.state = 230;
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
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primaryExpr(): PrimaryExprContext {
		let _localctx: PrimaryExprContext = new PrimaryExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, SimpleParser.RULE_primaryExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 231;
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
		this.enterRule(_localctx, 44, SimpleParser.RULE_operand);
		try {
			this.state = 239;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.FUNC:
			case SimpleParser.TRUE:
			case SimpleParser.FALSE:
			case SimpleParser.NIL_LIT:
			case SimpleParser.DECIMAL_LIT:
			case SimpleParser.FLOAT_LIT:
			case SimpleParser.RAW_STRING_LIT:
			case SimpleParser.INTERPRETED_STRING_LIT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 233;
				this.literal();
				}
				break;
			case SimpleParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 234;
				this.operandName();
				}
				break;
			case SimpleParser.L_PAREN:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 235;
				this.match(SimpleParser.L_PAREN);
				this.state = 236;
				this.expression(0);
				this.state = 237;
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
		this.enterRule(_localctx, 46, SimpleParser.RULE_operandName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 241;
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
		this.enterRule(_localctx, 48, SimpleParser.RULE_literal);
		try {
			this.state = 250;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.NIL_LIT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 243;
				this.match(SimpleParser.NIL_LIT);
				}
				break;
			case SimpleParser.DECIMAL_LIT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 244;
				this.match(SimpleParser.DECIMAL_LIT);
				}
				break;
			case SimpleParser.FLOAT_LIT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 245;
				this.match(SimpleParser.FLOAT_LIT);
				}
				break;
			case SimpleParser.TRUE:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 246;
				this.match(SimpleParser.TRUE);
				}
				break;
			case SimpleParser.FALSE:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 247;
				this.match(SimpleParser.FALSE);
				}
				break;
			case SimpleParser.RAW_STRING_LIT:
			case SimpleParser.INTERPRETED_STRING_LIT:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 248;
				this.string_();
				}
				break;
			case SimpleParser.FUNC:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 249;
				this.functionLit();
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
	public statementList(): StatementListContext {
		let _localctx: StatementListContext = new StatementListContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, SimpleParser.RULE_statementList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 264;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 259;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
					case 1:
						{
						this.state = 253;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === SimpleParser.SEMI) {
							{
							this.state = 252;
							this.match(SimpleParser.SEMI);
							}
						}

						}
						break;

					case 2:
						{
						this.state = 256;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === SimpleParser.EOS) {
							{
							this.state = 255;
							this.match(SimpleParser.EOS);
							}
						}

						}
						break;

					case 3:
						{
						this.state = 258;
						if (!(this.closingBracket())) {
							throw this.createFailedPredicateException("this.closingBracket()");
						}
						}
						break;
					}
					this.state = 261;
					this.statement();
					this.state = 262;
					this.eos();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 266;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 25, this._ctx);
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
		this.enterRule(_localctx, 52, SimpleParser.RULE_statement);
		try {
			this.state = 274;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.FOR:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 268;
				this.forStmt();
				}
				break;
			case SimpleParser.IF:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 269;
				this.ifStmt();
				}
				break;
			case SimpleParser.RETURN:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 270;
				this.returnStmt();
				}
				break;
			case SimpleParser.FUNC:
			case SimpleParser.VAR:
			case SimpleParser.TRUE:
			case SimpleParser.FALSE:
			case SimpleParser.MAKE:
			case SimpleParser.NIL_LIT:
			case SimpleParser.IDENTIFIER:
			case SimpleParser.L_PAREN:
			case SimpleParser.EXCLAMATION:
			case SimpleParser.MINUS:
			case SimpleParser.RECEIVE:
			case SimpleParser.DECIMAL_LIT:
			case SimpleParser.FLOAT_LIT:
			case SimpleParser.RAW_STRING_LIT:
			case SimpleParser.INTERPRETED_STRING_LIT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 271;
				this.simpleStmt();
				}
				break;
			case SimpleParser.L_CURLY:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 272;
				this.block();
				}
				break;
			case SimpleParser.GO:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 273;
				this.goStmt();
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
		this.enterRule(_localctx, 54, SimpleParser.RULE_simpleStmt);
		try {
			this.state = 282;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 27, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 276;
				this.assignment();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 277;
				this.sendStmt();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 278;
				this.varDecl();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 279;
				this.funcDecl();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 280;
				this.expressionStmt();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 281;
				this.shortVarDecl();
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
	public sendStmt(): SendStmtContext {
		let _localctx: SendStmtContext = new SendStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, SimpleParser.RULE_sendStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 284;
			_localctx._channel = this.expression(0);
			this.state = 285;
			this.match(SimpleParser.RECEIVE);
			this.state = 286;
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
	// @RuleVersion(0)
	public makeExpr(): MakeExprContext {
		let _localctx: MakeExprContext = new MakeExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, SimpleParser.RULE_makeExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 288;
			this.match(SimpleParser.MAKE);
			this.state = 289;
			this.match(SimpleParser.L_PAREN);
			this.state = 290;
			this.channelType();
			this.state = 293;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SimpleParser.COMMA) {
				{
				this.state = 291;
				this.match(SimpleParser.COMMA);
				this.state = 292;
				this.match(SimpleParser.DECIMAL_LIT);
				}
			}

			this.state = 295;
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
	public expressionList(): ExpressionListContext {
		let _localctx: ExpressionListContext = new ExpressionListContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, SimpleParser.RULE_expressionList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 297;
			this.expression(0);
			this.state = 302;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 29, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 298;
					this.match(SimpleParser.COMMA);
					this.state = 299;
					this.expression(0);
					}
					}
				}
				this.state = 304;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 29, this._ctx);
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
		this.enterRule(_localctx, 62, SimpleParser.RULE_eos);
		try {
			this.state = 309;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 305;
				this.match(SimpleParser.SEMI);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 306;
				this.match(SimpleParser.EOF);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 307;
				this.match(SimpleParser.EOS);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 308;
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
		this.enterRule(_localctx, 64, SimpleParser.RULE_identifierList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 311;
			this.match(SimpleParser.IDENTIFIER);
			this.state = 316;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SimpleParser.COMMA) {
				{
				{
				this.state = 312;
				this.match(SimpleParser.COMMA);
				this.state = 313;
				this.match(SimpleParser.IDENTIFIER);
				}
				}
				this.state = 318;
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
	public ifStmt(): IfStmtContext {
		let _localctx: IfStmtContext = new IfStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, SimpleParser.RULE_ifStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 319;
			this.match(SimpleParser.IF);
			this.state = 320;
			this.expression(0);
			this.state = 321;
			this.block();
			this.state = 327;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				{
				this.state = 322;
				this.match(SimpleParser.ELSE);
				this.state = 325;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SimpleParser.IF:
					{
					this.state = 323;
					this.ifStmt();
					}
					break;
				case SimpleParser.L_CURLY:
					{
					this.state = 324;
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
		this.enterRule(_localctx, 68, SimpleParser.RULE_returnStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 329;
			this.match(SimpleParser.RETURN);
			this.state = 331;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				{
				this.state = 330;
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
		this.enterRule(_localctx, 70, SimpleParser.RULE_forStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 333;
			this.match(SimpleParser.FOR);
			this.state = 334;
			this.expression(0);
			this.state = 335;
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
	public string_(): String_Context {
		let _localctx: String_Context = new String_Context(this._ctx, this.state);
		this.enterRule(_localctx, 72, SimpleParser.RULE_string_);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 337;
			_la = this._input.LA(1);
			if (!(_la === SimpleParser.RAW_STRING_LIT || _la === SimpleParser.INTERPRETED_STRING_LIT)) {
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
	public functionLit(): FunctionLitContext {
		let _localctx: FunctionLitContext = new FunctionLitContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, SimpleParser.RULE_functionLit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 339;
			this.match(SimpleParser.FUNC);
			this.state = 340;
			this.signature();
			this.state = 341;
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
	public goStmt(): GoStmtContext {
		let _localctx: GoStmtContext = new GoStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, SimpleParser.RULE_goStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 343;
			this.match(SimpleParser.GO);
			this.state = 344;
			this.funcApp();
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
		case 20:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);

		case 25:
			return this.statementList_sempred(_localctx as StatementListContext, predIndex);

		case 31:
			return this.eos_sempred(_localctx as EosContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 7);

		case 1:
			return this.precpred(this._ctx, 6);

		case 2:
			return this.precpred(this._ctx, 5);

		case 3:
			return this.precpred(this._ctx, 4);

		case 4:
			return this.precpred(this._ctx, 3);
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03i\u015D\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x03\x02\x03\x02\x05\x02" +
		"S\n\x02\x03\x02\x03\x02\x07\x02W\n\x02\f\x02\x0E\x02Z\v\x02\x03\x03\x03" +
		"\x03\x05\x03^\n\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x05\x04g\n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x06\x03" +
		"\x06\x03\x06\x03\x06\x05\x06r\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03" +
		"\x07\x05\x07y\n\x07\x03\b\x03\b\x05\b}\n\b\x03\b\x03\b\x03\b\x05\b\x82" +
		"\n\b\x07\b\x84\n\b\f\b\x0E\b\x87\v\b\x03\t\x03\t\x03\t\x07\t\x8C\n\t\f" +
		"\t\x0E\t\x8F\v\t\x03\t\x05\t\x92\n\t\x05\t\x94\n\t\x03\n\x03\n\x03\n\x05" +
		"\n\x99\n\n\x03\v\x03\v\x05\v\x9D\n\v\x03\v\x03\v\x03\f\x03\f\x03\f\x05" +
		"\f\xA4\n\f\x03\r\x03\r\x03\r\x03\r\x03\r\x05\r\xAB\n\r\x03\x0E\x03\x0E" +
		"\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10" +
		"\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\xBF\n" +
		"\x11\x03\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x14\x03" +
		"\x14\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x05\x16\xD4\n\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16" +
		"\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16" +
		"\x03\x16\x07\x16\xE5\n\x16\f\x16\x0E\x16\xE8\v\x16\x03\x17\x03\x17\x03" +
		"\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x05\x18\xF2\n\x18\x03\x19" +
		"\x03\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x05\x1A" +
		"\xFD\n\x1A\x03\x1B\x05\x1B\u0100\n\x1B\x03\x1B\x05\x1B\u0103\n\x1B\x03" +
		"\x1B\x05\x1B\u0106\n\x1B\x03\x1B\x03\x1B\x03\x1B\x06\x1B\u010B\n\x1B\r" +
		"\x1B\x0E\x1B\u010C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x05" +
		"\x1C\u0115\n\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D" +
		"\u011D\n\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x03\x1F\x03" +
		"\x1F\x03\x1F\x05\x1F\u0128\n\x1F\x03\x1F\x03\x1F\x03 \x03 \x03 \x07 \u012F" +
		"\n \f \x0E \u0132\v \x03!\x03!\x03!\x03!\x05!\u0138\n!\x03\"\x03\"\x03" +
		"\"\x07\"\u013D\n\"\f\"\x0E\"\u0140\v\"\x03#\x03#\x03#\x03#\x03#\x03#\x05" +
		"#\u0148\n#\x05#\u014A\n#\x03$\x03$\x05$\u014E\n$\x03%\x03%\x03%\x03%\x03" +
		"&\x03&\x03\'\x03\'\x03\'\x03\'\x03(\x03(\x03(\x03(\x02\x02\x03*)\x02\x02" +
		"\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16" +
		"\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02" +
		".\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02" +
		"J\x02L\x02N\x02\x02\x07\x04\x02JJLL\x04\x02DENN\x03\x02KL\x03\x02=B\x03" +
		"\x02_`\x02\u0173\x02X\x03\x02\x02\x02\x04[\x03\x02\x02\x02\x06f\x03\x02" +
		"\x02\x02\bh\x03\x02\x02\x02\nm\x03\x02\x02\x02\fx\x03\x02\x02\x02\x0E" +
		"|\x03\x02\x02\x02\x10\x93\x03\x02\x02\x02\x12\x98\x03\x02\x02\x02\x14" +
		"\x9A\x03\x02\x02\x02\x16\xA3\x03\x02\x02\x02\x18\xA5\x03\x02\x02\x02\x1A" +
		"\xAC\x03\x02\x02\x02\x1C\xB0\x03\x02\x02\x02\x1E\xB4\x03\x02\x02\x02 " +
		"\xBE\x03\x02\x02\x02\"\xC0\x03\x02\x02\x02$\xC3\x03\x02\x02\x02&\xC7\x03" +
		"\x02\x02\x02(\xC9\x03\x02\x02\x02*\xD3\x03\x02\x02\x02,\xE9\x03\x02\x02" +
		"\x02.\xF1\x03\x02\x02\x020\xF3\x03\x02\x02\x022\xFC\x03\x02\x02\x024\u010A" +
		"\x03\x02\x02\x026\u0114\x03\x02\x02\x028\u011C\x03\x02\x02\x02:\u011E" +
		"\x03\x02\x02\x02<\u0122\x03\x02\x02\x02>\u012B\x03\x02\x02\x02@\u0137" +
		"\x03\x02\x02\x02B\u0139\x03\x02\x02\x02D\u0141\x03\x02\x02\x02F\u014B" +
		"\x03\x02\x02\x02H\u014F\x03\x02\x02\x02J\u0153\x03\x02\x02\x02L\u0155" +
		"\x03\x02\x02\x02N\u0159\x03\x02\x02\x02PS\x05\x16\f\x02QS\x05\b\x05\x02" +
		"RP\x03\x02\x02\x02RQ\x03\x02\x02\x02ST\x03\x02\x02\x02TU\x05@!\x02UW\x03" +
		"\x02\x02\x02VR\x03\x02\x02\x02WZ\x03\x02\x02\x02XV\x03\x02\x02\x02XY\x03" +
		"\x02\x02\x02Y\x03\x03\x02\x02\x02ZX\x03\x02\x02\x02[]\x07,\x02\x02\\^" +
		"\x05> \x02]\\\x03\x02\x02\x02]^\x03\x02\x02\x02^_\x03\x02\x02\x02_`\x07" +
		"-\x02\x02`\x05\x03\x02\x02\x02ab\x07+\x02\x02bg\x05\x04\x03\x02cd\x05" +
		"L\'\x02de\x05\x04\x03\x02eg\x03\x02\x02\x02fa\x03\x02\x02\x02fc\x03\x02" +
		"\x02\x02g\x07\x03\x02\x02\x02hi\x07\x05\x02\x02ij\x07+\x02\x02jk\x05\n" +
		"\x06\x02kl\x05\x14\v\x02l\t\x03\x02\x02\x02mn\x07,\x02\x02no\x05\x10\t" +
		"\x02oq\x07-\x02\x02pr\x05\f\x07\x02qp\x03\x02\x02\x02qr\x03\x02\x02\x02" +
		"r\v\x03\x02\x02\x02st\x07,\x02\x02tu\x05\x0E\b\x02uv\x07-\x02\x02vy\x03" +
		"\x02\x02\x02wy\x05 \x11\x02xs\x03\x02\x02\x02xw\x03\x02\x02\x02y\r\x03" +
		"\x02\x02\x02z}\x05 \x11\x02{}\x07*\x02\x02|z\x03\x02\x02\x02|{\x03\x02" +
		"\x02\x02}\x85\x03\x02\x02\x02~\x81\x073\x02\x02\x7F\x82\x05 \x11\x02\x80" +
		"\x82\x07*\x02\x02\x81\x7F\x03\x02\x02\x02\x81\x80\x03\x02\x02\x02\x82" +
		"\x84\x03\x02\x02\x02\x83~\x03\x02\x02\x02\x84\x87\x03\x02\x02\x02\x85" +
		"\x83\x03\x02\x02\x02\x85\x86\x03\x02\x02\x02\x86\x0F\x03\x02\x02\x02\x87" +
		"\x85\x03\x02\x02\x02\x88\x8D\x05\x12\n\x02\x89\x8A\x073\x02\x02\x8A\x8C" +
		"\x05\x12\n\x02\x8B\x89\x03\x02\x02\x02\x8C\x8F\x03\x02\x02\x02\x8D\x8B" +
		"\x03\x02\x02\x02\x8D\x8E\x03\x02\x02\x02\x8E\x91\x03\x02\x02\x02\x8F\x8D" +
		"\x03\x02\x02\x02\x90\x92\x073\x02\x02\x91\x90\x03\x02\x02\x02\x91\x92" +
		"\x03\x02\x02\x02\x92\x94\x03\x02\x02\x02\x93\x88\x03\x02\x02\x02\x93\x94" +
		"\x03\x02\x02\x02\x94\x11\x03\x02\x02\x02\x95\x96\x05B\"\x02\x96\x97\x05" +
		" \x11\x02\x97\x99\x03\x02\x02\x02\x98\x95\x03\x02\x02\x02\x98\x99\x03" +
		"\x02\x02\x02\x99\x13\x03\x02\x02\x02\x9A\x9C\x07.\x02\x02\x9B\x9D\x05" +
		"4\x1B\x02\x9C\x9B\x03\x02\x02\x02\x9C\x9D\x03\x02\x02\x02\x9D\x9E\x03" +
		"\x02\x02\x02\x9E\x9F\x07/\x02\x02\x9F\x15\x03\x02\x02\x02\xA0\xA4\x05" +
		"\x1A\x0E\x02\xA1\xA4\x05\x1C\x0F\x02\xA2\xA4\x05\x18\r\x02\xA3\xA0\x03" +
		"\x02\x02\x02\xA3\xA1\x03\x02\x02\x02\xA3\xA2\x03\x02\x02\x02\xA4\x17\x03" +
		"\x02\x02\x02\xA5\xA6\x07\x1B\x02\x02\xA6\xA7\x05B\"\x02\xA7\xAA\x05 \x11" +
		"\x02\xA8\xA9\x072\x02\x02\xA9\xAB\x05> \x02\xAA\xA8\x03\x02\x02\x02\xAA" +
		"\xAB\x03\x02\x02\x02\xAB\x19\x03\x02\x02\x02\xAC\xAD\x07\x1B\x02\x02\xAD" +
		"\xAE\x05B\"\x02\xAE\xAF\x07\x1F\x02\x02\xAF\x1B\x03\x02\x02\x02\xB0\xB1" +
		"\x07\x1B\x02\x02\xB1\xB2\x05B\"\x02\xB2\xB3\x07 \x02\x02\xB3\x1D\x03\x02" +
		"\x02\x02\xB4\xB5\x05B\"\x02\xB5\xB6\x05 \x11\x02\xB6\xB7\x079\x02\x02" +
		"\xB7\xB8\x05> \x02\xB8\x1F\x03\x02\x02\x02\xB9\xBF\x07&\x02\x02\xBA\xBF" +
		"\x07\'\x02\x02\xBB\xBF\x07(\x02\x02\xBC\xBF\x07)\x02\x02\xBD\xBF\x05\"" +
		"\x12\x02\xBE\xB9\x03\x02\x02\x02\xBE\xBA\x03\x02\x02\x02\xBE\xBB\x03\x02" +
		"\x02\x02\xBE\xBC\x03\x02\x02\x02\xBE\xBD\x03\x02\x02\x02\xBF!\x03\x02" +
		"\x02\x02\xC0\xC1\x07\r\x02\x02\xC1\xC2\x05 \x11\x02\xC2#\x03\x02\x02\x02" +
		"\xC3\xC4\x05B\"\x02\xC4\xC5\x05&\x14\x02\xC5\xC6\x05> \x02\xC6%\x03\x02" +
		"\x02\x02\xC7\xC8\x072\x02\x02\xC8\'\x03\x02\x02\x02\xC9\xCA\x05*\x16\x02" +
		"\xCA)\x03\x02\x02\x02\xCB\xCC\b\x16\x01\x02\xCC\xD4\x05<\x1F\x02\xCD\xD4" +
		"\x05\x06\x04\x02\xCE\xCF\t\x02\x02\x02\xCF\xD4\x05*\x16\n\xD0\xD4\x05" +
		",\x17\x02\xD1\xD2\x07P\x02\x02\xD2\xD4\x05*\x16\x03\xD3\xCB\x03\x02\x02" +
		"\x02\xD3\xCD\x03\x02\x02\x02\xD3\xCE\x03\x02\x02\x02\xD3\xD0\x03\x02\x02" +
		"\x02\xD3\xD1\x03\x02\x02\x02\xD4\xE6\x03\x02\x02\x02\xD5\xD6\f\t\x02\x02" +
		"\xD6\xD7\t\x03\x02\x02\xD7\xE5\x05*\x16\n\xD8\xD9\f\b\x02\x02\xD9\xDA" +
		"\t\x04\x02\x02\xDA\xE5\x05*\x16\t\xDB\xDC\f\x07\x02\x02\xDC\xDD\t\x05" +
		"\x02\x02\xDD\xE5\x05*\x16\b\xDE\xDF\f\x06\x02\x02\xDF\xE0\x07<\x02\x02" +
		"\xE0\xE5\x05*\x16\x07\xE1\xE2\f\x05\x02\x02\xE2\xE3\x07;\x02\x02\xE3\xE5" +
		"\x05*\x16\x06\xE4\xD5\x03\x02\x02\x02\xE4\xD8\x03\x02\x02\x02\xE4\xDB" +
		"\x03\x02\x02\x02\xE4\xDE\x03\x02\x02\x02\xE4\xE1\x03\x02\x02\x02\xE5\xE8" +
		"\x03\x02\x02\x02\xE6\xE4\x03\x02\x02\x02\xE6\xE7\x03\x02\x02\x02\xE7+" +
		"\x03\x02\x02\x02\xE8\xE6\x03\x02\x02\x02\xE9\xEA\x05.\x18\x02\xEA-\x03" +
		"\x02\x02\x02\xEB\xF2\x052\x1A\x02\xEC\xF2\x050\x19\x02\xED\xEE\x07,\x02" +
		"\x02\xEE\xEF\x05*\x16\x02\xEF\xF0\x07-\x02\x02\xF0\xF2\x03\x02\x02\x02" +
		"\xF1\xEB\x03\x02\x02\x02\xF1\xEC\x03\x02\x02\x02\xF1\xED\x03\x02\x02\x02" +
		"\xF2/\x03\x02\x02\x02\xF3\xF4\x07+\x02\x02\xF41\x03\x02\x02\x02\xF5\xFD" +
		"\x07*\x02\x02\xF6\xFD\x07Q\x02\x02\xF7\xFD\x07U\x02\x02\xF8\xFD\x07\x1C" +
		"\x02\x02\xF9\xFD\x07\x1D\x02\x02\xFA\xFD\x05J&\x02\xFB\xFD\x05L\'\x02" +
		"\xFC\xF5\x03\x02\x02\x02\xFC\xF6\x03\x02\x02\x02\xFC\xF7\x03\x02\x02\x02" +
		"\xFC\xF8\x03\x02\x02\x02\xFC\xF9\x03\x02\x02\x02\xFC\xFA\x03\x02\x02\x02" +
		"\xFC\xFB\x03\x02\x02\x02\xFD3\x03\x02\x02\x02\xFE\u0100\x074\x02\x02\xFF" +
		"\xFE\x03\x02\x02\x02\xFF\u0100\x03\x02\x02\x02\u0100\u0106\x03\x02\x02" +
		"\x02\u0101\u0103\x07h\x02\x02\u0102\u0101\x03\x02\x02\x02\u0102\u0103" +
		"\x03\x02\x02\x02\u0103\u0106\x03\x02\x02\x02\u0104\u0106\x06\x1B\x07\x02" +
		"\u0105\xFF\x03\x02\x02\x02\u0105\u0102\x03\x02\x02\x02\u0105\u0104\x03" +
		"\x02\x02\x02\u0106\u0107\x03\x02\x02\x02\u0107\u0108\x056\x1C\x02\u0108" +
		"\u0109\x05@!\x02\u0109\u010B\x03\x02\x02\x02\u010A\u0105\x03\x02\x02\x02" +
		"\u010B\u010C\x03\x02\x02\x02\u010C\u010A\x03\x02\x02\x02\u010C\u010D\x03" +
		"\x02\x02\x02\u010D5\x03\x02\x02\x02\u010E\u0115\x05H%\x02\u010F\u0115" +
		"\x05D#\x02\u0110\u0115\x05F$\x02\u0111\u0115\x058\x1D\x02\u0112\u0115" +
		"\x05\x14\v\x02\u0113\u0115\x05N(\x02\u0114\u010E\x03\x02\x02\x02\u0114" +
		"\u010F\x03\x02\x02\x02\u0114\u0110\x03\x02\x02\x02\u0114\u0111\x03\x02" +
		"\x02\x02\u0114\u0112\x03\x02\x02\x02\u0114\u0113\x03\x02\x02\x02\u0115" +
		"7\x03\x02\x02\x02\u0116\u011D\x05$\x13\x02\u0117\u011D\x05:\x1E\x02\u0118" +
		"\u011D\x05\x16\f\x02\u0119\u011D\x05\b\x05\x02\u011A\u011D\x05(\x15\x02" +
		"\u011B\u011D\x05\x1E\x10\x02\u011C\u0116\x03\x02\x02\x02\u011C\u0117\x03" +
		"\x02\x02\x02\u011C\u0118\x03\x02\x02\x02\u011C\u0119\x03\x02\x02\x02\u011C" +
		"\u011A\x03\x02\x02\x02\u011C\u011B\x03\x02\x02\x02\u011D9\x03\x02\x02" +
		"\x02\u011E\u011F\x05*\x16\x02\u011F\u0120\x07P\x02\x02\u0120\u0121\x05" +
		"*\x16\x02\u0121;\x03\x02\x02\x02\u0122\u0123\x07\x1E\x02\x02\u0123\u0124" +
		"\x07,\x02\x02\u0124\u0127\x05\"\x12\x02\u0125\u0126\x073\x02\x02\u0126" +
		"\u0128\x07Q\x02\x02\u0127\u0125\x03\x02\x02\x02\u0127\u0128\x03\x02\x02" +
		"\x02\u0128\u0129\x03\x02\x02\x02\u0129\u012A\x07-\x02\x02\u012A=\x03\x02" +
		"\x02\x02\u012B\u0130\x05*\x16\x02\u012C\u012D\x073\x02\x02\u012D\u012F" +
		"\x05*\x16\x02\u012E\u012C\x03\x02\x02\x02\u012F\u0132\x03\x02\x02\x02" +
		"\u0130\u012E\x03\x02\x02\x02\u0130\u0131\x03\x02\x02\x02\u0131?\x03\x02" +
		"\x02\x02\u0132\u0130\x03\x02\x02\x02\u0133\u0138\x074\x02\x02\u0134\u0138" +
		"\x07\x02\x02\x03\u0135\u0138\x07h\x02\x02\u0136\u0138\x06!\b\x02\u0137" +
		"\u0133\x03\x02\x02\x02\u0137\u0134\x03\x02\x02\x02\u0137\u0135\x03\x02" +
		"\x02\x02\u0137\u0136\x03\x02\x02\x02\u0138A\x03\x02\x02\x02\u0139\u013E" +
		"\x07+\x02\x02\u013A\u013B\x073\x02\x02\u013B\u013D\x07+\x02\x02\u013C" +
		"\u013A\x03\x02\x02\x02\u013D\u0140\x03\x02\x02\x02\u013E\u013C\x03\x02" +
		"\x02\x02\u013E\u013F\x03\x02\x02\x02\u013FC\x03\x02\x02\x02\u0140\u013E" +
		"\x03\x02\x02\x02\u0141\u0142\x07\x14\x02\x02\u0142\u0143\x05*\x16\x02" +
		"\u0143\u0149\x05\x14\v\x02\u0144\u0147\x07\x0E\x02\x02\u0145\u0148\x05" +
		"D#\x02\u0146\u0148\x05\x14\v\x02\u0147\u0145\x03\x02\x02\x02\u0147\u0146" +
		"\x03\x02\x02\x02\u0148\u014A\x03\x02\x02\x02\u0149\u0144\x03\x02\x02\x02" +
		"\u0149\u014A\x03\x02\x02\x02\u014AE\x03\x02\x02\x02\u014B\u014D\x07\x1A" +
		"\x02\x02\u014C\u014E\x05> \x02\u014D\u014C\x03\x02\x02\x02\u014D\u014E" +
		"\x03\x02\x02\x02\u014EG\x03\x02\x02\x02\u014F\u0150\x07\x18\x02\x02\u0150" +
		"\u0151\x05*\x16\x02\u0151\u0152\x05\x14\v\x02\u0152I\x03\x02\x02\x02\u0153" +
		"\u0154\t\x06\x02\x02\u0154K\x03\x02\x02\x02\u0155\u0156\x07\x05\x02\x02" +
		"\u0156\u0157\x05\n\x06\x02\u0157\u0158\x05\x14\v\x02\u0158M\x03\x02\x02" +
		"\x02\u0159\u015A\x07\n\x02\x02\u015A\u015B\x05\x06\x04\x02\u015BO\x03" +
		"\x02\x02\x02%RX]fqx|\x81\x85\x8D\x91\x93\x98\x9C\xA3\xAA\xBE\xD3\xE4\xE6" +
		"\xF1\xFC\xFF\u0102\u0105\u010C\u0114\u011C\u0127\u0130\u0137\u013E\u0147" +
		"\u0149\u014D";
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
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.IDENTIFIER, 0); }
	public arguments(): ArgumentsContext {
		return this.getRuleContext(0, ArgumentsContext);
	}
	public functionLit(): FunctionLitContext | undefined {
		return this.tryGetRuleContext(0, FunctionLitContext);
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
	public result(): ResultContext | undefined {
		return this.tryGetRuleContext(0, ResultContext);
	}
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


export class ResultContext extends ParserRuleContext {
	public L_PAREN(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.L_PAREN, 0); }
	public typeList(): TypeListContext | undefined {
		return this.tryGetRuleContext(0, TypeListContext);
	}
	public R_PAREN(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.R_PAREN, 0); }
	public type_(): Type_Context | undefined {
		return this.tryGetRuleContext(0, Type_Context);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_result; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterResult) {
			listener.enterResult(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitResult) {
			listener.exitResult(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitResult) {
			return visitor.visitResult(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeListContext extends ParserRuleContext {
	public type_(): Type_Context[];
	public type_(i: number): Type_Context;
	public type_(i?: number): Type_Context | Type_Context[] {
		if (i === undefined) {
			return this.getRuleContexts(Type_Context);
		} else {
			return this.getRuleContext(i, Type_Context);
		}
	}
	public NIL_LIT(): TerminalNode[];
	public NIL_LIT(i: number): TerminalNode;
	public NIL_LIT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SimpleParser.NIL_LIT);
		} else {
			return this.getToken(SimpleParser.NIL_LIT, i);
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
	public get ruleIndex(): number { return SimpleParser.RULE_typeList; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterTypeList) {
			listener.enterTypeList(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitTypeList) {
			listener.exitTypeList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitTypeList) {
			return visitor.visitTypeList(this);
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
	public type_(): Type_Context | undefined {
		return this.tryGetRuleContext(0, Type_Context);
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
	public varMutexDecl(): VarMutexDeclContext | undefined {
		return this.tryGetRuleContext(0, VarMutexDeclContext);
	}
	public varWaitGroupDecl(): VarWaitGroupDeclContext | undefined {
		return this.tryGetRuleContext(0, VarWaitGroupDeclContext);
	}
	public regVarDecl(): RegVarDeclContext | undefined {
		return this.tryGetRuleContext(0, RegVarDeclContext);
	}
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


export class RegVarDeclContext extends ParserRuleContext {
	public VAR(): TerminalNode { return this.getToken(SimpleParser.VAR, 0); }
	public identifierList(): IdentifierListContext {
		return this.getRuleContext(0, IdentifierListContext);
	}
	public type_(): Type_Context {
		return this.getRuleContext(0, Type_Context);
	}
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.ASSIGN, 0); }
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_regVarDecl; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterRegVarDecl) {
			listener.enterRegVarDecl(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitRegVarDecl) {
			listener.exitRegVarDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitRegVarDecl) {
			return visitor.visitRegVarDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarMutexDeclContext extends ParserRuleContext {
	public VAR(): TerminalNode { return this.getToken(SimpleParser.VAR, 0); }
	public identifierList(): IdentifierListContext {
		return this.getRuleContext(0, IdentifierListContext);
	}
	public MUTEX(): TerminalNode { return this.getToken(SimpleParser.MUTEX, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_varMutexDecl; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterVarMutexDecl) {
			listener.enterVarMutexDecl(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitVarMutexDecl) {
			listener.exitVarMutexDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitVarMutexDecl) {
			return visitor.visitVarMutexDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarWaitGroupDeclContext extends ParserRuleContext {
	public VAR(): TerminalNode { return this.getToken(SimpleParser.VAR, 0); }
	public identifierList(): IdentifierListContext {
		return this.getRuleContext(0, IdentifierListContext);
	}
	public WAITGROUP(): TerminalNode { return this.getToken(SimpleParser.WAITGROUP, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_varWaitGroupDecl; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterVarWaitGroupDecl) {
			listener.enterVarWaitGroupDecl(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitVarWaitGroupDecl) {
			listener.exitVarWaitGroupDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitVarWaitGroupDecl) {
			return visitor.visitVarWaitGroupDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ShortVarDeclContext extends ParserRuleContext {
	public identifierList(): IdentifierListContext {
		return this.getRuleContext(0, IdentifierListContext);
	}
	public type_(): Type_Context {
		return this.getRuleContext(0, Type_Context);
	}
	public DECLARE_ASSIGN(): TerminalNode { return this.getToken(SimpleParser.DECLARE_ASSIGN, 0); }
	public expressionList(): ExpressionListContext {
		return this.getRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_shortVarDecl; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterShortVarDecl) {
			listener.enterShortVarDecl(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitShortVarDecl) {
			listener.exitShortVarDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitShortVarDecl) {
			return visitor.visitShortVarDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_Context extends ParserRuleContext {
	public INT(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.INT, 0); }
	public BOOL(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.BOOL, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.STRING, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.FLOAT, 0); }
	public channelType(): ChannelTypeContext | undefined {
		return this.tryGetRuleContext(0, ChannelTypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_type_; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterType_) {
			listener.enterType_(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitType_) {
			listener.exitType_(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitType_) {
			return visitor.visitType_(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ChannelTypeContext extends ParserRuleContext {
	public CHAN(): TerminalNode { return this.getToken(SimpleParser.CHAN, 0); }
	public type_(): Type_Context {
		return this.getRuleContext(0, Type_Context);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_channelType; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterChannelType) {
			listener.enterChannelType(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitChannelType) {
			listener.exitChannelType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitChannelType) {
			return visitor.visitChannelType(this);
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
export class MAKEOPContext extends ExpressionContext {
	public makeExpr(): MakeExprContext {
		return this.getRuleContext(0, MakeExprContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterMAKEOP) {
			listener.enterMAKEOP(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitMAKEOP) {
			listener.exitMAKEOP(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitMAKEOP) {
			return visitor.visitMAKEOP(this);
		} else {
			return visitor.visitChildren(this);
		}
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
	public MOD(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.MOD, 0); }
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
export class RECVOPContext extends ExpressionContext {
	public RECEIVE(): TerminalNode { return this.getToken(SimpleParser.RECEIVE, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterRECVOP) {
			listener.enterRECVOP(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitRECVOP) {
			listener.exitRECVOP(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitRECVOP) {
			return visitor.visitRECVOP(this);
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
	public TRUE(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.TRUE, 0); }
	public FALSE(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.FALSE, 0); }
	public string_(): String_Context | undefined {
		return this.tryGetRuleContext(0, String_Context);
	}
	public functionLit(): FunctionLitContext | undefined {
		return this.tryGetRuleContext(0, FunctionLitContext);
	}
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
	public goStmt(): GoStmtContext | undefined {
		return this.tryGetRuleContext(0, GoStmtContext);
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
	public sendStmt(): SendStmtContext | undefined {
		return this.tryGetRuleContext(0, SendStmtContext);
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
	public shortVarDecl(): ShortVarDeclContext | undefined {
		return this.tryGetRuleContext(0, ShortVarDeclContext);
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


export class SendStmtContext extends ParserRuleContext {
	public _channel!: ExpressionContext;
	public RECEIVE(): TerminalNode { return this.getToken(SimpleParser.RECEIVE, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_sendStmt; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterSendStmt) {
			listener.enterSendStmt(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitSendStmt) {
			listener.exitSendStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitSendStmt) {
			return visitor.visitSendStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MakeExprContext extends ParserRuleContext {
	public MAKE(): TerminalNode { return this.getToken(SimpleParser.MAKE, 0); }
	public L_PAREN(): TerminalNode { return this.getToken(SimpleParser.L_PAREN, 0); }
	public channelType(): ChannelTypeContext {
		return this.getRuleContext(0, ChannelTypeContext);
	}
	public R_PAREN(): TerminalNode { return this.getToken(SimpleParser.R_PAREN, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.COMMA, 0); }
	public DECIMAL_LIT(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.DECIMAL_LIT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_makeExpr; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterMakeExpr) {
			listener.enterMakeExpr(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitMakeExpr) {
			listener.exitMakeExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitMakeExpr) {
			return visitor.visitMakeExpr(this);
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


export class String_Context extends ParserRuleContext {
	public RAW_STRING_LIT(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.RAW_STRING_LIT, 0); }
	public INTERPRETED_STRING_LIT(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.INTERPRETED_STRING_LIT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_string_; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterString_) {
			listener.enterString_(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitString_) {
			listener.exitString_(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitString_) {
			return visitor.visitString_(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionLitContext extends ParserRuleContext {
	public FUNC(): TerminalNode { return this.getToken(SimpleParser.FUNC, 0); }
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
	public get ruleIndex(): number { return SimpleParser.RULE_functionLit; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterFunctionLit) {
			listener.enterFunctionLit(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitFunctionLit) {
			listener.exitFunctionLit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitFunctionLit) {
			return visitor.visitFunctionLit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GoStmtContext extends ParserRuleContext {
	public GO(): TerminalNode { return this.getToken(SimpleParser.GO, 0); }
	public funcApp(): FuncAppContext {
		return this.getRuleContext(0, FuncAppContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_goStmt; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterGoStmt) {
			listener.enterGoStmt(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitGoStmt) {
			listener.exitGoStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitGoStmt) {
			return visitor.visitGoStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


