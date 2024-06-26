import { Pair } from '../../stdlib/list'
import {
  ASTNode,
  AssignNode,
  BinOpNode,
  BlockNode,
  ConstDeclNode,
  ForStmtNode,
  FuncAppNode,
  FuncDeclNode,
  FunctionLiteralNode,
  GoStmtNode,
  IfStmtNode,
  LiteralNode,
  LogicalNode,
  MakeAppNode,
  NameNode,
  RecvExprNode,
  ReturnStmtNode,
  SendStmtNode,
  SequenceNode,
  StmtNode,
  Tag,
  UnOpNode,
  VarDeclNode
} from '../ast/AST'

// types
type Frame = string[]
type CompileTimeEnvironment = Frame[]
type FramePosition = Pair<number, number>

// helpers

// add values destructively to the end of
// given array; return the array
const push = <T>(array: T[], ...items: T[]): T[] => {
  // fixed by Liew Zhao Wei, see Discussion 5
  for (const item of items) {
    array.push(item)
  }
  return array
}

// ************************
// compile-time environment
// ************************/

// a compile-time environment is an array of
// compile-time frames, and a compile-time frame
// is an array of symbols

// find the position [frame-index, value-index]
// of a given symbol x
const compile_time_environment_position = (
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

const value_index = (frame: Frame, x: string): number => {
  // console.log("frame: "  + frame);
  for (let i = 0; i < frame.length; i++) {
    if (frame[i] === x) return i
  }
  return -1
}

// compile-time frames only need synbols (keys), no values

//TODO: make sure to update this with more builtins for Go
const builtin_compile_frame: Frame = ['Println', 'sleep']

//TODO: make sure to update this with more constants for Go
const constant_compile_frame: Frame = ['nil']

const compile_time_environment_extend = (
  vs: Frame,
  e: CompileTimeEnvironment
): CompileTimeEnvironment => {
  //  make shallow copy of e
  //if(vs.length === 0) return e;
  const arr = push([...e], vs)
  return arr
}

const global_compile_environment: CompileTimeEnvironment = [
  builtin_compile_frame,
  constant_compile_frame
]

// ********
// compiler
// ********

// scanning out the declarations from (possibly nested)
// sequences of statements, ignoring blocks
const scan_for_locals = (comp: ASTNode): string[] => {
  //console.log("scanning: ");
  //console.dir(comp, {depth: 1});
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
  // console.log(ret);
  return ret
}

const compile_sequence = (seq: StmtNode[], ce: CompileTimeEnvironment) => {
  if (seq.length === 0) {
    instrs[wc++] = { tag: 'LDC', val: undefined }
    return
  }
  let first = true
  for (const comp of seq) {
    first ? (first = false) : (instrs[wc++] = { tag: 'POP' })
    compile(comp, ce)
  }
}

// wc: write counter
let wc: number
// might want to change this to an INSTR[]
// instrs: instruction array
let instrs: any[]

const compile_comp = {
  lit: (comp: LiteralNode, ce: CompileTimeEnvironment) => {
    instrs[wc++] = { tag: 'LDC', val: comp.val }
    //console.log("done compiling lit: " + comp.val);
  },
  nam:
    // store precomputed position information in LD instruction
    (comp: NameNode, ce: CompileTimeEnvironment) => {
      instrs[wc++] = {
        tag: 'LD',
        sym: comp.sym,
        pos: compile_time_environment_position(ce, comp.sym)
      }
    },
  unop: (comp: UnOpNode, ce: CompileTimeEnvironment) => {
    compile(comp.frst, ce)
    instrs[wc++] = { tag: 'UNOP', sym: comp.sym }
  },
  binop: (comp: BinOpNode, ce: CompileTimeEnvironment) => {
    compile(comp.frst, ce)
    compile(comp.scnd, ce)
    instrs[wc++] = { tag: 'BINOP', sym: comp.sym }
  },
  log: (comp: LogicalNode, ce: CompileTimeEnvironment) => {
    const consequentNode: IfStmtNode = {
      tag: Tag.COND,
      pred: comp.frst,
      cons: { tag: Tag.BLOCK, body: { tag: Tag.LIT, val: true } } as BlockNode,
      alt: { tag: Tag.BLOCK, body: comp.scnd } as BlockNode
    }

    const alternativeNode: IfStmtNode = {
      tag: Tag.COND,
      pred: comp.frst,
      cons: { tag: Tag.BLOCK, body: comp.scnd } as BlockNode,
      alt: { tag: Tag.BLOCK, body: { tag: Tag.LIT, val: false } } as BlockNode
    }

    // fixed this from && to ||
    compile(comp.sym == '||' ? consequentNode : alternativeNode, ce)
  },
  cond: (comp: IfStmtNode, ce: CompileTimeEnvironment) => {
    compile(comp.pred, ce)
    const jump_on_false_instruction: any = { tag: 'JOF' }
    instrs[wc++] = jump_on_false_instruction
    compile(comp.cons, ce)
    const goto_instruction: any = { tag: 'GOTO' }
    instrs[wc++] = goto_instruction
    const alternative_address = wc
    jump_on_false_instruction.addr = alternative_address
    compile(comp.alt, ce)
    goto_instruction.addr = wc
  },
  while: (comp: ForStmtNode, ce: CompileTimeEnvironment) => {
    const loop_start = wc
    compile(comp.pred, ce)
    const jump_on_false_instruction: any = { tag: 'JOF' }
    instrs[wc++] = jump_on_false_instruction
    compile(comp.body, ce)
    instrs[wc++] = { tag: 'POP' }
    instrs[wc++] = { tag: 'GOTO', addr: loop_start }
    jump_on_false_instruction.addr = wc
    instrs[wc++] = { tag: 'LDC', val: undefined }
  },
  app: (comp: FuncAppNode, ce: CompileTimeEnvironment) => {
    compile(comp.fun, ce)
    for (const arg of comp.args) {
      compile(arg, ce)
    }
    instrs[wc++] = { tag: 'CALL', arity: comp.args.length }
  },
  assmt:
    // store precomputed position info in ASSIGN instruction
    (comp: AssignNode, ce: CompileTimeEnvironment) => {
      // we compile all variable declarations 1 at a time
      // Note that this means that the last assignment will be at the top of the OS
      const assignmentLen = comp.exprs.list.length
      for (let i = 0; i < assignmentLen; ++i) {
        compile(comp.exprs.list[i], ce)
      }

      // assign in reverse order since the results will be in reverse order on the OS
      const symsLen = comp.syms.IDENTS.length
      let first = true
      for (let i = symsLen - 1; i >= 0; --i) {
        // POP the value after each assignment
        first ? (first = false) : (instrs[wc++] = { tag: 'POP' })
        instrs[wc++] = {
          tag: 'ASSIGN',
          pos: compile_time_environment_position(ce, comp.syms.IDENTS[i])
        }
      }
    },

  lam: (comp: FunctionLiteralNode, ce: CompileTimeEnvironment) => {
    instrs[wc++] = { tag: 'LDF', arity: comp._arity, addr: wc + 1 }
    // jump over the body of the lambda expression
    const goto_instruction: any = { tag: 'GOTO' }
    instrs[wc++] = goto_instruction
    // extend compile-time environment
    compile(comp.body, compile_time_environment_extend(comp.prms, ce))
    instrs[wc++] = { tag: 'LDC', val: undefined }
    instrs[wc++] = { tag: 'RESET' }
    goto_instruction.addr = wc
  },
  seq: (comp: SequenceNode, ce: CompileTimeEnvironment) => compile_sequence(comp.stmts, ce),
  blk: (comp: BlockNode, ce: CompileTimeEnvironment) => {
    //console.log("compiling block");
    const locals: Frame = scan_for_locals(comp.body)
    //console.log("locals: " + locals);
    // NOTE TO US, this is an optimization to not have a blockframe if there are no declarations, this is inline with what source's parser is doing
    if (locals.length > 0) {
      instrs[wc++] = { tag: 'ENTER_SCOPE', num: locals.length }
      // extend compile time environment only if there are locals
      ce = compile_time_environment_extend(locals, ce)
    }
    compile(comp.body, ce)

    if (locals.length > 0) {
      instrs[wc++] = { tag: 'EXIT_SCOPE' }
    }
  },
  let: (comp: VarDeclNode, ce: CompileTimeEnvironment) => {
    // we compile all variable declarations 1 at a time
    // Note that this means that the last assignment will be at the top of the OS
    const assignmentLen = comp.assignments.list.length
    for (let i = 0; i < assignmentLen; ++i) {
      compile(comp.assignments.list[i], ce)
    }

    // assign in reverse order since the results will be in reverse order on the OS
    const symsLen = comp.syms.IDENTS.length
    let first = true
    for (let i = symsLen - 1; i >= 0; --i) {
      // POP the value after each assignment
      first ? (first = false) : (instrs[wc++] = { tag: 'POP' })
      instrs[wc++] = {
        tag: 'ASSIGN',
        pos: compile_time_environment_position(ce, comp.syms.IDENTS[i])
      }
    }
  },
  // NOTE to us, const is not actually implemented yet, only used for func decl to lambda conversion
  const: (comp: ConstDeclNode, ce: CompileTimeEnvironment) => {
    // we compile all variable declarations 1 at a time
    // Note that this means that the last assignment will be at the top of the OS
    const assignmentLen = comp.assignments.list.length
    for (let i = 0; i < assignmentLen; ++i) {
      compile(comp.assignments.list[i], ce)
    }

    // assign in reverse order since the results will be in reverse order on the OS
    const symsLen = comp.syms.IDENTS.length
    let first = true
    for (let i = symsLen - 1; i >= 0; --i) {
      // POP the value after each assignment
      first ? (first = false) : (instrs[wc++] = { tag: 'POP' })
      instrs[wc++] = {
        tag: 'ASSIGN',
        pos: compile_time_environment_position(ce, comp.syms.IDENTS[i])
      }
    }
  },
  ret: (comp: ReturnStmtNode, ce: CompileTimeEnvironment) => {
    // NOTE TO US, RETURN STATEMENTS CAN RETURN MORE THAN 1 RESULT SO WE LOOP
    for (const expr of comp.expr) {
      compile(expr, ce)
    }
    // NOTE TO US, FOR NOW WE WILL ONLY MAKE FUNCTIONS WITH 1 RETURN VALUE INTO TAILCALLS
    if ((comp._arity as number) <= 1 && comp.expr[0].tag === 'app') {
      // tail call: turn CALL into TAILCALL
      instrs[wc - 1].tag = 'TAIL_CALL'
    } else {
      instrs[wc++] = { tag: 'RESET' }
    }
  },
  fun: (comp: FuncDeclNode, ce: CompileTimeEnvironment) => {
    const funcBodyToLambda: FunctionLiteralNode = {
      tag: Tag.LAM,
      prms: comp.prms,
      body: comp.body,
      _arity: comp._arity,
      type: comp.type,
      val: 'funcLit'
    }

    // NOTE the type here is fun
    // type should not be necessary from compiler onwards
    const funcDeclToConstDecl: ConstDeclNode = {
      tag: Tag.CONST,
      syms: { tag: Tag.IDENTS, IDENTS: [comp.sym] },
      assignments: { tag: Tag.EXPRLIST, list: [funcBodyToLambda] },
      type: 'fun'
    }

    compile(funcDeclToConstDecl, ce)
  },
  go: (comp: GoStmtNode, ce: CompileTimeEnvironment) => {
    // compile the function application
    // how to deal with lambdas since not named?
    compile(comp.funcApp, ce)
    // based on how funApp is compiled, we know that wc - 1 is the call instruction
    // we modify the tag of that instruction for our purposes (hacks)
    instrs[wc - 1].tag = 'GOCALL'
    instrs[wc++] = { tag: 'LDC', val: undefined }
  },
  send: (comp: SendStmtNode, ce: CompileTimeEnvironment) => {
    // note that Go specs does not specify the order in which these 2 are evaluated
    // this is the expr on the right
    compile(comp.scnd, ce)

    //this should be the channel sym
    compile(comp.frst, ce)

    instrs[wc++] = { tag: 'SEND' }
    // TODO: figure out what value should be the value of a send statement
    // lets default to undefined for now
    instrs[wc++] = { tag: 'LDC', val: undefined }
  },
  recv: (comp: RecvExprNode, ce: CompileTimeEnvironment) => {
    //this should be the channel sym
    compile(comp.frst, ce)

    instrs[wc++] = { tag: 'RECV' }
    // the value of a recv statement should be the value read out
  },
  make: (comp: MakeAppNode, ce: CompileTimeEnvironment) => {
    const elemType = getChanType(comp.chanType)
    // this should call heap_allocate_channel(capacity, buffered, elemType) then throw the address on the OS
    // notice that we dont have to compile comp.capacity because we force the syntax to be a DECIMAL_LIT()
    compile(comp.capacity, ce)
    instrs[wc++] = {
      tag: 'MAKE',
      // capacity: comp.capacity,
      type: comp.buffered ? 1 : 0,
      elemType: elemType
    }
  },
  mut: (comp: VarDeclNode, ce: CompileTimeEnvironment) => {
    // create a channel with capacity 1 for every symbol
    // we abuse make channel here
    for (let i = 0; i < comp.syms.IDENTS.length; ++i) {
      instrs[wc++] = { tag: 'LDC', val: 1 }
      instrs[wc++] = { tag: 'MAKE', type: 2, elemType: 'mutex' }
    }

    const symsLen = comp.syms.IDENTS.length
    let first = true
    for (let i = symsLen - 1; i >= 0; --i) {
      // POP the value after each assignment
      first ? (first = false) : (instrs[wc++] = { tag: 'POP' })
      instrs[wc++] = {
        tag: 'ASSIGN',
        pos: compile_time_environment_position(ce, comp.syms.IDENTS[i])
      }
    }
  },
  lock: (comp: FuncAppNode, ce: CompileTimeEnvironment) => {
    // compile the mutex symbol
    compile(comp.args[0], ce)
    instrs[wc++] = { tag: 'RECV' }
    // the value of a recv statement should be the value read out which should be undefined
  },
  unlock: (comp: FuncAppNode, ce: CompileTimeEnvironment) => {
    // this is the "msg" that we will send in mutex which coincidentally will be the evaluated result of Lock statement
    instrs[wc++] = { tag: 'LDC', val: undefined }
    // compile the mutex symbol
    compile(comp.args[0], ce)
    instrs[wc++] = { tag: 'SEND' }
    // TODO: figure out what value should be the value of a send statement
    // lets default to undefined for now
    instrs[wc++] = { tag: 'LDC', val: undefined }
  },
  waitgroup: (comp: VarDeclNode, ce: CompileTimeEnvironment) => {
    const symsLen = comp.syms.IDENTS.length
    for (let i = 0; i < symsLen; ++i) {
      instrs[wc++] = { tag: 'MAKE_WAITGROUP' }
    }

    let first = true
    for (let i = symsLen - 1; i >= 0; --i) {
      // POP the value after each assignment
      first ? (first = false) : (instrs[wc++] = { tag: 'POP' })
      instrs[wc++] = {
        tag: 'ASSIGN',
        pos: compile_time_environment_position(ce, comp.syms.IDENTS[i])
      }
    }
  },
  add: (comp: FuncAppNode, ce: CompileTimeEnvironment) => {
    for (const arg of comp.args) {
      compile(arg, ce)
    }
    instrs[wc++] = { tag: 'WAITGROUP_ADD' }
  },
  done: (comp: FuncAppNode, ce: CompileTimeEnvironment) => {
    // there should only be a single argument to compile
    compile(comp.args[0], ce)
    instrs[wc++] = { tag: 'WAITGROUP_DONE' }
  },
  wait: (comp: FuncAppNode, ce: CompileTimeEnvironment) => {
    // there should only be a single argument to compile
    compile(comp.args[0], ce)
    instrs[wc++] = { tag: 'WAITGROUP_WAIT' }
  }
}

const getChanType = (chanType: string) => {
  // invariant that chanType in MakeAppNode always starts with chan and then a space
  return chanType.slice(5)
}

// compile component into instruction array instrs,
// starting at wc (write counter)
const compile = (comp: ASTNode, ce: CompileTimeEnvironment) => {
  compile_comp[comp.tag](comp, ce)
}

// compile program into instruction array instrs,
// after initializing wc and instrs
export const compile_program = (program: ASTNode): any[] => {
  wc = 0
  instrs = []
  compile(program, global_compile_environment)
  instrs[wc] = { tag: 'DONE' }
  return instrs
}
