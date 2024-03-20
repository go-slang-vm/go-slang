import { VM } from '../vm/index';
describe("Basic vm test", () => {
    test("basic variable declaration in a new block scope", async () => {
        const vm = new VM(1500);
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
      {"tag": "LD", "sym": "y", "pos": [4, 0]},
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
      
      const output = vm.run(expectedInstr);
      expect(output).toBe(1);
    });

    test("basic fact", async () => {
        const vm = new VM(1500);
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
      
      const output = vm.run(expectedInstr);
      expect(output).toBe(120);
    });
    
    test("basic multiple variable declaration", async () => {
        const vm = new VM(1500);
      const expectedInstr = 
      [ {"tag": "ENTER_SCOPE", "num": 4},
        {"tag": "LDC", "val": 1},
        {"tag": "LDC", "val": 2},
        {"tag": "LDC", "val": 3},
        {"tag": "ASSIGN", "pos": [2, 2]},
        {"tag": "POP"},
        {"tag": "ASSIGN", "pos": [2, 1]},
        {"tag": "POP"},
        {"tag": "ASSIGN", "pos": [2, 0]},
        {"tag": "POP"},
        {"tag": "LDF", "arity": 0, "addr": 12},
        {"tag": "GOTO", "addr": 24},
        {"tag": "ENTER_SCOPE", "num": 3},
        {"tag": "LDC", "val": 11},
        {"tag": "LDC", "val": 22},
        {"tag": "LDC", "val": 33},
        {"tag": "ASSIGN", "pos": [4, 2]},
        {"tag": "POP"},
        {"tag": "ASSIGN", "pos": [4, 1]},
        {"tag": "POP"},
        {"tag": "ASSIGN", "pos": [4, 0]},
        {"tag": "EXIT_SCOPE"},
        {"tag": "LDC", "val": undefined},
        {"tag": "RESET"},
        {"tag": "ASSIGN", "pos": [2, 3]},
        {"tag": "POP"},
        {"tag": "LD", "sym": "main", "pos": [2, 3]},
        {"tag": "CALL", "arity": 0},
        {"tag": "EXIT_SCOPE"},
        {"tag": "DONE"}];
      
        const output = vm.run(expectedInstr);
        expect(output).toBe(undefined);
    });

    test("basic multiple assignment", async () => {
        const vm = new VM(1500);
      const expectedInstr = 
      [ {"tag": "ENTER_SCOPE", "num": 4},
        {"tag": "LDC", "val": 1},
        {"tag": "LDC", "val": 2},
        {"tag": "LDC", "val": 3},
        {"tag": "ASSIGN", "pos": [2, 2]},
        {"tag": "POP"},
        {"tag": "ASSIGN", "pos": [2, 1]},
        {"tag": "POP"},
        {"tag": "ASSIGN", "pos": [2, 0]},
        {"tag": "POP"},
        {"tag": "LDF", "arity": 0, "addr": 12},
        {"tag": "GOTO", "addr": 22},
        {"tag": "LDC", "val": 11},
        {"tag": "LDC", "val": 22},
        {"tag": "LDC", "val": 33},
        {"tag": "ASSIGN", "pos": [2, 2]},
        {"tag": "POP"},
        {"tag": "ASSIGN", "pos": [2, 1]},
        {"tag": "POP"},
        {"tag": "ASSIGN", "pos": [2, 0]},
        {"tag": "LDC", "val": undefined},
        {"tag": "RESET"},
        {"tag": "ASSIGN", "pos": [2, 3]},
        {"tag": "POP"},
        {"tag": "LD", "sym": "main", "pos": [2, 3]},
        {"tag": "CALL", "arity": 0},
        {"tag": "EXIT_SCOPE"},
        {"tag": "DONE"}];   
      
        const output = vm.run(expectedInstr);
        expect(output).toBe(undefined);
    });
    // NOTE TO US, there is no way to express this in js/source to check with HOMEWORK compiler, but use eye check
    test("basic multiple variable declaration multiple return from function", async () => {
        const vm = new VM(1500);
      const expectedInstr = 
        [ {"tag": "ENTER_SCOPE", "num": 5},
            {"tag": "LDF", "arity": 0, "addr": 3},
            {"tag": "GOTO", "addr": 9},
            {"tag": "LDC", "val": 1},
            {"tag": "LDC", "val": 2},
            {"tag": "LDC", "val": 3},
            {"tag": "RESET"},
            {"tag": "LDC", "val": undefined},
            {"tag": "RESET"},
            {"tag": "ASSIGN", "pos": [2, 0]},
            {"tag": "POP"},
            {"tag":"LD","sym":"inc","pos":[2,0]},
            {"tag":"CALL","arity":0},
            {"tag": "ASSIGN", "pos": [2, 3]},
            {"tag": "POP"},
            {"tag": "ASSIGN", "pos": [2, 2]},
            {"tag": "POP"},
            {"tag": "ASSIGN", "pos": [2, 1]},
            {"tag": "POP"},
            {"tag":"LDF","arity":0,"addr":21},
            {"tag":"GOTO","addr":25},
            {"tag": "LD", "sym": "x", "pos": [2,1]},
            {"tag":"RESET"},
            {"tag": "LDC", "val": undefined},
            {"tag":"RESET"},
            {"tag":"ASSIGN","pos":[2,4]},
            {"tag":"POP"},
            {"tag": "LD", "sym": "main", "pos": [2, 4]},
            {"tag": "CALL", "arity": 0},
            {"tag": "EXIT_SCOPE"},
            {"tag": "DONE"}];

            const output = vm.run(expectedInstr);
            expect(output).toBe(1);
    });
});