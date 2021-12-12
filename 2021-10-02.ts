import input from './2021-10-input.json'

type Opening = '(' | '[' | '{' | '<'
type Closing = ')' | ']' | '}' | '>'
type Bracket = Opening | Closing

function getScore(closing: Closing):number{
    switch(closing) {
    case ')':
        return 1
    case ']':
        return 2
    case '}':
        return 3
    case '>':
        return 4
    }
}

function getClosing(opening: Opening):Closing {
    switch(opening){
    case '(':
        return ')'
    case '[':
        return ']'
    case '{':
        return '}'
    case '<':
        return '>'
    }
}

function isOpening(bracket: string): bracket is Opening {
    return ['(', '[', '{', '<'].includes(bracket)
}

function legalScore(line: Bracket[]):number{
    const expectedClosings: Closing[] = []

    try{
        line.forEach(bracket => {
            if(isOpening(bracket)){
                expectedClosings.push(getClosing(bracket))
            } else {
                const expected = expectedClosings.pop()

                if(expected != bracket){
                    throw getScore(bracket)
                }
            }
        })
    }catch(e){
        return 0
    }

    return expectedClosings.reverse().reduce((sum, closing) => sum * 5 + getScore(closing),0)
}

export function solve(){
    // const input = [
    //     '[({(<(())[]>[[{[]{<()<>>',
    //     '[(()[<>])]({[<{<<[]>>(',
    //     '{([(<{}[<>[]}>{[]{[(<()>',
    //     '(((({<>}<{<{<>}{[]{[]{}',
    //     '[[<[([]))<([[{}[[()]]]',
    //     '[{[{({}]{}}([{[{{{}}([]',
    //     '{<[[]]>}<{[{[{[]{()[[[]',
    //     '[<(<(<(<{}))><([]([]()',
    //     '<{([([[(<>()){}]>(<<{{',
    //     '<{([{{}}[<[[[<>{}]]]>[]]',
    // ]

    const scores = input.map(line => legalScore(line.split('') as Bracket[]), 0)
        .filter(score => score > 0)
        .sort((a, b) => a-b)

    console.log(scores[Math.floor(scores.length /2)])
}

solve()