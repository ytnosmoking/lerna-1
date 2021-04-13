'use strict';
//

const fs = require('fs');

const paths = require('path');


// 获取文件夹名称(也可以是模块)
function getModules(path) {
  return fs.readdirSync(path).filter(dir => fs.statSync(paths.resolve(path, dir)).isDirectory());
}


module.exports = {
  getModules,
};
