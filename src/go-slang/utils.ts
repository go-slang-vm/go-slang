import { Pair } from "../stdlib/list";
import { ASTNode, FuncDeclNode, SequenceNode, VarDeclNode } from "./ast/AST";
// global built ins and constants should be in here

// helpers

// add values destructively to the end of
// given array; return the array
export const push = <T>(array: T[], ...items: T[]): T[] => {
    // fixed by Liew Zhao Wei, see Discussion 5
    for (const item of items) {
      array.push(item)
    }
    return array
  }


export type Frame = string[]
export type CompileTimeEnvironment = Frame[]
export type FramePosition = Pair<number, number>
//TODO: make sure to update this with more builtins for Go
export const builtin_compile_frame: Frame = ["Println", "sleep"];

//TODO: make sure to update this with more constants for Go
export const constant_compile_frame: Frame = ['nil']

export const compile_time_environment_extend = (
    vs: Frame,
    e: CompileTimeEnvironment
  ): CompileTimeEnvironment => {
    //  make shallow copy of e
    //if(vs.length === 0) return e;
    const arr = push([...e], vs)
    return arr
  }
  
export const global_compile_environment: CompileTimeEnvironment = [
    builtin_compile_frame,
    constant_compile_frame
  ]

// scanning out the declarations from (possibly nested)
// sequences of statements, ignoring blocks
export const scan_for_locals = (comp: ASTNode): string[] => {

    const ret =
      comp.tag === 'seq'
        ? (comp as SequenceNode).stmts.reduce(
            (acc: string[], x: ASTNode) => acc.concat(scan_for_locals(x)),
            []
          )
        : ['let', 'const', 'mut', 'waitgroup'].includes(comp.tag)
        ? [...(comp as VarDeclNode).syms.IDENTS]
        : comp.tag === 'fun'
        ? [(comp as FuncDeclNode).sym]
        : []

    return ret
  }

  // ************************
// compile-time environment
// ************************/

// a compile-time environment is an array of
// compile-time frames, and a compile-time frame
// is an array of symbols

// find the position [frame-index, value-index]
// of a given symbol x
export const compile_time_environment_position = (
    env: CompileTimeEnvironment,
    x: string
  ): FramePosition => {
    // console.log("compile time env pos: " + env);
    let frame_index = env.length
    while (value_index(env[--frame_index], x) === -1) {
      // important fix
      if (frame_index === 0) {
        throw new Error('unbound name: ' + x)
      }
      //frame_index--;
    }
    return [frame_index, value_index(env[frame_index], x)]
  }
  
export const value_index = (frame: Frame, x: string): number => {
    // console.log("frame: "  + frame);
    for (let i = 0; i < frame.length; i++) {
      if (frame[i] === x) return i
    }
    return -1
  }