const configJson = require('app-tools/lib/config.json');
const packInfo = require('./package.json');
const isdev = process.env.NODE_ENV === 'development'
module.exports = {

  publicPath: isdev ? '/' : `/${packInfo.name}/`,
  outputDir: packInfo.name,
  configureWebpack: config => {

    config.output.library = `${packInfo.name}-app`
    config.output.libraryTarget = 'umd'
    config.output.jsonpFunction = `webpackJsonp_${packInfo.name}`

  },

  devServer: {
    port: configJson['objConfig'][packInfo.name].port,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  }
}