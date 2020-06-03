const mysql = require('mysql2');


const pool = mysql.createPool({
    host:"localhost",
    user:"gfox",
    password:"1234",
    database:"csc317db",
    connectionLimit: 50,
    debug: false, // turn on if having db problems, will tell u when it fails and why
});

const promisePool = pool.promise();
module.exports = promisePool;