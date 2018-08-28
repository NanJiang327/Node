const http = require('http');
const baseUrl = `http://www.imooc.com/learn/`;
const cheerio = require('cheerio');
const videoIds = [348,259, 197, 134, 75];

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

var fetchCourseArray = [];

videoIds.forEach(function(id){
  fetchCourseArray.push(getPageAsync(baseUrl + id));
})

Promise.all(fetchCourseArray).then(function(pages){
  var coursesData = [];

  pages.forEach(function(html){
    var courses = filterChapters(html);

    coursesData.push(courses);
  })

  coursesData.sort(function(a,b){
    return a.number < b.number;
  })

  print(coursesData);
});

function filterChapters(html){
  var $ = cheerio.load(html);
  var chapters = $('.chapter');
  var title = $('.hd h2').text();
  var courseData = {
    title: title,
    videos: []
  };

  chapters.each(function(item) {
    var chapter = $(this)
    var chapterTitle = chapter.children('h3').text();
    var videos = chapter.find('.video').children('li');

    var chapterData = {
      chapterTitle: chapterTitle,
      videos: []
    }

    videos.each(function(item){
      var video = $(this).find('.J-media-item');
      var videoTitle = video.text();
      var id = video.attr('href').split('video/')[1];

      chapterData.videos.push({
        title: videoTitle,
        id: id
      });
      courseData.videos.push(chapterData);
    })
  });

  return courseData;
}

function print(coursesData) {
  
  coursesData.forEach(function(courseData){
    console.log('课程: ' + courseData.tittle + '\n');

    courseData.videos.forEach(function(item){
      var chapterTitle = item.chapterTitle;
      console.log(chapterTitle.trim() + ' ');

      item.videos.forEach(function(video){
        console.log('  -' + video.id + '- ' + video.title.replace(/\s+/g, '') + '\n');
      })
    })
  })
}
