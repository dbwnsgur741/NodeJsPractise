var express = require('express')
var router = express.Router()
var path = require('path')
var mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    prot: 3306,
    user: 'root',
    password: '1234',
    database: 'nodedb'
})

connection.connect()

router.get('/list', (req,res)=>{
    res.sendFile(path.join(__dirname , '../../public/movie.html'));
})

router.get('/', (req,res)=>{
    var responseData = {};

    var query = connection.query('select * from movies',(err,rows)=>{
        if(err) error(err);
        if(rows.length){
            responseData.result = 1;
            responseData.data = rows;
        }else{
            responseData.result = 0;
        }
        res.json(responseData)
    })
})

router.post('/', (req,res)=>{
    var title = req.body.title;
    var type = req.body.type;
    var grade = req.body.grade;
    var actor = req.body.actor;

    var sql = { title, type, grade, actor};

    var query = connection.query('insert into movies set ?', sql , function(err,row){
        if(err) throw err;
        return res.json( { 'result' : 1 });
    })
})

router.get('/:title', (req,res)=>{
    var title = req.params.title;
    console.log(title);
    var responseData = {};
    var query = connection.query('select * from movies where title= ?', [title] , (err,rows)=>{
        if(err) error(err);
        if(rows[0]){
            responseData.result = 1;
            responseData.data = rows;
        }else{
            responseData.result = 0;
        }
        res.json(responseData)
    })
})

router.delete('/:title', (req,res) => {
    var title = req.params.title;
    var responseData = {};
    var query = connection.query('delete from movies where title = ?', [title] , (err,rows)=>{
        if(err) throw(err);
        if(rows.affectRows > 0){
            responseData.result = 1;
            responseData.data = title;
        }else{
            responseData.result = 0;
        }
        res.json(responseData);
    })
})

module.exports = router;

router.get