var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')

// DB 연결부분

const connection = mysql.createConnection({
    host: 'localhost',
    prot: 3306,
    user: 'root',
    password: '1234',
    database: 'nodedb'
})

connection.connect()


// Router 세팅

router.post('/form', (req, res) => {

    res.render('email.ejs', {'email': req.body.email})
});

router.post('/ajax', (req, res) => {
    //check validation about input value
    var email = req.body.email;
    var responseData = {};

    var query = connection.query('select name from user where email="' + email + '"', (err, rows) => {
        if (err) throw err;
        if (rows[0]) {
            responseData.result = "ok";
            responseData.name = rows[0].name;
        } else {
            responseData.result = "none";
            responseData.name = "";
        }
        res.json(responseData)
    });
})

module.exports = router;