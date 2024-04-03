// type_comp has the typing

import { isArray } from "lodash"
import { ASTNode, BinOpNode, BlockNode, FuncAppNode, FuncDeclNode, IfStmtNode, LiteralNode, LogicalNode, NameNode, ReturnStmtNode, SequenceNode, Tag, UnOpNode, VarDeclNode } from "../ast/AST"
import { is_boolean, is_number, is_string, is_undefined } from "../vm/utils"
import { TypeValue, equal_type, equal_types, extend_type_environment, lookup_type, unparse_type, unparse_types } from "./typeenvironment"

// TODO: STILL MISSING GO MAKE ADD DONE LOCK SEND RECV

// functions for each component tag
const type_comp = {
    // for go slang if is_number we put as int? then is float float and also string
    // there shouldnt be any other literals, oh func literals should be handled by the func tag
    // think about lambdas
    lit:
        (comp: LiteralNode, te: any) => is_number(comp.val) 
                      ? Number.isInteger(comp.val)
                      : "int"
                      // if not integer we treat as float
                      ? "float"
                      : is_boolean(comp.val)
                      ? "bool"
                      : is_string(comp.val)
                      ? "string"
                      : is_undefined(comp.val)
                      ? "undefined"
                      : Error("unknown literal: " + comp.val),
    // if it's a nam, we should have extended the env with scan out declarations in blk and
    // put in the type from the annotated type
    nam:
        (comp: NameNode, te: any) => lookup_type(comp.sym, te),
    // for chan send we can break it up into lookup type of the chan expr on the left
    // and then look up type of the receive
    // convert primitive ops to function applications
    unop:
        (comp: UnOpNode, te: any) => {
            const convertToApp: FuncAppNode = {
                tag: Tag.APP, fun: { tag: Tag.NAME, sym: comp.sym }, args: [comp.frst],
                _arity: 1
            }
            return type(convertToApp, te)
        },

    binop:
        (comp: BinOpNode, te: any) => {
            const convertToApp: FuncAppNode = {
                tag: Tag.APP, fun: { tag: Tag.NAME, sym: comp.sym }, args: [comp.frst, comp.scnd],
                _arity: 2
            }
            return type(convertToApp, te)
        },
    log:
        (comp: LogicalNode, te: any) => {
            const convertToApp: FuncAppNode = {
                tag: Tag.APP, fun: { tag: Tag.NAME, sym: comp.sym }, args: [comp.frst, comp.scnd],
                _arity: 2
            }
            return type(convertToApp, te)
        },
    // NO COND EXPR IN GO SLANG ONLY COND STMT                            
    cond_stmt: 
        (comp: IfStmtNode, te: any) => {
            const t0 = type(comp.pred, te)
            if (t0 !== "bool") 
                throw new Error("expected predicate type: bool, " +
                      "actual predicate type: " + 
                      unparse_type(t0))
            const t1 = type(comp.cons, te)
            const t2 = type(comp.alt, te)
            if (equal_type(t1, t2)) {
                return t1
            } else {
                throw new Error("types of branches not matching; " +
                      "consequent type: " + 
                      unparse_type(t1) + ", " +
                      "alternative type: " + 
                      unparse_type(t2))
            }
        },
    // outside of function bodies,
    // conditional statements are 
    // treated as conditional expressions
    // probably have to change this to anything for go right since we dont require both sides
    // to return the same value
    // for const/var declaration we also need to check that the aritys match up
    fun:
        (comp: FuncDeclNode, te: any) => {
            const extended_te = extend_type_environment(
                             comp.prms,
                             comp.type.paramTypes,
                             te)
            const body_type = type_fun_body(comp.body, extended_te)
            // should be equal types cus can have more than 1 value and we want to make the return types be in the same order
            if (equal_types(body_type, comp.type.returnTypes)) {
                return "undefined"
            } else {
                throw new Error("type error in function declaration; " +
                          "declared return type: " +
                          unparse_types(comp.type.returnTypes) + ", " +
                          "actual return type: " + 
                          unparse_type(body_type))
            }
        },
    app:
        (comp: FuncAppNode, te: any) => {
            const fun_type = type(comp.fun, te)
            if (fun_type.tag !== "fun")
                throw new Error("type error in application; function " +
                          "expression must have function type; " +
                          "actual type: " + unparse_type(fun_type))
            // paramTypes is a list of types                          
            const expected_arg_types = fun_type.paramTypes
            const actual_arg_types = comp.args.map(e => type(e, te)) as TypeValue[]
            if (equal_types(actual_arg_types, expected_arg_types)) {
                return fun_type.returnTypes
            } else {
                throw new Error("type error in application; " +
                      "expected argument types: " + 
                      unparse_types(expected_arg_types) + ", " +
                      "actual argument types: " + 
                      unparse_types(actual_arg_types))
            }
        },
    let:
        (comp: VarDeclNode, te:any) => {
            const declared_type = comp.type
            const actual_types = [];
            for(const assgn of comp.assignments.list) {
                const res = type(assgn, te)
                if(isArray(res)) {
                    // type of funcApp can be an array
                    actual_types.push(...res)
                } else {
                    actual_types.push(res)
                }
            }
            // check length
            if(comp.syms.IDENTS.length > actual_types.length) {
                throw new Error("Too few expressions on the RHS!")
            } else if (comp.syms.IDENTS.length < actual_types.length) {
                throw new Error("Too many expressions on the RHS!") 
            }
            
            for(const actType of actual_types) {
                if(!equal_type(actType, declared_type)) {
                    throw new Error("type error in constant declaration; " + 
                    "declared type: " +
                    unparse_type(declared_type) + ", " +
                    "actual type: " + 
                    unparse_type(actType))
                }
            }

            return "undefined"
        },
    // we ignore the RHS    
    mut:
        (comp: VarDeclNode, te:any) => {},
    // we ignore the RHS
    waitgroup:
        (comp: VarDeclNode, te:any) => {},
    // the global scope rules for go slang means we only allow varDecl and funcDecl, so no
    // return statements outside of func body by default since varDecl requires expression on RHS
    // and expressions dont include return statements
    seq: 
        (comp: SequenceNode, te: any) => {
            const component_types = comp.stmts.map(
                                        s => type(s, te))
            return component_types.length === 0
                   ? "undefined"
                   : component_types[component_types.length - 1]
        },
    blk:
        (comp: BlockNode, te: any) => {
            // scan out declarations
            // if it's a single node just make it a sequence
            if(comp.body.tag !== "seq") {
                const seq: SequenceNode = { tag: Tag.SEQ, stmts: [comp.body] }
                comp.body = seq
            }

            const decls = (comp.body as SequenceNode).stmts.filter(
                             comp => comp.tag === "let" ||
                                     comp.tag === "mut" ||
                                     comp.tag === "waitgroup" ||
                                     comp.tag === "fun")
            const declared_symbols = [];
            const declared_types = [];
            for(const comp of decls) {
                if(comp.tag === "var" || comp.tag === "mut" || comp.tag === "waitgroup") {
                    declared_symbols.push(...(comp as VarDeclNode).syms.IDENTS)
                    for(let i = 0; i < (comp as VarDeclNode).syms.IDENTS.length; ++i) {
                        declared_types.push((comp as VarDeclNode).type)
                    }
                } else if (comp.tag === "fun") {
                    declared_symbols.push((comp as FuncDeclNode).sym)
                    declared_types.push((comp as FuncDeclNode).type)
                }
            }
            const extended_te = extend_type_environment(
                             declared_symbols,
                             declared_types,
                             te)
            return type(comp.body, extended_te)
        },
    ret:
        (comp:ReturnStmtNode, te: any) => comp
    }
    
    const type = (comp: ASTNode, te: any) =>
        type_comp[comp.tag](comp, te)
    
    // type_fun_body_stmt has the typing
    // functions for function body statements
    // for each component tag
    // TODO: IF STMT HANDLING CAUSE IT MIGHT NOT BE TERMINATING
    const type_fun_body_stmt = {
    cond_stmt: 
        (comp: IfStmtNode, te:any) => {
            const t0 = type(comp.pred, te)
            if (t0 !== "bool") 
                throw new Error("expected predicate type: bool, " +
                      "actual predicate type: " + 
                      unparse_type(t0))
            const t1 = type_fun_body(comp.cons, te)
            const t2 = type_fun_body(comp.alt, te)
            if (equal_type(t1, t2)) {
                return t1
            } else {
                throw new Error("types of branches not matching; " +
                      "consequent type: " + 
                      unparse_type(t1) + ", " +
                      "alternative type: " + 
                      unparse_type(t2))
            }
        },
    seq: 
        (comp: SequenceNode, te: any) => {
            for (const stmt of comp.stmts) {
                 const stmt_type = type_fun_body(stmt, te)
                 if (equal_type(stmt_type, "undefined")) {
                 } else {
                     return stmt_type
                 }
            }
            return "undefined"
        },
    blk:
        (comp: BlockNode, te:any) => {
            // scan out declarations
            // if it's a single node just make it a sequence
            if(comp.body.tag !== "seq") {
                const seq: SequenceNode = { tag: Tag.SEQ, stmts: [comp.body] }
                comp.body = seq
            }

            const decls = (comp.body as SequenceNode).stmts.filter(
                             comp => comp.tag === "let" ||
                                     comp.tag === "mut" ||
                                     comp.tag === "waitgroup" ||
                                     comp.tag === "fun")
            const declared_symbols = [];
            const declared_types = [];
            for(const comp of decls) {
                if(comp.tag === "let" || comp.tag === "mut" || comp.tag === "waitgroup") {
                    declared_symbols.push(...(comp as VarDeclNode).syms.IDENTS)
                    for(let i = 0; i < (comp as VarDeclNode).syms.IDENTS.length; ++i) {
                        declared_types.push((comp as VarDeclNode).type)
                    }
                } else if (comp.tag === "fun") {
                    declared_symbols.push((comp as FuncDeclNode).sym)
                    declared_types.push((comp as FuncDeclNode).type)
                }
            }
            const extended_te = extend_type_environment(
                             declared_symbols,
                             declared_types,
                             te)
            return type_fun_body(comp.body, extended_te)
        },
    ret:
        (comp:ReturnStmtNode, te: any) => {
            const returnTypes = [];
            for(const exp of comp.expr) {
                const res = type(exp, te)
                if(isArray(res)) {
                    returnTypes.push(...res)
                } else {
                    returnTypes.push(res)
                }
            }
            return returnTypes
        }
    }
    
    const type_fun_body = (comp:ASTNode, te:any) => {
        const handler = type_fun_body_stmt[comp.tag]
        if (handler) {
            return handler(comp, te)
        } else {
            type(comp, te)
            return "undefined"
        }
    }