const validator = require('validator')
const passport = require('passport')
const User = require("../models/User");



const getLogin = (req,res) => {
    res.render('login')
}

// const getLogin = (req, res) => {
//     console.log(req.user)
//     if (req.user) {
//       return res.redirect("/profile");
//     }
//     res.render("login", {
//       title: "Login",
//     });
//   };
const postLogin = (req, res, next) => {
    console.log(req.body)
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.password))
      validationErrors.push({ msg: "Password cannot be blank." });
  
    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("/login");
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });
  
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash("errors", info);
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", { msg: "Success! You are logged in." });
        res.redirect(req.session.returnTo || "/profile");
      });
    })(req, res, next);
  };
  
module.exports = {
    getLogin,
    postLogin
}