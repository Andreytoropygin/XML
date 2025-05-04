export function concatenate(array, connector) {
    return array.join(connector);
}

export function erase(array) {
    return array.filter(item => item && item != 0 && item != 'false' && item != 'null' && item != 'undefined')
}

export function countPrefixes(words, str) {
    let count = 0;
    words.forEach(word => count += str.startsWith(word));
    return count
}

export function anagram(array) {
    let combinations = array.map(str => str.split('').sort().join(''));
    let groups = new Map();
    let result = []
    combinations.forEach(combination => groups.set(combination, []));
    array.forEach((str, i) => {
        let group = groups.get(combinations[i]);
        group.push(str);
        groups.set(combinations[i], group)
    });
    groups.forEach((value) => value.length > 1 ? result.push(value.sort().join(', ')): null);
    return result
}