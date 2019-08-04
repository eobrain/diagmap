const elasticlunr = require('elasticlunr')
const { data } = require('./data.js')

const index = elasticlunr(function () {
  this.addField('group')
  this.addField('diagnoses')
  this.addField('category')
  this.setRef('id')
})

const tokenize = (s) => s.replace(/\W/g, ' ')

data.forEach((row, id) => {
  index.addDoc({
    id: id,
    group: tokenize(row[0]),
    diagnoses: tokenize(row[1]),
    category: tokenize(row[2])
  })
})

document.getElementById('diagmap').insertAdjacentHTML(
  'afterend',
  '<div id="diagmap-root">' +
  '<input id="search" placeholder="enter search words"></input>' +
  '<ol id="diagmap-results"/>' +
  '</div>'
)

const search = document.getElementById('search')
const results = document.getElementById('diagmap-results')
search.oninput = () => {
  results.innerHTML = ''
  const query = search.value
  if (!query.trim()) {
    return
  }
  results.insertAdjacentHTML('beforeend', '<hr/>')

  let prevScore = 0
  let noResult = true
  index.search(query).forEach((result) => {
    const row = data[result.ref]
    const score = result.score
    if (score < 0.7 * prevScore) {
      results.insertAdjacentHTML('beforeend', '<hr/>')
    }
    results.insertAdjacentHTML(
      'beforeend',
      `<li>${row[1]} <em>(${row[0]})</em> <div><strong>${row[2]}</strong></div><!--${score}--></li>`
    )
    noResult = false
    prevScore = score
  })
  if (noResult) {
    results.insertAdjacentHTML(
      'beforeend',
      `<p>Nothing found for "${query}"</p>`)
  }
  results.insertAdjacentHTML('beforeend', '<hr/>')
}
