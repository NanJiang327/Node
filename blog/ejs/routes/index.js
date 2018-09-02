var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res){
  res.render('index', { title: '主页'});
});
router.get('/reg', function(req, res){
  res.render('reg', { title: '注册'});
});
router.get('/reg', function(req, res){

});
router.get('/login', function(req, res){
  res.render('login', { title: '登录'});
});
router.get('/login', function(req, res){

});
router.get('/post', function(req, res){
    res.render('post', { title: '发表'});
});
router.get('/post', function(req, res){

});
router.get('/logut', function(req, res){

});

module.exports = router
