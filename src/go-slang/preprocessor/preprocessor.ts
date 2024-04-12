// we will get the global blk as the first ast node
// we only need to consider the blk.body.stmts list of statements
// scan out the declarations and state which line number that statement number is for now we assume single declarations per line, later we have to order the declarations inside the multideclaration
// walk the AST and scan exprs to see if they will refer to any declarations in the frame numebr 2, [2, x] for any x in [0, n) where n is the number of declarations in the global blk
// check for no redeclarations as well
// check that main has no arguments or return values
// use adj list and map to map variable name to stmt number

import { Pair } from "../../stdlib/list";
import { ASTNode, AssignNode, BinOpNode, BlockNode, ConstDeclNode, ForStmtNode, FuncAppNode, FuncDeclNode, FunctionLiteralNode, GoStmtNode, IfStmtNode, LiteralNode, LogicalNode, MakeAppNode, NameNode, RecvExprNode, ReturnStmtNode, SendStmtNode, SequenceNode, StmtNode, UnOpNode, VarDeclNode } from "../ast/AST";
import { CompileTimeEnvironment, Frame, compile_time_environment_extend, compile_time_environment_position, global_compile_environment, scan_for_locals } from "../utils";

const varNameToStmtNumber: Map<string, Pair<number, string>> = new Map();

let adjList: Set<number>[];

const create_graph = {
  lit: (comp: LiteralNode, ce: CompileTimeEnvironment, stmtNum: number) => { },
  nam:
    (comp: NameNode, ce: CompileTimeEnvironment, stmtNum: number) => {
      const pos = compile_time_environment_position(ce, comp.sym);
      // this statement includes a reference to the following variable in the global blk
      if (pos[0] == 2) {
        const stmtNumOfSym = varNameToStmtNumber.get(comp.sym);
        if (stmtNumOfSym == undefined) {
          throw new Error("unbounded symbol: " + comp.sym);
        }
        adjList[stmtNum].add(stmtNumOfSym[0]);
      }
    },
  unop: (comp: UnOpNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.frst, ce, stmtNum);
  },
  binop: (comp: BinOpNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.frst, ce, stmtNum);
    createGraph(comp.scnd, ce, stmtNum);
  },
  log: (comp: LogicalNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.frst, ce, stmtNum);
    createGraph(comp.scnd, ce, stmtNum);
  },
  cond: (comp: IfStmtNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.pred, ce, stmtNum);
    createGraph(comp.cons, ce, stmtNum);
    createGraph(comp.alt, ce, stmtNum);
  },
  while: (comp: ForStmtNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.pred, ce, stmtNum);
    createGraph(comp.body, ce, stmtNum);
  },
  app: (comp: FuncAppNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.fun, ce, stmtNum);
    for (let i = 0; i < comp.args.length; ++i) {
      createGraph(comp.args[i], ce, stmtNum);
    }
  },
  assmt:
    (comp: AssignNode, ce: CompileTimeEnvironment, stmtNum: number) => {
      // we compile all variable declarations 1 at a time
      const assignmentLen = comp.exprs.list.length
      for (let i = 0; i < assignmentLen; ++i) {
        createGraph(comp.exprs.list[i], ce, stmtNum)
      }
    },
  lam: (comp: FunctionLiteralNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    // extend compile-time environment
    createGraph(comp.body, compile_time_environment_extend(comp.prms, ce), stmtNum);
  },
  seq: (comp: SequenceNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    for (const com of comp.stmts) {
      createGraph(com, ce, stmtNum);
    }
  },
  blk: (comp: BlockNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    const locals: Frame = scan_for_locals(comp.body)
    // NOTE TO US, this is an optimization to not have a blockframe if there are no declarations, this is inline with what source's parser is doing
    if (locals.length > 0) {
      // extend compile time environment only if there are locals
      ce = compile_time_environment_extend(locals, ce);
    }
    createGraph(
      comp.body,
      ce,
      stmtNum
    )
  },
  let: (comp: VarDeclNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    // we compile all variable declarations 1 at a time
    const assignmentLen = comp.assignments.list.length
    for (let i = 0; i < assignmentLen; ++i) {
      createGraph(comp.assignments.list[i], ce, stmtNum);
    }
  },
  // NOTE to us, const is not actually implemented yet, only used for func decl to lambda conversion
  const: (comp: ConstDeclNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    // we compile all variable declarations 1 at a time
    const assignmentLen = comp.assignments.list.length
    for (let i = 0; i < assignmentLen; ++i) {
      createGraph(comp.assignments.list[i], ce, stmtNum);
    }
  },
  ret: (comp: ReturnStmtNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    // NOTE TO US, RETURN STATEMENTS CAN RETURN MORE THAN 1 RESULT SO WE LOOP
    for (const expr of comp.expr) {
      createGraph(expr, ce, stmtNum);
    }
  },
  fun: (comp: FuncDeclNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.body, compile_time_environment_extend(comp.prms, ce), stmtNum);
  },
  go: (comp: GoStmtNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.funcApp, ce, stmtNum);
  },
  // NOTE for now make takes in a decimal lit for capacity, not expr yet
  make: (comp: MakeAppNode, ce: CompileTimeEnvironment, stmtNum: number) => {},
  send: (comp: SendStmtNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.frst, ce, stmtNum);
    createGraph(comp.scnd, ce, stmtNum); 
  },
  recv: (comp: RecvExprNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.frst, ce, stmtNum); 
  },
  lock: (comp: FuncAppNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.args[0], ce, stmtNum); 
  },
  unlock: (comp: FuncAppNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.args[0], ce, stmtNum); 
  },
  // these 2 do not have expressions on RHS
  mut: (comp: VarDeclNode, ce: CompileTimeEnvironment, stmtNum: number) => {},
  waitgroup: (comp: VarDeclNode, ce: CompileTimeEnvironment, stmtNum: number) => {},
  add: (comp: FuncAppNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    for (const arg of comp.args) {
      createGraph(arg, ce, stmtNum);
    }
  },
  done: (comp: FuncAppNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.args[0], ce, stmtNum);  
  },
  wait: (comp: FuncAppNode, ce: CompileTimeEnvironment, stmtNum: number) => {
    createGraph(comp.args[0], ce, stmtNum); 
  },
}


