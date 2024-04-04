/* *****************
 * type environments
 * *****************/

import { head, is_null, pair, tail } from "../../stdlib/list"
import { FuncType } from "../ast/AST"
import { is_string } from "../vm/utils"

// Type frames are JavaScript objects that map 
// symbols (strings) to types.
const unary_arith_type =
    { tag: "fun", paramTypes: ["int"], 
    returnTypes: ["int"] }
    
const binary_arith_type =
    { tag: "fun", paramTypes: ["int", "int"], 
    returnTypes: ["int"] }

const number_comparison_type =
    { tag: "fun", paramTypes: ["int", "int"], 
    returnTypes: ["bool"] }
// should be bool bool instead of just bool
const binary_bool_type =
    { tag: "fun", paramTypes: ["bool", "bool"], 
    returnTypes: ["bool"] }
      
const unary_bool_type =
    { tag: "fun", paramTypes: ["bool"], 
    returnTypes: ["bool"] }
// or special case sleep and println? or return empty?
const unary_arith_void_type = 
    { tag: "fun", paramTypes: ["int"], 
    returnTypes: [] }

// what else should i include in this? for Go?
// Println can take anything
// sleep takes in a number so it is a unary_arith_type but should return any or undefined?
// make takes in a chan type (enforced by parser alr) and a decimal lit which is enforced by parser
// if we dont enforce the decimal lit then it should take in a unary_arith_type? that returns any or undefined     
// mutex and waitgroup operations should be a type that takes in either a mutex or a waitgroup and a number for Add
// chan receive and chan send should take on the chan type of the chan
// chan send the expr on the RHS needs to be the chan type of the chan
// chan receive will return the chan type of the chan so the type of this receive
// should be the type of the chan on the RHS of <-
// for chan send, we need to evaluate the LHS of <- to get the chan type of the chan then
// RHS to get the type of the expr and make sure they match
// go statements just needs to make sure that the expr on the right is a funcApp, actually,
// i think this is enforced by our parser so we just need to typecheck the funcApp on the right
const global_type_frame = {
    "undefined": "undefined",
    "+": binary_arith_type,
    "-": binary_arith_type,
    "*": binary_arith_type,
    "/": binary_arith_type,
    "<": number_comparison_type,
    ">": number_comparison_type,
    "<=": number_comparison_type,
    ">=": number_comparison_type,
    "==": number_comparison_type,
    "!=": number_comparison_type,
    "&&": binary_bool_type,
    "||": binary_bool_type,
    "-unary": unary_arith_type,
    "!": unary_bool_type,
    "sleep": unary_arith_void_type,
}

export type TypeFrame = {} | null

// A type environment is null or a pair 
// whose head is a frame and whose tail 
// is a type environment.
export const empty_type_environment: TypeFrame = null
export const global_type_environment: any = 
    pair(global_type_frame, empty_type_environment)

export const lookup_type = (x: any, e: any): string =>
    is_null(e)
    ? Error("unbound name: " + x)
    : head(e).hasOwnProperty(x) 
    ? head(e)[x]
    : lookup_type(x, tail(e))

export const extend_type_environment = (xs: any, ts: any, e: any) => {
    if (ts.length > xs.length) 
        throw new Error('too few parameters in function declaration')
    if (ts.length < xs.length) 
        throw new Error('too many parameters in function declaration')
    const new_frame = {}
    for (let i = 0; i < xs.length; i++) 
        new_frame[xs[i]] = ts[i]
    return pair(new_frame, e)
}

export const unparse_types = (ts: any): any =>
   ts.length === 0 
   ? "null"
   : ts.reduce((s: string, t: any) => s === "" 
                         ? unparse_type(t) 
                         : s + ", " + unparse_type(t), "")

export const unparse_type = (t: any): any =>
   is_string(t) 
   ? t 
   : // t is function type
     "(" + unparse_types((t as FuncType).paramTypes) + " > " + 
     unparse_types((t as FuncType).returnTypes) + ")"

export const equal_array_types = (ts1: any, ts2: any) => {
    if(ts1.length != ts2.length) {
        return false;
    }
    for(let i = 0; i < ts1.length; ++i) {
        if(unparse_type(ts1[i]) != unparse_type(ts2[i])) {
            return false;
        }
    }
    return true;
}

export const equal_types = (ts1: any, ts2: any) => 
   unparse_types(ts1) === unparse_types(ts2)
   
export const equal_type = (t1: any, t2:any) => {
    console.dir(t1, {depth: 100})
    console.dir(t2, {depth: 100})
   return unparse_type(t1) === unparse_type(t2)
}