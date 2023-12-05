const { spawn } = require('node:child_process');
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
const n_node = (l) => {
    return new Promise((resolve) => {
        const node = spawn('node', ['./d5/worker.js', l]);
        node.stdout.on('data', (data) => {
            const g = data.toString()
            console.log(l, 'done', g)
            resolve(g);
        });
    })
}

Promise.all(map['seeds'].map((a, i) => {
    if ((i + 1) % 2 == 0) {
        return i
    }
}).filter(a => a).map(a => n_node(a))).then(a => {
    console.log(a.map(a => Number(a.replace('\n', ''))).sort((a, b) => a - b))
})