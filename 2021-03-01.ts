import input from './2021-03-input.json'

export function solve(){
    //const input = ['00100','11110','10110','10111','10101','01111','00111','11100','10000','11001','00010','01010']

    const getGammaRate = (bits: number[]) => {
        const half = Math.floor(bits.length / 2)

        return bits.sort().indexOf(1) <= half ? 1 : 0
    }

    const getEpsilonRate = (bits: number[]) => {
        const half = Math.floor(bits.length / 2)

        return bits.sort().indexOf(1) > half ? 1 : 0        
    }

    let gamma = ''
    let epsilon = ''
    for(let i=0; i<input[0].length; i++){
        const set = input.map(entry => parseInt(entry[i]))

        gamma += getGammaRate(set)
        epsilon += getEpsilonRate(set)
    }

    const gammaRating = parseInt(gamma, 2)
    const epsilonRating = parseInt(epsilon, 2)
    
    console.log(gammaRating * epsilonRating)
}
 

solve()