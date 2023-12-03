const fs = require('fs')

let p = fs.readFileSync('./d3/input.txt', 'utf8').replace(/\r/g, '').split('\n')
    .map((a, i) => Array.from(a.matchAll(/[0-9][0-9]*|[^.]/g)).map(a => [a.index, i, a[0].length, isNaN(Number(a[0])) ? a[0] : Number(a[0])]));
let lol = []
for (let i = 0; i < p.length; i++) {
    let o = p.slice((i - 1) < 0 ? 0 : i - 1, i + 2)
    if ((i - 1) < 0) o.unshift([])
    if (i == p.length - 1) o.push([])
    let k = o[1].filter(a => a[3] == '*')
    let j = o.map(a => a.filter(a => isFinite(a[3]))).reduce((a, b) => a.concat(b), [])
    let n = k.map(a => {
        let h = j.map(b => {
            return [
                b[0] - a[0],
                b[1] - a[1],
                b[0] + Math.round(b[2] / 2) - a[0],
                b[3]
            ]
        })
            .filter(a => (Math.abs(a[0]) < 2 || Math.abs(a[2]) < 2) && Math.abs(a[1]) < 2)
        return h.length > 1 ? h : []
    })
    lol = lol.concat(n)
}
lol = lol.filter(a => a.length)
console.log(lol.map(a => a.map(a => a[3])).map(a => a.reduce((a, b) => a * b)).reduce((a, b) => a + b))