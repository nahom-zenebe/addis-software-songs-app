const express=require('express')
const router = express.Router();
const controller = require("../controller/songController");



router.get('/',controller.getSongs)
router.post('/',controller.createSongs)
router.delete('/:id',controller.deleteSong)
router.put('/:id',controller.updateSongs)



module.exports=router