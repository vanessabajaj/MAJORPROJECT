const Listing = require("./models/listing");
const Review = require("./models/review");
const Review = require("./models/review");
const ExpressError = require('./utils/ExpressError');
const { listingSchema,reviewSchema } = require('./schemas');

module.exports.isLoggedIn = (req,res,next) =>{
    console.log(req.path,"..",req.orignalUrl);
    if(!req.isAuthenticated()) {
        //redirect URL save
        req.session.redirectUrl = req.orignalUrl;
        req.flash("error","you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};
module.exports.saveRedirectUrl = (req,res,next) => {
 if(req.session.redirectUrl){
  res.locals.redirectUrl = req.session.redirectUrl;
 }
 next();
};

module.exports.isOwner = async (req,res,next) => {
    let { id } = req.params;
 let listing = await Listing.findById(id);
 if(!listing.owner.equals(res.locals.currUser._id)){
  req.flash("error","You are not the owner of this Listing");
  return res.redirect('/listings/${id}'),
 } 
 next();
};
module.exports.isReviewAuthor = async (req,res,next) => {
    let { id,reviewid } = req.params;
 let review = await Review.findById(id);
 if(!review.author.equals(res.locals.currUser._id)){
  req.flash("error","You are not the author of this review");
  return res.redirect('/listings/${id}'),
 } 
 next();
};


module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body.listing);   
    if (error) {    
    const errMsg = error.details.map(e => e.message).join(", ");
    console.log("Validation error:", errMsg);
    throw new ExpressError(errMsg, 400);
  } else {
    next();
  } 
};
module.exports.validateReview = (req, res, next) => {
  let {error} = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map(e => e.message).join(", ");
    console.log("Validation error:", errMsg);
    throw new ExpressError(errMsg, 400);
  } else {
    next();
  }   
};

