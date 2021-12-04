import input from './2021-04-input.json'

class Board {
    private rows: Map<number, boolean>[]
    private columns: Map<number, boolean>[]

    constructor(board:number[][]){
        this.rows = []
        this.columns = []

        for(let rowIndex=0; rowIndex<5; rowIndex++){       
            const row = board[rowIndex]     
            const rowMap = new Map()
            
            row.forEach(key => rowMap.set(key, false))

            this.rows.push(rowMap)
        }

        for (let colIndex = 0; colIndex < 5; colIndex++) {
            const colMap = new Map()

            board.forEach(row => colMap.set(row[colIndex], false))

            this.columns.push(colMap)
        }
    }

    public drawn(key: number){
        this.sequences.forEach(sequence => sequence.has(key) && sequence.set(key, true))

        if(this.winner){
            throw this.falseSum * key
        }
    }

    private get sequences(){
        return [...this.rows, ...this.columns]
    }

    private get winner(){
        return this.sequences.some(sequence => Array.from(sequence.values()).every(val => val))
    }

    private get falseSum(){
        return this.rows.reduce((sum, row) => {
            sum += Array.from(row.entries())
                .filter(([key, value]) => !value)
                .reduce((rowTotal, [key]) => rowTotal + key, 0)

            return sum
        }, 0)
    }
}

export function solve(){
    // const input = {
    //     numbers: [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1],
    //     boards: [
    //         [
    //             [22, 13, 17, 11,  0],
    //             [8,  2, 23,  4, 24],
    //             [21,  9, 14, 16,  7],
    //             [6, 10,  3, 18,  5],
    //             [1, 12, 20, 15, 19]
    //         ],[
    //             [3, 15,  0,  2, 22],
    //             [9, 18, 13, 17,  5],
    //             [19,  8,  7, 25, 23],
    //             [20, 11, 10, 24,  4],
    //             [14, 21, 16, 12,  6]
    //         ],[
    //             [14, 21, 17, 24,  4],
    //             [10, 16, 15,  9, 19],
    //             [18,  8, 23, 26, 20],
    //             [22, 11, 13,  6,  5],
    //             [2,  0, 12,  3,  7]
    //         ]
    //     ]
    // }

    const boards = input.boards.map(board => new Board(board))
    
    input.numbers.forEach(key => boards.forEach(board => board.drawn(key)))
}

solve()