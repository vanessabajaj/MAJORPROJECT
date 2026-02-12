const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:String,
    image: {
       url: String,
       filename: String,
    },
    price:Number,
    location:String,
    country: String, 
    Reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ], 
    owner:{
        type:Schema.Types.ObjectID,
        ref:"user",
    },
});

listingSchema.post("findOneAndDelete", async (listings) => {
    if(listings){   
    await Review.deleteMany({reviews : { $in: listings.reviews } });    
    }
    }   

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;