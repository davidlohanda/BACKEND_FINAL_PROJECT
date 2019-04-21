const express = require('express')
const router = express.Router()
const {bidderControler} = require('../Controlers')
const {makeABid,getWinner,addToCart,getCart,getAllCart} = bidderControler

router.put('/makeABid/:id' , makeABid)
router.get('/winner/:id' , getWinner)
router.post('/addtocart' , addToCart)
router.get('/getcart/:username' , getCart)
router.get('/ourwinner' , getAllCart)

module.exports = router