const createGraph = (comp: ASTNode, ce: CompileTimeEnvironment, stmtNum: number) => {
  create_graph[comp.tag](comp, ce, stmtNum);
}

const topoSort = (compressedAdjList: Set<number>[]) => {
  const indeg = new Array(compressedAdjList.length).fill(0);
  const q: number[] = [];
  const order = [];

  for (let i = 0; i < compressedAdjList.length; i++) {
    for (const j of compressedAdjList[i]) {
      indeg[j]++;
    }
  }
  for (let i = 0; i < indeg.length; ++i) {
    if (indeg[i] == 0) {
      q.push(i);
    }
  }

  //topoSort
  while (q.length) {
    const node = q.shift()
    if (node == undefined) continue;
    order.push(node)

    for (const it of compressedAdjList[node]) {
      indeg[it]--
      if (indeg[it] == 0) q.push(it)
    }
  }

  return order;
}

const hoistFuncDeclAboveVarDecl = (stmts: StmtNode[]): StmtNode[] => {
  const newStmts: StmtNode[] = [];
  for (let i = 0; i < stmts.length; ++i) {
    if (stmts[i].tag === "fun") {
      newStmts.push(stmts[i]);
    }
  }
  for (let i = 0; i < stmts.length; ++i) {
    if (stmts[i].tag !== "fun") {
      newStmts.push(stmts[i]);
    }
  }
  return newStmts;
}

const populateMap = (stmts: StmtNode[]) => {
  for (let i = 0; i < stmts.length - 1; ++i) {
    if (stmts[i].tag == "fun") {
      if (varNameToStmtNumber.has((stmts[i] as FuncDeclNode).sym)) {
        throw new Error("redeclaration of " + (stmts[i] as FuncDeclNode).sym);
      }
      varNameToStmtNumber.set((stmts[i] as FuncDeclNode).sym, [i, "fun"]);
    } else {
      const node = stmts[i] as VarDeclNode;
      for (let j = 0; j < node.syms.IDENTS.length; ++j) {
        if (varNameToStmtNumber.has(node.syms.IDENTS[j])) {
          throw new Error("redeclaration of " + node.syms.IDENTS[j]);
        }
        varNameToStmtNumber.set(node.syms.IDENTS[j], [i, "var"]);
      }
    }
  }
}

