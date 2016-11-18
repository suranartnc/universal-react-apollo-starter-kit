import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'

export default {
  output: {
    path: path.join(__dirname, "static", "build"),
  },

  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  resolve: {
    extensions: [
      '.json',
      '.js',
    ],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
    alias: {
      react: 'react/dist/react.min.js',
      'react-cookie': 'react-cookie/dist/react-cookie.min.js',
      'react-dom': 'react-dom/dist/react-dom.min.js',
      'react-redux': 'react-redux/dist/react-redux.min.js',
      'react-router': 'react-router/umd/ReactRouter.min.js',
      redux: 'redux/dist/redux.min.js',
    },
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      options: {
        context: __dirname,
        postcss: [
          autoprefixer({ browsers: ['last 2 versions', 'IE > 10'] }),
        ],
      },
    }),
  ],
}
