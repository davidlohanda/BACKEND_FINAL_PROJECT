var mysql = require('mysql')
//connect to database
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'database_user',
    port : 3306
})

module.exports = db