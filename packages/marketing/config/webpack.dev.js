const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const commonConfig = require("./webpack.common")
const packageJson = require("../package.json")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const modulesThatArentShared = []
const Dotenv = require("dotenv-webpack")

const sharedModules = Object.keys(packageJson.dependencies)
  .filter((key) => !modulesThatArentShared.includes(key))
  .reduce((obj, key) => {
    obj[key] = packageJson.dependencies[key]
    return obj
  }, {})

console.log(sharedModules)

const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    publicPath: "http://localhost:8082/"
  },
  devServer: {
    port: 8082,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap"
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