const populateAdjList = (seq: SequenceNode) => {
  const stmts: StmtNode[] = seq.stmts;
  // init adjList
  adjList = new Array(stmts.length - 1);
  for (let i = 0; i < adjList.length; ++i) {
    adjList[i] = new Set<number>();
  }

  // call create graph for each stmts
  const locals: Frame = scan_for_locals(seq);
  const base_compile_env = compile_time_environment_extend(locals, global_compile_environment);
  // NOTE THAT FOR MULTI VAR DECL, WE REQUIRE THAT THEY DO NOT CYCLICALLY REFER TO VARS IN THE SAME STATEMENT FOR NOW
  for (let i = 0; i < stmts.length - 1; ++i) {
    createGraph(stmts[i], base_compile_env, i);
  }
}

const compressGraph = (stmts: StmtNode[]): Pair<Set<number>[], number> => {
  let count = 0;
  for(let i = 0; i < stmts.length; ++i) {
    if(stmts[i].tag == "fun") {
      ++count;
    }
  }

  const compressedAdjList: Set<number>[] = new Array(adjList.length - count);
  for(let j = 0; j < compressedAdjList.length; ++j) {
    compressedAdjList[j] = new Set<number>();
  } 
  
  let visited: boolean[];
  
  for(let i = count; i < adjList.length; ++i) {
    if(stmts[i].tag == "fun") {
      throw Error("should not be a func declaraction here in compress graph");
    }

    visited = new Array(adjList.length);
    for(let j = 0; j < adjList.length; ++j) {
      visited[j] = false;
    }

    for(const neighbour of adjList[i]) {
      dfs(visited, neighbour);
    }

    for(let j = count; j < adjList.length; ++j) {
      if(visited[j]) {
        compressedAdjList[j- count].add(i-count);
      }
    }
  }
  return [compressedAdjList, count];
}

const dfs = (visited: boolean[], node: number) => {
  visited[node] = true;
  for(const neighbour of adjList[node]) {
    if(visited[neighbour]) continue;
    dfs(visited, neighbour);
  }
}

const verifyThatMainIsDeclared = () => {
  if (!varNameToStmtNumber.has("main")) {
    throw new Error("main function must be declared!")
  } else {
    if (varNameToStmtNumber.get("main")![1] !== "fun") {
      throw new Error("main function must be declared!")
    }
  }
}

export const preprocess = (program: ASTNode): ASTNode => {
  // invariant that the program passed in should be the global blk node
  varNameToStmtNumber.clear();
  const seq = (program as BlockNode).body;
  if (seq.tag == "seq") {
    // note that in the global scope, only declarations are allowed, except for the last statment which is a main() function app
    let stmts: StmtNode[] = (seq as SequenceNode).stmts;

    // hoist function declaration to the top first
    stmts = hoistFuncDeclAboveVarDecl(stmts);
    (seq as SequenceNode).stmts = stmts;
    
    // fill map with stmt num information
    populateMap(stmts);

    verifyThatMainIsDeclared()

    // create graph for this program
    populateAdjList(seq as SequenceNode);

    // create transitive closure
    const compressedRes = compressGraph(stmts);
    const compressedAdjList = compressedRes[0];
    const count = compressedRes[1];

    const order = topoSort(compressedAdjList);
    if (order.length !== compressedAdjList.length) {
      throw new Error("initialization cycle present");
    }
    const newStmts: StmtNode[] = [];
    for(let i = 0; i < count; ++i) {
      newStmts.push(stmts[i]);
    }
    for(const i of order) {
      newStmts.push(stmts[i+count]);
    }
    newStmts.push(stmts[stmts.length - 1]);
    (seq as SequenceNode).stmts = newStmts;
  } else {
    // should be a single node so ignore
  }
  return program;
}
