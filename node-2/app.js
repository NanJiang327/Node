const Koa = require('koa');
// 引入bodyparser解析request body
const bodyParser = require('koa-bodyparser');

const controller = require('./controller')

const app = new Koa();

app.use(bodyParser());
// 使用 app.use 来加载函数
app.use(controller());

app.listen(3001);

console.log('app started at port 3001...');
