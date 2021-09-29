import createHash from 'hash-generator'

export function hashGeneratorHelper(length, count) {
    let hashs = []
    
    for (let i = 0; i < count; i++) {
        hashs.push(createHash(length))
    }

    return hashs
}