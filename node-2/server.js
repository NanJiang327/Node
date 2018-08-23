var http = require('http'),
    fs = require('fs'),
    // 比如当前的文件路径是 /User/nanjiang , 使用path.resolve('.') 获得 /User/nanjiang. 使用path.join(path,'pub', 'index.html')
    // 获得path/pub/index.html
    path = require('path'),// path模块用于方便地构造目录 比
    url = require('url'); // url模块是用于将以个字符串解析为一个url对象

var root = path.resolve(process.argv[2] || '.');
const defaultPages = ['index.html', 'default.html'];

console.log('Static root dir: '+ root);

var server = http.createServer(function(request, response){
  var pathname = url.parse(request.url).pathname;

  var filepath = path.join(root, pathname);

  console.log('Hello : '+filepath);


  fs.stat(filepath, (err, stats) => {
      if (!err && stats.isFile()) {
        console.log('200 '+ request.url);
        response.writeHead(200);
        fs.createReadStream(filepath).pipe(response);
        console.log('STATS:  ' +stats);
      } else if(!err && stats.isDirectory()){
        console.log('STATS:  ' +stats.isDirectory());
          fs.readdir(filepath, 'utf-8', function(err, files){
            if(err) {
              console.log('404 '+ request.url);
              response.writeHead(404);
              response.end('404 Not Found');
            } else {
              for (let file of files){
                if(file === 'index.html' || file === 'default.html'){
                  console.log('200 '+ request.url);
                  response.writeHead(200);
                  fs.createReadStream(path.join(filepath, file)).pipe(response);
                }
              }
            }
          });
      } else {
        console.log('404 '+ request.url);

        response.writeHead(404);
        response.end('404 Not Found');
      }
  });
});

server.listen(8080);
console.log('Server is running at http://127.0.0:8080/');
