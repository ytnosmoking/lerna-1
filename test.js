// const { canUsePort } = require('app-tools');
// canUsePort(8081)

// portIsOccupied(8081)
const portfinder = require('portfinder');

// 查找端口号
portfinder.getPort({ port: 8080 }, (err, port) => {

  if (err) {
    console.log(err);

    return;
  }
  console.log(port);


});

const tag = 'v1.0.1';
const reset = 'reset HEAD~2 --hard';
