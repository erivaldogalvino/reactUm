const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Keys = require('../config/keys.js');

//-> mongoose.model com um argumento lê a collection of the database
const User = mongoose.model('users');

              // done = func que serializa e des-serializa
passport.serializeUser((user, done) => { 
    done(null, user.id);  // user.id mongo ObjectId 
});
                        
passport.deserializeUser((id, done) => {   // Este id é o profile.id
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
    clientID: Keys.googleClientID, 
    clientSecret: Keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    // proxy resolveo retornodo google Strategy ... ou coloque acima 
    // o endereço completo como https://localhost:5000/auth/google
    // provavelmente usando uma chave pra dev e prod ...
    // ou use "proxy:" como acima

    }, 
         // como 2o param 
        // para testar ret---> accessToken { console.log(accessToken) / refreshToken e profile }; 
        // se chegou aqui é pq o passport ja negociou com o google (reenviou o cod) e este retorna o profile
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
               return done(null, existingUser);
            } 
            
            const user = await new User({ googleId: profile.id }).save();  // .save commit it
            done(null, user);
        }
    )
);
            // You even can use this way
            // if (existingUser) {
            //     return done(null, existingUser);
            // }
            // const user = await new User({ googleId: profile.id }).save()   // .save commit it
            // done(null, user);
            // }   

/*
       console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile:', profile);
*/        