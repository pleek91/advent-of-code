import input from './2021-07-input.json'

type Answer = {
    position: number | null,
    consumption: number
}

function sumAllConsumption(input: number[], position: number){
    return input.reduce((sum, submarine) => sum + Math.abs(submarine - position),0)
}

export function solve(){
    //const input = [16,1,2,0,4,2,7,1,2,14]

    let mostEfficient:Answer = {position: null, consumption:Infinity}
    
    for(let position=Math.min(...input); position<=Math.max(...input); position++){
        const consumption = sumAllConsumption(input, position)

        if(consumption < mostEfficient.consumption){
            mostEfficient = {position, consumption}
        }
    }

    console.log(mostEfficient)
}

solve()