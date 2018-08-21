var express = require('express')
var morgan = require('morgan')
var path = require('path')
var bodyParser = require('body-parser')

var app = express();

let comments = [];
app.locals.comments = comments

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (request, response) => {
  response.render('index')
});

app.get('/comments/new', (request, response) => {
  response.render('comments/new')
} )

app.get('/comments', (request, response) => {
  response.render('comments/index')
})

app.post('/comments/new', (request, response) => {
  if(!request.body.comment){
    response.status(400).send('Do you have something to say ?')
    return
  }
  comments.push({
    comment: request.body.comment,
    created_at: new Date()
  })
  response.redirect('/comments')
})

app.listen(3001, () => {
  console.log('Listen port: 3001');
});
