import input from './2021-12-input.json'

const small:string[] = []

class Node {
    private _cave: string

    constructor(cave:string){
        this._cave = cave
        if(!this.big && !small.includes(this._cave) && this._cave != 'end'){
            small.push(this._cave)
        }
    }

    public get cave() {
        return this._cave.toLowerCase()
    }

    public get big(): boolean{
        if(this._cave === this._cave.toUpperCase()){
            return true
        }

        return false
    }
}

class NodeMap {
    private map = new Map()

    public has(key:string):boolean{
        return this.map.has(key.toLowerCase())
    }

    public get(key:string):Node[]{
        return this.map.get(key.toLowerCase())
    }

    public set(key:string, cave:string):void{
        if(this.has(key)){
            const entry = this.get(key)
            entry.push(new Node(cave))

            this.map.set(key.toLowerCase(), entry)
        }else{
            this.map.set(key.toLowerCase(), [new Node(cave)])
        }
    }
}

function buildMap(input:string[]):NodeMap{
    const nodes = new NodeMap()

    input.forEach(x => {
        const [from, to] = x.split('-')

        nodes.set(from, to)

        if(from != 'start'){
            nodes.set(to, from)
        }
    })

    return nodes
}

function navigate(map:NodeMap, node:string, smallCave:string, path = 'start'):string[] {
    const bonus = (x:Node) => {
        if(x.cave !== smallCave){
            return false
        }

        return path.split(',').filter(cave => cave === x.cave).length < 2
    }

    if(node === 'end'){
        return [path]
    }

    const next = map.get(node)
    
    return next
        .filter(x => !path.includes(x.cave) || x.big || bonus(x))
        .reduce((paths, x) => paths.concat(navigate(map, x.cave, smallCave, path + ',' + x.cave)), [])
}

export function solve() {
    // const input = [
    //     'start-A',
    //     'start-b',
    //     'A-c',
    //     'A-b',
    //     'b-d',
    //     'A-end',
    //     'b-end',
    // ]

    const nodes = buildMap(input)  
    const possibilities:Set<string> = new Set()  

    small.forEach(smallCave => {
        navigate(nodes, 'start', smallCave).forEach(path => possibilities.add(path))
    })

    console.log(possibilities.size)
}

solve()