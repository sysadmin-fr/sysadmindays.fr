const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
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
        test: /\.(pdf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
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
      template: "html/8.html",
      filename: "8/index.html",
    }),
    new HtmlWebpackPlugin({
      template: "html/7.html",
      filename: "7/index.html",
    }),
    new HtmlWebpackPlugin({
      template: "html/sponsoring.html",
      filename: "sponsoring/index.html",
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: "development" }),
    new CopyPlugin([{ from: "public" }]),
  ],

  resolve: {
    extensions: [".scss", ".css", ".js"],
    modules: ["node_modules"],
  },
}

if (isProduction) {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new UglifyJSPlugin({ sourceMap: false }),
  )
}

module.exports = config
