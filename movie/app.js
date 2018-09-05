const express = require('express');
const path = require('path');
const port = process.env.PROT || 3000;
// const flash = require('connect-flash');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/nan', {useNewUrlParser: true});

app.locals.moment = require('moment');

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

// flash中间件, 用来显示通知
// app.use(flash());

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 路由
routes(app);

app.listen(port, function() {
    console.log('Server listening on port '+port);
});
