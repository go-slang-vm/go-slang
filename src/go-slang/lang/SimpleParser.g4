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
    | functionLit arguments
    ;

funcDecl
    : FUNC IDENTIFIER signature block
    ;

signature
    : L_PAREN parameters R_PAREN result?
    ;

result
    : L_PAREN typeList R_PAREN
    | type_
    ;

typeList
    : (type_ | NIL_LIT) (COMMA (type_ | NIL_LIT))*
    ;

parameters
    : (parameterDecl (COMMA parameterDecl)* COMMA?)?
    ;

parameterDecl
    : (identifierList type_)?
    ;

block
    : L_CURLY statementList? R_CURLY
    ;

// varDecl
//    : VAR IDENTIFIER ASSIGN expression
//    | IDENTIFIER DECLARE_ASSIGN expression
//    ;

// NOTE WE ARE FORCING TYPES TO BE THERE
varDecl
    : varMutexDecl
    | varWaitGroupDecl
    | regVarDecl
    ;

regVarDecl
    : VAR identifierList type_ (ASSIGN expressionList)?
    ;

varMutexDecl
    : VAR identifierList MUTEX
    ;

varWaitGroupDecl
    : VAR identifierList WAITGROUP
    ;

shortVarDecl
    : identifierList type_ DECLARE_ASSIGN expressionList
    ;

// we only allow these types for now
// note we do not have multiple sizes for ints and floats since JS just defaults to 64 bit floats
type_
    : INT
    | BOOL
    | STRING
    | FLOAT
    | channelType
    ;

channelType
    : CHAN type_
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
    : makeExpr #MAKEOP
    | funcApp #FUNCAPP
    | unary_op = (MINUS | EXCLAMATION) expression #UNARYOP
    | expression bin_op = (DIV | STAR | MOD) expression #BINOP
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
    | RECEIVE expression #RECVOP
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
    | string_
    | functionLit
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
    | goStmt
    ;

simpleStmt
    : sendStmt
//    | lockStmt
//    | unlockStmt
//    | addStmt
//    | doneStmt
//    | waitStmt
    | varDecl
    | funcDecl
    | assignment
    | expressionStmt
    | shortVarDecl
    ;

sendStmt
    : channel = expression RECEIVE expression
    ;

lockStmt
    : mutexLock = LOCK L_PAREN IDENTIFIER R_PAREN
    ;

unlockStmt
    : mutexUnlock = UNLOCK L_PAREN IDENTIFIER R_PAREN
    ;

addStmt
    : waitgroupAdd = ADD L_PAREN IDENTIFIER COMMA expression R_PAREN
    ;

doneStmt
    : waitgroupDone = DONE L_PAREN IDENTIFIER R_PAREN 
    ;

waitStmt
    : waitgroupwait = WAIT L_PAREN IDENTIFIER R_PAREN 
    ;

// we only allow making channels for now so we make this very restrictive
// if the comma and DECIMAL_LIT is not present, it is an unbuffered channel
makeExpr
    : MAKE L_PAREN channelType (COMMA DECIMAL_LIT)? R_PAREN
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

string_
    : RAW_STRING_LIT
    | INTERPRETED_STRING_LIT
    ;

functionLit
    : FUNC signature block
    ; // function

goStmt
    : GO funcApp
    ;