import webpackBaseConfig from './webpack.config.base.babel'
import path from 'path'
import webpack from 'webpack'
import config from './src/shared/configs'

export default {
  ...webpackBaseConfig,

  devtool: 'cheap-eval-source-map',  // to increase build speed, use "cheap-eval-source-map"

  entry: [
    `webpack-dev-server/client?http://${config.host}:${config.wdsPort}`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src/shared/theme/styles/app.scss'),
    path.join(__dirname, 'src/client/client.js'),
  ],

  output: {
    ...webpackBaseConfig.output,
    publicPath: `http://${config.host}:${config.wdsPort}/build/`,
    filename: '[name].js',
    chunkFilename: "[name].chunk.js",
  },

  module: {
    ...webpackBaseConfig.module,
    rules: [
      ...webpackBaseConfig.module.rules,
      {
        test: /\.js$/,
        exclude: /node_modules|\.git/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'node_modules', 'medium-editor'),
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              includePaths: [path.join(__dirname, "src/shared/theme/styles")],
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
        'NODE_ENV': JSON.stringify('development'),
        'BROWSER': JSON.stringify(true),
      },
    }),
  ],

  devServer: {
    port: config.wdsPort,
    hot: true,
    inline: false,
    historyApiFallback: true,
  },
}
