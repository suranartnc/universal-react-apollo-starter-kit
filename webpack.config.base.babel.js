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
    })
  ],
}
