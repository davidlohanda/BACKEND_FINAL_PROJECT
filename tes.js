// var express = require('express')
// var app = express()
// //===========================================
// var bodyParser = require('body-parser')
// app.use(bodyParser.json())
// //===========================================
// var cors = require('cors')
// app.use(cors())
// //===========================================
// const port = 2000
// app.listen(port , ()=>console.log(`Berjalan di port ${port}`))
// //===========================================
// var mysql = require('mysql')
// const db = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : '1234',
//     database : 'database_user'
// })
// //============================================
// app.get('/' , (req,res)=>{
//     res.send('<h1>Selamat datang di API User</h1>')
// })
// //==============================================
// const cryp = require('crypto')
// //==============================================
// const nodemailer = require('nodemailer')
// let transporter = nodemailer.createTransport({
//     service : 'gmail',
//     auth: {
//             user:'davidlohanda8@gmail.com',
//             pass:'jgtfhwzgjqbwysmw'
//         }
//     ,
//     tls:{
//         rejectUnauthorized : false
//     }
// })
// //==================================================================
// var multer  = require('multer')
// var fs = require('fs')


// const storageConfig = multer.diskStorage({
//     // FILE MAU DISIMPAN DIMANA
//     destination : (req,file,cb) => {
//         cb(null , './uploads')
//     } ,
//     // NAMA FILE
//     filename : (req,file,cb) => {
//         cb(null , 'PRD-' + Date.now() + '.' + file.mimetype.split('/')[1])
//     } 
// })

// const filterConfig = (req, file, cb) => {
//     if(file.mimetype.split('/')[1] === 'png' || file.mimetype.split('/')[1] === 'jpeg'){
//         cb(null, true)
//     }else{
//         req.validation = {error : true , msg : 'File must be image'}
//         cb(null, false)
//     }
// }
// var upload = multer({storage : storageConfig , fileFilter : filterConfig})


// // UNTUK MEMBUAT FOLDER UPLOAD BISA DIAKSES PUBLIC
// app.use('/uploads',express.static('uploads'))

// //================================================================================

// //============================REGISTER===========================================
// //Untuk post user data dari frontend ke backend dengan terlebih dahulu melakukan check terhadap availability username
// app.post('/userRegister' , (req,res)=>{
//     var password = cryp.createHmac('sha256' , 'secretPass').update(req.body.password).digest('hex')
//     var userNewData = {
//         username : req.body.username,
//         email : req.body.email,
//         password : password,
//         verified : 'false'
//     }
//     //Check availability username di database
//     var sql1 = `select * from table_user where username = "${req.body.username}"`
//     db.query(sql1 , (err,result1)=>{
//         try{
//             if(err) throw err
//             if(result1.length > 0){
//                 throw 'Username not available'
//             }else{
//                 var sql2 = `insert into table_user set ?`
//                 db.query(sql2 , userNewData , (err2,result2)=>{
//                     if(err2) throw err2
//                     res.send('Registration Success')
//                 })
//                 //Setelah sukses melakukan registrasi maka akan dikirimkan link verifikasi dari nodemailer
//                 var to = req.body.email
//                 var mailOptions={
//                     from : 'davidlohanda8@gmail.com',
//                     to : to,
//                     subject : 'User Verification',
//                     html : `<h2>Hi, ${req.body.username}!</h2>
//                             <h3>Thankyou for registration</h3>
//                             <p>Please verify your account before login by clicking the link below :</p>
//                             <a href='http://localhost:2000/userVerification?username=${req.body.username}'>http://localhost:2000/userVerification?username=${req.body.username}</a>
//                             `
//                 }
//                 if(to){
//                     transporter.sendMail(mailOptions , (err,res1)=>{
//                         if(err){
//                             throw err
//                         }else{
//                             res.send('Email Sent')
//                         }
//                     })
//                 }else{
//                     res.send('Email is empty')
//                 }
//             }
//         }catch(err){
//             res.send(err)
//         }
//     })
// })
// //link verifikasi yang mengubah verified dr false jadi true, yang nantinya link ini akan dikirim pke nodemailer
// app.get('/userVerification' , (req,res)=>{
//     var sql = `update table_user set verified = 'true' where username='${req.query.username}'` 
//     db.query(sql , (err,result)=>{
//         if(err) throw err
//         res.send('Verification Success')
//     })
// })
// //=============================================================================
// //=================================LOGIN=======================================
// //Login hanya bisa dilakukan ketika user sudah melakukan verifikasi lewat email
// app.get('/userLogin' , (req,res)=>{
//     var passwordEncrypt = cryp.createHmac('sha256' , 'secretPass').update(req.query.password).digest('hex')
//     var sql = `select * from table_user where username='${req.query.username}' and password='${passwordEncrypt}'`
//     db.query(sql , (err,result)=>{
//         try{
//             if(err) throw err
//             res.send(result)
//         }catch(err){
//             res.send(err)
//         }
        
