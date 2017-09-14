var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const name = req.cookies.username;
  if (name) {
    res.render('index', {name: `Welcome! ${name}`,info: 'An app to help you study'});
  }
    res.redirect('/hello');
});

/* GET hello page. */
router.get('/hello', function(req, res, next) {
  const name = req.cookies.username;
  res.render('hello', { name , title: 'Flash Cards',info: 'An app to help you study'});
});

/* POST hello page. */
router.post('/hello', function(req, res, next) {
  res.cookie('username', req.body.user)
  res.redirect('/');
});

/* Remove cookie. */
router.get('/bye', function(req, res, next) {
  res.clearCookie("username");
  res.redirect('/hello');
});



module.exports = router;
