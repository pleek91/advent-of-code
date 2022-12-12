export const sample = `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`

export const input = `
Monkey 0:
  Starting items: 80
  Operation: new = old * 5
  Test: divisible by 2
    If true: throw to monkey 4
    If false: throw to monkey 3

Monkey 1:
  Starting items: 75, 83, 74
  Operation: new = old + 7
  Test: divisible by 7
    If true: throw to monkey 5
    If false: throw to monkey 6

Monkey 2:
  Starting items: 86, 67, 61, 96, 52, 63, 73
  Operation: new = old + 5
  Test: divisible by 3
    If true: throw to monkey 7
    If false: throw to monkey 0

Monkey 3:
  Starting items: 85, 83, 55, 85, 57, 70, 85, 52
  Operation: new = old + 8
  Test: divisible by 17
    If true: throw to monkey 1
    If false: throw to monkey 5

Monkey 4:
  Starting items: 67, 75, 91, 72, 89
  Operation: new = old + 4
  Test: divisible by 11
    If true: throw to monkey 3
    If false: throw to monkey 1

Monkey 5:
  Starting items: 66, 64, 68, 92, 68, 77
  Operation: new = old * 2
  Test: divisible by 19
    If true: throw to monkey 6
    If false: throw to monkey 2

Monkey 6:
  Starting items: 97, 94, 79, 88
  Operation: new = old * old
  Test: divisible by 5
    If true: throw to monkey 2
    If false: throw to monkey 7

Monkey 7:
  Starting items: 77, 85
  Operation: new = old + 6
  Test: divisible by 13
    If true: throw to monkey 4
    If false: throw to monkey 0
`