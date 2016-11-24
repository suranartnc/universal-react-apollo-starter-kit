import path from 'path'
import webpack from 'webpack'
import DashboardPlugin from 'webpack-dashboard/plugin'
import webpackBaseConfig from './webpack.config.base.babel'
import config from './src/shared/configs/index'

const projectSource = path.resolve(__dirname, './src')

export default {
  ...webpackBaseConfig,

  cache: true,
  devtool: 'eval',

  entry: [
    'react-hot-loader/patch',
    `webpack-hot-middleware/client?path=http://${config.host}:${config.wdsPort}/__webpack_hmr`,
    path.join(__dirname, 'src/shared/theme/styles/app.scss'),
    path.join(__dirname, 'src/client/client.dev.js'),
  ],

  output: {
    ...webpackBaseConfig.output,
    publicPath: `http://${config.host}:${config.wdsPort}/build/`,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  module: {
    ...webpackBaseConfig.module,
    rules: [
      ...webpackBaseConfig.module.rules,
      {
        test: /\.js$/,
        include: projectSource,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        include: projectSource,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: projectSource,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              importLoaders: 1,
              sourceMap: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.join(__dirname, 'src/shared/theme/styles')],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BROWSER: JSON.stringify(true),
      },
    }),
    new DashboardPlugin(),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require('./static/build/react-manifest.json'),
    }),
  ],
}
