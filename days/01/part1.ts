import { sample, input } from './input'

function solve(input: string) {
  const elves = input.split('\n\n').map(elf => elf.trim()).map(elf => elf.split('\n'))

  const answer = elves.reduce((mostCalories, elf) => {
    const calories = elf.reduce((sum, value) => parseInt(value) + sum, 0)

    if (calories > mostCalories) {
      return calories
    }

    return mostCalories
  }, 0)

  console.log(answer)
}

solve(input)