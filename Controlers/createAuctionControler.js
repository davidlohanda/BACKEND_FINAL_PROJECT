const db = require('../Database')

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

}