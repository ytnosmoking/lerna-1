
const fs = require('fs')
const { resolve } = require('path')
const inquirer = require('inquirer')

const { spawn } = require("child_process");

const modulePath = resolve(__dirname, './packages')

const modules = fs
  .readdirSync(modulePath)
  .filter(dir => fs.statSync(resolve(modulePath, dir)).isDirectory());


function prompt(opt) {
  return inquirer.prompt([opt]).then(answer => answer[opt.name]);
}
async function chooseModule() {
  const mdu = await prompt({
    name: "mdu",
    type: "list",
    message: "Serving module =>",
    choices: modules
  });
  return mdu;
}


console.log(modules);
(async () => {
  const singleModule = await chooseModule();

  console.log(singleModule)
  // var spawnObj = spawn(__dirname, `yarn workspace ${singleModule} run serve`);
  // spawnObj.on("close", code => {
  //   console.log(code)
  //   if (code !== 0) return;
  // });

  // spawnObj.on("error", err => {
  //   console.log(err)
  // });

  // yarn workspace app1 run serve
})();