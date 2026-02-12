if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
require("dotenv").config();}
console.log(process.env.SECRET);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
const methodOverride = require("method-override");
const ExpressError=require("./utils/ExpressError.js");
const listingRoutes = require("./routes/listing.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dburl = process.env.ATLAS_URL;


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("error connecting to DB", err);
  });

async function main() {
  await mongoose.connect(dburl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);

app.use("/listings", listingRoutes);


  //index route to show all listings

 
  const store = MongoStore.create ({
    mongoUrl: dburl,
    crypto: { 
      secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
  })  ;
store.on("error",() => {
  console.log("ERROR in MONGO SESSION STORE",err);
});

 const sessionOptions = {
  store,
    secret:"mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,

    },
  };


  app.get("/listings", wrapAsyncasync (req, res) => {
  let listings = await Listing.find({});
  console.log("Listings from database:", listings);
  res.send(listings);
});

  app.use(session(sessionOptions));
  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session);
  passport.use(new LocalStratergy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  

app.use((req,res,next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();

}
);

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Error handling middleware

app.use((err, req, res, next) => {
 let { statusCode=500, message="Something went wrong!" } = err;
 res.status(statusCode).render("error.ejs", { err });

});

// Start the server
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/listings to see your data`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

