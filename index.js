if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('./static/assets.json'));
}

require('babel-register')({
  "plugins": [
    [
      "babel-plugin-css-modules-transform", {
        "extensions": [".css", ".scss"]
      }
    ]
  ]
});

require('./src/server');