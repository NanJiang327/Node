const http = require('http');
const url = 'http://www.imooc.com/learn/348';
const cheerio = require('cheerio');

http.get(url, function(res){
  var html = '';

  res.on('data', function(data) {
    html += data;
  });

  res.on('end', function(){
    var courseData = filterChapters(html);
    print(courseData);
  });
}).on('error', function(){
  console.log('Error !');
});

function print(courseData) {
  courseData.forEach(function(item){
    var chapterTitle = item.chapterTitle;
    console.log(chapterTitle.trim() + ' ');

    item.videos.forEach(function(video){
      console.log('  -' + video.id + '- ' + video.title.replace(/\s+/g, '') + '\n');
    })
  })
}

function filterChapters(html){
  var $ = cheerio.load(html);
  var chapters = $('.chapter');
  var courseData = [];

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
      courseData.push(chapterData);
    })
  });

  return courseData;
}
