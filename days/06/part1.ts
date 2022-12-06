import { sample, input } from './input'

function solve(input: string, markerSize: number) {
  let answer

  for (let i = markerSize; i < input.length; i++) {
    const chars = input.slice(i - markerSize, i)
    const set = new Set(chars)

    if (set.size === markerSize) {
      answer = i
      break
    }
  }

  console.log(answer)
}

// part 1
// solve(input, 4)

// part 2
solve(input, 14)