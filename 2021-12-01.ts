import input from './2021-12-input.json'

type Node = {
    cave: string,
    big: boolean
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
        const big = cave === cave.toUpperCase()

        if(this.has(key)){
            const entry = this.get(key)
            entry.push({cave:cave.toLowerCase(), big})

            this.map.set(key.toLowerCase(), entry)
        }else{
            this.map.set(key.toLowerCase(), [{ cave:cave.toLowerCase(), big }])
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

function navigate(map:NodeMap, node:string, path = 'start'):string[]{
    if(node === 'end'){
        return [path]
    }

    const next = map.get(node)

    return next
        .filter(x => x.big || !path.includes(x.cave))
        .reduce((paths, x) => paths.concat(navigate(map, x.cave, path + ',' + x.cave)), [])
}

export function solve(){
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
    const possibilities = navigate(nodes, 'start')

    console.log(possibilities.length)
}

solve()