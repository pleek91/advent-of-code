import { sample, sample2, input } from './input'

function solveCycle(input: string, cycle: number) {
  const commands = input.trim().split('\n')
  let cycles = 0
  let x = 1

  for (const command of commands) {
    cycles++

    if (cycles == cycle) {
      break
    }

    if (command === 'noop') {
      continue
    }

    cycles++

    if (cycles == cycle) {
      break
    }

    const [, string] = command.split(' ')
    const number = parseInt(string)

    x += number
  }

  return cycle * x
}

function solve(input: string) {
  const cycles = [20, 60, 100, 140, 180, 220]
  const values = cycles.map(cycle => solveCycle(input, cycle))
  const answer = values.reduce((total, current) => total + current, 0)

  console.log(answer)
}

solve(input)