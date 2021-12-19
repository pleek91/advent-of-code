import input from './2021-15-input.json'

// const input = [
//     '1163751742',
//     '1381373672',
//     '2136511328',
//     '3694931569',
//     '7463417111',
//     '1319128137',
//     '1359912421',
//     '3125421639',
//     '1293138521',
//     '2311944581',
// ]

const end = () => {
    return [input[0].length * 5 - 1 , input.length * 5 - 1]
}

class Node{
    public x:number
    public y:number
    public weight: number
    public totalDistance: number
    public visited: boolean

    constructor(x:number, y:number, weight:number){
        this.x = x
        this.y = y
        this.weight = weight > 9 ? weight - 9 : weight
        this.totalDistance = Infinity
        this.visited = false
    }

    public get distance(){
        const [endX, endY] = end()

        return Math.sqrt(Math.pow((endX - this.x), 2) + Math.pow((endY - this.y), 2))
    }

    public get combinedHeuristic(){
        return this.totalDistance + this.weight + this.distance
    }
}

function getKey(x:number, y:number){
    return `${x},${y}`
}

function buildMap(input:string[]){
    const map = new Map()

    for(let xMultiplier=0; xMultiplier<5; xMultiplier++){
        for(let yMultiplier=0; yMultiplier<5; yMultiplier++){
            for(let y=0; y<input.length; y++){
                const row = input[y]

                for(let x=0; x<row.length; x++){
                    const newX = xMultiplier * input[0].length + x
                    const newY = yMultiplier * input.length + y
                
                    map.set(getKey(newX, newY), new Node(newX, newY, parseInt(row[x]) + xMultiplier + yMultiplier))
                }
            }
        }
    }

    return map
}

function visitNode(node:Node, map:Map<string, Node>){
    const neighbors = [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1],
    ]

    neighbors.forEach(([x, y]) => {
        const key = getKey(node.x + x, node.y + y)

        if(map.has(key)){
            const neighbor = map.get(key)
            
            if(neighbor.totalDistance > node.totalDistance + neighbor.weight){
                neighbor.totalDistance = node.totalDistance + neighbor.weight
            }
        }
    })

    node.visited = true 
}

function getUnvisitedNodes(map:Map<string,Node>) {
    return Array.from(map.values())
        .filter(x => !x.visited)
        .sort((a, b) => a.totalDistance - b.totalDistance)
}

export function solve(){
    const map = buildMap(input)
    const start = map.get(getKey(0, 0))
    start.totalDistance = 0
    
    let unvisited = getUnvisitedNodes(map)

    while(unvisited.length){
        console.log(unvisited.length)
        visitNode(unvisited[0], map)

        unvisited = getUnvisitedNodes(map)
    }
    
    console.log(Array.from(map.values()).pop())
}

function print(map:Map<string,Node>){
    for(let y=0; y<50; y++){
        let line = ''
        for(let x=0; x<50; x++){
            line += map.get(getKey(x, y)).weight
        }

        console.log(line)
    }
}

solve()