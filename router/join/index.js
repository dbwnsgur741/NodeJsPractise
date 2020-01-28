var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

// DB 연결부분

const connection = mysql.createConnection({
    host: 'localhost',
    prot: 3306,
    user: 'root',
    password: '1234',
    database: 'nodedb'
})

connection.connect()

router.get('/', (req, res) => {
    res.render('join.ejs');
})

passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, pw, done) {
    console.log('local-join callback called');
}))

// router.post('/', (req, res) => {
//     var body = req.body;
//     var email = body.email;
//     var name = body.name;
//     var pw = body.pw;
//
//     var sql = {email: email, name: name, pw: pw};
//
//     var query = connection.query('insert into user set ?', sql, (err, rows) => {
//         if (err) {
//             throw err;
//         } else {
//             res.render('welcome.ejs', {'name': name, 'id': rows.insertId});
//         }
//     })
// })

module.exports = router;