import { parse } from '../go-slang/parser/parser'
import { resolvedErrorPromise } from './utils'
import { IOptions, Result } from '..'
import { ASTNode } from '../go-slang/ast/AST'
import { Context, RecursivePartial } from '../types'
import { compile_program } from '../go-slang/compiler/compiler'
import { VM } from '../go-slang/vm'

export async function goRunner(
  code: string,
  context: Context,
  options: RecursivePartial<IOptions> = {}
): Promise<Result> {
  const program: ASTNode | undefined = parse(code)
  if (!program) {
    return resolvedErrorPromise
  }
  const compiledProgram: any[] = compile_program(program)
  const vm = new VM(1500)

  return Promise.resolve({
    status: 'finished',
    context,
    value: vm.run(compiledProgram)
  })
}
