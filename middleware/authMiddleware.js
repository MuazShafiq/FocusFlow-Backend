const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login"); // Redirect to login or handle unauthorized access
  };
  
  module.exports = { ensureAuthenticated };