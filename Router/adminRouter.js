const express = require('express')
const router = express.Router()
const {adminControler} = require('../Controlers')
const {getMyCategory,editCategory,deleteCategory,addCategory} = adminControler

router.get('/getMyCategory' , getMyCategory)
router.put('/editCategory' , editCategory)
router.delete('/deleteCategory' , deleteCategory)
router.post('/addCategory' , addCategory)

module.exports = router