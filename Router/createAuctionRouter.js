const express = require('express')
const router = express.Router()
const {createAuctionControler} = require('../Controlers')
const {createAuction,getAllCreateAuction,getCreateAuctionByUsername} = createAuctionControler
const upload = require('../Helper/uploader')

router.post('/createAuction' , upload.single('img') , createAuction)
router.get('/getAllCreateAuction' , getAllCreateAuction)
router.get('/getCreateAuctionByUsername' , getCreateAuctionByUsername)

module.exports = router
