import { ASTNode } from "../../ast/AST"
import { parse } from "../../parser/parser"
import { typecheck } from "../typechecker"
describe('Basic typecheck test', () => {
    test('basic correct var tests outside func body', async () => {
        const program = `
        var x, y, z int = 1, 2, 3
        var a string = "hello"
        var b bool = true
        var f float = 1.1
        var mut1,mut2 Mutex = mutex
        var wg WaitGroup = mutex
        var xx int = x
        func main() {
        }
          `
        const outputAst: ASTNode = parse(program)
        expect(()=>typecheck(outputAst)).not.toThrow()
      });
    test('basic correct var tests in func body', async () => {
      const program = `
      func main() {
        var x, y, z int = 1, 2, 3
        a string := "hello"
        var b bool = true
        var f float = 1.1
        var mut1,mut2 Mutex = mutex
        var wg WaitGroup = mutex
        xx int := x
      }
        `
      const outputAst: ASTNode = parse(program)
      expect(()=>typecheck(outputAst)).not.toThrow()
    });
    test('basic incorrect var tests outside func body', async () => {
        const program = `
        var x, y, z int = 1, 2, 3
        var a string = 1
        var b bool = true
        var f float = 1.1
        func main() {
        }
          `
        const outputAst: ASTNode = parse(program)
        expect(()=>typecheck(outputAst)).toThrow("type error in variable declaration; declared type: string, actual type: int")
      });
    test('basic incorrect var tests in func body', async () => {
      const program = `
      func main() {
        var x, y, z int = 1, 2, 3
        a string := "hello"
        var b bool = 1
        var f float = 1.1
      }
        `
      const outputAst: ASTNode = parse(program)
      expect(()=>typecheck(outputAst)).toThrow("type error in variable declaration; declared type: bool, actual type: int")
    });
    test('basic incorrect number of var expressions outside func body', async () => {
        const program = `
        var x, y, z int = 1, 2
        var b bool = true
        var f float = 1.1
        func main() {
        }
          `
        const outputAst: ASTNode = parse(program)
        expect(()=>typecheck(outputAst)).toThrow("Too few expressions on the RHS!")
      });
    test('basic incorrect number of var expressions tests in func body', async () => {
      const program = `
      func main() {
        var x, y, z int = 1, 2
        a string := "hello"
        var f float = 1.1
      }
        `
      const outputAst: ASTNode = parse(program)
      expect(()=>typecheck(outputAst)).toThrow("Too few expressions on the RHS!")
    });
    test('basic incorrect number of var expressions outside func body', async () => {
        const program = `
        var x, y, z int = 1, 2, 3, 4
        var b bool = true
        var f float = 1.1
        func main() {
        }
          `
        const outputAst: ASTNode = parse(program)
        expect(()=>typecheck(outputAst)).toThrow("Too many expressions on the RHS!")
      });
    test('basic incorrect number of var expressions tests in func body', async () => {
      const program = `
      func main() {
        var x, y, z int = 1, 2, 3, 4
        a string := "hello"
        var f float = 1.1
      }
        `
      const outputAst: ASTNode = parse(program)
      expect(()=>typecheck(outputAst)).toThrow("Too many expressions on the RHS!")
    });
    test('basic function app', async () => {
        const program = `
        func inc() int {
            return 1
        }
        func main() {
          var x, y, z int = inc(), 2, 3
          a string := "hello"
          var f float = 1.1
        }
          `
        const outputAst: ASTNode = parse(program)
        expect(()=>typecheck(outputAst)).not.toThrow()
      });
      test('basic function app incorrect number of return', async () => {
        const program = `
        func inc() int {
            return 1
        }
        func main() {
          var x, y, z int = inc()
          a string := "hello"
          var f float = 1.1
        }
          `
        const outputAst: ASTNode = parse(program)
        expect(()=>typecheck(outputAst)).toThrow("Too few expressions on the RHS!")
      });
      test('basic function app correct number of return', async () => {
        const program = `
        func inc() (int, int, int) {
            return 1, 2, 3
        }
        func main() {
          var x, y, z int = inc()
          a string := "hello"
          var f float = 1.1
        }
          `
        const outputAst: ASTNode = parse(program)
        expect(()=>typecheck(outputAst)).not.toThrow("Too many expressions on the RHS!")
      });
      test('basic function declaration incorrect return', async () => {
        const program = `
        func inc() (int, int, string) {
            return 1, 2, 3
        }
        func main() {
          var x, y, z int = inc()
          a string := "hello"
          var f float = 1.1
        }
          `
        const outputAst: ASTNode = parse(program)
        expect(()=>typecheck(outputAst)).toThrow("expected return types int, int, string but got int, int, int in function inc")
      });
      test('basic function declaration correct return', async () => {
        const program = `
        func inc() (int, int, int) {
            return 1, 2, 3
        }
        func main() {
          var x, y, z int = inc()
          a string := "hello"
          var f float = 1.1
        }
          `
        const outputAst: ASTNode = parse(program)
        expect(()=>typecheck(outputAst)).not.toThrow("expected return types int, int, string but got int, int, int in function inc")
      });
      test('basic function app but sequence does not end in terminating statement', async () => {
        const program = `
        func inc() (int, int, int) {
            return 1, 2, 3
            var x int = 1
        }
        func main() {
          var x, y, z int = inc()
          a string := "hello"
          var f float = 1.1
        }
          `
        const outputAst: ASTNode = parse(program)
        expect(()=>typecheck(outputAst)).toThrow("type error in function declaration; expected return type: int, int, int actual return type: undefined")
      });
      test('basic conditional statement non terminating but correct return', async () => {
        const program = `
        func inc() (int, int, int) {
            x int:= 1
            if x < 1 {
                return 11, 22, 33
            }
            return 1, 2, 3
        }
        func main() {
          var x, y, z int = inc()
          a string := "hello"
          var f float = 1.1
        }
          `
        const outputAst: ASTNode = parse(program)
        //console.dir(outputAst, {depth: 100})
        expect(()=>typecheck(outputAst)).not.toThrow();
      });
      test('basic conditional statement non terminating but incorrect return', async () => {
        const program = `
        func inc() (int, int, int) {
            x int:= 1
            if x < 1 || x < 2 {
                return "hello"
            }
            return 1, 2, 3
        }
        func main() {
          var x, y, z int = inc()
          a string := "hello"
          var f float = 1.1
        }
          `
        const outputAst: ASTNode = parse(program)
        //console.dir(outputAst, {depth: 100})
        expect(()=>typecheck(outputAst)).toThrow("expected return types int, int, int but got string in function inc");
      });

      test('basic conditional statement terminating correct return', async () => {
        const program = `
        func inc() (int, int, int) {
            x int:= 1
            if x < 1 {
                return 11, 22, 33
            } else if x < 1 || x < 2 {
                return 21, 22, 23
            } else {
                return 31, 32, 33
            }
            return 1, 2, 3
        }
        func main() {
          var x, y, z int = inc()
          a string := "hello"
          var f float = 1.1
        }
          `
        const outputAst: ASTNode = parse(program)
        //console.dir(outputAst, {depth: 100})
        expect(()=>typecheck(outputAst)).not.toThrow()
      });

      test('basic conditional statement terminating incorrect return', async () => {
        const program = `
        func inc() (int, int, int) {
            x int:= 1
            if x < 1 {
                return 11, 22, 33
            } else if x < 1 || x < 2 {
                return 21, 22
            } else {
                return 31, 32, 33
            }
            return 1, 2, 3
        }
        func main() {
          var x, y, z int = inc()
          a string := "hello"
          var f float = 1.1
        }
          `
        const outputAst: ASTNode = parse(program)
        //console.dir(outputAst, {depth: 100})
        expect(()=>typecheck(outputAst)).toThrow("expected return types int, int, int but got int, int in function inc")
      });

      test('basic conditional statement make sure it is non terminating but correct return', async () => {
        const program = `
        func inc() (int, int, int) {
            x int:= 1      
            return 1, 2, 3
            if x < 1 {
                return 11, 22, 33
            }
        }
        func main() {
          var x, y, z int = inc()
          a string := "hello"
          var f float = 1.1
        }
          `
        const outputAst: ASTNode = parse(program)
        //console.dir(outputAst, {depth: 100})
        expect(()=>typecheck(outputAst)).toThrow("type error in function declaration; expected return type: int, int, int actual return type: undefined");
      });
})