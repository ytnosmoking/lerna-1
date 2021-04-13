const configJson = require('app-tools/lib/config.json');
const packInfo = require('./package.json');
module.exports = {
  devServer: {
    port: configJson['objConfig'][packInfo.name].port
  }
}