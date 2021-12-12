import input from './2021-10-input.json'

type Opening = '(' | '[' | '{' | '<'
type Closing = ')' | ']' | '}' | '>'
type Bracket = Opening | Closing

function getScore(closing: Closing):number{
    switch(closing) {
    case ')':
        return 3
    case ']':
        return 57
    case '}':
        return 1197
    case '>':
        return 25137
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
    }catch(error){
        return error
    }

    return 0
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

    const score = input.reduce((sum, line) => sum + legalScore(line.split('') as Bracket[]), 0)

    console.log(score)
    
}

solve()