const express = require('express')
const router = express.Router()
const {bidderControler} = require('../Controlers')
const {makeABid} = bidderControler

router.put('/makeABid/:id' , makeABid)

module.exports = router