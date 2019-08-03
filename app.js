const index = window.elasticlunr(function () {
  this.addField('group')
  this.addField('diagnoses')
  this.addField('category')
  this.setRef('id')
})

const table = document.getElementById('data')
window.diagmapData.forEach((row, id) => {
  index.addDoc({
    id: id,
    group: row[0],
    diagnoses: row[1],
    category: row[2]
  })
})

const search = document.getElementById('search')
search.oninput = () => {
  document.querySelectorAll('tr').forEach((tr, i) =>
    i === 0 || tr.remove())

  index.search(search.value).forEach((result) => {
    const row = window.diagmapData[result.ref]
    const tr = document.createElement('tr')
    row.forEach((cell) => {
      const td = document.createElement('td')
      td.appendChild(document.createTextNode(cell))
      tr.appendChild(td)
    })
    table.appendChild(tr)
  })
}
