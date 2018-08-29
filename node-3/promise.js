// eg 1

let promise = new Promise(function(resolve, reject){
  console.log('Promise');
  resolve();
});

promise.then(function(){
  console.log('resolved');
})

console.log('Hi!');

// == end eg 1 ==

// == eg 2 ==
const getJson = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function(){
      if (this.readyState !== 4) {
        return;
      }

      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }

      const client = new XMLHttpRequest();
      client.open('GET', url);
      client.onreadystatechange = handler;
      client.responseType = 'json';
      client.setRequestHandler('Accept','application/json');
      client.send();
    }
  });

  return promise;
};

getJson('/post.json').then(function(json){
  console.log('Contents: '+ json);
}, function(err){
  console.log('Error: '+ err);
});

// == end eg 2 ==

// == eg 3 ==
const p1 = new Promise(function(resolve, rejcet){
  setTimeOut(() => { reject('fail')}, 3000);
})

const p2 = new Promise(function(resolve, reject){
  setTimeOut(() => { resolve(p1)}, 1000);
})

p2.then(function(){
  console.log('P1 success');
}).catch(error => {
  console.log(err);
})
// Error: fail

// == end eg 3 ==
