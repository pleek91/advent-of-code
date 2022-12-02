import { sample, input } from './input'

function solve(input: string) {
  const elves = input.split('\n\n').map(elf => elf.trim()).map(elf => elf.split('\n'))

  const [first, second, third] = elves.reduce(([first, second, third], elf) => {
    const calories = elf.reduce((sum, value) => parseInt(value) + sum, 0)

    if (calories > first) {
      return [calories, first, second]
    }

    if (calories > second) {
      return [first, calories, second]
    }

    if (calories > third) {
      return [first, second, calories]
    }

    return [first, second, third]
  }, [0, 0, 0])

  console.log(first + second + third)
}

solve(input)