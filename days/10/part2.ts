import { sample, sample2, input } from './input'

function solve(input: string) {
  const COMMANDS = input.trim().split('\n')
  const CRT_ROW_LENGTH = 40
  const CRT: string[] = []

  let cycle = 0
  let x = 1

  function draw() {
    let pixel = cycle
    const sprite = [x - 1, x, x + 1]

    while (pixel > 40) {
      pixel -= 40
    }

    if (sprite.includes(pixel - 1)) {
      CRT.push('#')
    } else {
      CRT.push('.')
    }
  }

  for (const command of COMMANDS) {
    cycle++
    draw()

    if (command === 'noop') {
      continue
    }

    cycle++
    draw()

    const [, string] = command.split(' ')
    const number = parseInt(string)

    x += number
  }

  const rows = []

  for (let i = 0; i < CRT.length; i += CRT_ROW_LENGTH) {
    const row = CRT.slice(i, i + CRT_ROW_LENGTH)

    if (row.length === CRT_ROW_LENGTH) {
      rows.push(row)
    }
  }

  const answer = rows.map(row => row.join('')).join('\n')

  console.log(answer)
}

solve(input)