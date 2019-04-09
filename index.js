var express = require('express')
var app = express()
//================================================================================
var bodyParser = require('body-parser')
app.use(bodyParser.json())
//================================================================================
var cors = require('cors')
app.use(cors())
//================================================================================
const port = 2000
app.listen(port , ()=>console.log(`Berjalan di port ${port}`))
//================================================================================
//Tes API
app.get('/' , (req,res)=>{
    res.send('<h1>Selamat datang di API User</h1>')
})
// UNTUK MEMBUAT FOLDER UPLOAD BISA DIAKSES PUBLIC
app.use('/uploads',express.static('uploads'))
//================================================================================
const {registerAuthRouter,loginRouter,createAuctionRouter} = require('./Router')
//Register
app.use('/auth' , registerAuthRouter)
//Login
app.use('/login' , loginRouter)
//Create Auction
app.use('/auction' , createAuctionRouter)