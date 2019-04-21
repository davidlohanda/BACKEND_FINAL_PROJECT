const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
            user:'davidlohanda8@gmail.com',
            pass:'fcxbgyxgloczvbnk'
        }
    ,
    tls:{
        rejectUnauthorized : false
    }
})

module.exports = transporter