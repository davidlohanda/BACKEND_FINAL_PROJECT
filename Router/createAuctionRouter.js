const express = require('express')
const router = express.Router()
const {createAuctionControler} = require('../Controlers')
const {getCreateAuctionByCategory,createAuction,getAllCreateAuction,getCreateAuctionByUsername,editCreateAuction,deleteCreateAuction,getTodayAuction,getAllUserAuction} = createAuctionControler
const upload = require('../Helper/uploader')

router.get('/getCreateAuctionByCategory' , getCreateAuctionByCategory)
router.post('/createAuction' , upload.single('img') , createAuction)
router.get('/getAllCreateAuction' , getAllCreateAuction)
router.get('/getCreateAuctionByUsername' , getCreateAuctionByUsername)
router.put('/editCreateAuction' , upload.single('editImg') , editCreateAuction)
router.delete('/deleteCreateAuction' , deleteCreateAuction)
router.get('/todayAuction', getTodayAuction)
router.get('/userAuction' , getAllUserAuction)
module.exports = router
