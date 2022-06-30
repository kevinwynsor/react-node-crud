const express = require ('express')
const mysql2 = require("mysql2")
const cors = require('cors')
const bodyParser = require('body-parser')

const con = mysql2.createConnection({
    host: 'bx5tsjb5pfjmqngfinkc-mysql.services.clever-cloud.com',
    port: '3306',
    user: 'ujflknh0hrogf8ok',
    password: 'YOKIwjBhU2JyFQngJ8iP',
    database: 'bx5tsjb5pfjmqngfinkc',
    multipleStatements: true,
    timezone: "+00:00"
});

con.connect((err) => {
    if (!err) {
        console.log(`connected to MySQL server`);
    } else {
        console.log(err)
    }

});

const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.get('/get', (req, res)=>{
    con.query('SELECT * FROM sample', (err, result)=>{
        res.send(result)
    })
})

app.get('/get/:id', (req, res)=>{
    var id = req.params.id
    con.query('SELECT * FROM sample WHERE id=?',  [id], (err, result)=>{
        res.send(result)
    })
})

app.post('/post', (req, res)=>{
    var data = req.body.data
    con.query('INSERT INTO sample (data) VALUES (?)', [data], (err, result)=>{
        if(err) throw err
        res.send(result)
    })
})

app.put('/put/:id', (req, res)=>{
    var id = req.params.id
    var data = req.body.data
    con.query('UPDATE sample SET data=? WHERE id=?', [data,id], (err, result)=>{
        if(err) throw err
        res.send(result)
    })
})

app.delete('/delete/:id', (req, res)=>{
    var id = req.body.id
    con.query('DELETE FROM sample WHERE id=?', [id], (err, result)=>{
        if(err) throw err
        res.send(result)
    })
})
app.listen(3001,()=>{
    console.log('listening in port 3001')
})