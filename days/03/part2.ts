import { sample, input } from './input'

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function solve(input: string) {
  const elves = input.trim().split('\n')
  const groups = elves.reduce<string[][]>((groups, elf) => {
    const lastGroup = groups[groups.length - 1]

    if (lastGroup && lastGroup.length < 3) {
      lastGroup.push(elf)
    } else {
      groups.push([elf])
    }

    return groups
  }, [])
  const badges = groups.map(group => {
    for (const char of alphabet) {
      if (group.every(elf => elf.includes(char))) {
        return char
      }
    }

    throw 'No match found'
  })

  const answer = badges.reduce((total, badge) => {
    return total + alphabet.indexOf(badge) + 1
  }, 0)

  console.log(answer)
}

solve(input)