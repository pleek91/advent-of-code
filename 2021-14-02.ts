import input from './2021-14-input.json'

const rules = new Map()

function buildMap(input:string[]){
    const map = new Map()

    input.forEach(rule => {
        const key = rule.substring(0, 2)

        map.set(key, 0)
        rules.set(key, rule.slice(-1))
    })

    return map
}

function setInitialValues(template:string, map:Map<string, number>) {
    for(let i=1; i<template.length; i++){
        const key = template.substring(i-1, i+1)

        map.set(key, map.get(key) + 1)
    }
}

function step(map:Map<string,number>){
    const filtered = Array.from(map.entries()).filter(([key, value]) => value > 0)

    filtered.forEach(([key, value]) => {
        const rule = rules.get(key)
            
        map.set(key, map.get(key) - value)
        map.set(key.charAt(0) + rule, map.get(key.charAt(0) + rule) + value)
        map.set(rule + key.charAt(1), map.get(rule + key.charAt(1)) + value)
    })
}


function countChars(lastChar:string, map:Map<string,number>){
    const charCounts:Record<string, number> = {[lastChar]:1}

    for(const [key, value] of map.entries()){
        if(!charCounts[key[0]]){
            charCounts[key[0]] = 0
        }

        charCounts[key[0]] += value
    }

    return Object.entries(charCounts).sort((a, b) => a[1] - b[1])
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

    const map = buildMap(input.rules)
    
    setInitialValues(input.template, map)

    for(let i=0; i<40; i++){
        step(map)
    }

    const counts = countChars(input.template.slice(-1), map)

    console.log(counts[counts.length-1][1] - counts[0][1])
}

solve()