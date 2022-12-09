import { sample, input } from './input'

function getDirectionScore(optionTree: number, trees: number[]): number {
  let score = 0

  for (const tree of trees) {

    if (tree >= optionTree) {
      score++
      break
    }

    if (tree < optionTree) {
      score++
      continue
    }

    break
  }

  return score
}

function solve(input: string) {
  const rows = input.trim().split('\n').map(row => row.split('').map(Number))
  const options: number[] = []

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex]

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const top = rows.slice(0, rowIndex).map(row => row[columnIndex])
      const bottom = rows.slice(rowIndex + 1).map(row => row[columnIndex])
      const left = row.slice(0, columnIndex)
      const right = row.slice(columnIndex + 1)
      const tree = row[columnIndex]

      const visible = Math.max(...left) < tree ||
                      Math.max(...right) < tree ||
                      Math.max(...top) < tree ||
                      Math.max(...bottom) < tree

      if (!visible) {
        continue
      }

      const topScore = getDirectionScore(tree, top.reverse())
      const bottomScore = getDirectionScore(tree, bottom)
      const leftScore = getDirectionScore(tree, left.reverse())
      const rightScore = getDirectionScore(tree, right)
      const treeScore = topScore * bottomScore * leftScore * rightScore

      options.push(treeScore)

    }

  }

  const answer = Math.max(...options)

  console.log(answer)
}

solve(input)