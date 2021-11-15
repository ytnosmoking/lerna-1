const configJson = require('app-tools/lib/config.json');
const packInfo = require('./package.json');
// eslint-disable-next-line no-unused-vars
const isdev = process.env.NODE_ENV === 'development'
const pages = {
  index: {
    entry: 'src/pages/main/main.js',
    template: 'public/index.html',
    title: 'main'
  },

  test: {
    entry: 'src/pages/test/main.js',
    template: 'public/index.html',
    title: 'test'
  },

}
module.exports = {
  pages,

  // 
  publicPath: isdev ? '/' : `/${packInfo.name}/`,
  // publicPath: `/${packInfo.name}/`,
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