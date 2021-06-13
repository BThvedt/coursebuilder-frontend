const { merge } = require("webpack-merge")
const commonConfig = require("./webpack.common")
const packageJson = require("../package.json")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const Dotenv = require("dotenv-webpack")

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/container/latest/"
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
        modules: `modules@${domain}/modules/latest/remoteEntry.js`,
        new_service: `new_service@${domain}/new_service/latest/remoteEntry.js`
      },
      shared: packageJson.dependencies
    }),
    new Dotenv()
  ]
}

module.exports = merge(commonConfig, prodConfig)
