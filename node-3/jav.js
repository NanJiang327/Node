const http = require('https');
const fs = require('fs');
const star = process.argv[2] || 'Julia';
const page = process.argv[3] || 1;
const baseUrl = `https://www5.javmost.com/star/${star}/`;
const cheerio = require('cheerio');
let html = ``;

var videosData = [];

function getPageAsync(url){
  return new Promise(function(resolve, reject){
    console.log(' 正在爬取' + url );
    http.get(url, function(res){
      var html = '';

      res.on('data', function(data) {
        html += data;
      });

      res.on('end', function(){
        resolve(html);

      });
    }).on('error', function(){
        reject(e);
        console.log('Error !');
    });

  })
}

var fetchCourseArray = [getPageAsync(`https://www5.javmost.com/star/${star}/`)];

for(var i = 2; i <= page; i++){
    fetchCourseArray.push(getPageAsync(baseUrl+'/page/'+i+'/'));
}


Promise.all(fetchCourseArray).then(function(pages){
  console.log('演员: '+star+'  - Pages: '+ page);
  pages.forEach(function(html){
    filterChapters(html);
  })

  print(videosData);
}).catch();

function filterChapters(html){
 var $ = cheerio.load(html);
 var titles = $('.card');
 titles.each(function(item){
    var chapter = $(this);
    var title = chapter.find('h4').text();
    var actors = chapter.find('.btn.btn-danger.btn-xs.m-r-5.m-t-2').length;
    if (actors == 1) {
      videosData.push({
        title: title,
        downloadAddress: 'https://btso.pw/search/'+title
      })
    }
 });

}

function print(videoData) {
  //console.log(coursesData);
  videoData.forEach(function(item){
    // console.log('--------------');
    // console.log('车牌号: ' +item.title);
    // console.log('下载地址: ' +item.downloadAddress);
    // console.log('--------------');
    html += `<tr>
                <td> ${item.title} </td><td><a href=${item.downloadAddress} target=_blank>点我下载</a></td>
            </tr>
          `;
  });

  let tableString = `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <style>
        table.imagetable {
             font-family: verdana,arial,sans-serif;
             font-size:11px;
             color:#333333;
             border-width: 1px;
             border-color: #999999;
             border-collapse: collapse;
         }
         table.imagetable th {
             background:#b5cfd2 url('cell-blue.jpg');
             border-width: 1px;
             padding: 8px;
             border-style: solid;
             border-color: #999999;
         }
         table.imagetable td {
             background:#dcddc0 url('cell-grey.jpg');
             border-width: 1px;
             padding: 8px;
             border-style: solid;
             border-color: #999999;
         }
      </style>
      <title> ${star} </title>
    </head>
    <body>
    <table class="imagetable">
       <tr>
           <th>车牌</th>
           <th>下载地址</th>
       </tr>
       ${html}
   </table>
    </body>
  </html>`;


  fs.writeFile('./'+star+'.html',  tableString, function(err) {
    if (err) {
        throw err;
    }
    console.log('Saved.');
    });
}
