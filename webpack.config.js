const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  },
  // devtool: 'inline-source-map'
  // mode: 'development',
  mode: 'production'
}
