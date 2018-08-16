const express = require('express');
const mongoose = require('mongoose');
//const passportConfig = require('./config/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


// console.log(mongoose.connect(keys.mongoURI));
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

// each app.use is a middleware can be used to modify incoming 
//                       req before sent off to route handlers
// each of three middl. bellow intercept the request individually
app.use(
    cookieSession({   // cookie session ever encrypts cookie of session value before express send  to browse
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]   // a array here permit to specify more keys
    })
);
app.use(passport.initialize());
app.use(passport.session());

//const authRoutes = require('./routes/authRoutes');
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
/* app.get('/', (req, res) => {
    res.send({ by: 'buddy' });
}); */

const PORT = process.env.PORT || 5000;
// const PORT = 5000;
app.listen(PORT);