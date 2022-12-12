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

  for (let round = 1; round <= rounds; round++) {
    for (const [index, monkey] of monkeys.entries()) {
      while (monkey.items.length) {
        // inspect
        const item = monkey.items.shift()
        monkey.inspected++

        // apply operation
        const level = eval(monkey.operation.replaceAll('old', `${item}`))

        // divide by 3
        const divided = Math.floor(level / 3)

        // test
        const passes = divided % monkey.test === 0

        // pass or fail
        if (passes) {
          monkeys[monkey.pass].items.push(divided)
        } else {
          monkeys[monkey.fail].items.push(divided)
        }
      }
    }
  }

  const inspected = monkeys.map(monkey => monkey.inspected)
  const [first, second] = inspected.sort((a, b) => b - a)
  const answer = first * second

  console.log(answer)
}

solve(input, 20)