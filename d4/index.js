const fs = require('fs')
let h = fs.readFileSync('./d4/input.txt', 'utf8').replace(/\r/g, '').split("\n").map(a => {
    let [a1, a2] = a.slice(a.search(':') + 1).split('|').map(a => a.split(' ').filter(a => a))
    return a1.filter(a => a2.filter(b => a == b).length).length
})
// PART 1
// console.log(h.map(g => g - 1 >= 0 ? Math.pow(2, g - 1) : 0).reduce((a, b) => a + b))

//PART 2
h = h.map((a) => [a, 1])
h.map((a, i) => {
    if (a[0] >= 0) {
        let p = a[1]
        for (let j = 0; j < p; j++) {
            for (let k = 1; k <= a[0]; k++) {
                h[k + i][1]++
            }
        }
    }
})
console.log(h.map(a => a[1]).reduce((a, b) => a + b))