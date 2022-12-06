import { sample, input } from './input'

function getStacks(input: string): string[][] {
  const rowsInput = input.split('\n')
  const rows = rowsInput.slice(0, rowsInput.length - 1)
  const stacks: string[][] = []

  for (const row of rows) {
    for (let i = 0; i < row.length; i += 4) {
      const column = row.slice(i, i + 3).replace('[', '').replace(']', '')

      const stack = i/4
      stacks[stack] ??= []

      stacks[stack].push(column.trim())
    }
  }

  return stacks.map(stack => stack.filter(value => value.length))
}

function getMoves(input: string): [count: number, from: number, to: number][] {
  const rows: [number, number, number][] = input.trim()
    .replaceAll('move', '')
    .replaceAll('from', '')
    .replaceAll('to', '')
    .split('\n')
    .map(row => row.trim())
    .map(row => row.split(/\s+/))
    .map(row => row.map(Number))
    .map(([count, from, to]) => [count, from, to])

  return rows
}

function solve(input: string) {
  const [stacksInput, movesInput] = input.split('\n\n')
  const stacks = getStacks(stacksInput)
  const moves = getMoves(movesInput)

  for (const [count, from, to] of moves) {
    const fromStack = stacks[from - 1]
    const toStack = stacks[to - 1]
    // part 1
    const removed = fromStack.splice(0, count).reverse()
    // part 2
    // const removed = fromStack.splice(0, count)
    toStack.unshift(...removed)
  }

  const answer = stacks.map(stack => stack[0]).join('')

  console.log(answer)
}

solve(input)