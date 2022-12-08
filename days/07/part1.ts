import { sample, input } from './input'

function solve(input: string) {
  const commands = input.trim().split('\n')
  const dirs: Record<symbol, number> = {}
  const open: symbol[] = []

  for (const command of commands) {
    if (command.startsWith('dir') || command.startsWith('$ ls')) {
      continue
    }

    if (command.startsWith('$ cd ..')) {
      open.pop()
      continue
    }

    if (command.startsWith('$ cd ')) {
      open.push(Symbol())
      continue
    }

    const [size] = command.split(' ')

    open.forEach(dir => {
      dirs[dir] ??= 0
      dirs[dir] += parseInt(size)
    })

  }

  const answer = Reflect.ownKeys(dirs).reduce((total, key) => {
    const dirSize = dirs[key as symbol]

    if (dirSize <= 100000) {
      return total += dirSize
    }

    return total
  }, 0)

  console.log(answer)
}

solve(input)