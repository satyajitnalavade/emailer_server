const express = require('express');
const cookieSession = require('cookie-session');

const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const secrets = require('./config/secret');

require('./models/User');
require('./services/passport');

const uri = secrets.mongoURI;
mongoose.connect(uri);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [secrets.cookieSecret]
  })
);
  app.use(passport.initialize());
  app.use(passport.session());

  require('./routes/authRoutes')(app);
  require('./routes/billingRoutes')(app);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'));
    });

  }

const PORT = process.env.PORT || 5000; 
app.listen(PORT);
