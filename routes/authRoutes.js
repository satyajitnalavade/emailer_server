const passport = require('passport')

module.exports = (app) => {
    
    app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

    app.get('/auth/google/callback', 
    passport.authenticate('google', { scope: ['profile','email'], failureRedirect: '/auth/failure' }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/surveys');
    });

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