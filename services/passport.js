const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Keys = require('../config/keys.js');

//-> mongoose.model com um argumento lê a collection of the database
const User = mongoose.model('users');

passport.serializeUser((user, done) => { 
    done(null, user.id);  // user.id mongo ObjectId 
});
                        
passport.deserializeUser((id, done) => {   // this id is a profile.id
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
    // proxy resolves the return of google Strategy ...or put above 
    // the entire address like https://localhost:5000/auth/google
    // probably use a key for dev and prod ... or use "proxy:" like bellow

    }, 
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