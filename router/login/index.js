var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

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
    var msg;
    var errMsg = req.flash('error') // flash 모듈로 error 넘기고 받을 수 있다.
    if(errMsg){
        msg = errMsg;
    }

    res.render('login.ejs', {'message' : msg});
})

// 세션에 있는 값을 뽑아서 전달 ..
passport.serializeUser((user,done)=>{
    console.log('passport session save : ', user.id)
    done(null, user.id)
});

passport.deserializeUser((id,done)=>{
    console.log('passport session getid : ', id)
    done(null, id);
})


// passport 'local-login' 이라는 새로운 LocalStrategy 사용
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pw',
    passReqToCallback: true
}, function (req, email, pw, done) {
    var query = connection.query('select * from user where email=?', [email],(err,rows)=>{
        if(err){
            return done(err);
        }
        if(rows.length){
            return done(null, {'email' : email , 'id' : rows[0].idx})
        }else{
            return done(null,false,{ 'message' : 'your login info is not found !'})
        }
    })
    }
));

router.post('/', (req,res,next)=>{
    passport.authenticate('local-login',(err,user,info)=>{
        if(err) res.status(500).json(err);
        if(!user) {
            return res.status(401).json(info.message);
        }
        req.logIn(user, (err)=>{
            if(err) {
                return next(err);
            }
            return res.json(user);
        });
    })(req, res, next);
    });

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