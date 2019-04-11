const db = require('../Database')

module.exports = {
    makeABid : (req,res) => {

        var sql1 = `update table_create_auction set 
                    product_price = ${req.body.new_product_price}
                    where id = ${req.params.id};`
        
        db.query(sql1 , (err,result) => {
            var dataBidder = {
                user_id : req.body.user_id,
                product_id : req.body.product_id,
                bid_price : req.body.new_product_price
            }
            if(err) throw err
            var sql2 = 'insert into table_bidder set ?'
            db.query(sql2 , dataBidder , (err,result2) => {
                if(err) throw err
                res.send('Bid Success')
            })
        })
    }
}