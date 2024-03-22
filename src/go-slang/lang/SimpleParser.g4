parser grammar SimpleParser;

// Insert here @header for C++ parser.

options {
    tokenVocab = GoLexer;
    superClass = GoParserBase;
}

global_scope
    :  ((varDecl | funcDecl) eos)* 
    ;

arguments
    : L_PAREN (expressionList)? R_PAREN
    ;

funcApp
    : IDENTIFIER arguments
    ;

funcDecl
    : FUNC IDENTIFIER signature block
    ;

signature
    : L_PAREN parameters R_PAREN
    ;

parameters
    : (parameterDecl (COMMA parameterDecl)* COMMA?)?
    ;

parameterDecl
    : identifierList?
    ;

block
    : L_CURLY statementList? R_CURLY
    ;

// varDecl
//    : VAR IDENTIFIER ASSIGN expression
//    | IDENTIFIER DECLARE_ASSIGN expression
//    ;

varDecl
    : VAR identifierList ASSIGN expressionList
    | identifierList DECLARE_ASSIGN expressionList
    ;

//assignment
//    :  IDENTIFIER ASSIGN expression
//    ;

assignment
    : identifierList assign_op expressionList
    ;

assign_op
    :  ASSIGN
    ;

expressionStmt
    : expression
    ;

expression
    : funcApp #FUNCAPP
    | unary_op = (MINUS | EXCLAMATION) expression #UNARYOP
    | expression bin_op = (DIV | STAR) expression #BINOP
    | expression bin_op = (PLUS | MINUS) expression #BINOP
    | expression rel_op = (
        EQUALS
        | NOT_EQUALS
        | LESS
        | LESS_OR_EQUALS
        | GREATER
        | GREATER_OR_EQUALS
    ) expression #RELOP
    | expression LOGICAL_AND expression #LOGOP
    | expression LOGICAL_OR expression #LOGOP
    | primaryExpr #PRIMARY
    ;

primaryExpr
    : operand
    ;

operand
    : literal
    | operandName
    | L_PAREN expression R_PAREN
    ;

operandName
    : IDENTIFIER
    ;

literal
    : NIL_LIT
    | DECIMAL_LIT
    | FLOAT_LIT
    | TRUE
    | FALSE
    ;

statementList
    : ((SEMI? | EOS? | {this.closingBracket()}?) statement eos)+
    ;

statement
    : forStmt
//    | multiAssignment
//    | multiVarDecl
    | ifStmt
    | returnStmt
    | simpleStmt
    | block
    ;

simpleStmt
    : assignment
    | varDecl
    | funcDecl
    | expressionStmt
    ;

expressionList
    : expression (COMMA expression)*
    ;

eos
    : SEMI
    | EOF
    | EOS
    | {this.closingBracket()}?
    ;

identifierList
    : IDENTIFIER (COMMA IDENTIFIER)*
    ;

ifStmt
    : IF expression block (ELSE (ifStmt | block))?
    ;

returnStmt
    : RETURN expressionList?
    ;

forStmt
    : FOR expression block
    ;