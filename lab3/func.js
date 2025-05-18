export function concatenateLectures(lectures, connector) {
    return lectures.join(connector);
}

export function eraseLectures(lectures) {
    return lectures.filter(item => item && item != 0 && item != 'false' && item != 'null' && item != 'undefined')
}

export function countLecturesPrefixes(lectures, input) {
    let count = 0;
    lectures.forEach(lecture => count += input.startsWith(lecture));
    return count
}

export function anagramLectures(lectures) {
    let combinations = lectures.map(lecture => lecture.split('').sort().join(''));
    let groups = new Map();
    let result = []
    combinations.forEach(combination => groups.set(combination, []));
    lectures.forEach((lecture, i) => {
        let group = groups.get(combinations[i]);
        group.push(lecture);
        groups.set(combinations[i], group)
    });
    groups.forEach((value) => value.length > 1 ? result.push(value.sort().join(', ')): null);
    return result
}