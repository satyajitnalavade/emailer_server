const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const secrets = require('../config/secret');

const User = mongoose.model('users');

passport.use(new GoogleStrategy({
    clientID: secrets.googleClientID,
    clientSecret: secrets.googleClientSecret,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  },
  function(request,accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    })
  }
));

passport.serializeUser((user,cb)=> { 
  cb(null,user.id);
});

passport.deserializeUser((id,cb)=> { 
  User.findById(id).then(user => {
    cb(null,user);
  });
  
});