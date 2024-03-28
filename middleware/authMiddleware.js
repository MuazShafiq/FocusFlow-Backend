const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('User is authenticated');
    return next();
  }

  console.log('User is not authenticated');
  res.status(401).json({ error: 'Unauthorized' });
};

module.exports = { ensureAuthenticated };