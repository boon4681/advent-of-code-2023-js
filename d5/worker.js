const __i__ = Number(process.argv[2])
const fs = require('fs')
const input = fs.readFileSync('./d5/input.txt', 'utf8').replace(/\r/g, '').split('\n')
const map = {
    'seeds': input.shift().slice(7).split(" ").map(a => Number(a))
}
let key = ''
while (input.length > 0) {
    const line = input.shift()
    if (line.search(':') >= 0) {
        key = line.slice(0, line.length - 5)
        map[key] = []
    } else {
        if (key) {
            let f = line.split(" ").map(a => Number(a))
            if (f.length == 3) map[key].push(line.split(" ").map(a => Number(a)))
        }
    }
}

let min = 10000000000000000000000000000
let p = Object.keys(map)
const lol = (from) => {
    for (let i = 0; i < p.length - 1; i++) {
        let to = map[p[i + 1]]
        let j = to.find(b => from >= b[1] && from < b[1] + b[2])
        if (j) {
            from = from - j[1] + j[0]
        }
    }
    if (from < min) {
        min = from
    }
}
map['seeds'].map((a, i) => {
    if (i == __i__) {
        for (let k = map['seeds'][i - 1]; k < map['seeds'][i - 1] + a; k++) {
            lol(k)
        }
    }
})
console.log(min)