const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("./schema.js");
const reviewController = require("../controllers/review.js");

//review route
//post route to add a review to a listing
router.post("/",isLoggedIn,
  validateReview wrapAsync(reviewController.createReview));

//delete route to delete a review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;