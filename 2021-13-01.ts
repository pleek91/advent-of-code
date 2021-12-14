import input from './2021-13-input.json'

function getKey(x:number, y:number){
    return `${x},${y}`
}

function reverseKey(key:string){
    return key.split(',').map(x => parseInt(x))
}

function createMap(dots: [number, number][]){
    const map = new Map()
    for(let xIndex=0; xIndex<=Math.max(...dots.map(([x, y]) => x)); xIndex++){
        for(let yIndex=0; yIndex<=Math.max(...dots.map(([x, y]) => y)); yIndex++){
            const dot = dots.findIndex(([x, y]) => x === xIndex && y === yIndex)
            
            map.set(getKey(xIndex, yIndex), dot > -1 ? '#' : '.')
        }
    }

    return map
}

function foldY(map:Map<string, string>, foldAt:number){
    const before = []
    const after = []

    for (const [key, value] of map) {
        const [x, y] = reverseKey(key)
        
        while(x >= before.length){
            before.push([])
            after.push([])
        }

        if(y < foldAt){
            before[x].push(value)
        }

        if(y > foldAt){
            after[x].push(value)
        }
    }

    after.forEach(column => column.reverse())

    map.clear()
    
    for(let x=0; x<before.length; x++){
        const beforeColumn:string[] = before[x]
        const afterColumn:string[] = after[x]

        for(let y=0; y<beforeColumn.length; y++){
            map.set(getKey(x, y), beforeColumn[y] === '#' || afterColumn[y] === '#' ? '#' : '.')
        }
    }
}

function foldX(map:Map<string, string>, foldAt:number){
    const before = []
    const after = []

    for (const [key, value] of map) {
        const [x, y] = reverseKey(key)
        
        while(y >= before.length){
            before.push([])
            after.push([])
        }

        if(x < foldAt){
            before[y].push(value)
        }

        if(x > foldAt){
            after[y].push(value)
        }
    }

    after.forEach(row => row.reverse())

    map.clear()
    
    for(let y=0; y<before.length; y++){
        const beforeRow:string[] = before[y]
        const afterRow:string[] = after[y]

        for(let x=0; x<beforeRow.length; x++){
            map.set(getKey(x, y), beforeRow[x] === '#' || afterRow[x] === '#' ? '#' : '.')
        }
    }
}

function countHash(map:Map<string, string>){
    return Array.from(map.values()).reduce((sum, value) => value === '#' ? sum + 1 : sum, 0)
}

export function solve(){
    // const input = {
    //     dots: [
    //         [6,10],
    //         [0,14],
    //         [9,10],
    //         [0,3],
    //         [10,4],
    //         [4,11],
    //         [6,0],
    //         [6,12],
    //         [4,1],
    //         [0,13],
    //         [10,12],
    //         [3,4],
    //         [3,0],
    //         [8,4],
    //         [1,10],
    //         [2,14],
    //         [8,10],
    //         [9,0],
    //     ],
    //     instructions: [
    //         'fold along y=7',
    //         'fold along x=5',
    //     ]
    // }

    const map = createMap(input.dots as [number, number][])

    const instruction = input.instructions[0]
    const foldAt = parseInt(instruction.substring(13))
    
    if(instruction.startsWith('fold along x=')){
        foldX(map, foldAt)
    }else{
        foldY(map, foldAt)
    }

    console.log(countHash(map))
}

solve()