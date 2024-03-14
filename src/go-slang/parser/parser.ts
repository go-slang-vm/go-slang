import { CharStreams, CommonTokenStream } from 'antlr4ts';

import { Cst_To_Json } from './Cst_To_Json';
import { GoLexer }  from '../lang/GoLexer';
import { SimpleParser }  from '../lang/SimpleParser';

// import { CharStreams, CommonTokenStream } from 'antlr4';
// import  GoLexer   from './lang2/GoLexer';
// import  GoParser   from './lang2/GoParser';
// Create the lexer and parser

// let inputStream2 = CharStreams.fromString(`
// {
//     var x = 2
//     var y, z = 4, 5
//     x, y, z = 5, 0, 11
//     y = 10
//     k := 999

//     func main(x) {
//         x = x + 1
//         x = x || y
//         y = -y
//         return x, y
//     }

//     if x == 9 {
//         z = 0
//     } else if p != 9 {
//         k = 0
//     } else {
//         k = 1
//     }

//     if x == 10 {
//         return main(p)
//     }

//     i := 0
//     for i < 5 {
//         i = i + 1
//     }
// }
// `);

const inputStream3 = CharStreams.fromString(`
    var x = 2
    var y, z = 4, 5
    k := 999

    func main() {
        x = x + 1
        x = x || y
        y = -y
        z = x + y * p - 2
        return x, y
    }
`);


const lexer = new GoLexer(inputStream3);
//console.log(lexer);
const tokenStream = new CommonTokenStream(lexer);
//console.log(tokenStream);
const parser = new SimpleParser(tokenStream);
//console.log(parser);
// Parse the input, where `compilationUnit` is whatever entry point you defined
const tree = parser.global_scope();
console.log(tree);
//console.log(tree.toStringTree(parser.ruleNames));
const visitor = new Cst_To_Json();
const res = visitor.visit(tree);
//console.log(res);
console.dir(res,{depth: 100});

