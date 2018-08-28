const http = require('http');
const querystring = require('querystring');

var postData = querystring.stringify({
  'content': 'Test request 3',
  'cid': 348,
  'mid': 8837
})

var options = {
  hostname: 'www.imooc.com',
  port: 80,
  path: '/course/docomment',
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7',
    'Connection': 'keep-alive',
    'Content-Length': postData.length,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': 'imooc_uuid=b95fbd0e-3381-4107-a178-0cbdeec0d39f; imooc_isnew_ct=1534894002; loginstate=1; apsid=MyYzkwYmM5Y2RiNThlYjMyMGZhMDg2YjJmOTk0MTQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANTc1OTA5MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0OTk1MjEwMTBAcXEuY29tAAAAAAAAAAAAAAAAAAAAADE2NjYyNDE5NWY1NzA2NzFjNGVhM2ZhODdmMTg1NTgw0J98W9CffFs%3DZW; last_login_username=499521010%40qq.com; PHPSESSID=t2o6elm4lelu6jacpfqo56g2n6; imooc_isnew=2; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1534893998,1535344743; Hm_lvt_fb538fdd5bd62072b6a984ddbc658a16=1534893997,1535344743,1535363387; Hm_lpvt_fb538fdd5bd62072b6a984ddbc658a16=1535363391; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1535363401; cvde=5b7c9fb264ff7-155',
    'Host': 'www.imooc.com',
    'Origin': 'https://www.imooc.com',
    'Referer': 'https://www.imooc.com/video/8837',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
  }
}

var req = http.request(options, function(res){
  console.log('Status: '+ res.statusCode);
  console.log('Headers: '+ JSON.stringify(res.headers));

  res.on('data', (chunk) => {
    console.log(Buffer.isBuffer(chunk));
    console.log(typeof chunk);
  })

  res.on('end', () => {
    console.log('评论完毕');
  })

});

req.on('error', (err) => {
  console.log('Erro: ' +err.message);
});

req.write(postData);
req.end();
