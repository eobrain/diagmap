const table = document.getElementById('data')
window.diagmapData.forEach((row) => {
  const tr = document.createElement('tr')
  row.forEach((cell) => {
    const td = document.createElement('td')
    td.appendChild(document.createTextNode(cell))
    tr.appendChild(td)
  })
  table.appendChild(tr)
})
