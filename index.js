const express = require('express');
const mongoose = require('mongoose');
//const passportConfig = require('./config/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');


/* ---> begin of push server
const server = require("http").Server(express);
const io = require('socket.io')(server);

io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
      console.log('client is subscribing to timer with interval ', interval);
      setInterval(() => {
        client.emit('timer', new Date());
      }, interval);
    });
  });

const port1 = 8000;
io.listen(port1);
console.log('listening on port ', port1);
 ---> end of push server */

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
require('./routes/surveyRoutes')(app);
/* app.get('/', (req, res) => {
    res.send({ by: 'buddy' });
}); */

// rodar client com Express na prod "Routing in Production"
// lembrar que o heroku substitui esta var de ambiente
if (process.env.NODE_ENV === 'production') {
    // Express serve os recursos de producao como client/build/static/js/main.js e css
    app.use(express.static('client/build'));

    // Express serve index.html se nao reconhece a rotas nas passagens antes deste if
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
// const PORT = 5000;
app.listen(PORT);