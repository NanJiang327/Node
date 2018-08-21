//console.log('Hello');


// 使用内置模块
const os = require('os');
//console.log(os.hostname());

// 安装第三方模块 (例子: 加载request包)
//npm install request --save
//--- or
//yarn add request

// 使用第三方模块
const request1 = require('request');

request1({
    url: 'https://api.douban.com/v2/movie/top250',
    json: true
}, (error, response, body) => {
    //console.log(JSON.stringify(body, null, 2));
})

// 创建自己的模块 - (例子在greeting.js文件中)
/**
 * const hello = () => {
    console.log('Hello World');
   }

   module.exports.hello = hello;
 */

// 使用自己的模块
const greeting = require('./greeting');
//greeting.hello();

// 使用nodemon 监视应用的变化
// 安装nodemon  yarn add nodemon --dev -g -(在开发环境下安装nodemon) or npm install -g nodemon
// 运行nodemon  - nodemon index.js


// Node的核心包

// 使用 Event 模块
// const EventEmitter = require('events');
//
//
// class Player extends EventEmitter {
// }
//
// var player = new Player();
//
// player.on('play', (track) => {
//   console.log('Playing '+track);
// })
//
// player.emit('play', '再见理想');

// -- 文件

// const fs = require('fs');
//
// // 得到一个文件信息和目录
// fs.stat('index.js', (error, stats) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(stats);
//     console.log(`文件: ${stats.isFile()}`);
//     console.log(`目录: ${stats.isDirectory()}`);
//   }
// })
//
// // 创建一个目录
// fs.mkdir('logs', (error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('成功创建目录logs');
//   }
// })
//
// // 创建文件并写入内容 - 如果存在文件则覆盖旧文件
// fs.writeFile('logs/hello.log','hello ~ world', (error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('成功写入文件');
//   }
// })
//
// // 编辑文件
// fs.appendFile('logs/hello.log','hello ~ world, nan', (error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('成功写入文件');
//   }
// })
//
// // 读取文件
// fs.readFile('logs/hello.log','utf8', (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data);
//   }
// })
//
// // 列出目录里的文件
// fs.readdir('logs', (error, files) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(files);
//   }
// })
//
// // 重命名文件或者目录
// fs.rename('logs/hello.log', 'logs/greeting.log',(error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('重命名成功');
//   }
// });
//
// // 删除目录
// fs.rmdir('logs', (error)=> {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(`删除目录成功`);
//   }
// })
//
// // 删除文件
// fs.unlink('logs.log', (error)=> {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(`删除文件成功`);
//   }
// })

// Stream文件流

const fs2 = require('fs');

var fileReadStream = fs2.createReadStream('data.json');
var fileWriteStream = fs2.createWriteStream('data.json.gz');
var count = 0;

// 可读写文件流

// fileReadStream.once('data', (chunk) => {
//   console.log(chunk.toString());
// })

// fileReadStream.on('data', (chunk) => {
//   console.log(`${++count} 接收到: ${chunk.length}`);
//   fileWriteStream.write(chunk);
// })

fileReadStream.on('end', () => {
  console.log(`------结束------`);
})


fileReadStream.on('error', () => {
  console.log(error);
})

// 链接pipe
const zlib = require('zlib');

fileWriteStream.on('pipe', (source)=>{
  //console.log(source);
})

// pipe
fileReadStream.pipe(zlib.createGzip()).pipe(fileWriteStream);


// request http请求
const http = require('http');
var options = {
  protocol: 'http:',
  hostname: 'api.douban.com',
  port: '80',
  method: 'GET',
  path: '/v2/movie/top250'
}

var responseData = '';

var request = http.request(options, (response)=>{
  console.log(response.statusCode);
  response.setEncoding('utf8');
  response.on('data', (chunk) => {
    responseData += chunk;
  })
  response.on('end', () => {
    JSON.parse(responseData).subjects.map((item) => {
      console.log(item.title);
    })
  })
})

request.on('error', (error) => {
  console.log(error);
})

request.end();

// 创建一个服务器
