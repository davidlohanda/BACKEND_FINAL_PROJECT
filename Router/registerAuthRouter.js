const express = require('express')
const router = express.Router()
const {registerAuthControler} = require('../Controlers')
const {register , userVerification} = registerAuthControler

router.post('/userRegister' , register)
router.get('/userVerification' , userVerification)

module.exports = router