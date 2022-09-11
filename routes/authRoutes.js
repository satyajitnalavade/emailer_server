const passport = require('passport')

module.exports = (app) => {
    
    function isLoggedIn(req,res,next) {
        req.user ? next() : res.sendStatus(401);
    }


    app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

    app.get('/auth/google/callback', 
    passport.authenticate('google', { scope: ['profile','email'], failureRedirect: '/auth/failure' }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api/current_user');
    });

    app.get('/', (req,res) => {
        res.send('<a href="/auth/google">Authenticate with Google</a>');
    });


    app.get('/auth/failure', (req,res) => {
        res.send('something went wrong.......');
    });


    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
      });
    

    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
    });
};