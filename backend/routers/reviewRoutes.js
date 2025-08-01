const express = require("express");
const { createReview,getReviews,deleteReview} = require("../controller/reviewController");

const router = express.Router();

router.post("/ createReview",  createReview);


router.post("/getReviews", getReviews);


router.post("/deleteReview", deleteReview);

module.exports = router;
