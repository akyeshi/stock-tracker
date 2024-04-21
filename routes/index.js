const express = require("express");
const router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Stocks Tracker" });
});

// -------- define routes for authentication --------

// login route (Google OAuth login route)
// passport.authenticate() method will return a middleware function that does the coordinating with Google’s OAuth server
router.get(
  "/auth/google",
  passport.authenticate(
    // which passport strategy is being used
    "google",
    {
      // requesting the user's profile and email
      scope: ["profile", "email"],
      // optionally force pick account every time
      // prompt: "<select_account>""
    }
  )
);

// callback route (Google OAuth callback route)
// callback route (redirect after successful or unsuccessful login)
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

// logout route (Google OAuth logout route)
router.get("/logout", function (req, res) {
  // logout() method is automatically added to the 'req' object by Passport
  req.logout(function () {
    res.redirect("/");
  });
});

module.exports = router;
