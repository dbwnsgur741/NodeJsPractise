var express = require('express')
var app = express()
var router = express.Router() // 라우터 불러오기
var path = require('path') // 상대경로로 쉽게 이동

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname ,'../public/main.html'));
})

module.exports = router;