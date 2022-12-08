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

  const sizes = Reflect.ownKeys(dirs).map(key => dirs[key as symbol])
  const total = 70000000
  const used = Math.max(...sizes)
  const free = total - used
  const update = 30000000
  const needed = update - free
  const filtered = sizes.filter(size => size >= needed)
  const answer = Math.min(...filtered)

  console.log(answer)
}

solve(input)