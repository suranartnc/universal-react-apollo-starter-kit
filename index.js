if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('./static/assets.json')) // eslint-disable-line global-require
}

if (process.env.HMR === 'yes') {
  require('babel-register')
  require('./src/server/dev-server')
} else {
  require('babel-register')({
    plugins: [
      [
        'babel-plugin-css-modules-transform', {
          extensions: ['.css', '.scss'],
        },
      ],
    ],
  })
  require('regenerator-runtime/runtime')
  require('./src/server')
}
