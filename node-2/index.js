var greet = require('./hello');
var fs = require('fs');

var name = 'Nan';

greet.greeting(name);
greet.hello2();
console.log('====== reading file ======');
fs.readFile('sample.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log('Reading error');
  } else{
    console.log(data);
  }
})
