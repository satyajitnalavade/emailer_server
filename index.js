const express = require('express');
const cookieSession = require('cookie-session');

const mongoose = require('mongoose');
const passport = require('passport');
const secrets = require('./config/secret');
require('./models/User');
require('./services/passport');

const uri = secrets.mongoURI;
mongoose.connect(uri);

const app = express();

app.use(cookieSession({
    cookieName: 'session',
    keys: [secrets.cookieSecret],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }));
  app.use(passport.initialize());
  app.use(passport.session());

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000; 
app.listen(PORT);
