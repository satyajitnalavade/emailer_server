const passport = require('passport')

module.exports = (app) => {
    
    app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
          res.redirect('/api/current_user');
        }
      );
    

    app.get('/auth/failure', (req,res) => {
        res.send('something went wrong.......');
    });


    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
    });
};