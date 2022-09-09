const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const secrets = require('../config/secret');

const User = mongoose.model('users');

passport.use(new GoogleStrategy({
    clientID: secrets.googleClientID,
    clientSecret: secrets.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy:true
  },
  async(request,accessToken, refreshToken, profile, cb)=> {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser){
      return cb(null, existingUser);
    }
    const user = await new User({ googleId: profile.id }).save();
    cb(null, user);
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