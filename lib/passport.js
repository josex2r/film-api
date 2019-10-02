const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

function initPassport(lib) {
  lib.serializeUser((user, done) => {
    done(null, user);
  });

  lib.deserializeUser((user, done) => {
    done(null, user);
  });

  lib.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  }, (token, refreshToken, profile, done) => {
    return done(null, {
      profile: profile,
      token: token
    });
  }));

  return lib;
};

module.exports = initPassport(passport);
