import input from './2021-05-input.json'

type coord = {
    x: number,
    y: number
}

type area = {
    start: coord,
    end: coord
}

function parseInput(input: string[]):area[] {
    return input.map(group => {
        const regex = /^(\d*),(\d*) -> (\d*),(\d*)$/g
        const [x1, y1, x2, y2] = regex.exec(group)
            .slice(1)
            .map(group => parseInt(group))

        return { 
            start:{
                x: x1, 
                y: y1
            }, 
            end: {
                x: x2, 
                y: y2
            } 
        }
    })
}

function areaOverlapsCoord(area:area, coord:coord): boolean {
    const min = {x: Math.min(area.start.x, area.end.x), y: Math.min(area.start.y, area.end.y)}
    const max = {x: Math.max(area.start.x, area.end.x), y: Math.max(area.start.y, area.end.y)}
    
    return min.y <= coord.y && max.y >= coord.y
        && min.x <= coord.x && max.x >= coord.x
}

export function solve() {
    // const input = [
    //     '0,9 -> 5,9',
    //     '8,0 -> 0,8',
    //     '9,4 -> 3,4',
    //     '2,2 -> 2,1',
    //     '7,0 -> 7,4',
    //     '6,4 -> 2,0',
    //     '0,9 -> 2,9',
    //     '3,4 -> 1,4',
    //     '0,0 -> 8,8',
    //     '5,5 -> 8,2',
    // ]
    
    const parsed = parseInput(input)
    const xMax = Math.max(...parsed.map(group => group.start.x), ...parsed.map(group => group.end.x))
    const yMax = Math.max(...parsed.map(group => group.start.y), ...parsed.map(group => group.end.y))
    
    let answer = 0
    for(let x=0; x<=xMax; x++){
        for(let y=0; y<=yMax; y++){
            const overlaps = parsed
                .filter(area => area.start.x === area.end.x || area.start.y === area.end.y)
                .reduce((sum, area) => {
                    if(areaOverlapsCoord(area, {x,y})){
                        sum++
                    }

                    return sum
                }, 0)

            if(overlaps > 1){
                answer++
            }
        }   
    }
    
    console.log(answer)
}

solve()