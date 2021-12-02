import input from './2021-02-input.json'

type Position = {
  horizontal: number,
  depth: number,
  aim: number
}

type Instruction = {
  direction: 'forward' | 'up' | 'down',
  units: number

}
export function solve() {
  // const input: Instruction[] = [
  //   {direction:'forward', units:5},
  //   {direction:'down', units:5},
  //   {direction:'forward', units:8},
  //   {direction:'up', units:3},
  //   {direction:'down', units:8},
  //   {direction:'forward', units:2},
  // ]

  const result = input.reduce((position: Position, instruction: Instruction) => {
    switch (instruction.direction) {
      case 'forward':
        position.horizontal += instruction.units
        position.depth += position.aim * instruction.units
        break;
      case 'up':
        position.aim -= instruction.units
        break;
      case 'down':
        position.aim += instruction.units
        break;
    }

    return position
  }, { horizontal:0, depth:0, aim:0 })

  console.log(result.depth * result.horizontal)
}

solve()