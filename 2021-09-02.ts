import input from './2021-09-input.json'

function getKey(x:number, y:number){
    return `${x},${y}`
}

function getAdjacentValues([x, y]:[number, number], map:Map<string,number>){
    return [
        {x:x-1, y, value:map.has(getKey(x-1,y)) ? map.get(getKey(x-1,y)) : null},
        {x, y:y-1, value:map.has(getKey(x,y-1)) ? map.get(getKey(x,y-1)) : null},
        {x:x+1, y, value:map.has(getKey(x+1,y)) ? map.get(getKey(x+1,y)) : null},
        {x, y:y+1, value:map.has(getKey(x,y+1)) ? map.get(getKey(x,y+1)) : null},
    ]
}

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
    return getAdjacentValues([x,y], map).every(adjacent => adjacent.value == null || adjacent.value > value)
}

function getBasin([x, y]:[number, number], map:Map<string, number>, basin:string[] = []): string[]{
    return getAdjacentValues([x,y], map).reduce((collection, adjacent) => {
        const key = getKey(adjacent.x, adjacent.y)

        if(adjacent.value != null && adjacent.value < 9 && !collection.includes(key)){
            collection.push(key)

            return getBasin([adjacent.x, adjacent.y], map, collection)
        }

        return collection
    }, basin)
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
    
    const basins = []
    for (const [key, value] of map) {
        const [x, y] = key.split(',').map(x => parseInt(x))
        if(isLowSpot([x, y], map, value)){
            basins.push(getBasin([x, y], map).length)
        }
    }

    const largest = basins.sort((a, b) => a - b).splice(-3)

    console.log(largest.reduce((product, basin) => product * basin, 1))
}

solve()