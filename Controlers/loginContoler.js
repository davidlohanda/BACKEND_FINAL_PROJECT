const db = require('../Database')
const cryp = require('crypto')

module.exports = {
    userLogin : (req,res) => {
        var passwordHash = cryp.createHmac('sha256' , 'secretPass').update(req.query.password).digest('hex')
        var sql = `select * from table_user where username='${req.query.username}' and password='${passwordHash}'`
        db.query(sql , (err,result)=>{
            try{
                if(err) throw err
                res.send(result)
            }catch(err){
                res.send(err)
            }
            
        })
    }
    ,

    userKeepLogin : (req,res)=>{
        var sql = `select * from table_user where username= '${req.query.username}'`
        db.query(sql , (err,result)=>{
            if(err) throw err
            res.send(result)
        })
    }
    ,

    getUserByUsername : (req,res)=>{
        var sql = `select * from table_user where username= '${req.query.username}'`
        db.query(sql , (err,result)=>{
            if(err) throw err
            res.send(result)
        })
    }
}