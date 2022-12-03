import { sample, input } from './input'

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

function solve(input: string) {
  const packs = input.trim().split('\n').map(pack => [pack.slice(0, pack.length / 2), pack.slice(pack.length / 2)])
  const items = packs.map(([a, b]) => {
    for (const item of a) {
      if (b.includes(item)) {
        return item
      }
    }
    throw 'No match found'
  })

  const answer = items.reduce((total, item) => {
    const priority = alphabet.indexOf(item.toLocaleLowerCase()) + 1

    if (item !== item.toLocaleLowerCase()) {
      return total + priority + 26
    }

    return total + priority
  }, 0)

  console.log(answer)
}

solve(input)