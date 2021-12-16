import input from './2021-14-input.json'

type Polymer = { polymer:'B'|'H'|'N'|'C', count:number }

function getCounts(template:string):Polymer[] {
    const polymers: Polymer[] = [
        { polymer:'B', count:(template.match(/B/g) || []).length },
        { polymer:'H', count:(template.match(/H/g) || []).length },
        { polymer:'N', count:(template.match(/N/g) || []).length },
        { polymer:'C', count:(template.match(/C/g) || []).length },
    ]
    
    return polymers.sort((a, b) => a.count - b.count)
}

function step(template:string, rules:Map<string, string>):string {
    let newPolymers = template.charAt(0)

    for(let i=1; i<template.length; i++){
        newPolymers += rules.get(template.substring(i-1, i+1))
        newPolymers += template.charAt(i)
    }

    return newPolymers
}

export function solve(){
    // const input = {
    //     template:'NNCB',
    //     rules:[
    //         'CH -> B',
    //         'HH -> N',
    //         'CB -> H',
    //         'NH -> C',
    //         'HB -> C',
    //         'HC -> B',
    //         'HN -> C',
    //         'NN -> C',
    //         'BH -> H',
    //         'NC -> B',
    //         'NB -> B',
    //         'BN -> B',
    //         'BB -> N',
    //         'BC -> B',
    //         'CC -> N',
    //         'CN -> C',
    //     ]
    // }

    const rulesMap = new Map()
    input.rules.map(x => {
        const [pair, out] = x.split(' -> ')

        rulesMap.set(pair, out)
    })

    for(let i=0; i<10; i++) {
        input.template = step(input.template, rulesMap)
    }

    const polymers = getCounts(input.template)
    console.log(polymers[3].count - polymers[0].count)
}

solve()