const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

function staticFiles(url, dir) {
  return async (ctx, next) => {
    let rpath = ctx.request.path;

    if(rpath.startsWith(url)){
      // 获取完整路径
      let fp = path.join(dir, rpath.substring(url.length));
      // 判断文件是否存在
      if(await fs.exists(fp)){
        // 查找文件的mime
        ctx.response.type = mime.getType(rpath);
        // 读取文件内容并赋值给response.body
        ctx.response.body = await fs.readFile(fp);
      } else {
        console.log('File is not exist');
        ctx.response.status = 404
      }
    } else {
      await next();
    }
  }
}

module.exports = staticFiles
