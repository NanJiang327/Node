const data = require('./SampleEvents.json')
const Event = require('../../models/event.js')


// 写入数据库
Event.insertMany(data).then(() => console.log(`数据处理成功`))
