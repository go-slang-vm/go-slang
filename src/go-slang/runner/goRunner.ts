import { parse } from '../parser/parser'
import { resolvedErrorPromise } from '../../runner/utils'
import { IOptions, Result } from '../..'
import { ASTNode } from '../ast/AST'
import { Context, RecursivePartial } from '../../types'
import { compile_program } from '../compiler/compiler'
import { VM } from '../vm'
import { preprocess } from '../preprocessor/preprocessor'
import { RuntimeSourceError } from '../../errors/runtimeSourceError'
import { toSourceError } from '../../runner/errors'
import { RawSourceMap } from 'source-map'

export async function goRunner(
  code: string,
  context: Context,
  memory: number = 1500,
  options: RecursivePartial<IOptions> = {}
): Promise<Result> {
  try {
    let program: ASTNode | null = parse(code, context)
    if (!program) {
      return resolvedErrorPromise
    }
    program = preprocess(program)
    const compiledProgram: any[] = compile_program(program)
    const vm = new VM(memory)
    return Promise.resolve({
      status: 'finished',
      context,
      value: vm.run(compiledProgram)
    })
  } catch (error) {
    let sourceMapJson: RawSourceMap | undefined
    context.errors.push(
      error instanceof RuntimeSourceError ? error : await toSourceError(error, sourceMapJson)
    )
    return resolvedErrorPromise
  }
}
