const passport = require('passport');
const LocalStrartegy = require('passport-local').Strategy;
const User = require('../models/users');


passport.use(new LocalStrartegy({
    usernameField: 'email'
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log("error in finding user in passport", err);
                return;
            }

            if (!user || user.password != password) {
                console.log("invalid username/password");
                return done(null, false);
            }

            return done(null, user);
        })
    }));


passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("errorrrr");
            return;
        }
        return done(null, user);
    })
});


passport.checkauthentication = function (req, res, next) {
    if (req.isAuthenticated) {
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated) {
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;