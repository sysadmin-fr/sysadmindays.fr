const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const { env } = require('process')

const isProduction = env.NODE_ENV === 'production'

const loaders = {
  css: {
    loader: 'css-loader',
    options: { minimize: isProduction }
  },
  postcss: {
    loader: 'postcss-loader',
  },
  sass: {
    loader: 'sass-loader',
  }
}

var styleLoader = [];

if(isProduction) {
  styleLoader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [loaders.css, loaders.postcss, loaders.sass]
  })
} else {
  styleLoader = ['style-loader', loaders.css, loaders.postcss, loaders.sass]
}

const config = {
  entry: {
    app: ['./javascript/index.js']
  },

  devServer: {
    contentBase: false,
    hot: !isProduction
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: styleLoader,
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]'
          }
        }]
      }
    ]
  },

  output: {
    filename: isProduction ? '[name]-[hash].js' : '[name].js',
    path: path.join(__dirname, isProduction ? 'build-production' : 'build'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new webpack.EnvironmentPlugin({ 'NODE_ENV': 'development' })
  ],

  resolve: {
    extensions: ['.scss', '.css', '.js'],
    modules: ['node_modules']
  }
}

if (isProduction) {
  config.plugins.push(
    new ExtractTextPlugin('[name]-[contenthash].css'),
    new CleanWebpackPlugin(['build-production']),
    new UglifyJSPlugin({ sourceMap: false }),
  )
}

module.exports = config
