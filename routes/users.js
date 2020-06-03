var express = require('express');
var router = express.Router();

/* GET users listing. */
//localhost:3000/users
//router.get('/', function(req, res, next) {
 // res.send('respond with a resource');
//});

//localhost:3000/users/register
// wont work yet need get?
//router.post('/register', function(req, res, next){
// res.send('respond with a resource');
//});


const bcrypt = require('bcryptjs');

const db = require('../conf/database'); //import database
const errorPrint = require('../helpers/debug/debughelpers').errorPrint;
const successPrint = require('../helpers/debug/debughelpers').successPrint;
const UserError = require('../helpers/errors/UserError');



router.post('/register', (req, resp, next) => {
 // console.log(req.body);
 // successPrint('data received');
 // resp.send('data send');
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  // validate form data
  // check username ex. username only alphanumeric characters, 5 char or bigger
  //check email ex. email has to have @ symbol
  // check password ex 8 chars at least one number etc
  // in html slides to do this

  db.execute('SELECT * FROM users WHERE username=?', [username])
      .then(([results, fields]) =>{
          if(results && results.length == 0){
            return db.execute('SELECT * FROM users WHERE email=?', [email])
          }else{
              throw new UserError('username already exists', '/register', 200);
          }
  })
      .then(([results, fields]) => {
        if (results && results.length == 0) {
        //  return db.execute('INSERT INTO users (username, email, password, created) VALUES (?,?,?, now());',
        //      [username, email, password]);  new one below use old one if doesnt work
         return bcrypt.hash(password, 10);
        } else {
          throw new UserError('email already exists', '/register', 200);
        }
      })
      .then((hashedPassword) => {
          let baseSQL =
              "INSERT INTO users (username, email, password, created) VALUES (?,?,?, now());";
          return db.execute(baseSQL, [username, email, hashedPassword]);
      })

      .then(([results, fields]) =>{
        if(results && results.affectedRows){
          successPrint('user has been created');
          resp.redirect('/login');
        }else{
          throw new UserError('Server Error, user could not be created', '/register', 500);
        }
      })
      .catch((err) => {
        if(err instanceof UserError){
          errorPrint(err.getMessage());
          resp.status(err.getStatus());
          resp.redirect(err.getRedirectURL());
        }
        next(err);
      })

  // make sure username doesnt exist
  // make sure email doesnt exist
  // then create new user
  // if okay redirect to /login
  // if fails redirect to /registration page
  // catch any errors
  //if UserError
  //set status and message and redirect

});

router.post("/login", (req, resp, next) => {
  //console.log(req.body);
 // resp.send("");
    let username = req.body.username;
    let password = req.body.password;
    let userID;

    db.execute("SELECT id,password FROM users WHERE username=?", [username])
        .then(([results, fields]) => {
            if(results && results.length == 1){
               let hPassword = results[0].password;
               userID = results[0].id;
               return bcrypt.compare(password, hPassword)
            }else{
                throw new UserError('username or password is incorrect', '/login', 200);
            }
        })
        .then((result) => {
            if(result) {
                successPrint('successful login!');
                req.session.username = username;
                req.session.userID = userID;
                console.log(req.session);
                resp.redirect('/');
            }else{
                throw new UserError('username or password is incorrect', '/login', 200);
            }
        })
        .catch((err) => {
            if(err instanceof UserError){
                errorPrint(err.getMessage());
                resp.status(err.getStatus());
                resp.redirect(err.getRedirectURL());
            }else{
                next(err);
            }
        })
});


module.exports = router;
