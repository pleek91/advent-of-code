/* eslint-disable id-length */
import { sample2, input } from './input'

type position = [x: number, y: number]

function move(direction: string, [x, y]: position): position {
  if (direction === 'U') {
    return [x, y + 1]
  }

  if (direction === 'D') {
    return [x, y - 1]
  }

  if (direction === 'L') {
    return [x - 1, y]
  }

  if (direction === 'R') {
    return [x + 1, y]
  }

  if (direction === 'UL') {
    return [x - 1, y + 1]
  }

  if (direction === 'UR') {
    return [x + 1, y + 1]
  }

  if (direction === 'DL') {
    return [x - 1, y - 1]
  }

  if (direction === 'DR') {
    return [x + 1, y - 1]
  }

  throw 'bad move'
}

function moveTail(head: position, tail: position): position {
  const [tailX, tailY] = tail
  const [headX, headY] = head
  const diffX = tailX - headX
  const diffY = tailY - headY
  const shouldMove = Math.max(Math.abs(diffX), Math.abs(diffY)) > 1

  if (!shouldMove) {
    return tail
  }

  // move up
  if (diffY === -2 && diffX === 0) {
    return move('U', tail)
  }

  // move down
  if (diffY === 2 && diffX === 0) {
    return move('D', tail)
  }

  // move left
  if (diffY === 0 && diffX === 2) {
    return move('L', tail)
  }

  // move right
  if (diffY === 0 && diffX === -2) {
    return move('R', tail)
  }

  // move down and left
  if (diffX > 0 && diffY > 0) {
    return move('DL', tail)
  }

  // move down and right
  if (diffX < 0 && diffY > 0) {
    return move('DR', tail)
  }

  // move up and left
  if (diffX > 0 && diffY < 0) {
    return move('UL', tail)
  }

  // move up and right
  if (diffX < 0 && diffY < 0) {
    return move('UR', tail)
  }

  // console.log({ head, tail, diffY, diffX })
  throw 'failed to move tail'

}

function solve(input: string) {
  const knots: Record<string, position> = {
    '0': [0, 0],
    '1': [0, 0],
    '2': [0, 0],
    '3': [0, 0],
    '4': [0, 0],
    '5': [0, 0],
    '6': [0, 0],
    '7': [0, 0],
    '8': [0, 0],
    '9': [0, 0],
  }
  const tail: position[] = []

  const commands = input.trim().split('\n')

  commands.forEach(command => {
    const [direction, moves] = command.split(' ')

    for (let i = 1; i <= Number(moves); i++) {
      Object.entries(knots).forEach(([knot, position]) => {
        if (knot === '0') {
          knots[knot] = move(direction, position)
          return
        }

        const previousKnot = knots[`${Number(knot) - 1}`]
        const newPosition = moveTail(previousKnot, position)
        knots[knot] = newPosition

        if (knot === '9') {
          tail.push(newPosition)
        }
      })
    }
  })

  const strings = tail.map(([x, y]) => `${x},${y}`)

  console.log(new Set(strings).size)
}

solve(input)