const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
            user:'davidlohanda8@gmail.com',
            pass:'jgtfhwzgjqbwysmw'
        }
    ,
    tls:{
        rejectUnauthorized : false
    }
})

module.exports = transporter