const express = require('express')
const router = express.Router()
const {loginControler} = require('../Controlers')
const {userLogin,userKeepLogin,getUserByUsername} = loginControler

router.get('/userLogin' , userLogin)
router.get('/userKeepLogin' , userKeepLogin)
router.get('/getUserByUsername' , getUserByUsername)

module.exports = router
