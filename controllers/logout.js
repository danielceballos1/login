
const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

const logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err)
        console.log("Error : Failed to destroy the session during logout.", err);
      req.user = null;
      res.redirect("/");
    });
  };

  module.exports = {
    logout
  }