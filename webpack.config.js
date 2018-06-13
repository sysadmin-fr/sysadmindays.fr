const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const webpack = require("webpack")
const path = require("path")
const { env } = require("process")

const isProduction = env.NODE_ENV === "production"

const config = {
  mode: isProduction ? "production" : "development",
  entry: {
    app: ["./javascript/index.js"],
  },

  devServer: {
    contentBase: false,
    hot: !isProduction,
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          !isProduction ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { minimize: isProduction },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]-[hash].[ext]",
            },
          },
        ],
      },
    ],
  },

  output: {
    filename: isProduction ? "[name]-[hash].js" : "[name].js",
    path: path.join(__dirname, isProduction ? "build-production" : "build"),
    publicPath: "/",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "html/index.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "html/7.html",
      filename: "7/index.html",
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: "development" }),
  ],

  resolve: {
    extensions: [".scss", ".css", ".js"],
    modules: ["node_modules"],
  },
}

if (isProduction) {
  config.plugins.push(
    new ExtractTextPlugin("[name]-[contenthash].css"),
    new CleanWebpackPlugin(["build-production"]),
    new UglifyJSPlugin({ sourceMap: false }),
  )
}

module.exports = config
