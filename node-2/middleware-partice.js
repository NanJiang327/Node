const Koa = require('koa');
// 调用compose 合成中间件
const compose = require('koa-compose');

const app = new Koa();

const one = (ctx, next) => {
  console.log('>>  one');
  next();
  console.log('<<  one');
}

const two = (ctx, next) => {
  console.log('>>  two');
  next();
  console.log('<<  two');
}

const three = (ctx, next) => {
  console.log('>>  three');
  next();
  console.log('<<  three');
}

const main = (ctx, next) => {
  const n = Number(ctx.cookies.get('view') || 0) + 1;
  ctx.cookies.set('view', n);
  ctx.response.body = n + 'views';
}


// 把中间件合成
const middlewares = compose([one, two, three, main]);

app.use(middlewares);

app.listen(3002);
