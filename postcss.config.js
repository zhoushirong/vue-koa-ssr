module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        '> 1%',
        'last 20 versions',
        'ie > 9'
      ]
    })
  ]
}
