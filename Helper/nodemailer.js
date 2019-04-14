const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
            user:'davidlohanda8@gmail.com',
            pass:'dbgiqomtvcoblzas'
        }
    ,
    tls:{
        rejectUnauthorized : false
    }
})

module.exports = transporter