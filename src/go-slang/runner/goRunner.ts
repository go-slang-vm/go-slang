import { parse } from '../parser/parser'
import { resolvedErrorPromise } from '../../runner/utils'
import { IOptions, Result } from '../..'
import { ASTNode } from '../ast/AST'
import { Context, RecursivePartial } from '../../types'
import { compile_program } from '../compiler/compiler'
import { VM } from '../vm'
import { preprocess } from '../preprocessor/preprocessor'
import { resetGlobalState } from '../vm/globals'
import { RuntimeSourceError } from '../../errors/runtimeSourceError'
import { toSourceError } from '../../runner/errors'
import { RawSourceMap } from 'source-map'
import { typecheck } from '../typechecker/typechecker'
import { cloneDeep } from 'lodash'

export async function goRunner(
  code: string,
  context: Context,
  memory: number = 15000,
  options: RecursivePartial<IOptions> = {},
  throwError: boolean = false // for testing purposes; helps us to check that the correct error is thrown in our test suite
): Promise<Result> {
  try {
    let program: ASTNode | null = parse(code, context)
    if (!program) {
      return resolvedErrorPromise
    }
    program = preprocess(program)
    const copyOfProgram = cloneDeep(program)
    typecheck(copyOfProgram)
    const compiledProgram: any[] = compile_program(program)
    resetGlobalState()
    const vm = new VM(memory)
    return Promise.resolve({
      status: 'finished',
      context,
      value: vm.run(compiledProgram)
    })
  } catch (error) {
    if (throwError) {
      throw error
    }
    let sourceMapJson: RawSourceMap | undefined
    context.errors.push(
      error instanceof RuntimeSourceError ? error : await toSourceError(error, sourceMapJson)
    )
    return resolvedErrorPromise
  }
}
