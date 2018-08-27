const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const templating = require('./templating');

const controller = require('./controller');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';


app.use(async (ctx, next) => {
  var start = new Date().getTime();
  await next();
  ctx.response.set('X-Reponse-Time', `${new Date().getTime() - start}ms`);
})

if(!isProduction) {
  let staticFiles = require('./static-files');
  app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyParser());

app.use(templating('views', {
  noCache: !isProduction,
  watch: !isProduction
}))

app.use(controller());

app.listen(3002);
