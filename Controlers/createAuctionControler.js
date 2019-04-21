const db = require('../Database')
const fs = require('fs')

module.exports = {
    createAuction : (req,res)=>{
        try{
            console.log(req.file)
            if(req.validation) throw req.validation
            if(req.file.size > 5000000) throw {error : true , msg : 'Image too large'}
            console.log(req.body.product)
    
            var newData = JSON.parse(req.body.product)
            newData.product_image = req.file.path
            var sql = 'insert into table_create_auction set ?'
            db.query(sql,newData, (err,result) => {
                if(err) throw err
                res.send('sukses')
            })
        }catch(err){
            res.send(err)
        }
    }
    ,

    getAllCreateAuction : (req,res) => {
        var sql = `select * from table_create_auction;`
        db.query(sql , (err,result) => {
            if(err) throw err
            res.send(result)
        })
    }
    ,

    getCreateAuctionByUsername : (req,res) => {
        var sql = `select * from table_create_auction where owner='${req.query.owner}';`
        db.query(sql , (err,result)=>{
            console.log(result)
            if(err) throw err
            res.send(result)
        })
    }
    ,

    editCreateAuction : (req,res) => {
        if(req.file){
            console.log(req.file.path)
            console.log(req.body.imageBefore)

            var data = JSON.parse(req.body.editAuction)
            var fileImg = req.file.path
            var fileImgArr = fileImg.split('')
            var str=''
            for(let i = 0 ; i < fileImgArr.length ; i++){
                if(i == 6){
                    str += (fileImgArr[i] + '//')
                }else{
                    str += fileImgArr[i]
                }
            }
            data.product_image = str
            var sql1 = `update table_create_auction set 
                        product_name = '${data.product_name}',
                        product_price = ${data.product_price},
                        add_price = ${data.add_price},
                        product_desc = '${data.product_desc}',
                        product_image = '${data.product_image}'
                        where id = ${req.query.id};
                        `
            db.query(sql1 , (err,result) => {
                if(err) throw err
                res.send('Edit Success')
                fs.unlinkSync(req.body.imageBefore)
            })
        }else{
            var sql2 = `update table_create_auction set 
                        product_name = '${req.body.product_name}',
                        product_price = ${req.body.product_price},
                        add_price = ${req.body.add_price},
                        product_desc = '${req.body.product_desc}'
                        where id = ${req.query.id};
                        `
            db.query(sql2 , (err,result) => {
                if(err) throw err
                res.send('Edit Success')
            })
        }
    }
    ,

    deleteCreateAuction : (req,res) => {
        var sql = `delete from table_create_auction where id=${req.query.id}`
        db.query(sql , (err,result) => {
            if(err) throw err
            res.send('Delete Success')
            fs.unlinkSync(req.query.imageBefore)
        })
    }
    ,
    
    getCreateAuctionByCategory : (req,res) => {
        var sql = `select * from table_create_auction where category=${req.query.category}`
        db.query(sql , (err,result) => {
            if(err) throw err
            res.send(result)
        })
    }
    ,

    getTodayAuction : (req,res) => {
        var today = new Date()
        var date = today.getDate()
        var month = today.getMonth()+1
        var sql = `select * from table_create_auction where create_time = '${date}/${month}'`
        db.query(sql , (err,result) => {
            if(err) throw err
            res.send(result)
        })
    }
    ,

    getAllUserAuction : (req,res) => {
        var sql =`select a.id,owner,product_name,product_price,duration,c.category,product_image from table_create_auction a
        join table_category c on a.category = c.id;`

        db.query(sql , (err,result) => {
            if(err) throw err
            res.send(result)
        })
    }
}