function convertHexToBinary(hex:string){
    return hex.split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('')
}

function convertBinaryToNumber(binary:string){
    return parseInt(binary, 2)
}

function getVersion(binary:string){
    return convertBinaryToNumber(binary.substring(0, 3))
}

function getType(binary:string){
    return convertBinaryToNumber(binary.substring(3, 6))
}

function getOperator(type:number){
    switch(type) {
    case 4:
        return literal
    default:
        return operator
    }
}

function literal(binary:string){
    let packets = ''
    
    let cursor = 6
    while(binary[cursor] !== '0'){
        packets += binary.substring(cursor + 1, cursor + 5)
        cursor += 5
    }
    packets += binary.substring(cursor + 1, cursor + 5)

    return convertBinaryToNumber(packets)
}

function operator(binary:string){
    if(binary[6] === '0'){
        return subpacketByLength(binary)
    } else {
        return subpacketByCount(binary)
    }
}

function subpacketByLength(binary:string){
    const subpacketLength = convertBinaryToNumber(binary.substring(7, 22))
    const packets = []
    let cursor = 22

    while(subpacketLength - packets.join('').length - 11 >= 11){
        packets.push(binary.substring(cursor, cursor + 11))

        cursor += 11
    }

    const remainingBits = subpacketLength - packets.join('').length
    packets.push(binary.substring(cursor, cursor + remainingBits))

    // packets.map(x => literal(x))
    const last = packets.pop() + binary.substring(cursor + remainingBits)
    packets.push(last)
    packets.map(openPacket)
}

function subpacketByCount(binary:string){
    const subpacketCount = convertBinaryToNumber(binary.substring(7, 18))
    const packets = []
    let cursor = 18

    
    while(packets.length < subpacketCount) {
        packets.push(binary.substring(cursor, cursor + 11))

        cursor += 11
    }

    // packets.map(x => literal(x))
    const last = packets.pop() + binary.substring(cursor)
    packets.push(last)
    packets.map(openPacket)
}

let versionSum = 0
function openPacket(binary:string){
    if(binary){
        const version = getVersion(binary)
        const type = getType(binary)

        console.log(binary, version, type)
        versionSum += version
        
        //getOperator(type)(binary)
    }
}

export function solve() {
    const input = [
        '620080001611562C8802118E34',
    ]

    input.forEach(x => openPacket(convertHexToBinary(x)))

    console.log(versionSum)
}

solve()