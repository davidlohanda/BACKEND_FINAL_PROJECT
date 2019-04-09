const db = require('../Database')
const transporter = require('../Helper/nodemailer')
const verify = require('../Helper/verify')
const cryp = require('crypto')

module.exports = {
    register : (req,res) => {
    
            var data = req.body
            data.verified = 'false'
            var sql1 = `select * from table_user where username = '${data.username}'`
            db.query(sql1 , (err,result) => {
            try{
                if(err) throw err
                if(result.length > 0) throw 'Username not available'
                
                var hashPassword = cryp.createHmac('sha256' , 'secretPass').update(data.password).digest('hex')
                data.password = hashPassword
                var sql2 = `insert into table_user set ?`
                db.query(sql2 , data , (err,result) => {
                    if(err) throw err
                    var mailOptions = verify(data.username,data.email)
                    transporter.sendMail(mailOptions , (err,resultEnd) => {
                        if(err) throw err
                        res.send('Registration Success')
                    })
                })
            }catch(err){
                res.send(err)
            }
            })
    },

    userVerification : (req,res)=>{
        var sql = `update table_user set verified = 'true' where username='${req.query.username}'` 
        db.query(sql , (err,result)=>{
            if(err) throw err
            res.send('Verification Success')
        })
    }
}
