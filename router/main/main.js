var express = require('express')
var app = express()
var router = express.Router() // 라우터 불러오기
var path = require('path') // 상대경로로 쉽게 이동

// main page 는 login이 될 때만 ( 즉 세션정보가 있을때만 ) 접근이 가능하게 하자.

router.get('/',(req,res)=>{

    var id = req.user;
    if(!id) {
        res.render('login.ejs');
    }
    //res.sendFile(path.join(__dirname ,'../../public/main.html'));
    res.render('main.ejs', { 'id' : id });
})

module.exports = router;