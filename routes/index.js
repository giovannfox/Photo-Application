var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root: 'public/html'});
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.sendFile('login.html', {root: 'public/html'});
});

//router.get('/logout', function(req, res, next) {
 // req.logout();
 // res.redirect('/');
//});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.sendFile('login.html', {root: 'public/html'});
});

/* GET registration page. */
router.get('/registration', function(req, res, next) {
  res.sendFile('registration.html', {root: 'public/html'});
});

/* GET post image page. */
router.use('/postimage', isLoggedIn);
router.get('/postimage', function(req, res, next) {
  res.sendFile('postimage.html', {root: 'public/html'});
});

//router.get('/logout', function(req, res, next) {
//  res.send('hello logout.html');
//});

module.exports = router;
