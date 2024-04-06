import { createContext } from '../../..'
import { goRunner } from '../goRunner'

const boilerplateTest = async (
  code: string,
  expected: any,
  throwError: boolean = false,
  memory: number | undefined = undefined
) => {
  try {
    const actual = await goRunner(code, createContext(), memory, {}, throwError)
    if (throwError) {
      // if we expect the code to throw an error
      // but the code compiles successfully
      // then we throw an error to cause the test case to fail
      console.log({ actual })
      throw new Error('Expect the code to throw an error')
    }
    if (actual.status === 'finished') {
      expect(actual.value).toStrictEqual(expected)
    } else {
      console.log({ actual })
      throw new Error(`result.status: ${actual.status}`)
    }
  } catch (error) {
    expect(error.message).toStrictEqual(expected)
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

    boilerplateTest(code, 1)
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

    boilerplateTest(code, 2)
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

    boilerplateTest(code, 11)
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

    boilerplateTest(code, 1)
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

    boilerplateTest(code, 0)
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
    boilerplateTest(code, 120, false, 1200)
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

    boilerplateTest(code, 55)
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

    boilerplateTest(code, 990100)
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

    boilerplateTest(code, 20)
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

    boilerplateTest(code, undefined)
  })
  test('string', async () => {
    const code = `
      func main() {
        x string := "this is a string"
        return x
      }`

    boilerplateTest(code, 'this is a string')
  })
  test('string 2', async () => {
    const code = `
      func main() {
        return "aaa" + "bbb"
      }`

    boilerplateTest(code, 'aaabbb')
  })
  test('go statement', async () => {
    const code = `
      func inc(x int) {
        return x
      }
      func main() {
        x int := 0
        go inc(1)
        return x
      }`

    boilerplateTest(code, 0)
  })
  test('go statement 2', async () => {
    const code = `
      func inc(x int) {
        x = x + 1
        return x
      }
      func main() {
        x int := 0
        go inc(x)
        sleep(20)
      }`

    boilerplateTest(code, undefined)
  })
  test('go statement 3', async () => {
    const code = `
      func inc(x int) {
        x = x + 1
        return x
      }
      func main() {
        x int := 0
        go inc(x)
        sleep(20)
        return x
      }`

    boilerplateTest(code, 0)
  })
  test('go statement 4', async () => {
    const code = `
    func main() {
      go func(x int){
        return x
      }(1);
    }`

    boilerplateTest(code, undefined)
  })

  test('basic buffered channel test', async () => {
    const code = `
    func inc(output chan int) {
      num int := <-output
      Println(num)
    }
    func main() {
      var input chan int = make(chan int, 5)
      i int := 0
      for i < 5 {
        go inc(input);
        i = i + 1
      }
      i = 0
      for i < 5 {
        input <- i
        i=i+1
      }
      sleep(25000)
    }
    `

    boilerplateTest(code, undefined)
  })
  // but this passes
  test('basic buffered channel test', async () => {
    const code = `
    func inc(output chan int) {
      num int := <-output
      Println(num)
    }
    func main() {
      var input chan int = make(chan int, 3)
      i int := 0
      go inc(input)
      go inc(input)
      go inc(input)
      go inc(input)
      go inc(input)
      i = 0
      for i < 5 {
        input <- i
        i=i+1
      }
      sleep(500000)
    }
    `

    boilerplateTest(code, undefined)
  })
  test('go call in loop', async () => {
    const code = `
    func inc(x int) {
      x = x + 1
      Println(x)
    }
    func main() {
      var input chan int = make(chan int, 5)
      x int := 0
      for x < 5 {
        go inc(x)
        x = x + 1
      }
      sleep(15)
    }`

    boilerplateTest(code, undefined)
  })
  test('test buffered channel deadlock detection', async () => {
    const code = `
    func inc() {
      x int := 1
      Println(x)
    }
    func main() {
      c chan int := make(chan int, 1)
      go inc()
      c <- 1
      c <- 2
    }`
    boilerplateTest(code, 'fatal error: all goroutines are asleep - deadlock!', true)
  })
  test('go call in loop unbuffered', async () => {
    const code = `
    func inc(output chan int) {
      num int := <-output
      Println(num)
    }
    func main() {
      var input chan int = make(chan int)
      x int := 0
      for x < 5 {
        go inc(input)
        x = x + 1
      }
      x = 0
      for x < 5 {
        input <- x
        x = x + 1
      }
      sleep(15)
    }`

    boilerplateTest(code, undefined)
  })
  // should print { value: 'Hello World' }
  test('unbuffered channels', async () => {
    const code = `
      func hello(output chan string) {
        output <- "Hello World"
      }
      func main() {
        input chan string := make(chan string)
        go hello(input)
        text string := <-input
        Println(text)
      }`

    boilerplateTest(code, undefined)
  })
  test('unbuffered channels deadlock detection', async () => {
    const code = `
      func hello(output chan string) {
        output <- "Hello World"
      }
      func main() {
        input chan string := make(chan string)
        go hello(input)
        <-input
        text string := <-input
        Println(text)
      }`
    boilerplateTest(code, 'fatal error: all goroutines are asleep - deadlock!', true)
  })
  test('basic rel ops test', async () => {
    const code = `
    func main() {
      x int := 1
      if x == 1 {
        x = x + 1
      }
      if x != 1 {
        x = x + 1
      }
      if x >= 1 {
        x = x + 1
      }
      if x <= 10 {
        x = x + 1
      }
      if x > 1 {
        x = x + 1
      }
      if x < 10 {
        x = x + 1
      }
      return x
    }`

    boilerplateTest(code, 7)
  })
  test('basic bin ops test', async () => {
    const code = `
    func main() {
      x int := 1
      return x + x - 4 * 3 / 2 % 5
    }`

    boilerplateTest(code, 1)
  })
  test('basic bin op precedence test should print 4 instead of 6', async () => {
    const code = `
    func main() {
      x int := 1
      return x + x * 3
    }`

    boilerplateTest(code, 4)
  })
  test('basic bin op precedence test should print 3 instead of 2', async () => {
    const code = `
    func main() {
      x int := 2
      return x + x / 2
    }`

    boilerplateTest(code, 3)
  })
  test('sleep', async () => {
    const code = `
    func worker(id int) {
      sleep(500)
      return id * 2
    }
    func main() {
      res int := 0
      i int := 0
      for i < 3 {
        i = i + 1
        go func() {
          res = res + worker(i)
        }()
      }
      return res
    }`

    boilerplateTest(code, 0)
  })
  test('basic mutex test', async () => {
    const code = `
    func main() {
      var x Mutex = mutex
      var a,b,c Mutex = mutex
      Lock(x)
      Unlock(x)
    }`

    boilerplateTest(code, undefined)
  })
  test('basic mutex test unlocking unlocked channel should throw an error', async () => {
    const code = `
    func main() {
      var x Mutex = mutex
      var a,b,c Mutex = mutex
      Lock(x)
      Unlock(x)
      Unlock(b)
    }`
    boilerplateTest(code, 'unlock of unlocked mutex', true)
  })
  test('basic mutex test on other go routines blocks and deadlocks', async () => {
    const code = `
    func inc(x Mutex, c chan int) {
      Lock(x)
      <-c
      Unlock(x)
    }
    func main() {
      var x Mutex = mutex
      var c chan int = make(chan int)
      go inc(x,c)
      sleep(50)
      Lock(x)
      c <- 1
      Unlock(x)
    }`
    boilerplateTest(code, 'fatal error: all goroutines are asleep - deadlock!', true)
  })
  test('basic mutex test on other go routines blocks no deadlocks', async () => {
    const code = `
    func inc(x Mutex, c chan int) {
      Lock(x)
      <-c
      Unlock(x)
    }
    func inc2(c chan int) {
      sleep(5000000)
      c<-1
    }
    func main() {
      var x Mutex = mutex
      var c chan int = make(chan int)
      go inc(x,c)
      go inc2(c)
      sleep(50)
      Lock(x)
      Unlock(x)
    }`

    boilerplateTest(code, undefined)
  })

  // should print { value: 1 }
  test('basic recursive cycle present should not throw', async () => {
    const code = `
    func recurse1(o int) int {
      if o == 0 {
        return y
      }
      return recurse2(o - 1)
    }

    var x int = recurse1(4)

    func recurse2(t int) int {
      return recurse1(t - 1)
    }
    func main() {
      Println(x)
    }

    var y int = 1
      `

    boilerplateTest(code, undefined)
  })

  test('basic preprocessor test 4 declaration with reordering in func', async () => {
    const code = `
    var x int = inc()
    func inc() {
      return y
    }
    func main() {
      sz int :=1
    }
    var y int = 3
    `

    boilerplateTest(code, undefined)
  })
  test('wait - syntax testing', async () => {
    const code = `
    func main() {
      var x WaitGroup = waitgroup
      Add(x, 1)
      Done(x)
      Wait(x)
    }`

    boilerplateTest(code, undefined)
  })

  test('wait - concurrent go routines', async () => {
    const code = `
    func worker(id int) {
      sleep(500)
      return id * 2
    }
    func main() {
      var wg WaitGroup = waitgroup
      res int := 0
      i int := 0
      for i < 3 {
        i = i + 1
        Add(wg, 1)
        go func() {
          res = res + worker(i)
          Done(wg)
        }()
        // before starting the next go routine, we wait for the previous one to finish
        Wait(wg)
      }
      return res
    }`

    boilerplateTest(code, 12, false, 3000)
  })
  test('wait - test Add(wg, 2) functionality', async () => {
    const code = `
    func main() {
      var wg WaitGroup = waitgroup
      x int := 0
      y int := 0
      Add(wg, 2)
      go func() {
        sleep(500)
        x = 1
        Done(wg)
      }()
      go func() {
        sleep(500)
        y = 2
        Done(wg)
      }()

      Wait(wg)

      return x + y
    }`

    boilerplateTest(code, 3, false, 3000)
  })
  test('wait - concurrent go routines WITHOUT WaitGroup', async () => {
    const code = `
    func main() {
      x int := 0
      y int := 0

      go func() {
        sleep(500)
        x = 1
      }()
      go func() {
        sleep(500)
        y = 2
      }()

      return x + y
    }`

    boilerplateTest(code, 0, false, 3000)
  })
  test('wait - negative waitgroup counter', async () => {
    const code = `
    func main() {
      var wg WaitGroup = waitgroup
      x int := 0
      y int := 0
      Add(wg, 1)
      go func() {
        Done(wg)
        Done(wg)
        x = 1
      }()
      sleep(500)
      Wait(wg)

      return x + y
    }`

    boilerplateTest(code, 'negative waitgroup counter', true)
  })
  test('wait - deadlock testing', async () => {
    const code = `
    func main() {
      var wg WaitGroup = waitgroup
      x int := 0
      y int := 0
      Add(wg, 2)
      go func() {
        x = 1
        Done(wg)
      }()
      sleep(500)
      Wait(wg)

      return x + y
    }`
    boilerplateTest(code, 'fatal error: all goroutines are asleep - deadlock!', true)
  })
  test('wait - main thread should still complete even though go routines deadlock', async () => {
    const code = `
    func main() {
      var wg1 WaitGroup = waitgroup
      var wg2 WaitGroup = waitgroup

      x int := 0
      y int := 0
      go func() {
        Add(wg1, 1)
        sleep(500)
        x = 1
        Wait(wg1)
        Done(wg2)
      }()

      go func() {
        Add(wg2, 1)
        sleep(500)
        y = 2
        Wait(wg2)
        Done(wg1)
      }()

      return x + y
    }`

    boilerplateTest(code, 0, false, 3000)
  })
  test('wait - deadlock testing with multiple waitgroups', async () => {
    const code = `
    func main() {
      var wg1 WaitGroup = waitgroup
      var wg2 WaitGroup = waitgroup

      x int := 0
      y int := 0
      go func() {
        Add(wg1, 1)
        x = 1
        Wait(wg1)
        Done(wg2)
      }()

      Add(wg2, 1)
      y = 2
      Wait(wg2)
      Done(wg1)

      return x + y
    }`

    boilerplateTest(code, 'fatal error: all goroutines are asleep - deadlock!', true)
  })

  test('test buffered channel allocation fail due to insufficient size', async () => {
    const code = `
    func inc() {
      x int := 1
      Println(x)
    }
    func main() {
      c chan int := make(chan int, 65536)
      go inc()
      c <- 1
      c <- 2
      v chan int := make(chan int, 1)
    }`
    boilerplateTest(code, 'Ran out of heap space for buffered channels!', true)
  })

  test('test buffered channel allocation pass with garbage collection', async () => {
    const code = `
    func inc() {
      channeltest chan int := make(chan int, 65536)
      channeltest <- 1
    }
    func main() {
      inc()
      v chan int := make(chan int, 2)
    }`
    boilerplateTest(code, undefined, false, 3000)
  })

  //to test this, temporarily set the memory to a ridiculously large number
  test('test channel low level queue does not bug out', async () => {
    const code = `
    func inc(output chan int) {
      num int := <-output
      Println(num)
    }
    func main() {
      var input chan int = make(chan int)
      x int := 0
      for x < 5 {
        go inc(input)
        x = x + 1
      }
      x = 0
      for x < 5 {
        input <- x
        x = x + 1
      }

      var input2 chan int = make(chan int, 256)
      x = 0
      for x < 500 {
        go inc(input2)
        x = x + 1
      }
      x = 0
      for x < 500 {
        input2 <- x
        x = x + 1
      }
    }`
    boilerplateTest(code, undefined, false, 200000)
  })
  */
})
