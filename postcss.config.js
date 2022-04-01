const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const { plugins } = require('./webpack.config')

module.exports = {
  plugins: [
    autoprefixer,
    cssnano({preset: 'default'})
  ]
}