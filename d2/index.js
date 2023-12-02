const fs = require('fs')
console.log(fs.readFileSync('./d2/input.txt', 'utf8').split('\n').map((a, i) => {
    a = a.replace('Game ' + (i + 1) + ': ', '')
        .split(';')
        .map(a => {
            let p = {};
            a.split(',').map(a => a.split(' ').filter(a => a)).map(a => [Number(a[0]), a[1][0]]).forEach(a => {
                p[a[1]] = a[0]
            })
            return p
        })
        .reduce((a, b) => {
            for (const k of Object.keys(b)) {
                a[k].push(b[k])
            }
            return a
        }, { r: [], g: [], b: [] })
        ;
    a = [a.r.sort((a, b) => b - a)[0], a.g.sort((a, b) => b - a)[0], a.b.sort((a, b) => b - a)[0]].reduce((a, b) => a * b)
    // .filter(a => a.r > 12 || a.g > 13 || a.b > 14)
    // return a.length == 0 ? i + 1 : 0
    return a
}).reduce((a, b) => a + b))