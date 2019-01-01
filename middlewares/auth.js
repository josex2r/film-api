module.exports = (req, res, next) => {
  if (req.session && req.session.passport) {
    res.locals.passport = req.session.passport;
    res.cookie('token', req.session.passport.token);
    return next();
  } else {
    res.cookie('token', '');
    return res.redirect('/');
  }
};
