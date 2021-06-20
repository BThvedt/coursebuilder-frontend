const { merge } = require("webpack-merge")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const packageJson = require("../package.json")
const commonConfig = require("./webpack.common")
const Dotenv = require("dotenv-webpack")

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/new_service/latest/"
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "new_service",
      filename: "remoteEntry.js",
      exposes: {
        "./NewServiceApp": "./src/bootstrap"
      },
      shared: packageJson.dependencies
    }),
    new Dotenv({
      path: "./config/env/prod.env"
    })
  ]
}

module.exports = merge(commonConfig, prodConfig)
