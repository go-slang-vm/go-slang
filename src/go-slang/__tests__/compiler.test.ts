import { ASTNode } from '../ast/AST';
import { compile_program } from '../compiler/compiler';
import { parse } from '../parser/parser';

describe("Basic compiler test", () => {
    test("basic", async () => {
      const program = `
      func main() {
        var x = 5
        {
          x := 10
        }
        return x
      }`;

      const expectedInstr = [ {"tag": "ENTER_SCOPE", "num": 1},
      {"tag": "LDF", "arity": 0, "addr": 3},
      {"tag": "GOTO", "addr": 17},
      {"tag": "ENTER_SCOPE", "num": 1},
      {"tag": "LDC", "val": 5},
      {"tag": "ASSIGN", "pos": [4, 0]},
      {"tag": "POP"},
      {"tag": "ENTER_SCOPE", "num": 1},
      {"tag": "LDC", "val": 10},
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
    })
});