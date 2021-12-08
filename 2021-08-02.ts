import input from './2021-08-input.json'

type Segment = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'
type Segments = {[k in Segment]:Segment}

class DiscoveredDigit {
    public value:string = null

    public get parts(){
        return this.value.split('')
    }
    
    constructor(value:string){
        this.value = value
    }
}

const discoveredDigits: DiscoveredDigit[] = new Array(10).fill(null)
const segments: Segments = {
    a: null, b: null, c: null, d: null, e: null, f: null, g: null
}
const segmentDigits:Segment[][] = [
    ['a', 'b', 'c', 'e', 'f', 'g'],
    ['c', 'f'],
    ['a', 'c', 'd', 'e', 'g'],
    ['a', 'c', 'd', 'f', 'g'],
    ['b', 'c', 'd', 'f'],
    ['a', 'b', 'd', 'f', 'g'],
    ['a', 'b', 'd', 'e', 'f', 'g'],
    ['a', 'c', 'f'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    ['a', 'b', 'c', 'd', 'f', 'g']
]

function sortSegments(input:string | Segment[]){
    if(Array.isArray(input)){
        return input.sort().join('')
    }

    return input.split('').sort().join('')
}

function getDigit(input: string){
    const sorted = sortSegments(input)
    return segmentDigits.findIndex(segmentDigit => {
        const parsed = sortSegments(segmentDigit.map(segment => segments[segment]))
        
        return sorted === parsed
    })
}

function isTwo(input: string) {
    if(input.length !== 5){
        return false
    }

    return input.includes(segments.a) 
        && input.includes(segments.c) 
        && input.includes(segments.g)
        && !input.includes(segments.f)
}

function isFive(input: string) {
    if(input.length !== 5 || input.includes(segments.e)){
        return false
    }

    const containsFirst = input.includes(discoveredDigits[1].parts[0])
    const containsSecond = input.includes(discoveredDigits[1].parts[1])

    return (containsFirst && !containsSecond) || (!containsFirst && containsSecond)
}

function isNine(input: string){
    if(input.length !== 6){
        return false
    }

    const missingSegment = discoveredDigits[8].parts.filter(segment => !input.includes(segment))[0]

    return !discoveredDigits[4].parts.includes(missingSegment)
}

function discoverDigits(input: string){
    const groups = input.split(' ').filter(group => group !== '|')

    discoveredDigits[1] = new DiscoveredDigit(groups.find(group => group.length === segmentDigits[1].length))
    discoveredDigits[4] = new DiscoveredDigit(groups.find(group => group.length === segmentDigits[4].length))
    discoveredDigits[7] = new DiscoveredDigit(groups.find(group => group.length === segmentDigits[7].length))
    discoveredDigits[8] = new DiscoveredDigit(groups.find(group => group.length === segmentDigits[8].length))
    discoveredDigits[9] = new DiscoveredDigit(groups.find(group => isNine(group)))

    segments.e = discoveredDigits[8].parts.filter(segment => !discoveredDigits[9].parts.includes(segment))[0] as Segment
    
    discoveredDigits[5] = new DiscoveredDigit(groups.find(group => isFive(group)))
    
    segments.a = discoveredDigits[7].parts.filter(char => !discoveredDigits[1].parts.includes(char))[0] as Segment
    segments.c = discoveredDigits[1].parts.filter(char => !discoveredDigits[5].parts.includes(char))[0] as Segment
    segments.g = discoveredDigits[5].parts.filter(char => char != segments.a && !discoveredDigits[4].parts.includes(char))[0] as Segment
    segments.f = discoveredDigits[1].parts.filter(char => char != segments.c)[0] as Segment
    
    discoveredDigits[2] = new DiscoveredDigit(groups.find(group => isTwo(group)))

    segments.b = discoveredDigits[4].parts.filter(char => !discoveredDigits[1].parts.includes(char) && !discoveredDigits[2].parts.includes(char))[0] as Segment
    segments.d = discoveredDigits[4].parts.filter(char => ![segments.b, segments.c, segments.f].includes(char as Segment))[0] as Segment
    segments.e = discoveredDigits[2].parts.filter(char => ![segments.a, segments.c, segments.d, segments.g].includes(char as Segment))[0] as Segment
}

export function solve(){
    // const input = [
    //     // 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'
    //     'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
    //     'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
    //     'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
    //     'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
    //     'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
    //     'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
    //     'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
    //     'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
    //     'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
    //     'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce',
    // ]

    const count = input.reduce((product, line) => {
        const [patterns, output] = line.split('|')
        
        discoverDigits(patterns.trim())

        const digit = output.trim().split(' ').reduce((sum, group) => sum += getDigit(group), '')

        return product + parseInt(digit)
    }, 0)

    console.log(count)
}

solve()