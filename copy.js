
const { getModules } = require('app-tools');

const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs');

const { spawn } = require('child_process');

const modulePath = path.resolve(__dirname, './packages');


const modules = getModules(modulePath).filter(mName => !mName.includes('tools'));

function prompt(opt) {
  return inquirer.prompt([opt]).then(answer => answer[opt.name]);
}

async function chooseModule() {
  const mdu = await prompt({
    name: 'mdu',
    type: 'checkbox',
    message: 'Copy module =>',
    choices: modules,
  });

  return mdu;
}

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time * 1000);
  });
}

//  删除文件夹
// 1 拿到路径path 判断是否是文件夹 信息
// fs.stat(path, function (err, stats) {
//  bool =  stats.isDirectory()
// if(bool) { // 是文件夹

// }
// })

//
// const delFile = (filePath) => fs.unlinkSync(filePath);
// const delDir = (dirPath) => {
//   const files = fs.readdirSync(dirPath);
//   if (files > 0) {

//   }
// };

const copyFile = (srcPath, tarPath, cb) => {
  const rs = fs.createReadStream(srcPath);
  rs.on('error', (err) => {
    if (err) {
      console.log('read error', srcPath);
    }
    cb && cb(err);
  });
  const ws = fs.createWriteStream(tarPath);
  ws.on('error', (err) => {
    if (err) {
      console.log('write error', tarPath);
    }
    cb && cb(err);
  });
  ws.on('close', function (ex) {
    cb && cb(ex);
  });

  rs.pipe(ws);
};

const copyFolder = function (srcDir, tarDir, cb) {
  console.log(`srcDir--------${srcDir}`);
  console.log(`tarDir--------${tarDir}`);
  fs.readdir(srcDir, function (err, files) {
    let count = 0;
    const checkEnd = function () {
      ++count === files.length && cb && cb();
    };
    if (err) {
      checkEnd();

      return;
    }

    for (let i = 0; i < files.length; i++) {

      const file = files[i];
      // files.forEach(function (file) {
      const srcPath = path.join(srcDir, file);
      const tarPath = path.join(tarDir, file);

      fs.stat(srcPath, (err, stats) => {
        if (err) {
          console.log(err);

          return;
        }
        // console.log(stats);
        if (stats.isDirectory()) {
          console.log('mkdir', tarPath);
          // fs.existsSync(tarPath); 判断是否存在目录文件夹
          if (fs.existsSync(tarPath)) {
            copyFolder(srcPath, tarPath, checkEnd);
          } else {
            fs.mkdir(tarPath, function (err) {
              if (err) {
                console.log(err);

                return;
              }
              copyFolder(srcPath, tarPath, checkEnd);
            });
          }

        } else {
          console.log(`copy file ----srcPath======${srcPath}`);
          console.log(`copy file ----tarPath======${tarPath}`);
          copyFile(srcPath, tarPath, checkEnd);
        }
      });
      // });
    }

    // 为空时直接回调
    files.length === 0 && cb && cb();
  });
};

const asyncStat = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (!err) {
        resolve(stats);
      }
    });
  });
};
const asyncUnlink = (file) => {
  return new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (!err) {
        resolve();
      }
      console.log(err);
    });
  });
};


const rmDir = async (filePath) => {
  const stat = await asyncStat(filePath);
  if (stat.isFile()) {
    await asyncUnlink(filePath);
  } else {
    let dirs = fs.readdirSync(filePath);
    dirs = dirs.map(dir => rmDir(path.join(filePath, dir)));
    await Promise.all(dirs);
    fs.rmdirSync(filePath);
  }
};


(async () => {
  console.log(process.argv);

  const selectModule = await chooseModule();
  console.log(selectModule);
  selectModule.forEach(item => {
    if (item === 'main') {
      return;
    }

    if (!fs.existsSync('project')) {
      fs.mkdirSync('project');
    }
    const tarPath = path.join(__dirname, `./project/${item}/`);
    if (!fs.existsSync(tarPath)) {
      fs.mkdirSync(tarPath);
    }
  });
  selectModule.forEach(item => {
    let srcPath = path.join(__dirname, `./packages/${item}/${item}/`);
    let tarPath = path.join(__dirname, `./project/${item}/`);

    if (item === 'main') {
      srcPath = path.join(__dirname, './packages/main/dist/');
      tarPath = path.join(__dirname, './project/');
    }

    copyFolder(srcPath, tarPath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });


})();
