var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var router = require('./router/index')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session')
var flash = require('connect-flash')

// 정적인 파일들이 있는 곳을 지정해줌 express.static ( .js / .css 등등 )
// app.listen(3000,function(){
// }); 비동기 처리 콜백함수 --> 아래 요청들을 모두 완료한 후에 불러짐 !

app.listen(3000,()=>{
    console.log("!!!!!!!!!");
});

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs') // ejs모듈 씀

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(router)




