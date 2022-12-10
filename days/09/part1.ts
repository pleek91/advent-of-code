/* eslint-disable id-length */
import { sample, input } from './input'

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
  const head: position[] = [[0, 0]]
  const tail: position[] = [[0, 0]]

  const commands = input.trim().split('\n')

  commands.forEach(command => {
    const [direction, moves] = command.split(' ')

    for (let i = 1; i <= Number(moves); i++) {
      const currentHeadPosition = head[head.length - 1]
      const currentTailPosition = tail[tail.length - 1]
      const newHeadPosition = move(direction, currentHeadPosition)
      const newTailPosition = moveTail(newHeadPosition, currentTailPosition)

      head.push(newHeadPosition)
      tail.push(newTailPosition)
    }
  })

  const strings = tail.map(([x, y]) => `${x},${y}`)

  console.log(new Set(strings).size)
}

solve(input)