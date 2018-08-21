const https = require('https')

class NanDemo{
  subtotal(uniPrice, quantity){
    return uniPrice * quantity;
  }

  waitTwoSecond (data, callback){
    setTimeout(()=>{
      callback(data)
    }, 2000)
  }

  fetchData(api, callback){
    var requestUrl = `https://api.douban.com/v2/movie/${api}`

    https.get(requestUrl, (response) => {
      var responseData = ''
      response.setEncoding('utf8')

      response.on('data', (chunk) => {
        responseData += chunk
      })

      response.on('end', ()=> {
        callback(JSON.parse(responseData))
      })
    })
  }
}

module.exports = NanDemo
