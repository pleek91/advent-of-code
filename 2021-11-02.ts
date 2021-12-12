import input from './2021-11-input.json'

function getKey(x:number, y:number):string{
    return `${x},${y}`
}

function reverseKey(key: string):[number, number]{
    return key.split(',').map(x => parseInt(x)) as [number, number]
}

function buildMap(input: number[]):Map<string, number>{
    const map = new Map()

    for(let y=0; y<input.length; y++){
        const octopi = input[y].toString().split('')

        for(let x=0; x<octopi.length; x++){
            map.set(getKey(x, y), parseInt(octopi[x]))
        }
    }

    return map
}

function getAdjacent([x,y]:[number, number], map:Map<string, number>){
    return [
        {x:-1, y:0},
        {x:-1, y:-1},
        {x:0, y:-1},
        {x:+1, y:-1},
        {x:+1, y:0},
        {x:+1, y:+1},
        {x:0, y:+1},
        {x:-1, y:+1},
    ]
        .filter(adjacent => map.has(getKey(x + adjacent.x, y + adjacent.y)))
        .map(adjacent => [x + adjacent.x, y + adjacent.y])
}

function handleFlashes(flashes: string[], map:Map<string, number>){
    const increments = flashes.reduce((adjacentOctopi, flashedOctopus) => {
        const key = reverseKey(flashedOctopus)
        const adjacentKeys = getAdjacent(key, map).map(([x, y]) => getKey(x, y))

        return adjacentOctopi.concat(adjacentKeys)
    }, [])

    increments.forEach(key => map.set(key, map.get(key) + 1))
}

function getFlashes(map:Map<string, number>){
    const flashedOctopi = []

    for (const [key, value] of map) {
        if(value > 9){
            flashedOctopi.push(key)
        }
    }

    return flashedOctopi
}

function clear(octopi: string[], map:Map<string, number>){
    octopi.forEach(octopus => map.set(octopus, 0))
}

function step(map:Map<string, number>){
    for (const [key, value] of map) {
        map.set(key, value + 1)
    }
    
    let flashedOctopi = getFlashes(map)
    let flashes:string[] = []

    while(flashedOctopi.length > 0){
        handleFlashes(flashedOctopi, map)
        flashes = flashes.concat(flashedOctopi)
        clear(flashes, map)

        flashedOctopi = getFlashes(map)
    }


    return flashes.length
}

export function solve(){
    // const input = [
    //     5483143223,
    //     2745854711,
    //     5264556173,
    //     6141336146,
    //     6357385478,
    //     4167524645,
    //     2176841721,
    //     6882881134,
    //     4846848554,
    //     5283751526,
    // ]
    
    const map = buildMap(input)
    let index = 0
    let flashes = 0

    while(flashes < input.length * input[0].toString().length) {
        flashes = step(map)
        index++
    }

    console.log(index)
}

solve()