//     })
// })
// //Keeplogin menangkap cookie yang dikirim dari frontend
// app.get('/userKeepLogin' , (req,res)=>{
//     var sql = `select * from table_user where username= '${req.query.username}'`
//     db.query(sql , (err,result)=>{
//         if(err) throw err
//         res.send(result)
//     })
// })
// app.get('/getUserByUsername' , (req,res)=>{
//     var sql = `select * from table_user where username= '${req.query.username}'`
//     db.query(sql , (err,result)=>{
//         if(err) throw err
//         res.send(result)
//     })
// })
// //=============================================================================
// //===================================CREATE AUCTION============================
// // Saat user melelang productnya maka akan dipost semua variable yang dikirim dr frontend (nama,harga,dll) ke database
// app.post('/createAuction', upload.single('img') , (req,res)=>{
//     try{
//         console.log(req.file)
//         if(req.validation) throw req.validation
//         if(req.file.size > 5000000) throw {error : true , msg : 'Image too large'}
//         console.log(req.body.product)

//         var newData = JSON.parse(req.body.product)
//         newData.product_image = req.file.path
//         var sql = 'insert into table_create_auction set ?'
//         db.query(sql,newData, (err,result) => {
//             if(err) throw err
//             res.send('sukses')
//         })
//     }catch(err){
//         res.send(err)
//     }
// })

// //getAllData
// app.get('/getAllCreateAuction' , (req,res)=>{
//     var sql = `select * from table_create_auction;`
//     db.query(sql , (err,result)=>{
//         if(err) throw err
//         res.send(result)
//     })
// })

// //get data create auction berdasarkan id
// app.get('/getCreateAuction/:idOwner' , (req,res)=>{
//     var sql = `select * table_create_auction where id= ${req.params.idOwner}`
//     db.query(sql , (err,result)=>{
//         if(err) throw err
//         res.send(result)
//     })
// })
// //User hanya bisa edit product_name product_price product_desc product_image
// app.put('/editCreateAuction/:id' ,  upload.single('editImg')) , (req,res)=>{
//     if(req.file){
//         var data = JSON.parse(req.body.data)
//         data.product_image = req.file.path
//         var sql1 = `update table_create_auction set ? where id = ${req.params.id}`
//         db.query(sql1, data , (err,result) => {
//             if(err) throw err
//             res.send('Update Data Success')
//             fs.unlinkSync(req.body.imageBefore)
//         })
//     }else{
//         var sql2 = `update table_create_auction set  
//                     product_name = ${req.body.product_name},
//                     product_price = ${req.body.product_price},
//                     product_desc = ${req.body.product_desc}
//                     where id = ${req.params.id}`
//         db.query(sql2 , (err,result)=>{
//             if(err) throw err
//             res.send('Edit Success')
//         })
//     }
// }
// //User bisa delete lelangan yang dibuat
// app.delete('/deleteCreateAuction' , (req,res)=>{
//     var id = req.query.id
//     var imageBefore = req.query.imageBefore
//     var sql = `delete from table_create_auction where id=${id}`
//     db.query(sql , (err,result)=>{
//         if(err) throw err
//         fs.unlinkSync(imageBefore)
//         res.send('Delete Success')
//     })
// })
// //======================================================================
// //===========================BIDDER=====================================
// // Saat User membeli product atau memlakukan bidding maka data user beserta harga biddingnya akan di post ke database
// app.post('/postBid' , (req,res)=>{
//     var data = req.body
//     var sql = 'insert into table_bidder set ?'
//     db.query(sql , data , (err,result)=>{
//         if(err) throw err
//         res.send('Bidding Success')
//     })
// })
// // Untuk mendapatkan user dengan bidding tertinggi dari setiap product
// app.get('/getWinner' , (req,res)=>{
//     var sql = `select product_id, max(bid_price) as highest_price ,user_id from table_bidder
//     group by product_id;`
//     db.query(sql , (err,result)=>{
//         if(err) throw err
//         res.send(result)
//     })
// })
// //Untuk mengupdate durasi sehingga saat waktu bidding berakhir maka product akan masuk ke cart pemenang
// app.put('/duration/:id' , (req,res)=>{
//     var sql1 = `update table_create_auction set duration = 0 where id = ${req.params.id}`
//     db.query(sql1 ,  (req,res)=>{
//         if(err) throw err
//         var sql2 = `delete from table_create_auction where id=${id}`
//         db.query(sql2 , (err,result)=>{
//             if(err) throw err
//             var sql3 = `insert into table_cart set ?`
//             db.query(sql3 , req.body , (err,result)=>{
//                 if(err) throw err
//                 res.send('Added To Cart')
//             })
//         })
//     })
// })
