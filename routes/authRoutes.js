const passport = require('passport');

module.exports = app => {
            // express o tipo de chamada .get (request type) para a porta auth/google
            // geral/e 2o arg é uma arrow func que é executada sempre que esta cham acontece
            // aqui dizemos ao Express que envolve o passpart q. da inicio ao wflow de auth
            // 'google' é o param que indica a estratégia que é definida no passport
            // scope é o array que diz quais infos deseja da cta la no google
    app.get(
        '/auth/google',
        passport.authenticate('google', {   // o param 'google' é o GoogleStrategy instaciado
            scope: ['profile', 'email']
        })
    );
 
                                    // this callback -passport.authenticate('google')-
                                    // is actually a middleware
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),  // o param 'google' é o GoogleStrategy instaciado
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