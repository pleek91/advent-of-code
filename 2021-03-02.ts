import input from './2021-03-input.json'

type LifeSupportRateFunction = (bits: number[]) => number

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

    const getLifeSupportSystemRating = (rateFunction: LifeSupportRateFunction, remainingEntries: string[], position = 0): string => {    
        if(remainingEntries.length === 1){
            return remainingEntries[0]
        }

        const set = remainingEntries.map(entry => parseInt(entry[position]))
        const epsilonRate = rateFunction(set)

        return getLifeSupportSystemRating(rateFunction, remainingEntries.filter(entry => parseInt(entry[position]) === epsilonRate), ++position)
    }

    const getOxygenGeneratorRating = (remainingEntries: string[], position = 0) => {
        return getLifeSupportSystemRating(getGammaRate, remainingEntries, position)
    }

    const getCarbonDioxideScrubberRating = (remainingEntries: string[], position = 0) => {    
        return getLifeSupportSystemRating(getEpsilonRate, remainingEntries, position)
    }

    const oxygenGeneratorRating = parseInt(getOxygenGeneratorRating([...input]), 2)
    const carbonDioxideScrubberRating = parseInt(getCarbonDioxideScrubberRating([...input]), 2)

    console.log(oxygenGeneratorRating * carbonDioxideScrubberRating)
}
 

solve()