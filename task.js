
const { getModules } = require('app-tools');
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
  const selectModule = await chooseModule();
  const consoleInfo = (index) => {
    return (data) => {
      console.log(`----------${index}-----------`);
      console.log(`stdout: ${data}`);
    };
  };

  for (let i = 0; i < selectModule.length; i++) {
    const singleModule = selectModule[i];
    const child = spawn(`yarn workspace ${singleModule} run ${isBuild ? 'build' : 'serve'}`, [], { shell: true });
    child.stdout.on('data', consoleInfo(singleModule));
    await sleep(1);
  }
})();
