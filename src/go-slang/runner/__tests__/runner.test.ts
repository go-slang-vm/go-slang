import { Result, createContext } from '../../..'
import { goRunner } from '../goRunner'

const boilerplateAssert = (actual: Result, expected: any) => {
  if (actual.status === 'finished') {
    expect(actual.value).toStrictEqual(expected)
  } else {
    console.log({ actual })
    throw new Error(`result.status: ${actual.status}`)
  }
}

describe('Runner tests', () => {
  test('variable declaration in a new block scope', async () => {
    const code = `
      func main() (int) {
        var y int = 1
        {
          y int := 2
        }
        return y
      }`

    const result = await goRunner(code, createContext())

    boilerplateAssert(result, 1)
  })
  test('variable declaration in a new block scope 2', async () => {
    const code = `
      func main() (int) {
        var y int = 1
        {
          y int := 2
          return y
        }
      }`

    const result = await goRunner(code, createContext())

    boilerplateAssert(result, 2)
  })
  test('basic fact', async () => {
    const code = `
    func fact(n int) (int) {
      return fact_iter(n,1,1)
    }
    func fact_iter(n, i, acc int) (int) {
      if i > n {
        return acc
      } else {
        return fact_iter(n,i+1,acc*i)
      }
    }
    func main() (int) {
      return fact(5)
    }`

    const result = await goRunner(code, createContext())

    boilerplateAssert(result, 120)
  })
  test('basic fact', async () => {
    const code = `
    func fact(n int) (int) {
      return fact_iter(n,1,1)
    }
    func fact_iter(n, i, acc int) (int) {
      if i > n {
        return acc
      } else {
        return fact_iter(n,i+1,acc*i)
      }
    }
    func main() (int) {
      return fact(5)
    }`

    const result = await goRunner(code, createContext())

    boilerplateAssert(result, 120)
  })

  test('basic while loop', async () => {
    const code = `
      func main() (int) {
        var x int = 0
        var y int = 0
        for x < 10 {
          x = x + 1
          y = y + x
        }
        return y
      }`
    const result = await goRunner(code, createContext())

    boilerplateAssert(result, 55)
  })
  test('basic if statment with nesting and empty else', async () => {
    const code = `
      func main() (int) {
        x int := 1
        if(false) {
          x = 10
        } else if(true) {
          if(x < 10) {
            x = 20;
          }
        } else {
          x = 30
        }
        return x
      }`
    const result = await goRunner(code, createContext())

    boilerplateAssert(result, 20)
  })
  test('basic empty return', async () => {
    const code = `
      func main() {
        x int := 1
        if(false) {
          x = 10
        } else if(true) {
          if(x < 10) {
            x = 20;
          }
        } else {
          x = 30
        }
      }`
    const result = await goRunner(code, createContext())

    boilerplateAssert(result, undefined)
  })
  test('basic string', async () => {
    const code = `
      func main() {
        x string := "this is a string"
        return x
      }`
    const result = await goRunner(code, createContext())

    boilerplateAssert(result, 'this is a string')
  })
})
