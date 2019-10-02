module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user;
    res.cookie('token', req.session.user.token);
    return next();
  } else {
    return res.redirect('/');
  }
};
