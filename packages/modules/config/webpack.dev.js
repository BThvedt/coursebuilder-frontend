const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const commonConfig = require("./webpack.common")
const packageJson = require("../package.json")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const Dotenv = require("dotenv-webpack")

const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    publicPath: "http://localhost:8083/"
  },
  devServer: {
    port: 8083,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "modules",
      filename: "remoteEntry.js",
      exposes: {
        "./ModulesApp": "./src/bootstrap"
      },
      shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new Dotenv({
      path: "./config/env/dev.env"
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
