import input from './2021-06-input.json'

function generateFishMap(input:number[]):Map<number, number>{
    const school = new Map()

    for(let days=0; days<=8; days++){
        school.set(days, input.filter(fish => fish === days).length)
    }

    return school
}

export function solve(){
    //const input = [3,4,3,1,2]
    const school = generateFishMap(input)

    for(let days=0; days<256; days++){
        const values = Array.from(school.values())
        
        school.set(8, values[0])
        school.set(7, values[8])
        school.set(6, values[7] + values[0])
        school.set(5, values[6])
        school.set(4, values[5])
        school.set(3, values[4])
        school.set(2, values[3])
        school.set(1, values[2])
        school.set(0, values[1])
    }

    console.log(Array.from(school.values()).reduce((sum, count) => sum + count, 0))
}

solve()