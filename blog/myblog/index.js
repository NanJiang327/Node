const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.set('/views', path.join(__dirname, 'vies'));// 模板存放目录
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(3000);
