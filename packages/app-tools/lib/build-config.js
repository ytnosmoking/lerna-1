const fs = require('fs');
const { getModules } = require('./app-tools');
const paths = require('path');
const allModules = getModules(paths.resolve(__dirname, '../../'));

let basePort = process.argv[2] || 8080;


const ignoreName = ['app-tools', 'cli'];
const filterModules = allModules.filter(mo => !ignoreName.includes(mo));

const portfinder = require('portfinder');
function getPort(start = 8080) {
  return new Promise((resolve, reject) => {
    // 查找端口号
    portfinder.getPort({ port: start }, (err, port) => {
      if (err) {
        console.log(err);
        reject(err);

        return;
      }
      console.log(port);
      resolve(port);
    });
  });
}

async function getModulesConfig() {


  const obj = {};
  const arr = [];

  const singleInfo = (item, port) => {
    return {
      name: item,
      entry: `//localhost:${port}`,
      // container: `#${item}`,
      container: '#container',
      activeRule: `/application-${item}`,
      port,
    };
  };


  for (let i = 0; i < filterModules.length; i++) {
    const mo = filterModules[i];
    const port = await getPort(basePort);
    basePort = port;
    console.log(`basePort====${basePort}`);
    console.log(`index====${i}`);
    const info = singleInfo(mo, port);
    basePort += 1;
    obj[mo] = info;
    arr.push(info);
  }

  return {
    arrConfig: arr,
    objConfig: obj,
  };
}


(async () => {
  try {
    fs.writeFileSync(paths.resolve(__dirname, './config.json'), JSON.stringify(await getModulesConfig()));
    console.log('write Ok');
    fs.readFileSync(paths.resolve(__dirname, './config.json'));
  } catch (e1) {
    console.log('write fail');
  }
})();
