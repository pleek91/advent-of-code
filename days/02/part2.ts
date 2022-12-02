import { sample, input } from './input'

// A = Rock
// B = Paper
// C = Scissors

// X = lose
// Y = draw
// Z = win

// 1 = Rock
// 2 = Paper
// 3 = Scissors

function solve(input: string) {
  const uniform = input.replaceAll('A', '1').replaceAll('B', '2').replaceAll('C', '3')
  const numbers = uniform.replaceAll('X', 'L').replaceAll('Y', 'D').replaceAll('Z', 'W')
  const matches = numbers.trim().split('\n').map(line => line.split(' ')).map(([opponent, me]) => [parseInt(opponent), me] as const)

  const answer = matches.reduce((points, [opponent, outcome]) => {
    let choice = 0

    if (outcome === 'L') {
      choice = opponent - 1
    }

    if (outcome === 'D') {
      choice = opponent
      points += 3
    }

    if (outcome === 'W') {
      choice = opponent + 1
      points += 6
    }

    if (choice === 4) {
      choice = 1
    }

    if (choice === 0) {
      choice = 3
    }

    return points += choice
  }, 0)

  console.log(answer)
}

solve(input)