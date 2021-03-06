const csv = require('csv-parser')
const fs = require('fs')

const q = (s) => s.includes("'") ? `"${s.trim()}"` : `'${s.trim()}'`

let nextIsHeader = true
console.log('exports.data = [')
fs.createReadStream('data.csv')
  .pipe(csv(['_', 'g', 'd', 'c']))
  .on('data', (data) => {
    if (data.g && data.d && data.c) {
      if (!nextIsHeader) {
        if (!data.c.startsWith('Not reportable') &&
            !data.c.startsWith('Reportable')) {
          data.c = `Reportable as ${data.c}`
        }
        console.log(`[${q(data.g)}, ${q(data.d)}, ${q(data.c)}],`)
      }
      nextIsHeader = false
    }
  })
  .on('end', () => console.log(']'))
