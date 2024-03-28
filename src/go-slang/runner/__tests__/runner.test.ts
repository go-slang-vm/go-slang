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
  test('function', async () => {
    const code = `
    func g(x, y int) {
      return x - y
    }

    func f(x, y int) {
      return g(x, y)
    }

    func main() {
      result int := f(33, 22)
      return result
    }`

    const result = await goRunner(code, createContext())

    boilerplateAssert(result, 11)
  })
  test('function 2', async () => {
    const code = `
      func inc(x int) {
        x = x + 1
        return x
      }
      func main() {
        x int := 0
        x = inc(x)
        return x
      }`
    const result = await goRunner(code, createContext())

    boilerplateAssert(result, 1)
  })
  test('function 3', async () => {
    const code = `
      func inc(x int) {
        x = x + 1
        return x
      }
      func main() {
        x int := 0
        inc(x)
        // x should return 0 as the value from inc() is not reassigned to x
        return x
      }`
    const result = await goRunner(code, createContext())

    boilerplateAssert(result, 0)
  })
  test('factorial function (recursion) with memory management', async () => {
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

    const result = await goRunner(code, createContext(), 1200)

    boilerplateAssert(result, 120)
  })

  test('while loop', async () => {
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
  test('while loop 2', async () => {
    const code = `
      func main() (int) {
        var x int = 0
        var i int = 0
        for i < 100 {
          j int := 0
          for j < 100 {
            x = x + i + j
            j = j + 1
          }
          i = i + 1
          x = x + 1
        }
        return x
      }`
    const result = await goRunner(code, createContext())

    boilerplateAssert(result, 990100)
  })
  test('if statement with nesting and empty else', async () => {
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
  test('empty return', async () => {
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
  test('string', async () => {
    const code = `
      func main() {
        x string := "this is a string"
        return x
      }`
    const result = await goRunner(code, createContext())

    boilerplateAssert(result, 'this is a string')
  })
  test('string 2', async () => {
    const code = `
      func main() {
        return "aaa" + "bbb"
      }`
    const result = await goRunner(code, createContext())

    boilerplateAssert(result, 'aaabbb')
  })
  test('go statement', async () => {
    const code = `
      func inc(x int) {
        return x
      }
      func main() {
        go inc(1)
      }`
    const result = await goRunner(code, createContext())

    boilerplateAssert(result, undefined)
  })
  // test('go statement 2', async () => {
  //   const code = `
  //     func inc(x int) {
  //       x = x + 1
  //       //TODO: [FIXME] adding this return statement causes the error: "pop: empty list"
  //       return x
  //     }
  //     func main() {
  //       x int := 0
  //       go inc(x)
  //       sleep(20)
  //     }`
  //   const result = await goRunner(code, createContext())

  //   boilerplateAssert(result, 0)
  // })
})
