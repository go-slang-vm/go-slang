import { ASTNode } from '../ast/AST';
import { compile_program } from '../compiler/compiler';
import { parse } from '../parser/parser';

describe("Basic compiler test", () => {
    test("basic variable declaration in a new block scope", async () => {
      const program = `
      func main() {
        var y = 1
        {
          y := 2
        }
        return 1
      }`;

      const expectedInstr = [ {"tag": "ENTER_SCOPE", "num": 1},
      {"tag": "LDF", "arity": 0, "addr": 3},
      {"tag": "GOTO", "addr": 17},
      {"tag": "ENTER_SCOPE", "num": 1},
      {"tag": "LDC", "val": 1},
      {"tag": "ASSIGN", "pos": [4, 0]},
      {"tag": "POP"},
      {"tag": "ENTER_SCOPE", "num": 1},
      {"tag": "LDC", "val": 2},
      {"tag": "ASSIGN", "pos": [5, 0]},
      {"tag": "EXIT_SCOPE"},
      {"tag": "POP"},
      {"tag": "LD", "sym": "x", "pos": [4, 0]},
      {"tag": "RESET"},
      {"tag": "EXIT_SCOPE"},
      {"tag": "LDC", "val": undefined},
      {"tag": "RESET"},
      {"tag": "ASSIGN", "pos": [2, 0]},
      {"tag": "POP"},
      {"tag": "LD", "sym": "main", "pos": [2, 0]},
      {"tag": "CALL", "arity": 0},
      {"tag": "EXIT_SCOPE"},
      {"tag": "DONE"}];
      
      const inputAst: ASTNode = parse(program);
      //console.dir(inputAst, {depth: 100});
      //try {
        const outputInstr: any[] = compile_program(inputAst);
        //console.log(JSON.stringify(outputInstr));
      //} catch(e) {
        //console.log("error: " + e);
      //}
      expect(outputInstr).toStrictEqual(expectedInstr);
    });

    test("basic fact", async () => {
      const program = `
      func fact(n) {
        return fact_iter(n,1,1)
      }
      func fact_iter(n, i, acc) {
        if i > n {
          return acc
        } else {
          return fact_iter(n,i+1,acc*i)
        }
      }
      func main() {
        return fact(5)
      }`;

      const expectedInstr = [ {"tag": "ENTER_SCOPE", "num": 3},
      {"tag": "LDF", "arity": 1, "addr": 3},
      {"tag": "GOTO", "addr": 10},
      {"tag": "LD", "sym": "fact_iter", "pos": [2, 1]},
      {"tag": "LD", "sym": "n", "pos": [3, 0]},
      {"tag": "LDC", "val": 1},
      {"tag": "LDC", "val": 1},
      {"tag": "TAIL_CALL", "arity": 3},
      {"tag": "LDC", "val": undefined},
      {"tag": "RESET"},
      {"tag": "ASSIGN", "pos": [2, 0]},
      {"tag": "POP"},
      {"tag": "LDF", "arity": 3, "addr": 14},
      {"tag": "GOTO", "addr": 32},
      {"tag": "LD", "sym": "i", "pos": [3, 1]},
      {"tag": "LD", "sym": "n", "pos": [3, 0]},
      {"tag": "BINOP", "sym": ">"},
      {"tag": "JOF", "addr": 21},
      {"tag": "LD", "sym": "acc", "pos": [3, 2]},
      {"tag": "RESET"},
      {"tag": "GOTO", "addr": 30},
      {"tag": "LD", "sym": "fact_iter", "pos": [2, 1]},
      {"tag": "LD", "sym": "n", "pos": [3, 0]},
      {"tag": "LD", "sym": "i", "pos": [3, 1]},
      {"tag": "LDC", "val": 1},
      {"tag": "BINOP", "sym": "+"},
      {"tag": "LD", "sym": "acc", "pos": [3, 2]},
      {"tag": "LD", "sym": "i", "pos": [3, 1]},
      {"tag": "BINOP", "sym": "*"},
      {"tag": "TAIL_CALL", "arity": 3},
      {"tag": "LDC", "val": undefined},
      {"tag": "RESET"},
      {"tag": "ASSIGN", "pos": [2, 1]},
      {"tag": "POP"},
      {"tag": "LDF", "arity": 0, "addr": 36},
      {"tag": "GOTO", "addr": 41},
      {"tag": "LD", "sym": "fact", "pos": [2, 0]},
      {"tag": "LDC", "val": 5},
      {"tag": "TAIL_CALL", "arity": 1},
      {"tag": "LDC", "val": undefined},
      {"tag": "RESET"},
      {"tag": "ASSIGN", "pos": [2, 2]},
      {"tag": "POP"},
      {"tag": "LD", "sym": "main", "pos": [2, 2]},
      {"tag": "CALL", "arity": 0},
      {"tag": "EXIT_SCOPE"},
      {"tag": "DONE"}];
      
      const inputAst: ASTNode = parse(program);
      const outputInstr: any[] = compile_program(inputAst);
      expect(outputInstr).toStrictEqual(expectedInstr);
    });

    test("basic multiple variable declaration", async () => {
      const program = `
      var x,y,z = 1, 2, 3
      func main() {
        sx, sy, sz := 11, 22, 33
      }`;

      const expectedInstr = [ {"tag": "ENTER_SCOPE", "num": 3},
      {"tag": "LDF", "arity": 1, "addr": 3},
      {"tag": "GOTO", "addr": 10},
      {"tag": "LD", "sym": "fact_iter", "pos": [2, 1]},
      {"tag": "LD", "sym": "n", "pos": [3, 0]},
      {"tag": "LDC", "val": 1},
      {"tag": "LDC", "val": 1},
      {"tag": "TAIL_CALL", "arity": 3},
      {"tag": "LDC", "val": undefined},
      {"tag": "RESET"},
      {"tag": "ASSIGN", "pos": [2, 0]},
      {"tag": "POP"},
      {"tag": "LDF", "arity": 3, "addr": 14},
      {"tag": "GOTO", "addr": 32},
      {"tag": "LD", "sym": "i", "pos": [3, 1]},
      {"tag": "LD", "sym": "n", "pos": [3, 0]},
      {"tag": "BINOP", "sym": ">"},
      {"tag": "JOF", "addr": 21},
      {"tag": "LD", "sym": "acc", "pos": [3, 2]},
      {"tag": "RESET"},
      {"tag": "GOTO", "addr": 30},
      {"tag": "LD", "sym": "fact_iter", "pos": [2, 1]},
      {"tag": "LD", "sym": "n", "pos": [3, 0]},
      {"tag": "LD", "sym": "i", "pos": [3, 1]},
      {"tag": "LDC", "val": 1},
      {"tag": "BINOP", "sym": "+"},
      {"tag": "LD", "sym": "acc", "pos": [3, 2]},
      {"tag": "LD", "sym": "i", "pos": [3, 1]},
      {"tag": "BINOP", "sym": "*"},
      {"tag": "TAIL_CALL", "arity": 3},
      {"tag": "LDC", "val": undefined},
      {"tag": "RESET"},
      {"tag": "ASSIGN", "pos": [2, 1]},
      {"tag": "POP"},
      {"tag": "LDF", "arity": 0, "addr": 36},
      {"tag": "GOTO", "addr": 41},
      {"tag": "LD", "sym": "fact", "pos": [2, 0]},
      {"tag": "LDC", "val": 5},
      {"tag": "TAIL_CALL", "arity": 1},
      {"tag": "LDC", "val": undefined},
      {"tag": "RESET"},
      {"tag": "ASSIGN", "pos": [2, 2]},
      {"tag": "POP"},
      {"tag": "LD", "sym": "main", "pos": [2, 2]},
      {"tag": "CALL", "arity": 0},
      {"tag": "EXIT_SCOPE"},
      {"tag": "DONE"}];
      
      const inputAst: ASTNode = parse(program);
      const outputInstr: any[] = compile_program(inputAst);
      expect(outputInstr).toStrictEqual(expectedInstr);
    });

    test("basic multiple assignment", async () => {
      const program = `
      var x,y,z = 1, 2, 3
      func main() {
        x, y, z = 11, 22, 33
      }`;

      const expectedInstr = [ {"tag": "ENTER_SCOPE", "num": 3},
      {"tag": "LDF", "arity": 1, "addr": 3},
      {"tag": "GOTO", "addr": 10},
      {"tag": "LD", "sym": "fact_iter", "pos": [2, 1]},
      {"tag": "LD", "sym": "n", "pos": [3, 0]},
      {"tag": "LDC", "val": 1},
      {"tag": "LDC", "val": 1},
      {"tag": "TAIL_CALL", "arity": 3},
      {"tag": "LDC", "val": undefined},
      {"tag": "RESET"},
      {"tag": "ASSIGN", "pos": [2, 0]},
      {"tag": "POP"},
      {"tag": "LDF", "arity": 3, "addr": 14},
      {"tag": "GOTO", "addr": 32},
      {"tag": "LD", "sym": "i", "pos": [3, 1]},
      {"tag": "LD", "sym": "n", "pos": [3, 0]},
      {"tag": "BINOP", "sym": ">"},
      {"tag": "JOF", "addr": 21},
      {"tag": "LD", "sym": "acc", "pos": [3, 2]},
      {"tag": "RESET"},
      {"tag": "GOTO", "addr": 30},
      {"tag": "LD", "sym": "fact_iter", "pos": [2, 1]},
      {"tag": "LD", "sym": "n", "pos": [3, 0]},
      {"tag": "LD", "sym": "i", "pos": [3, 1]},
      {"tag": "LDC", "val": 1},
      {"tag": "BINOP", "sym": "+"},
      {"tag": "LD", "sym": "acc", "pos": [3, 2]},
      {"tag": "LD", "sym": "i", "pos": [3, 1]},
      {"tag": "BINOP", "sym": "*"},
      {"tag": "TAIL_CALL", "arity": 3},
      {"tag": "LDC", "val": undefined},
      {"tag": "RESET"},
      {"tag": "ASSIGN", "pos": [2, 1]},
      {"tag": "POP"},
      {"tag": "LDF", "arity": 0, "addr": 36},
      {"tag": "GOTO", "addr": 41},
      {"tag": "LD", "sym": "fact", "pos": [2, 0]},
      {"tag": "LDC", "val": 5},
      {"tag": "TAIL_CALL", "arity": 1},
      {"tag": "LDC", "val": undefined},
      {"tag": "RESET"},
      {"tag": "ASSIGN", "pos": [2, 2]},
      {"tag": "POP"},
      {"tag": "LD", "sym": "main", "pos": [2, 2]},
      {"tag": "CALL", "arity": 0},
      {"tag": "EXIT_SCOPE"},
      {"tag": "DONE"}];
      
      const inputAst: ASTNode = parse(program);
      const outputInstr: any[] = compile_program(inputAst);
      expect(outputInstr).toStrictEqual(expectedInstr);
    });
});