const http = require('http');
const url = require('url');

function start(route, handle){
  http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname;
    console.log('Request for '+ pathname +' received');

    res.writeHead(200, {'Content-Type': 'text/html'});

    route(handle, pathname, response);
  }).listen(8080);

  console.log('Server has started');
}

exports.start = start;
