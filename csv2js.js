const Papa = require('papaparse')
const fs = require('fs')

const csv = fs.readFileSync('data.csv', 'utf8')
const data = Papa.parse(csv)

const q = (s) => s.includes("'") ? `"${s}"` : `'${s}'`

console.log(`window.diagmapData = [`)
for (const line of data.data) {
  if (line.length === 4 && line[3]) {
    console.log(`  [${q(line[1])}, ${q(line[2])}, ${q(line[3])}],`)
  }
}
console.log(`]`)
