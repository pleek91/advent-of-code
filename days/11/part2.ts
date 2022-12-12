/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable id-length */
import { sample, input } from './input'

type Monkey = {
  items: number[],
  operation: string,
  test: number,
  pass: number,
  fail: number,
  inspected: number,
}

function parseMonkey(input: string): Monkey {
  const [_, itemsLine, operationLine, testLine, passLine, failLine] = input.split('\n')
  const [__, itemsString] = itemsLine.split(': ')
  const [___, operationString] = operationLine.split(': new = ')
  const [____, testString] = testLine.split(': divisible by ')
  const [_____, passString] = passLine.split('monkey ')
  const [______, failString] = failLine.split('monkey ')

  return {
    items: itemsString.split(', ').map(Number),
    operation: operationString,
    test: Number(testString),
    pass: Number(passString),
    fail: Number(failString),
    inspected: 0,
  }
}

// steps
// inspect item
// apply operation
// divide by 3
// test
// pass or fail

function solve(input: string, rounds: number) {
  const monkeys = input.trim().split('\n\n').map(monkey => parseMonkey(monkey))

  // I got this from reddit :ashamed:
  const modulo = monkeys.map(monkey => monkey.test).reduce((acc, value) => acc * value)

  for (let round = 1; round <= rounds; round++) {
    for (const [index, monkey] of monkeys.entries()) {
      while (monkey.items.length) {
        // inspect
        const item = monkey.items.shift()
        monkey.inspected++

        // apply operation
        let level = eval(monkey.operation.replaceAll('old', `${item}`))

        // manage worry
        level = level % modulo

        // test
        const passes = level % monkey.test === 0

        // pass or fail
        if (passes) {
          monkeys[monkey.pass].items.push(level)
        } else {
          monkeys[monkey.fail].items.push(level)
        }
      }
    }
  }

  const items = monkeys.map(monkey => monkey.items)
  const inspected = monkeys.map(monkey => monkey.inspected)
  const [first, second] = inspected.slice().sort((a, b) => b - a)
  const answer = first * second

  console.log(answer)
}

solve(input, 10000)