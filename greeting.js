const hello = () => {
    console.log('Hello World');
}

module.exports.hello = hello;

//插入文档
//db.albums.insert([{title:"光辉岁月"},{title:"爱我别走"},{title:"陪你度过漫长岁月"},{title:"听你说"}])


//添加属性
// db.albums.updateMany(
//   {},
//   {
//     $set: {style:"popluar"}
//   }
// )

// 更新文档
// db.albums.updateOne(
//   {title: "听你说"},
//   {
//     $set: {style:"romantic"}
//   }
// )
