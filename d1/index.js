const fs = require('fs')
console.log(fs.readFileSync('./d1/input.txt', 'utf8')
    .split("\n").map((a, i) => {
        const l = (b, c) => a.search(b) != -1 ? [a.search(b), a.lastIndexOf(b), c] : undefined
        const o = [
            l('one', 1),
            l('two', 2),
            l('three', 3),
            l('four', 4),
            l('five', 5),
            l('six', 6),
            l('seven', 7),
            l('eight', 8),
            l('nine', 9),
            l('1', 1),
            l('2', 2),
            l('3', 3),
            l('4', 4),
            l('5', 5),
            l('6', 6),
            l('7', 7),
            l('8', 8),
            l('9', 9),
        ].filter(a => a)
        let r = o.sort((a, b) => a[0] - b[0]).map(a => a[2])
        let r2 = o.sort((a, b) => a[1] - b[1]).map(a => a[2])
        return r[0] * 10 + r2[o.length - 1]
    }).reduce((a, b) => a + b))