const { merge } = require("webpack-merge")
const commonConfig = require("./webpack.common")
const packageJson = require("../package.json")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const Dotenv = require("dotenv-webpack")

const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    publicPath: "http://localhost:8080/"
  },
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        auth: "auth@http://localhost:8081/remoteEntry.js",
        marketing: "marketing@http://localhost:8082/remoteEntry.js",
        modules: "modules@http://localhost:8083/remoteEntry.js",
        new_service: "new_service@http://localhost:8089/remoteEntry.js"
      },
      shared: packageJson.dependencies
    }),
    new Dotenv()
  ]
}

module.exports = merge(commonConfig, devConfig)
