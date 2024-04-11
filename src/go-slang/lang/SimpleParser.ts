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
	public static readonly MAKE = 26;
	public static readonly INT = 27;
	public static readonly BOOL = 28;
	public static readonly STRING = 29;
	public static readonly FLOAT = 30;
	public static readonly MUTEX = 31;
	public static readonly WAITGROUP = 32;
	public static readonly NIL_LIT = 33;
	public static readonly IDENTIFIER = 34;
	public static readonly L_PAREN = 35;
	public static readonly R_PAREN = 36;
	public static readonly L_CURLY = 37;
	public static readonly R_CURLY = 38;
	public static readonly L_BRACKET = 39;
	public static readonly R_BRACKET = 40;
	public static readonly ASSIGN = 41;
	public static readonly COMMA = 42;
	public static readonly SEMI = 43;
	public static readonly COLON = 44;
	public static readonly DOT = 45;
	public static readonly PLUS_PLUS = 46;
	public static readonly MINUS_MINUS = 47;
	public static readonly DECLARE_ASSIGN = 48;
	public static readonly ELLIPSIS = 49;
	public static readonly LOGICAL_OR = 50;
	public static readonly LOGICAL_AND = 51;
	public static readonly EQUALS = 52;
	public static readonly NOT_EQUALS = 53;
	public static readonly LESS = 54;
	public static readonly LESS_OR_EQUALS = 55;
	public static readonly GREATER = 56;
	public static readonly GREATER_OR_EQUALS = 57;
	public static readonly OR = 58;
	public static readonly DIV = 59;
	public static readonly MOD = 60;
	public static readonly LSHIFT = 61;
	public static readonly RSHIFT = 62;
	public static readonly BIT_CLEAR = 63;
	public static readonly UNDERLYING = 64;
	public static readonly EXCLAMATION = 65;
	public static readonly PLUS = 66;
	public static readonly MINUS = 67;
	public static readonly CARET = 68;
	public static readonly STAR = 69;
	public static readonly AMPERSAND = 70;
	public static readonly RECEIVE = 71;
	public static readonly DECIMAL_LIT = 72;
	public static readonly BINARY_LIT = 73;
	public static readonly OCTAL_LIT = 74;
	public static readonly HEX_LIT = 75;
	public static readonly FLOAT_LIT = 76;
	public static readonly DECIMAL_FLOAT_LIT = 77;
	public static readonly HEX_FLOAT_LIT = 78;
	public static readonly IMAGINARY_LIT = 79;
	public static readonly RUNE_LIT = 80;
	public static readonly BYTE_VALUE = 81;
	public static readonly OCTAL_BYTE_VALUE = 82;
	public static readonly HEX_BYTE_VALUE = 83;
	public static readonly LITTLE_U_VALUE = 84;
	public static readonly BIG_U_VALUE = 85;
	public static readonly RAW_STRING_LIT = 86;
	public static readonly INTERPRETED_STRING_LIT = 87;
	public static readonly WS = 88;
	public static readonly COMMENT = 89;
	public static readonly TERMINATOR = 90;
	public static readonly LINE_COMMENT = 91;
	public static readonly WS_NLSEMI = 92;
	public static readonly COMMENT_NLSEMI = 93;
	public static readonly LINE_COMMENT_NLSEMI = 94;
	public static readonly EOS = 95;
	public static readonly OTHER = 96;
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
	public static readonly RULE_varSpec = 11;
	public static readonly RULE_shortVarDecl = 12;
	public static readonly RULE_type_ = 13;
	public static readonly RULE_channelType = 14;
	public static readonly RULE_assignment = 15;
	public static readonly RULE_assign_op = 16;
	public static readonly RULE_expressionStmt = 17;
	public static readonly RULE_expression = 18;
	public static readonly RULE_primaryExpr = 19;
	public static readonly RULE_operand = 20;
	public static readonly RULE_operandName = 21;
	public static readonly RULE_literal = 22;
	public static readonly RULE_statementList = 23;
	public static readonly RULE_statement = 24;
	public static readonly RULE_simpleStmt = 25;
	public static readonly RULE_sendStmt = 26;
	public static readonly RULE_makeExpr = 27;
	public static readonly RULE_expressionList = 28;
	public static readonly RULE_eos = 29;
	public static readonly RULE_identifierList = 30;
	public static readonly RULE_ifStmt = 31;
	public static readonly RULE_returnStmt = 32;
	public static readonly RULE_forStmt = 33;
	public static readonly RULE_string_ = 34;
	public static readonly RULE_functionLit = 35;
	public static readonly RULE_goStmt = 36;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"global_scope", "arguments", "funcApp", "funcDecl", "signature", "result", 
		"typeList", "parameters", "parameterDecl", "block", "varDecl", "varSpec", 
		"shortVarDecl", "type_", "channelType", "assignment", "assign_op", "expressionStmt", 
		"expression", "primaryExpr", "operand", "operandName", "literal", "statementList", 
		"statement", "simpleStmt", "sendStmt", "makeExpr", "expressionList", "eos", 
		"identifierList", "ifStmt", "returnStmt", "forStmt", "string_", "functionLit", 
		"goStmt",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'break'", "'default'", "'func'", "'interface'", "'select'", 
		"'case'", "'defer'", "'go'", "'map'", "'struct'", "'chan'", "'else'", 
		"'goto'", "'package'", "'switch'", "'const'", "'fallthrough'", "'if'", 
		"'range'", "'type'", "'continue'", "'for'", "'import'", "'return'", "'var'", 
		"'make'", "'int'", "'bool'", "'string'", "'float'", "'Mutex'", "'WaitGroup'", 
		"'nil'", undefined, "'('", "')'", "'{'", "'}'", "'['", "']'", "'='", "','", 
		"';'", "':'", "'.'", "'++'", "'--'", "':='", "'...'", "'||'", "'&&'", 
		"'=='", "'!='", "'<'", "'<='", "'>'", "'>='", "'|'", "'/'", "'%'", "'<<'", 
		"'>>'", "'&^'", "'~'", "'!'", "'+'", "'-'", "'^'", "'*'", "'&'", "'<-'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "BREAK", "DEFAULT", "FUNC", "INTERFACE", "SELECT", "CASE", 
		"DEFER", "GO", "MAP", "STRUCT", "CHAN", "ELSE", "GOTO", "PACKAGE", "SWITCH", 
		"CONST", "FALLTHROUGH", "IF", "RANGE", "TYPE", "CONTINUE", "FOR", "IMPORT", 
		"RETURN", "VAR", "MAKE", "INT", "BOOL", "STRING", "FLOAT", "MUTEX", "WAITGROUP", 
		"NIL_LIT", "IDENTIFIER", "L_PAREN", "R_PAREN", "L_CURLY", "R_CURLY", "L_BRACKET", 
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
			this.state = 82;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SimpleParser.FUNC || _la === SimpleParser.VAR) {
				{
				{
				this.state = 76;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SimpleParser.VAR:
					{
					this.state = 74;
					this.varDecl();
					}
					break;
				case SimpleParser.FUNC:
					{
					this.state = 75;
					this.funcDecl();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 78;
				this.eos();
				}
				}
				this.state = 84;
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
			this.state = 85;
			this.match(SimpleParser.L_PAREN);
			this.state = 87;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SimpleParser.FUNC || _la === SimpleParser.MAKE || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (SimpleParser.NIL_LIT - 33)) | (1 << (SimpleParser.IDENTIFIER - 33)) | (1 << (SimpleParser.L_PAREN - 33)))) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & ((1 << (SimpleParser.EXCLAMATION - 65)) | (1 << (SimpleParser.MINUS - 65)) | (1 << (SimpleParser.RECEIVE - 65)) | (1 << (SimpleParser.DECIMAL_LIT - 65)) | (1 << (SimpleParser.FLOAT_LIT - 65)) | (1 << (SimpleParser.RAW_STRING_LIT - 65)) | (1 << (SimpleParser.INTERPRETED_STRING_LIT - 65)))) !== 0)) {
				{
				this.state = 86;
				this.expressionList();
				}
			}

			this.state = 89;
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
			this.state = 96;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 91;
				this.match(SimpleParser.IDENTIFIER);
				this.state = 92;
				this.arguments();
				}
				break;
			case SimpleParser.FUNC:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 93;
				this.functionLit();
				this.state = 94;
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
			this.state = 98;
			this.match(SimpleParser.FUNC);
			this.state = 99;
			this.match(SimpleParser.IDENTIFIER);
			this.state = 100;
			this.signature();
			this.state = 101;
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
			this.state = 103;
			this.match(SimpleParser.L_PAREN);
			this.state = 104;
			this.parameters();
			this.state = 105;
			this.match(SimpleParser.R_PAREN);
			this.state = 107;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 11)) & ~0x1F) === 0 && ((1 << (_la - 11)) & ((1 << (SimpleParser.CHAN - 11)) | (1 << (SimpleParser.INT - 11)) | (1 << (SimpleParser.BOOL - 11)) | (1 << (SimpleParser.STRING - 11)) | (1 << (SimpleParser.FLOAT - 11)) | (1 << (SimpleParser.MUTEX - 11)) | (1 << (SimpleParser.WAITGROUP - 11)) | (1 << (SimpleParser.L_PAREN - 11)))) !== 0)) {
				{
				this.state = 106;
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
			this.state = 114;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.L_PAREN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 109;
				this.match(SimpleParser.L_PAREN);
				this.state = 110;
				this.typeList();
				this.state = 111;
				this.match(SimpleParser.R_PAREN);
				}
				break;
			case SimpleParser.CHAN:
			case SimpleParser.INT:
			case SimpleParser.BOOL:
			case SimpleParser.STRING:
			case SimpleParser.FLOAT:
			case SimpleParser.MUTEX:
			case SimpleParser.WAITGROUP:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 113;
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
			this.state = 118;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.CHAN:
			case SimpleParser.INT:
			case SimpleParser.BOOL:
			case SimpleParser.STRING:
			case SimpleParser.FLOAT:
			case SimpleParser.MUTEX:
			case SimpleParser.WAITGROUP:
				{
				this.state = 116;
				this.type_();
				}
				break;
			case SimpleParser.NIL_LIT:
				{
				this.state = 117;
				this.match(SimpleParser.NIL_LIT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 127;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SimpleParser.COMMA) {
				{
				{
				this.state = 120;
				this.match(SimpleParser.COMMA);
				this.state = 123;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SimpleParser.CHAN:
				case SimpleParser.INT:
				case SimpleParser.BOOL:
				case SimpleParser.STRING:
				case SimpleParser.FLOAT:
				case SimpleParser.MUTEX:
				case SimpleParser.WAITGROUP:
					{
					this.state = 121;
					this.type_();
					}
					break;
				case SimpleParser.NIL_LIT:
					{
					this.state = 122;
					this.match(SimpleParser.NIL_LIT);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 129;
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
			this.state = 141;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 11, this._ctx) ) {
			case 1:
				{
				this.state = 130;
				this.parameterDecl();
				this.state = 135;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 131;
						this.match(SimpleParser.COMMA);
						this.state = 132;
						this.parameterDecl();
						}
						}
					}
					this.state = 137;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
				}
				this.state = 139;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SimpleParser.COMMA) {
					{
					this.state = 138;
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
			this.state = 146;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SimpleParser.IDENTIFIER) {
				{
				this.state = 143;
				this.identifierList();
				this.state = 144;
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
			this.state = 148;
			this.match(SimpleParser.L_CURLY);
			this.state = 150;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				{
				this.state = 149;
				this.statementList();
				}
				break;
			}
			this.state = 152;
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
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 154;
			this.match(SimpleParser.VAR);
			this.state = 166;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.IDENTIFIER:
				{
				this.state = 155;
				this.varSpec();
				}
				break;
			case SimpleParser.L_PAREN:
				{
				this.state = 156;
				this.match(SimpleParser.L_PAREN);
				this.state = 162;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === SimpleParser.IDENTIFIER) {
					{
					{
					this.state = 157;
					this.varSpec();
					this.state = 158;
					this.eos();
					}
					}
					this.state = 164;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 165;
				this.match(SimpleParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
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
	public varSpec(): VarSpecContext {
		let _localctx: VarSpecContext = new VarSpecContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, SimpleParser.RULE_varSpec);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 168;
			this.identifierList();
			this.state = 169;
			this.type_();
			this.state = 170;
			this.match(SimpleParser.ASSIGN);
			this.state = 171;
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
	public shortVarDecl(): ShortVarDeclContext {
		let _localctx: ShortVarDeclContext = new ShortVarDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, SimpleParser.RULE_shortVarDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 173;
			this.identifierList();
			this.state = 174;
			this.type_();
			this.state = 175;
			this.match(SimpleParser.DECLARE_ASSIGN);
			this.state = 176;
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
		this.enterRule(_localctx, 26, SimpleParser.RULE_type_);
		try {
			this.state = 185;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.INT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 178;
				this.match(SimpleParser.INT);
				}
				break;
			case SimpleParser.BOOL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 179;
				this.match(SimpleParser.BOOL);
				}
				break;
			case SimpleParser.STRING:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 180;
				this.match(SimpleParser.STRING);
				}
				break;
			case SimpleParser.FLOAT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 181;
				this.match(SimpleParser.FLOAT);
				}
				break;
			case SimpleParser.CHAN:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 182;
				this.channelType();
				}
				break;
			case SimpleParser.MUTEX:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 183;
				this.match(SimpleParser.MUTEX);
				}
				break;
			case SimpleParser.WAITGROUP:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 184;
				this.match(SimpleParser.WAITGROUP);
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
		this.enterRule(_localctx, 28, SimpleParser.RULE_channelType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 187;
			this.match(SimpleParser.CHAN);
			this.state = 188;
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
		this.enterRule(_localctx, 30, SimpleParser.RULE_assignment);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 190;
			this.identifierList();
			this.state = 191;
			this.assign_op();
			this.state = 192;
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
		this.enterRule(_localctx, 32, SimpleParser.RULE_assign_op);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 194;
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
		this.enterRule(_localctx, 34, SimpleParser.RULE_expressionStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 196;
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
		let _startState: number = 36;
		this.enterRecursionRule(_localctx, 36, SimpleParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 206;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				{
				_localctx = new MAKEOPContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 199;
				this.makeExpr();
				}
				break;

			case 2:
				{
				_localctx = new FUNCAPPContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 200;
				this.funcApp();
				}
				break;

			case 3:
				{
				_localctx = new UNARYOPContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 201;
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
				this.state = 202;
				this.expression(8);
				}
				break;

			case 4:
				{
				_localctx = new PRIMARYContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 203;
				this.primaryExpr();
				}
				break;

			case 5:
				{
				_localctx = new RECVOPContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 204;
				this.match(SimpleParser.RECEIVE);
				this.state = 205;
				this.expression(1);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 225;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 223;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
					case 1:
						{
						_localctx = new BINOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 208;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 209;
						(_localctx as BINOPContext)._bin_op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & ((1 << (SimpleParser.DIV - 59)) | (1 << (SimpleParser.MOD - 59)) | (1 << (SimpleParser.STAR - 59)))) !== 0))) {
							(_localctx as BINOPContext)._bin_op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 210;
						this.expression(8);
						}
						break;

					case 2:
						{
						_localctx = new BINOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 211;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 212;
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
						this.state = 213;
						this.expression(7);
						}
						break;

					case 3:
						{
						_localctx = new RELOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 214;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 215;
						(_localctx as RELOPContext)._rel_op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & ((1 << (SimpleParser.EQUALS - 52)) | (1 << (SimpleParser.NOT_EQUALS - 52)) | (1 << (SimpleParser.LESS - 52)) | (1 << (SimpleParser.LESS_OR_EQUALS - 52)) | (1 << (SimpleParser.GREATER - 52)) | (1 << (SimpleParser.GREATER_OR_EQUALS - 52)))) !== 0))) {
							(_localctx as RELOPContext)._rel_op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 216;
						this.expression(6);
						}
						break;

					case 4:
						{
						_localctx = new LOGOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 217;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 218;
						this.match(SimpleParser.LOGICAL_AND);
						this.state = 219;
						this.expression(5);
						}
						break;

					case 5:
						{
						_localctx = new LOGOPContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, SimpleParser.RULE_expression);
						this.state = 220;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 221;
						this.match(SimpleParser.LOGICAL_OR);
						this.state = 222;
						this.expression(4);
						}
						break;
					}
					}
				}
				this.state = 227;
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
		this.enterRule(_localctx, 38, SimpleParser.RULE_primaryExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 228;
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
		this.enterRule(_localctx, 40, SimpleParser.RULE_operand);
		try {
			this.state = 236;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.FUNC:
			case SimpleParser.NIL_LIT:
			case SimpleParser.DECIMAL_LIT:
			case SimpleParser.FLOAT_LIT:
			case SimpleParser.RAW_STRING_LIT:
			case SimpleParser.INTERPRETED_STRING_LIT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 230;
				this.literal();
				}
				break;
			case SimpleParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 231;
				this.operandName();
				}
				break;
			case SimpleParser.L_PAREN:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 232;
				this.match(SimpleParser.L_PAREN);
				this.state = 233;
				this.expression(0);
				this.state = 234;
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
		this.enterRule(_localctx, 42, SimpleParser.RULE_operandName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 238;
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
		this.enterRule(_localctx, 44, SimpleParser.RULE_literal);
		try {
			this.state = 245;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.NIL_LIT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 240;
				this.match(SimpleParser.NIL_LIT);
				}
				break;
			case SimpleParser.DECIMAL_LIT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 241;
				this.match(SimpleParser.DECIMAL_LIT);
				}
				break;
			case SimpleParser.FLOAT_LIT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 242;
				this.match(SimpleParser.FLOAT_LIT);
				}
				break;
			case SimpleParser.RAW_STRING_LIT:
			case SimpleParser.INTERPRETED_STRING_LIT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 243;
				this.string_();
				}
				break;
			case SimpleParser.FUNC:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 244;
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
		this.enterRule(_localctx, 46, SimpleParser.RULE_statementList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 259;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 254;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
					case 1:
						{
						this.state = 248;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === SimpleParser.SEMI) {
							{
							this.state = 247;
							this.match(SimpleParser.SEMI);
							}
						}

						}
						break;

					case 2:
						{
						this.state = 251;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === SimpleParser.EOS) {
							{
							this.state = 250;
							this.match(SimpleParser.EOS);
							}
						}

						}
						break;

					case 3:
						{
						this.state = 253;
						if (!(this.closingBracket())) {
							throw this.createFailedPredicateException("this.closingBracket()");
						}
						}
						break;
					}
					this.state = 256;
					this.statement();
					this.state = 257;
					this.eos();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 261;
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
		this.enterRule(_localctx, 48, SimpleParser.RULE_statement);
		try {
			this.state = 269;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SimpleParser.FOR:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 263;
				this.forStmt();
				}
				break;
			case SimpleParser.IF:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 264;
				this.ifStmt();
				}
				break;
			case SimpleParser.RETURN:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 265;
				this.returnStmt();
				}
				break;
			case SimpleParser.FUNC:
			case SimpleParser.VAR:
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
				this.state = 266;
				this.simpleStmt();
				}
				break;
			case SimpleParser.L_CURLY:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 267;
				this.block();
				}
				break;
			case SimpleParser.GO:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 268;
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
		this.enterRule(_localctx, 50, SimpleParser.RULE_simpleStmt);
		try {
			this.state = 277;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 27, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 271;
				this.sendStmt();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 272;
				this.varDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 273;
				this.funcDecl();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 274;
				this.assignment();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 275;
				this.expressionStmt();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 276;
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
		this.enterRule(_localctx, 52, SimpleParser.RULE_sendStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 279;
			_localctx._channel = this.expression(0);
			this.state = 280;
			this.match(SimpleParser.RECEIVE);
			this.state = 281;
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
		this.enterRule(_localctx, 54, SimpleParser.RULE_makeExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 283;
			this.match(SimpleParser.MAKE);
			this.state = 284;
			this.match(SimpleParser.L_PAREN);
			this.state = 285;
			this.channelType();
			this.state = 288;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SimpleParser.COMMA) {
				{
				this.state = 286;
				this.match(SimpleParser.COMMA);
				this.state = 287;
				this.expression(0);
				}
			}

			this.state = 290;
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
		this.enterRule(_localctx, 56, SimpleParser.RULE_expressionList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 292;
			this.expression(0);
			this.state = 297;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 29, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 293;
					this.match(SimpleParser.COMMA);
					this.state = 294;
					this.expression(0);
					}
					}
				}
				this.state = 299;
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
		this.enterRule(_localctx, 58, SimpleParser.RULE_eos);
		try {
			this.state = 304;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 300;
				this.match(SimpleParser.SEMI);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 301;
				this.match(SimpleParser.EOF);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 302;
				this.match(SimpleParser.EOS);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 303;
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
		this.enterRule(_localctx, 60, SimpleParser.RULE_identifierList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 306;
			this.match(SimpleParser.IDENTIFIER);
			this.state = 311;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SimpleParser.COMMA) {
				{
				{
				this.state = 307;
				this.match(SimpleParser.COMMA);
				this.state = 308;
				this.match(SimpleParser.IDENTIFIER);
				}
				}
				this.state = 313;
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
		this.enterRule(_localctx, 62, SimpleParser.RULE_ifStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 314;
			this.match(SimpleParser.IF);
			this.state = 315;
			this.expression(0);
			this.state = 316;
			this.block();
			this.state = 322;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				{
				this.state = 317;
				this.match(SimpleParser.ELSE);
				this.state = 320;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SimpleParser.IF:
					{
					this.state = 318;
					this.ifStmt();
					}
					break;
				case SimpleParser.L_CURLY:
					{
					this.state = 319;
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
		this.enterRule(_localctx, 64, SimpleParser.RULE_returnStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 324;
			this.match(SimpleParser.RETURN);
			this.state = 326;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				{
				this.state = 325;
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
		this.enterRule(_localctx, 66, SimpleParser.RULE_forStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 328;
			this.match(SimpleParser.FOR);
			this.state = 329;
			this.expression(0);
			this.state = 330;
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
		this.enterRule(_localctx, 68, SimpleParser.RULE_string_);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 332;
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
		this.enterRule(_localctx, 70, SimpleParser.RULE_functionLit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 334;
			this.match(SimpleParser.FUNC);
			this.state = 335;
			this.signature();
			this.state = 336;
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
		this.enterRule(_localctx, 72, SimpleParser.RULE_goStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 338;
			this.match(SimpleParser.GO);
			this.state = 339;
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
		case 18:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);

		case 23:
			return this.statementList_sempred(_localctx as StatementListContext, predIndex);

		case 29:
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03b\u0158\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x03\x02\x03\x02\x05\x02O\n\x02\x03\x02\x03" +
		"\x02\x07\x02S\n\x02\f\x02\x0E\x02V\v\x02\x03\x03\x03\x03\x05\x03Z\n\x03" +
		"\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04c\n\x04" +
		"\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x05\x06n\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07u\n\x07" +
		"\x03\b\x03\b\x05\by\n\b\x03\b\x03\b\x03\b\x05\b~\n\b\x07\b\x80\n\b\f\b" +
		"\x0E\b\x83\v\b\x03\t\x03\t\x03\t\x07\t\x88\n\t\f\t\x0E\t\x8B\v\t\x03\t" +
		"\x05\t\x8E\n\t\x05\t\x90\n\t\x03\n\x03\n\x03\n\x05\n\x95\n\n\x03\v\x03" +
		"\v\x05\v\x99\n\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x07\f" +
		"\xA3\n\f\f\f\x0E\f\xA6\v\f\x03\f\x05\f\xA9\n\f\x03\r\x03\r\x03\r\x03\r" +
		"\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F" +
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xBC\n\x0F\x03\x10\x03\x10\x03" +
		"\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03\x13\x03\x13\x03" +
		"\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x05\x14\xD1" +
		"\n\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14" +
		"\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x07\x14\xE2\n" +
		"\x14\f\x14\x0E\x14\xE5\v\x14\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x05\x16\xEF\n\x16\x03\x17\x03\x17\x03\x18\x03\x18" +
		"\x03\x18\x03\x18\x03\x18\x05\x18\xF8\n\x18\x03\x19\x05\x19\xFB\n\x19\x03" +
		"\x19\x05\x19\xFE\n\x19\x03\x19\x05\x19\u0101\n\x19\x03\x19\x03\x19\x03" +
		"\x19\x06\x19\u0106\n\x19\r\x19\x0E\x19\u0107\x03\x1A\x03\x1A\x03\x1A\x03" +
		"\x1A\x03\x1A\x03\x1A\x05\x1A\u0110\n\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
		"\x03\x1B\x03\x1B\x05\x1B\u0118\n\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03" +
		"\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D\u0123\n\x1D\x03\x1D\x03\x1D" +
		"\x03\x1E\x03\x1E\x03\x1E\x07\x1E\u012A\n\x1E\f\x1E\x0E\x1E\u012D\v\x1E" +
		"\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u0133\n\x1F\x03 \x03 \x03 \x07" +
		" \u0138\n \f \x0E \u013B\v \x03!\x03!\x03!\x03!\x03!\x03!\x05!\u0143\n" +
		"!\x05!\u0145\n!\x03\"\x03\"\x05\"\u0149\n\"\x03#\x03#\x03#\x03#\x03$\x03" +
		"$\x03%\x03%\x03%\x03%\x03&\x03&\x03&\x03&\x02\x02\x03&\'\x02\x02\x04\x02" +
		"\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18" +
		"\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x02" +
		"0\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02" +
		"\x02\x07\x04\x02CCEE\x04\x02=>GG\x03\x02DE\x03\x026;\x03\x02XY\x02\u016F" +
		"\x02T\x03\x02\x02\x02\x04W\x03\x02\x02\x02\x06b\x03\x02\x02\x02\bd\x03" +
		"\x02\x02\x02\ni\x03\x02\x02\x02\ft\x03\x02\x02\x02\x0Ex\x03\x02\x02\x02" +
		"\x10\x8F\x03\x02\x02\x02\x12\x94\x03\x02\x02\x02\x14\x96\x03\x02\x02\x02" +
		"\x16\x9C\x03\x02\x02\x02\x18\xAA\x03\x02\x02\x02\x1A\xAF\x03\x02\x02\x02" +
		"\x1C\xBB\x03\x02\x02\x02\x1E\xBD\x03\x02\x02\x02 \xC0\x03\x02\x02\x02" +
		"\"\xC4\x03\x02\x02\x02$\xC6\x03\x02\x02\x02&\xD0\x03\x02\x02\x02(\xE6" +
		"\x03\x02\x02\x02*\xEE\x03\x02\x02\x02,\xF0\x03\x02\x02\x02.\xF7\x03\x02" +
		"\x02\x020\u0105\x03\x02\x02\x022\u010F\x03\x02\x02\x024\u0117\x03\x02" +
		"\x02\x026\u0119\x03\x02\x02\x028\u011D\x03\x02\x02\x02:\u0126\x03\x02" +
		"\x02\x02<\u0132\x03\x02\x02\x02>\u0134\x03\x02\x02\x02@\u013C\x03\x02" +
		"\x02\x02B\u0146\x03\x02\x02\x02D\u014A\x03\x02\x02\x02F\u014E\x03\x02" +
		"\x02\x02H\u0150\x03\x02\x02\x02J\u0154\x03\x02\x02\x02LO\x05\x16\f\x02" +
		"MO\x05\b\x05\x02NL\x03\x02\x02\x02NM\x03\x02\x02\x02OP\x03\x02\x02\x02" +
		"PQ\x05<\x1F\x02QS\x03\x02\x02\x02RN\x03\x02\x02\x02SV\x03\x02\x02\x02" +
		"TR\x03\x02\x02\x02TU\x03\x02\x02\x02U\x03\x03\x02\x02\x02VT\x03\x02\x02" +
		"\x02WY\x07%\x02\x02XZ\x05:\x1E\x02YX\x03\x02\x02\x02YZ\x03\x02\x02\x02" +
		"Z[\x03\x02\x02\x02[\\\x07&\x02\x02\\\x05\x03\x02\x02\x02]^\x07$\x02\x02" +
		"^c\x05\x04\x03\x02_`\x05H%\x02`a\x05\x04\x03\x02ac\x03\x02\x02\x02b]\x03" +
		"\x02\x02\x02b_\x03\x02\x02\x02c\x07\x03\x02\x02\x02de\x07\x05\x02\x02" +
		"ef\x07$\x02\x02fg\x05\n\x06\x02gh\x05\x14\v\x02h\t\x03\x02\x02\x02ij\x07" +
		"%\x02\x02jk\x05\x10\t\x02km\x07&\x02\x02ln\x05\f\x07\x02ml\x03\x02\x02" +
		"\x02mn\x03\x02\x02\x02n\v\x03\x02\x02\x02op\x07%\x02\x02pq\x05\x0E\b\x02" +
		"qr\x07&\x02\x02ru\x03\x02\x02\x02su\x05\x1C\x0F\x02to\x03\x02\x02\x02" +
		"ts\x03\x02\x02\x02u\r\x03\x02\x02\x02vy\x05\x1C\x0F\x02wy\x07#\x02\x02" +
		"xv\x03\x02\x02\x02xw\x03\x02\x02\x02y\x81\x03\x02\x02\x02z}\x07,\x02\x02" +
		"{~\x05\x1C\x0F\x02|~\x07#\x02\x02}{\x03\x02\x02\x02}|\x03\x02\x02\x02" +
		"~\x80\x03\x02\x02\x02\x7Fz\x03\x02\x02\x02\x80\x83\x03\x02\x02\x02\x81" +
		"\x7F\x03\x02\x02\x02\x81\x82\x03\x02\x02\x02\x82\x0F\x03\x02\x02\x02\x83" +
		"\x81\x03\x02\x02\x02\x84\x89\x05\x12\n\x02\x85\x86\x07,\x02\x02\x86\x88" +
		"\x05\x12\n\x02\x87\x85\x03\x02\x02\x02\x88\x8B\x03\x02\x02\x02\x89\x87" +
		"\x03\x02\x02\x02\x89\x8A\x03\x02\x02\x02\x8A\x8D\x03\x02\x02\x02\x8B\x89" +
		"\x03\x02\x02\x02\x8C\x8E\x07,\x02\x02\x8D\x8C\x03\x02\x02\x02\x8D\x8E" +
		"\x03\x02\x02\x02\x8E\x90\x03\x02\x02\x02\x8F\x84\x03\x02\x02\x02\x8F\x90" +
		"\x03\x02\x02\x02\x90\x11\x03\x02\x02\x02\x91\x92\x05> \x02\x92\x93\x05" +
		"\x1C\x0F\x02\x93\x95\x03\x02\x02\x02\x94\x91\x03\x02\x02\x02\x94\x95\x03" +
		"\x02\x02\x02\x95\x13\x03\x02\x02\x02\x96\x98\x07\'\x02\x02\x97\x99\x05" +
		"0\x19\x02\x98\x97\x03\x02\x02\x02\x98\x99\x03\x02\x02\x02\x99\x9A\x03" +
		"\x02\x02\x02\x9A\x9B\x07(\x02\x02\x9B\x15\x03\x02\x02\x02\x9C\xA8\x07" +
		"\x1B\x02\x02\x9D\xA9\x05\x18\r\x02\x9E\xA4\x07%\x02\x02\x9F\xA0\x05\x18" +
		"\r\x02\xA0\xA1\x05<\x1F\x02\xA1\xA3\x03\x02\x02\x02\xA2\x9F\x03\x02\x02" +
		"\x02\xA3\xA6\x03\x02\x02\x02\xA4\xA2\x03\x02\x02\x02\xA4\xA5\x03\x02\x02" +
		"\x02\xA5\xA7\x03\x02\x02\x02\xA6\xA4\x03\x02\x02\x02\xA7\xA9\x07&\x02" +
		"\x02\xA8\x9D\x03\x02\x02\x02\xA8\x9E\x03\x02\x02\x02\xA9\x17\x03\x02\x02" +
		"\x02\xAA\xAB\x05> \x02\xAB\xAC\x05\x1C\x0F\x02\xAC\xAD\x07+\x02\x02\xAD" +
		"\xAE\x05:\x1E\x02\xAE\x19\x03\x02\x02\x02\xAF\xB0\x05> \x02\xB0\xB1\x05" +
		"\x1C\x0F\x02\xB1\xB2\x072\x02\x02\xB2\xB3\x05:\x1E\x02\xB3\x1B\x03\x02" +
		"\x02\x02\xB4\xBC\x07\x1D\x02\x02\xB5\xBC\x07\x1E\x02\x02\xB6\xBC\x07\x1F" +
		"\x02\x02\xB7\xBC\x07 \x02\x02\xB8\xBC\x05\x1E\x10\x02\xB9\xBC\x07!\x02" +
		"\x02\xBA\xBC\x07\"\x02\x02\xBB\xB4\x03\x02\x02\x02\xBB\xB5\x03\x02\x02" +
		"\x02\xBB\xB6\x03\x02\x02\x02\xBB\xB7\x03\x02\x02\x02\xBB\xB8\x03\x02\x02" +
		"\x02\xBB\xB9\x03\x02\x02\x02\xBB\xBA\x03\x02\x02\x02\xBC\x1D\x03\x02\x02" +
		"\x02\xBD\xBE\x07\r\x02\x02\xBE\xBF\x05\x1C\x0F\x02\xBF\x1F\x03\x02\x02" +
		"\x02\xC0\xC1\x05> \x02\xC1\xC2\x05\"\x12\x02\xC2\xC3\x05:\x1E\x02\xC3" +
		"!\x03\x02\x02\x02\xC4\xC5\x07+\x02\x02\xC5#\x03\x02\x02\x02\xC6\xC7\x05" +
		"&\x14\x02\xC7%\x03\x02\x02\x02\xC8\xC9\b\x14\x01\x02\xC9\xD1\x058\x1D" +
		"\x02\xCA\xD1\x05\x06\x04\x02\xCB\xCC\t\x02\x02\x02\xCC\xD1\x05&\x14\n" +
		"\xCD\xD1\x05(\x15\x02\xCE\xCF\x07I\x02\x02\xCF\xD1\x05&\x14\x03\xD0\xC8" +
		"\x03\x02\x02\x02\xD0\xCA\x03\x02\x02\x02\xD0\xCB\x03\x02\x02\x02\xD0\xCD" +
		"\x03\x02\x02\x02\xD0\xCE\x03\x02\x02\x02\xD1\xE3\x03\x02\x02\x02\xD2\xD3" +
		"\f\t\x02\x02\xD3\xD4\t\x03\x02\x02\xD4\xE2\x05&\x14\n\xD5\xD6\f\b\x02" +
		"\x02\xD6\xD7\t\x04\x02\x02\xD7\xE2\x05&\x14\t\xD8\xD9\f\x07\x02\x02\xD9" +
		"\xDA\t\x05\x02\x02\xDA\xE2\x05&\x14\b\xDB\xDC\f\x06\x02\x02\xDC\xDD\x07" +
		"5\x02\x02\xDD\xE2\x05&\x14\x07\xDE\xDF\f\x05\x02\x02\xDF\xE0\x074\x02" +
		"\x02\xE0\xE2\x05&\x14\x06\xE1\xD2\x03\x02\x02\x02\xE1\xD5\x03\x02\x02" +
		"\x02\xE1\xD8\x03\x02\x02\x02\xE1\xDB\x03\x02\x02\x02\xE1\xDE\x03\x02\x02" +
		"\x02\xE2\xE5\x03\x02\x02\x02\xE3\xE1\x03\x02\x02\x02\xE3\xE4\x03\x02\x02" +
		"\x02\xE4\'\x03\x02\x02\x02\xE5\xE3\x03\x02\x02\x02\xE6\xE7\x05*\x16\x02" +
		"\xE7)\x03\x02\x02\x02\xE8\xEF\x05.\x18\x02\xE9\xEF\x05,\x17\x02\xEA\xEB" +
		"\x07%\x02\x02\xEB\xEC\x05&\x14\x02\xEC\xED\x07&\x02\x02\xED\xEF\x03\x02" +
		"\x02\x02\xEE\xE8\x03\x02\x02\x02\xEE\xE9\x03\x02\x02\x02\xEE\xEA\x03\x02" +
		"\x02\x02\xEF+\x03\x02\x02\x02\xF0\xF1\x07$\x02\x02\xF1-\x03\x02\x02\x02" +
		"\xF2\xF8\x07#\x02\x02\xF3\xF8\x07J\x02\x02\xF4\xF8\x07N\x02\x02\xF5\xF8" +
		"\x05F$\x02\xF6\xF8\x05H%\x02\xF7\xF2\x03\x02\x02\x02\xF7\xF3\x03\x02\x02" +
		"\x02\xF7\xF4\x03\x02\x02\x02\xF7\xF5\x03\x02\x02\x02\xF7\xF6\x03\x02\x02" +
		"\x02\xF8/\x03\x02\x02\x02\xF9\xFB\x07-\x02\x02\xFA\xF9\x03\x02\x02\x02" +
		"\xFA\xFB\x03\x02\x02\x02\xFB\u0101\x03\x02\x02\x02\xFC\xFE\x07a\x02\x02" +
		"\xFD\xFC\x03\x02\x02\x02\xFD\xFE\x03\x02\x02\x02\xFE\u0101\x03\x02\x02" +
		"\x02\xFF\u0101\x06\x19\x07\x02\u0100\xFA\x03\x02\x02\x02\u0100\xFD\x03" +
		"\x02\x02\x02\u0100\xFF\x03\x02\x02\x02\u0101\u0102\x03\x02\x02\x02\u0102" +
		"\u0103\x052\x1A\x02\u0103\u0104\x05<\x1F\x02\u0104\u0106\x03\x02\x02\x02" +
		"\u0105\u0100\x03\x02\x02\x02\u0106\u0107\x03\x02\x02\x02\u0107\u0105\x03" +
		"\x02\x02\x02\u0107\u0108\x03\x02\x02\x02\u01081\x03\x02\x02\x02\u0109" +
		"\u0110\x05D#\x02\u010A\u0110\x05@!\x02\u010B\u0110\x05B\"\x02\u010C\u0110" +
		"\x054\x1B\x02\u010D\u0110\x05\x14\v\x02\u010E\u0110\x05J&\x02\u010F\u0109" +
		"\x03\x02\x02\x02\u010F\u010A\x03\x02\x02\x02\u010F\u010B\x03\x02\x02\x02" +
		"\u010F\u010C\x03\x02\x02\x02\u010F\u010D\x03\x02\x02\x02\u010F\u010E\x03" +
		"\x02\x02\x02\u01103\x03\x02\x02\x02\u0111\u0118\x056\x1C\x02\u0112\u0118" +
		"\x05\x16\f\x02\u0113\u0118\x05\b\x05\x02\u0114\u0118\x05 \x11\x02\u0115" +
		"\u0118\x05$\x13\x02\u0116\u0118\x05\x1A\x0E\x02\u0117\u0111\x03\x02\x02" +
		"\x02\u0117\u0112\x03\x02\x02\x02\u0117\u0113\x03\x02\x02\x02\u0117\u0114" +
		"\x03\x02\x02\x02\u0117\u0115\x03\x02\x02\x02\u0117\u0116\x03\x02\x02\x02" +
		"\u01185\x03\x02\x02\x02\u0119\u011A\x05&\x14\x02\u011A\u011B\x07I\x02" +
		"\x02\u011B\u011C\x05&\x14\x02\u011C7\x03\x02\x02\x02\u011D\u011E\x07\x1C" +
		"\x02\x02\u011E\u011F\x07%\x02\x02\u011F\u0122\x05\x1E\x10\x02\u0120\u0121" +
		"\x07,\x02\x02\u0121\u0123\x05&\x14\x02\u0122\u0120\x03\x02\x02\x02\u0122" +
		"\u0123\x03\x02\x02\x02\u0123\u0124\x03\x02\x02\x02\u0124\u0125\x07&\x02" +
		"\x02\u01259\x03\x02\x02\x02\u0126\u012B\x05&\x14\x02\u0127\u0128\x07," +
		"\x02\x02\u0128\u012A\x05&\x14\x02\u0129\u0127\x03\x02\x02\x02\u012A\u012D" +
		"\x03\x02\x02\x02\u012B\u0129\x03\x02\x02\x02\u012B\u012C\x03\x02\x02\x02" +
		"\u012C;\x03\x02\x02\x02\u012D\u012B\x03\x02\x02\x02\u012E\u0133\x07-\x02" +
		"\x02\u012F\u0133\x07\x02\x02\x03\u0130\u0133\x07a\x02\x02\u0131\u0133" +
		"\x06\x1F\b\x02\u0132\u012E\x03\x02\x02\x02\u0132\u012F\x03\x02\x02\x02" +
		"\u0132\u0130\x03\x02\x02\x02\u0132\u0131\x03\x02\x02\x02\u0133=\x03\x02" +
		"\x02\x02\u0134\u0139\x07$\x02\x02\u0135\u0136\x07,\x02\x02\u0136\u0138" +
		"\x07$\x02\x02\u0137\u0135\x03\x02\x02\x02\u0138\u013B\x03\x02\x02\x02" +
		"\u0139\u0137\x03\x02\x02\x02\u0139\u013A\x03\x02\x02\x02\u013A?\x03\x02" +
		"\x02\x02\u013B\u0139\x03\x02\x02\x02\u013C\u013D\x07\x14\x02\x02\u013D" +
		"\u013E\x05&\x14\x02\u013E\u0144\x05\x14\v\x02\u013F\u0142\x07\x0E\x02" +
		"\x02\u0140\u0143\x05@!\x02\u0141\u0143\x05\x14\v\x02\u0142\u0140\x03\x02" +
		"\x02\x02\u0142\u0141\x03\x02\x02\x02\u0143\u0145\x03\x02\x02\x02\u0144" +
		"\u013F\x03\x02\x02\x02\u0144\u0145\x03\x02\x02\x02\u0145A\x03\x02\x02" +
		"\x02\u0146\u0148\x07\x1A\x02\x02\u0147\u0149\x05:\x1E\x02\u0148\u0147" +
		"\x03\x02\x02\x02\u0148\u0149\x03\x02\x02\x02\u0149C\x03\x02\x02\x02\u014A" +
		"\u014B\x07\x18\x02\x02\u014B\u014C\x05&\x14\x02\u014C\u014D\x05\x14\v" +
		"\x02\u014DE\x03\x02\x02\x02\u014E\u014F\t\x06\x02\x02\u014FG\x03\x02\x02" +
		"\x02\u0150\u0151\x07\x05\x02\x02\u0151\u0152\x05\n\x06\x02\u0152\u0153" +
		"\x05\x14\v\x02\u0153I\x03\x02\x02\x02\u0154\u0155\x07\n\x02\x02\u0155" +
		"\u0156\x05\x06\x04\x02\u0156K\x03\x02\x02\x02%NTYbmtx}\x81\x89\x8D\x8F" +
		"\x94\x98\xA4\xA8\xBB\xD0\xE1\xE3\xEE\xF7\xFA\xFD\u0100\u0107\u010F\u0117" +
		"\u0122\u012B\u0132\u0139\u0142\u0144\u0148";
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
	public VAR(): TerminalNode { return this.getToken(SimpleParser.VAR, 0); }
	public varSpec(): VarSpecContext[];
	public varSpec(i: number): VarSpecContext;
	public varSpec(i?: number): VarSpecContext | VarSpecContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VarSpecContext);
		} else {
			return this.getRuleContext(i, VarSpecContext);
		}
	}
	public L_PAREN(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.L_PAREN, 0); }
	public R_PAREN(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.R_PAREN, 0); }
	public eos(): EosContext[];
	public eos(i: number): EosContext;
	public eos(i?: number): EosContext | EosContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EosContext);
		} else {
			return this.getRuleContext(i, EosContext);
		}
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


export class VarSpecContext extends ParserRuleContext {
	public identifierList(): IdentifierListContext {
		return this.getRuleContext(0, IdentifierListContext);
	}
	public type_(): Type_Context {
		return this.getRuleContext(0, Type_Context);
	}
	public ASSIGN(): TerminalNode { return this.getToken(SimpleParser.ASSIGN, 0); }
	public expressionList(): ExpressionListContext {
		return this.getRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SimpleParser.RULE_varSpec; }
	// @Override
	public enterRule(listener: SimpleParserListener): void {
		if (listener.enterVarSpec) {
			listener.enterVarSpec(this);
		}
	}
	// @Override
	public exitRule(listener: SimpleParserListener): void {
		if (listener.exitVarSpec) {
			listener.exitVarSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SimpleParserVisitor<Result>): Result {
		if (visitor.visitVarSpec) {
			return visitor.visitVarSpec(this);
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
	public MUTEX(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.MUTEX, 0); }
	public WAITGROUP(): TerminalNode | undefined { return this.tryGetToken(SimpleParser.WAITGROUP, 0); }
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
	public sendStmt(): SendStmtContext | undefined {
		return this.tryGetRuleContext(0, SendStmtContext);
	}
	public varDecl(): VarDeclContext | undefined {
		return this.tryGetRuleContext(0, VarDeclContext);
	}
	public funcDecl(): FuncDeclContext | undefined {
		return this.tryGetRuleContext(0, FuncDeclContext);
	}
	public assignment(): AssignmentContext | undefined {
		return this.tryGetRuleContext(0, AssignmentContext);
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
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
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


