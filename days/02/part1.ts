import { sample, input } from './input'

// A = Rock
// B = Paper
// C = Scissors

// X = Rock
// Y = Paper
// Z = Scissors

// 1 = Rock
// 2 = Paper
// 3 = Scissors

function solve(input: string) {
  const uniform = input.replaceAll('A', 'X').replaceAll('B', 'Y').replaceAll('C', 'Z')
  const numbers = uniform.replaceAll('X', '1').replaceAll('Y', '2').replaceAll('Z', '3')
  const matches = numbers.trim().split('\n').map(line => line.split(' ').map(char => parseInt(char)))

  const answer = matches.reduce((points, [opponent, me]) => {
    points += me

    const difference = me - opponent

    switch (difference) {
      case 0:
        points += 3
        break
      case 1:
      case -2:
        points += 6
        break
    }

    return points
  }, 0)

  console.log(answer)
}

solve(input)