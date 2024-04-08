// type_comp has the typing

import { isArray } from "lodash"
import { ASTNode, AssignNode, BinOpNode, BlockNode, ForStmtNode, FuncAppNode, FuncDeclNode, FunctionLiteralNode, GoStmtNode, IfStmtNode, LiteralNode, LogicalNode, MakeAppNode, NameNode, RecvExprNode, ReturnStmtNode, SendStmtNode, SequenceNode, Tag, UnOpNode, VarDeclNode } from "../ast/AST"
import { is_boolean, is_number, is_string, is_undefined } from "../vm/utils"
import { equal_array_types, equal_type, extend_type_environment, global_type_environment, lookup_type, string_concat_type, unparse_type, unparse_types } from "./typeenvironment"


// functions for each component tag
const type_comp = {
    // for go slang if is_number we put as int? then is float float and also string
    // there shouldnt be any other literals, oh func literals should be handled by the func tag
    // think about lambdas
    lit:
        (comp: LiteralNode, te: any) => {
            //console.log("val: " + comp.val + " typeof: " + typeof comp.val);
            if (is_number(comp.val)) {
                return Number.isInteger(comp.val) ? "int" : "float"
            } else if (is_boolean(comp.val)) {
                return "bool"
            } else if (is_string(comp.val)) {
                return "string"
            } else if (is_undefined(comp.val)) {
                return "undefined"
            } else {
                throw new Error("unknown literal: " + comp.val)
            }
        },
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
    cond:
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
            const body = type_fun_body(comp.body, extended_te, { retType: comp.type.returnTypes, name: comp.sym })
            if (isArray(body) && !equal_array_types(body, comp.type.returnTypes)) {
                throw new Error("type error in function declaration; expected return type: " + unparse_types(comp.type.returnTypes) + " actual return type: " + unparse_types(body))
            } else if (!isArray(body) && comp.type.returnTypes.length != 0) {
                // if body is not array it will be "undefined"
                // in func body, body will be a stmt list so it will return either [] or [...] so should not actually reach here
                throw new Error("type error in function declaration; expected return type: " + unparse_types(comp.type.returnTypes) + " actual return type: " + unparse_type(body))
            }
            return "undefined"
        },
    // TODO: rmb to specify in report that we define Println as taking only 1 argument of any type
    app:
        (comp: FuncAppNode, te: any) => {
            // Special case handling for Println
            if (comp.fun.tag === "nam") {
                const sym = (comp.fun as NameNode).sym;
                if (sym === "Println") {
                    if(comp.args.length !== 1) {
                        throw new Error("Println expects 1 arguement of any type")
                    }

                    // type check the 1 arg
                    type(comp.args[0], te)
                    return []
                }
            }
            let fun_type = type(comp.fun, te)
            
            if (fun_type.tag !== "fun")
                throw new Error("type error in application; function " +
                    "expression must have function type; " +
                    "actual type: " + unparse_type(fun_type))

            // paramTypes is a list of types                          
            let expected_arg_types = fun_type.paramTypes

            // if arg ret value is in an array we only take it out if there is 1 value
            const actual_arg_types = comp.args.map(e => type(e, te)).map(e => (isArray(e) && e.length == 1) ? e[0] : e)
            
            if (comp.fun.tag === "nam") {
                const sym = (comp.fun as NameNode).sym;
                if (sym === "+") {
                    if (actual_arg_types[0] === "string") {
                        expected_arg_types = ['string', 'string']
                        fun_type = string_concat_type
                    }
                } 
            }

            //console.log(actual_arg_types)
            if (equal_array_types(actual_arg_types, expected_arg_types)) {
                //console.log("ret type for sym: "+ (comp.fun as NameNode).sym + " " + fun_type.returnTypes)
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
        (comp: VarDeclNode, te: any) => {
            const declared_type = comp.type
            const actual_types = [];
            for (const assgn of comp.assignments.list) {
                const res = type(assgn, te)
                // console.log("assgn: " + JSON.stringify(assgn) + " res: " + res);
                if (isArray(res)) {
                    // type of funcApp can be an array
                    actual_types.push(...res)
                } else {
                    actual_types.push(res)
                }
            }
            // check length
            if (comp.syms.IDENTS.length > actual_types.length) {
                throw new Error("Too few expressions on the RHS of variable declaration!")
            } else if (comp.syms.IDENTS.length < actual_types.length) {
                throw new Error("Too many expressions on the RHS of variable declaration!")
            }

            for (const actType of actual_types) {
                // console.log("actType: " + actType)
                if (!equal_type(actType, declared_type)) {
                    throw new Error("type error in variable declaration; " +
                        "declared type: " +
                        unparse_type(declared_type) + ", " +
                        "actual type: " +
                        unparse_type(actType))
                }
            }

            return "undefined"
        },
    assmt:
        (comp: AssignNode, te: any) => {
            const declared_types = []
            for (const sym of comp.syms.IDENTS) {
                declared_types.push(lookup_type(sym, te))
            }
            const actual_types = [];
            for (const assgn of comp.exprs.list) {
                const res = type(assgn, te)
                // console.log("assgn: "+ JSON.stringify(assgn) + " res: " + res);
                if (isArray(res)) {
                    // type of funcApp can be an array
                    actual_types.push(...res)
                } else {
                    actual_types.push(res)
                }
            }
            // check length
            if (comp.syms.IDENTS.length > actual_types.length) {
                throw new Error("Too few expressions on the RHS of assignment!")
            } else if (comp.syms.IDENTS.length < actual_types.length) {
                throw new Error("Too many expressions on the RHS of assignment!")
            }

            for (let i = 0; i < actual_types.length; ++i) {
                if (!equal_type(actual_types[i], declared_types[i])) {
                    throw new Error("type error in assignment; " +
                        "declared type: " +
                        unparse_type(declared_types[i]) + ", " +
                        "actual type: " +
                        unparse_type(actual_types[i]))
                }
            }
        },
    // we ignore the RHS    
    mut:
        (comp: VarDeclNode, te: any) => { },
    // we ignore the RHS
    waitgroup:
        (comp: VarDeclNode, te: any) => { },
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
            if (comp.body.tag !== "seq") {
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
            for (const comp of decls) {
                if (comp.tag === "let" || comp.tag === "mut" || comp.tag === "waitgroup") {
                    declared_symbols.push(...(comp as VarDeclNode).syms.IDENTS)
                    for (let i = 0; i < (comp as VarDeclNode).syms.IDENTS.length; ++i) {
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
        (comp: ReturnStmtNode, te: any) => comp,    
    lam:
        (comp: FunctionLiteralNode, te: any) => {
            const extended_te = extend_type_environment(
                comp.prms,
                comp.type.paramTypes,
                te)

            const body = type_fun_body(comp.body, extended_te, { retType: comp.type.returnTypes, name: "lambda" })
            if (isArray(body) && !equal_array_types(body, comp.type.returnTypes)) {
                throw new Error("type error in function declaration; expected return type: " + unparse_types(comp.type.returnTypes) + " actual return type: " + unparse_types(body))
            } else if (!isArray(body) && comp.type.returnTypes.length != 0) {
                throw new Error("type error in function declaration; expected return type: " + unparse_types(comp.type.returnTypes) + " actual return type: " + unparse_type(body))
            }
            
            return comp.type
        },
    make:
        (comp: MakeAppNode, te: any) => {
            return comp.chanType
        },
    go:
        (comp: GoStmtNode, te: any) => {
            type(comp.funcApp, te)
            return "undefined"
        },
    lock:
        (comp: FuncAppNode, te: any) => {
            // parser already ensures only 1 arg
            const res = type(comp.args[0], te)
            if(isArray(res)) {
                if(!equal_array_types(res, ["mutex"])) {
                    throw new Error("type error in lock; expected type: mutex" + " actual type: " + unparse_types(res))
                }
            }

            if(is_string(res)) {
                if(res !== "mutex") {
                    throw new Error("type error in lock; expected type: mutex" + " actual type: " + res)
                } 
            }
            return "undefined"
        },
    unlock:
        (comp: FuncAppNode, te: any) => {
            // parser already ensures only 1 arg
            const res = type(comp.args[0], te)
            if(isArray(res)) {
                if(!equal_array_types(res, ["mutex"])) {
                    throw new Error("type error in unlock; expected type: mutex" + " actual type: " + unparse_types(res))
                }
            }

            if(is_string(res)) {
                if(res !== "mutex") {
                    throw new Error("type error in unlock; expected type: mutex" + " actual type: " + res)
                } 
            }
            return "undefined"
        },
    done:
        (comp: FuncAppNode, te: any) => {
            // parser already ensures only 1 arg
            const res = type(comp.args[0], te)
            if(isArray(res)) {
                if(!equal_array_types(res, ["waitgroup"])) {
                    throw new Error("type error in done; expected type: waitgroup" + " actual type: " + unparse_types(res))
                }
            }

            if(is_string(res)) {
                if(res !== "waitgroup") {
                    throw new Error("type error in done; expected type: waitgroup" + " actual type: " + res)
                } 
            }
            return "undefined"
        },
    wait:
        (comp: FuncAppNode, te: any) => {
            // parser already ensures only 1 arg
            const res = type(comp.args[0], te)
            if(isArray(res)) {
                if(!equal_array_types(res, ["waitgroup"])) {
                    throw new Error("type error in wait; expected type: waitgroup" + " actual type: " + unparse_types(res))
                }
            }

            if(is_string(res)) {
                if(res !== "waitgroup") {
                    throw new Error("type error in wait; expected type: waitgroup" + " actual type: " + res)
                } 
            }
            return "undefined"
        },
    add:
        (comp: FuncAppNode, te: any) => {
            // parser already ensures only 2 args
            // make sure first is waitgroup
            const res = type(comp.args[0], te)
            if(isArray(res)) {
                if(!equal_array_types(res, ["waitgroup"])) {
                    throw new Error("type error in add; expected type: waitgroup" + " actual type: " + unparse_types(res))
                }
            }

            if(is_string(res)) {
                if(res !== "waitgroup") {
                    throw new Error("type error in add; expected type: waitgroup" + " actual type: " + res)
                } 
            }
            
            // now make sure second is an int
            const res2 = type(comp.args[1], te)
            if(isArray(res2)) {
                if(!equal_array_types(res2, ["int"])) {
                    throw new Error("type error in add; expected type: int" + " actual type: " + unparse_types(res2))
                }
            }

            if(is_string(res2)) {
                if(res2 !== "int") {
                    throw new Error("type error in add; expected type: int" + " actual type: " + res2)
                } 
            }
            return "undefined"
        },
    recv:
        (comp: RecvExprNode, te: any) => {
            const res = type(comp.frst, te)
            if(isArray(res)) {
                if(res.length != 1) {
                    throw new Error("type error in chan recv; expected type: chan" + " actual type: " + unparse_types(res))
                }
                const resString = res[0]
                if(resString.length < 4 || resString.substring(0, 4) !== "chan") {
                    throw new Error("type error in chan recv; expected type: chan" + " actual type: " + unparse_types(res))
                }
                return resString.slice(5)
            }

            if(is_string(res)) {
                if(res.length < 4 || res.substring(0, 4) !== "chan") {
                    throw new Error("type error in chan recv; expected type: chan" + " actual type: " + res)
                }
                return res.slice(5)
            }

            // should never reach here
            return "undefined"
        },
    send:
        (comp: SendStmtNode, te: any) => {
            // this has to be a channel
            const res = type(comp.frst, te)
            let chanElemType: string | undefined = undefined;
            if(isArray(res)) {
                if(res.length != 1) {
                    throw new Error("type error in chan send; expected type: chan" + ", actual type: " + unparse_types(res))
                }
                const resString = res[0]
                if(resString.length < 4 || resString.substring(0, 4) !== "chan") {
                    throw new Error("type error in chan send; expected type: chan" + ", actual type: " + unparse_types(res))
                }
                chanElemType = resString.slice(5)
            }

            if(is_string(res)) {
                if(res.length < 4 || res.substring(0, 4) !== "chan") {
                    throw new Error("type error in chan send; expected type: chan" + ", actual type: " + res)
                }
                chanElemType = res.slice(5)
            }

            if(chanElemType === undefined) {
                // should never reach here
                throw new Error("channel should be typed!")
            }

            // now we check the right hand side is the same
            const rhsType = type(comp.scnd, te)
            if(isArray(rhsType)) {
               if(!equal_array_types(rhsType, [chanElemType])) {
                throw new Error("type error in chan send; expected type: " + chanElemType +", actual type: " + unparse_types(rhsType))
               }
            }

            if(is_string(rhsType)) {
                if(!equal_type(rhsType, chanElemType)) {
                 throw new Error("type error in chan send; expected type: " + chanElemType +", actual type: " + unparse_type(rhsType))
                }
             }
            
            return "undefined"
        },
}

const type = (comp: ASTNode, te: any) =>
    type_comp[comp.tag](comp, te)

// type_fun_body_stmt has the typing
// functions for function body statements
// for each component tag
// TODO: IF STMT HANDLING CAUSE IT MIGHT NOT BE TERMINATING
const type_fun_body_stmt = {
    cond:
        (comp: IfStmtNode, te: any, func_ctx: any) => {
            const t0 = type(comp.pred, te)
            if ((isArray(t0) && (t0.length != 1 || t0[0] !== "bool"))) {
                throw new Error("expected predicate type: bool, " +
                    "actual predicate type: " +
                    unparse_types(t0))
            }
            
            if ((is_string(t0) && t0 !== "bool")) {
                throw new Error("expected predicate type: bool, " +
                "actual predicate type: " +
                unparse_type(t0)) 
            }

            const t1 = type_fun_body(comp.cons, te, func_ctx)

            if (comp.alt.tag === Tag.BLOCK) {
                if ((comp.alt as BlockNode).body.tag === "seq") {
                    // only have if block then this is not a terminating statement
                    if ((((comp.alt as BlockNode).body) as SequenceNode).stmts.length == 0) {
                        return "undefined"
                    }
                }
            }
            // else if block present
            const t2 = type_fun_body(comp.alt, te, func_ctx)
            // terminating if both statements are return values and the same
            // return types will always be in an array so we require both to be arrays else not terminating
            if (isArray(t1) && isArray(t2) && equal_array_types(t1, t2)) {
                return t1
            } else {
                return "undefined"
            }
        },
    // TODO: see if you want to implement unreachable code detection        
    seq:
        (comp: SequenceNode, te: any, func_ctx: any) => {
            for (let i = 0; i < comp.stmts.length; ++i) {
                const stmt = comp.stmts[i];
                const stmt_type = type_fun_body(stmt, te, func_ctx)
                // return values of stmts can only be arrays or "undefined" in functions?
                // if it's a literal experession or name node that returns smth other than undefined, type_fun_body will return "undefined"
                if (!isArray(stmt_type)) {
                } else if (i == comp.stmts.length - 1) {
                    // only if final stmt is terminating then this seq is terminating
                    return stmt_type
                }
            }
            // TODO check if i should return undefined or empty
            return []
        },
    blk:
        (comp: BlockNode, te: any, func_ctx: any) => {
            // scan out declarations
            // if it's a single node just make it a sequence
            if (comp.body.tag !== "seq") {
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
            for (const comp of decls) {
                if (comp.tag === "let" || comp.tag === "mut" || comp.tag === "waitgroup") {
                    declared_symbols.push(...(comp as VarDeclNode).syms.IDENTS)
                    for (let i = 0; i < (comp as VarDeclNode).syms.IDENTS.length; ++i) {
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
            return type_fun_body(comp.body, extended_te, func_ctx)
        },
    ret:
        (comp: ReturnStmtNode, te: any, func_ctx: any) => {
            const returnTypes = [];
            for (const exp of comp.expr) {
                const res = type(exp, te)
                if (isArray(res)) {
                    returnTypes.push(...res)
                } else {
                    returnTypes.push(res)
                }
            }

            if (equal_array_types(func_ctx.retType, returnTypes)) {
                return returnTypes
            } else {
                throw new Error("expected return types " + unparse_types(func_ctx.retType) + " but got " + unparse_types(returnTypes) + " in function " + func_ctx.name)
            }
        },
    while:
        (comp: ForStmtNode, te: any, func_ctx: any) => {
            // check this with Go specs
            // predicate has to be a bool value
            const t0 = type(comp.pred, te)
            // console.log(t0)
            if(isArray(t0)) {
                if(t0.length != 1 || t0[0] !== "bool") {
                    throw new Error("expected predicate type: bool, " +
                    "actual predicate type: " +
                    unparse_types(t0))
                }
            }

            if (is_string(t0) && t0 !== "bool") {
                throw new Error("expected predicate type: bool, " +
                    "actual predicate type: " +
                    unparse_type(t0))
            }

            // according to Go Spec, if the loop condition is present, this statement is not terminating so since we enforce the loop condition this statement is not terminating
            // so we just need to type check the body and do nothing with the result and return undefined
            type_fun_body(comp.body, te, func_ctx)
            return "undefined"
        }
}

const type_fun_body = (comp: ASTNode, te: any, func_ctx: any) => {
    const handler = type_fun_body_stmt[comp.tag]
    if (handler) {
        return handler(comp, te, func_ctx)
    } else {
        type(comp, te)
        return "undefined"
    }
}

export const typecheck = (comp: ASTNode) => {
    type(comp, global_type_environment)
}