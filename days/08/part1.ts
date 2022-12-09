import { sample, input } from './input'

function solve(input: string) {
  const rows = input.trim().split('\n')

  let answer = 0

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const previousRows = rows.slice(0, rowIndex)
    const row = rows[rowIndex]
    const nextRows = rows.slice(rowIndex + 1)

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const previousTrees = row.slice(0, columnIndex)
      const tree = Number(row[columnIndex])
      const nextTrees = row.slice(columnIndex + 1)

      // console.log({ answer })
      // console.log({ tree })

      // left
      const tallestToLeft = Math.max(...previousTrees.split('').map(Number))
      if (tallestToLeft < tree) {
        answer++
        continue
      }

      // right
      const tallestToRight = Math.max(...nextTrees.split('').map(Number))
      if (tallestToRight < tree) {
        answer++
        continue
      }

      // top
      const tallestToTop = Math.max(...previousRows.map(row => row[columnIndex]).map(Number))
      if (tallestToTop < tree) {
        answer++
        continue
      }

      // bottom
      const tallestToBottom = Math.max(...nextRows.map(row => row[columnIndex]).map(Number))
      if (tallestToBottom < tree) {
        answer++
        continue
      }

    }

  }

  console.log(answer)
}

solve(input)