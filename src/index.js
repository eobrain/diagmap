const elasticlunr = require('elasticlunr')
const { data } = require('./data.js')

const index = elasticlunr(function () {
  this.addField('group')
  this.addField('diagnoses')
  this.addField('category')
  this.setRef('id')
})

data.forEach((row, id) => {
  index.addDoc({
    id: id,
    group: row[0],
    diagnoses: row[1],
    category: row[2]
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
  results.insertAdjacentHTML('beforeend', '<hr/>')

  let prevScore = 0
  index.search(search.value).forEach((result) => {
    const row = data[result.ref]
    const score = result.score
    if (score < 0.7 * prevScore) {
      results.insertAdjacentHTML('beforeend', '<hr/>')
    }
    results.insertAdjacentHTML(
      'beforeend',
      `<li>${row[1]} <div><em>(${row[0]}, ${row[2]})</em></div><!--${score}--></li>`
    )
    prevScore = score
  })
  results.insertAdjacentHTML('beforeend', '<hr/>')
}
