const express=require('express')
const router = express.Router();
const controller = require("../controller/songController");



router.get('/getsongs',controller.getSongs)
router.post('/createsongs',controller.createSongs)
router.delete('/deletesongs',controller.deleteSong)
router.put('/updatesongs',controller.updateSongs)



module.exports=router