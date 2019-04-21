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
    ,

    getWinner : (req,res) => {
        var sql = `select * from winner where product_id = ${req.params.id}`
        db.query(sql , (err,result) => {
            if(err) throw err
            res.send(result)
        })
    }
    ,

    addToCart : (req,res) => {
        var data = {
            user_id : req.body.user_id,
            product_id : req.body.product_id,
            bid_price : req.body.bid_price,
            product_name : req.body.product_name
        }
        var sql = `insert into table_cart set ?`
        db.query(sql , data ,  (err,result) => {
            if(err) throw err
            res.send(result)
        })
    }
    ,

    getCart : (req,res) => {
        var sql = `select user_id, u.username,product_id,product_name,bid_price from table_cart
        join table_user u on user_id = u.id
        where username = '${req.params.username}';`
        db.query(sql , (err,result) => {
            if(err) throw err
            res.send(result)
        })  
    },

    getAllCart : (req,res) => {
        var sql = `select user_id, u.username,product_id,product_name,bid_price from table_cart
        join table_user u on user_id = u.id;`
        db.query(sql , (err,result) => {
            if(err) throw err
            res.send(result)
        })
    }
}