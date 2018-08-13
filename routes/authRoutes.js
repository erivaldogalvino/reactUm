const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
 
                                    // this callback -passport.authenticate('google')-
                                    // is actually a middleware
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) =>{
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();  // passaport automatically attaches this
        res.redirect('/');
        //res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);     // passaport automatically attaches this req
        // res.send(req.session); ---> //display value of cookie in session
    });
};