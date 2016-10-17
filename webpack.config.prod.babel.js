import webpackBaseConfig from './webpack.config.base.babel'
import webpack from 'webpack'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

export default {
  ...webpackBaseConfig,

  entry: {
    app: [
      path.join(__dirname, 'src/shared/theme/styles/app.scss'),
      path.join(__dirname, 'src/client/client.js'),
    ],
    vendor: [
      'es6-promise',
      'isomorphic-fetch',
      'react',
      'react-dom',
      'react-helmet',
      'react-router',
    ],
  },

  output: {
    ...webpackBaseConfig.output,
    publicPath: '/build/',
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].chunk.js',
  },

  module: {
    ...webpackBaseConfig.module,
    rules: [
      ...webpackBaseConfig.module.rules,
      {
        test: /\.js$/,
        exclude: /node_modules|\.git/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [
              'es2015',
              {
                modules: false,
                loose: true,
              }
            ],
            'react',
            'stage-0',
          ],
          plugins: [
            'lodash',
            'transform-react-constant-elements',
            'transform-react-remove-prop-types',
            'transform-react-pure-class-to-function',
          ],
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                minimize: true,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              query: {
                includePaths: [path.join(__dirname, "src/shared/theme/styles")],
              },
            },
          ],
        })
      },
      {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      },
    ],
  },

  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BROWSER': JSON.stringify(true),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(__dirname, 'static'),
      prettyPrint: true,
    }),
    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    }),
    new ProgressBarPlugin(),
  ],
}
