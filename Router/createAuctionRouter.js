const express = require('express')
const router = express.Router()
const {createAuctionControler} = require('../Controlers')
const {createAuction,getAllCreateAuction,getCreateAuctionByUsername,editCreateAuction,deleteCreateAuction} = createAuctionControler
const upload = require('../Helper/uploader')

router.post('/createAuction' , upload.single('img') , createAuction)
router.get('/getAllCreateAuction' , getAllCreateAuction)
router.get('/getCreateAuctionByUsername' , getCreateAuctionByUsername)
router.put('/editCreateAuction' , upload.single('editImg') , editCreateAuction)
router.delete('/deleteCreateAuction' , deleteCreateAuction)

module.exports = router
