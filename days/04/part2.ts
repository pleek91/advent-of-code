import { sample, input } from './input'

function solve(input: string) {
  const pairs = input.trim()
    .split('\n')
    .map(line => line.split(','))
    .map(([first, second]) => [first.split('-').map(Number), second.split('-').map(Number)])

  const answer = pairs.reduce((total, [first, second]) => {
    const [firstStart, firstEnd] = first
    const [secondStart, secondEnd] = second

    if (
      firstStart >= secondStart && firstStart <= secondEnd
      || firstEnd >= secondStart && firstEnd <= secondEnd
      || secondStart >= firstStart && secondStart <= firstEnd
      || secondEnd >= firstStart && secondEnd <= firstEnd
    ) {
      return total + 1
    }

    return total
  }, 0)

  console.log(answer)
}

solve(input)