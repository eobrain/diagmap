const csv = require('csv-parser')
const fs = require('fs')

const q = (s) => s.includes("'") ? `"${s.trim()}"` : `'${s.trim()}'`

let nextIsHeader = true
console.log('window.diagmapData = [')
fs.createReadStream('data.csv')
  .pipe(csv(['_', 'g', 'd', 'c']))
  .on('data', (data) => {
    if (data.g && data.d && data.c) {
      if (!nextIsHeader) {
        console.log(`[${q(data.g)}, ${q(data.d)}, ${q(data.c)}],`)
      }
      nextIsHeader = false
    }
  })
  .on('end', () => console.log(']'))
