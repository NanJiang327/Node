//客户端程序初始化逻辑
var socket = io.connect();
$(function () {
  console.log('HI');
  setInterval(function() {
    socket.on('progress', function(progress) {
       console.log('upload ' + progress +'%');
    }, 500);
  })
});
