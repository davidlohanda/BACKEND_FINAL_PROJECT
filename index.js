var express = require('express')
var app = express()
//===========================================
var bodyParser = require('body-parser')
app.use(bodyParser.json())
//===========================================
var cors = require('cors')
app.use(cors())
//===========================================
const port = 2000
app.listen(port , ()=>console.log(`Berjalan di port ${port}`))
//===========================================
var mysql = require('mysql')
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'database_user'
})
//============================================
app.get('/' , (req,res)=>{
    res.send('<h1>Selamat datang di API User</h1>')
})
//==============================================
const cryp = require('crypto')
//==============================================
const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
            user:'davidlohanda8@gmail.com',
            pass:'jgtfhwzgjqbwysmw'
        }
    ,
    tls:{
        rejectUnauthorized : false
    }
})

//============================REGISTER===========================================
//Untuk post user data dari frontend ke backend dengan terlebih dahulu melakukan check terhadap availability username
app.post('/userRegister' , (req,res)=>{
    var password = cryp.createHmac('sha256' , 'secretPass').update(req.body.password).digest('hex')
    var userNewData = {
        username : req.body.username,
        email : req.body.email,
        password : password,
        verified : 'false'
    }
    //Check availability username di database
    var sql1 = `select * from table_user where username = "${req.body.username}"`
    db.query(sql1 , (err,result1)=>{
        try{
            if(err) throw err
            if(result1.length > 0){
                throw 'Username not available'
            }else{
                var sql2 = `insert into table_user set ?`
                db.query(sql2 , userNewData , (err2,result2)=>{
                    if(err2) throw err2
                    res.send('Registration Success')
                })
                //Setelah sukses melakukan registrasi maka akan dikirimkan link verifikasi dari nodemailer
                var to = req.body.email
                var mailOptions={
                    from : 'davidlohanda8@gmail.com',
                    to : to,
                    subject : 'User Verification',
                    html : `<h2>Hi, ${req.body.username}!</h2>
                            <h3>Thankyou for registration</h3>
                            <p>Please verify your account before login by clicking the link below :</p>
                            <a href='http://localhost:2000/userVerification?username=${req.body.username}'>http://localhost:2000/userVerification?username=${req.body.username}</a>
                            `
                }
                if(to){
                    transporter.sendMail(mailOptions , (err,res1)=>{
                        if(err){
                            throw err
                        }else{
                            res.send('Email Sent')
                        }
                    })
                }else{
                    res.send('Email is empty')
                }
            }
        }catch(err){
            res.send(err)
        }
    })
})
//link verifikasi yang mengubah verified dr false jadi true, yang nantinya link ini akan dikirim pke nodemailer
app.get('/userVerification' , (req,res)=>{
    var sql = `update table_user set verified = 'true' where username='${req.query.username}'` 
    db.query(sql , (err,result)=>{
        if(err) throw err
        res.send('Verification Success')
    })
})
//=============================================================================
//=================================LOGIN=======================================
//Login hanya bisa dilakukan ketika user sudah melakukan verifikasi lewat email
app.get('/userLogin' , (req,res)=>{
    var passwordEncrypt = cryp.createHmac('sha256' , 'secretPass').update(req.query.password).digest('hex')
    var sql = `select * from table_user where username='${req.query.username}' and password='${passwordEncrypt}'`
    db.query(sql , (err,result)=>{
        try{
            if(err) throw err
            res.send(result)
        }catch(err){
            res.send(err)
        }
        
    })
})
//Keeplogin menangkap cookie yang dikirim dari frontend
app.get('/userKeepLogin' , (req,res)=>{
    var sql = `select * from table_user where username= '${req.query.username}'`
    db.query(sql , (err,result)=>{
        if(err) throw err
        res.send(result)
    })
})
//=============================================================================
