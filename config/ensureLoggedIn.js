// middleware for routes that requires a logged in user
module.exports = function (req, res, next) {
  // pass the req/res to the next middleware/route handler
  if (req.isAuthenticated()) return next();
  // redirect to login if the user is not already logged in
  res.redirect("/auth/google");
};
