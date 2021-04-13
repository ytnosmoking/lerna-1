
const { getModules } = require('app-tools');
// const fs = require('fs')
const { resolve } = require('path');
const inquirer = require('inquirer');

const { spawn } = require('child_process');

const modulePath = resolve(__dirname, './packages');


const modules = getModules(modulePath).filter(mName => !mName.includes('tools'));


function prompt(opt) {
  return inquirer.prompt([opt]).then(answer => answer[opt.name]);
}

async function chooseModule() {
  const mdu = await prompt({
    name: 'mdu',
    type: 'checkbox',
    message: 'Serving module =>',
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
(async () => {
  console.log(process.argv);
  const isBuild = process.argv[2];
  const singleModule = await chooseModule();
  const consoleInfo = (index) => {
    return (data) => {
      console.log(`----------${index}-----------`);
      console.log(`stdout: ${data}`);
    };
  };
  // 选择的是 main  所有子应用全部运行
  if (singleModule === 'main') {
    for (let i = 0; i < modules.length; i++) {
      console.log(modules[i]);
      const child = spawn(`yarn workspace ${modules[i]} run ${isBuild ? 'build' : 'serve'}`, [], { shell: true });
      // stdout 获取标准输出
      child.stdout.on('data', consoleInfo(modules[i]));
      await sleep(1);
    }
  } else {
    if (isBuild) {
      const child = spawn(`yarn workspace ${singleModule} run ${isBuild ? 'build' : 'serve'}`, [], { shell: true });
      child.stdout.on('data', consoleInfo(singleModule));
    } else {

      const main = spawn('yarn workspace main run serve', [], { shell: true });
      main.stdout.on('data', consoleInfo(singleModule));
      await sleep(5);
      const child = spawn(`yarn workspace ${singleModule} run ${isBuild ? 'build' : 'serve'}`, [], { shell: true });
      child.stdout.on('data', consoleInfo(singleModule));
    }

  }
})();
