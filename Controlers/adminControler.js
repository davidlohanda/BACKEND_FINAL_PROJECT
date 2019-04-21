const db = require('../Database')

module.exports = {
    getMyCategory : (req,res) => {
        var sql = `select * from table_category;`
        db.query(sql , (err,result) => {
            if(err) throw err
            res.send(result)
        })
    }
    ,

    editCategory : (req,res) => {
        console.log(req.body)
        var editData = req.body
        var sql = `update table_category set ? where id=${req.query.id}`
        db.query(sql , editData , (err,result) => {
            if(err) throw err
            res.send('Update Category Success')
        })
    }
    ,

    deleteCategory : (req,res) => {
        var sql = `delete from table_category where id=${req.query.id}`
        db.query(sql , (err,result) => {
            if(err) throw err
            res.send('Delete Category Success')
        })
    }
    ,

    addCategory : (req,res) => {
        var newCategory = req.body
        var sql = 'insert into table_category set ?'
        db.query(sql , newCategory , (err,result) => {
            if(err) throw err
            res.send('Add Category Success')
        })
    }
}