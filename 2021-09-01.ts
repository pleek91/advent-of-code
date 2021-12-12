import input from './2021-09-input.json'

function buildMap(input:string[]):Map<string, number>{
    const map = new Map()

    for(let x=0; x<input.length; x++){
        const row = input[x].split('')
        
        for(let y=0; y<row.length; y++){
            map.set(`${x},${y}`, parseInt(row[y]))
        }
    }

    return map
}

function isLowSpot([x, y]:[number, number], map:Map<string, number>, value:number){
    return (!map.has(`${x-1},${y}`) || map.get(`${x-1},${y}`) > value)
        && (!map.has(`${x},${y-1}`) || map.get(`${x},${y-1}`) > value)
        && (!map.has(`${x+1},${y}`) || map.get(`${x+1},${y}`) > value)
        && (!map.has(`${x},${y+1}`) || map.get(`${x},${y+1}`) > value)
}

export function solve(){
    // const input = [
    //     '2199943210',
    //     '3987894921',
    //     '9856789892',
    //     '8767896789',
    //     '9899965678',
    // ]
    
    const map = buildMap(input)
    
    let sum = 0
    for (const [key, value] of map) {
        const [x, y] = key.split(',').map(x => parseInt(x))
        if(isLowSpot([x, y], map, value)){
            sum += value + 1
        }
    }

    console.log(sum)
    
    // blog post
    // checking state to deploy UI possibly Monday
    
}

solve()