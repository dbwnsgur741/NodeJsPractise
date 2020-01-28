var express = require('express')
var bodyParser = require('body-parser')
var app = express()

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    prot: 3306,
    user: 'root',
    password: '1234',
    database: 'nodedb'
})

connection.connect()

// 정적인 파일들이 있는 곳을 지정해줌 express.static ( .js / .css 등등 )
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs') // ejs모듈 씀

// 비동기 처리 콜백함수 --> 아래 요청들을 모두 완료한 후에 불러짐 !

app.listen(3000,()=>{
    console.log("!!!!!!!!!");
});

// get 요청
app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/public/main.html');
})

app.get('/main',(req,res)=>{
    res.sendFile(__dirname +'/public/main.html');
})

app.post('/email_post',(req,res)=>{
    //get요청일때 --> res.send( req.param('email') ) ;
   //res.send("<h1> 환영합니다 "+req.body.email+ "님 !!</h1>");
   res.render('email.ejs',{'email' : req.body.email })
});

app.post('/ajax_send_email',(req,res)=>{

    //check validation about input value

    var responseData = { 'result' : 'ok' , 'email' : req.body.email }
    res.json(responseData)
})


