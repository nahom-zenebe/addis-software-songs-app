const express = require("express");
const {createAlbum, getAlbums,getAlbumById,updateAlbum,deleteAlbum} = require("../controller/Albummodel");

const router = express.Router();

router.post("/ createReview",  createAlbum);
router.delete("/deleteAlbum/:id",deleteAlbum)

router.post("/getReviews", getAlbums);

router.post("/updateAlbum", updateAlbum);
router.post("/getAlbumById/:id", getAlbumById);

module.exports = router;
