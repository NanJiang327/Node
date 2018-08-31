var http = require('http');
var fs = require('fs')
var formidable = require('formidable');
var util = require('util');
var path = require("path");
var mime = require("mime");
var io = require('socket.io');
var progress = {finish: false};
var cache = {};

function socketListen() {
	io.listen(server).sockets.on('connection', function(sock) {
		var interval = setInterval(function(){
//			sock.emit("progress", 'percent2');
      console.log('Connect');
			if (progress.finish == false && progress.percent != undefined) {
			//	sock.emit("progress", 'percent1');
				console.log(progress.percent);
				sock.emit("progress", progress.percent);
				if (progress.percent == 100) {
					clearInterval(interval);
				}
			}
		}, 500);

		sock.on('disconnect', function() {
			console.log("exit");
		});
	});
}

//所请求的文件不存在时发送404错误
function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: response not found');
    response.end();
}


function show(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.end(html);
}

function upload(req, res) {
	if (!isFormData(req)) {
		res.statusCode = 400;
		res.end('Bad Request: expecting multipart/form-data');
		return;
  }

	var form = new formidable.IncomingForm();
	form.uploadDir = './upload';


	form.on('progress', function(bytesReceived, bytesExpected) {
		var percent = Math.floor(bytesReceived / bytesExpected * 100);
		progress.percent = percent;
		progress.finish = false;
	});

  form.parse(req);

	res.setHeader('Content-Type', 'text/html');
  res.end(html);

}

//提供文件数据服务
function sendFile(response, filePath, fileContents) {
    response.writeHead(200,
        {
            'Content-Type': mime.lookup(path.basename(filePath))
        }
    );
    response.end(fileContents);
}

//提供静态文件服务
function serveStatic(response, cache, absPath) {
    if(cache[absPath]){
        sendFile(response, absPath, cache[absPath]);
    }else {
        fs.exists(absPath, function (exists) {
            if(exists){
                fs.readFile(absPath, function (err, data) {
                    if(err){
                        send404(response);
                    }else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                })
            }else{
                send404(response);
            }
        })
    }
}

//创建HTTP服务器的逻辑
var server = http.createServer(function (request, response) {
    var filePath = false;
    // if(request.url == '/'){
    //     filePath = 'index.html';
    // }else{
    //     filePath =  request.url;
    // };
    switch (request.url) {
      case '/':
        filePath = 'index.html';
        break;
      case 'POST':
        console.log('Post called === ');
        upload(request, response);
        break;
      default:
        filePath =  request.url;
        break;

    }
    var absPath = './' + filePath;
    serveStatic(response, cache, absPath);
});


function isFormData(req) {
	var type= req.headers['content-type'];
	return 0 == type.indexOf('multipart/form-data');
}

server.listen(3000);
socketListen();
