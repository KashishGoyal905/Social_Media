const express = require('express');
const port = 8000;
// for flash messages
const flash = require('connect-flash');
const app = express();
// middleware for custom flash msgs
const customMsg = require('./config/middleware');

// for multer: image route
app.use('/users/profile/uploads', express.static(__dirname + '/uploads'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets'));
app.use(express.urlencoded());
const db = require('./config/mongoose');


const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const MongoStore = require('connect-mongo');

app.use(session({
    name: 'codieal',
    secret: 'hehehe',
    resave: false,
    saveUninitialized: false,
    cokkie: {
        maxAge: (300 * 1000 * 18)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/Auth',
            dbName: 'db'
        },
        function (err) {
            console.log(err || 'connect-mongo done');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// it will aloow every req to have a req.flash() function.
app.use(flash());
// it will set the msg to res of a every req;
app.use(customMsg.flash);
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log("error in running server");
        return;
    }
    console.log("server listening on port " + port);
});
