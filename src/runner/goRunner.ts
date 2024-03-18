import { IOptions } from '..'
import { ASTNode } from '../go-slang/ast/AST'
import { parse } from '../go-slang/parser/parser'
import { Context, SourceError, Variant } from '../types'
import { resolvedErrorPromise } from './utils'

const DEFAULT_SOURCE_OPTIONS: Readonly<IOptions> = {
  scheduler: 'async',
  steps: 1000,
  stepLimit: -1,
  executionMethod: 'auto',
  variant: Variant.DEFAULT,
  originalMaxExecTime: 1000,
  useSubst: false,
  isPrelude: false,
  throwInfiniteLoops: true,
  envSteps: -1,
  importOptions: {
    wrapSourceModules: true,
    checkImports: true,
    loadTabs: true
  }
}

export function goRunner(code: string, context: Context, options: Partial<IOptions> = {}): any {
  // const theOptions: IOptions = { ...DEFAULT_SOURCE_OPTIONS, ...options }
  context.variant = DEFAULT_SOURCE_OPTIONS.variant
  context.errors = []

  try {
    const program: ASTNode | undefined = parse(code)
    if (!program) {
      return resolvedErrorPromise
    }
    console.dir({ program }, { depth: null })
    return undefined
    // const it = evaluate(program, context)
    // const scheduler: Scheduler = new PreemptiveScheduler(theOptions.steps)
    // return scheduler.run(it, context)
  } catch (e) {
    context.errors.push(e as SourceError)
    context.runtime.environments = context.runtime.environments.slice(
      -context.numberOfOuterEnvironments
    )
    return Promise.resolve({ status: 'error', error: e as SourceError })
  }
}
