var express = require('express');
var router = express.Router();
const errorPrint = require('../helpers/debug/debughelpers').errorPrint;
const successPrint = require('../helpers/debug/debughelpers').successPrint;
const db = require('../conf/database'); //import database
const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');


var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/uploads");
    },
    filename: function(req, file, cb){
        let fileExt = file.mimetype.split("/")[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({storage: storage});

router.post('/createPost', uploader.single('uploadImage'), (req,resp,next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let desc = req.body.description;
    let fk_userid = req.session.userID;

    sharp(fileUploaded)
        .resize(200)
        .toFile(destOfThumbnail)
        .then(() => {
            let baseSQ = 'INSERT INTO posts (title, description, photopath, thumbnail, active, created, fk_userid) VALUE (?, ?, ?, ?, ?, now(), ?);';
            return db.execute(baseSQ, [title, desc, fileUploaded, destOfThumbnail, 0, fk_userid]);
        })
    .then(([results, fields]) => {
        if(results && results.affectedRows) {
            successPrint('new post created');
            resp.redirect('/');
        }else{
            next(Error('post was not created'));
        }
    })
    .catch((err) => {next(err)});
});

router.get('/search/:searchTerm', (req, resp, next) => {
    let searchTerm = req.params.searchTerm;
    let _sql = ' SELECT p.id, p.title, p.description, p.thumbnail, u.username \
    FROM posts p \
    JOIN users u on p.fk_userid=u.id \
    WHERE title LIKE ?;';
    searchTerm = "%" + searchTerm + "%";
    db.query(_sql, [searchTerm])
        .then(([results, fields]) => {
            resp.json(results);
        })
        .catch((err) => next(err));


});

module.exports = router;

