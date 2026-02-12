const User = require("../models/user");

module.exports.renderSignupForm= (req,res) =>{
  res.render("user/signup.ejs")
};
  

module.exports.signup = async(req,res) => {
 try {
  let {username,email,password} = req.body;
 const newUser = new User({email,username});
 User.register(newUser, password);
 const registeredUser = await.User.register(newUser);
 console.log(registeredUser);
 req.login(registeredUser,(err)=>{
  if(err) {
  return next(err);
  }
  req.flash("success","Welcome to Wanderlust!");
 res.redirect("/listings");
  });
 } catch(e) {
 req.flash("error",e.message);
 res.redirect("/signup");  
 }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("user/login.ejs");
};

module.exports.login = async (req,res) =>{
   res.flash("success","welcome back to wanderlust! you are logged in!");
   let redirectUrl = res.locals.redirectUrl || "/listings";
   res.redirect(redirectUrl);
};


module.exports.logout = (req,res) => {
    req.logout((err)=> {
        if(err) {
            return next(err);
        }
        req.flash('success','you are logged out now !');
        res.redirect("/listings");
})};