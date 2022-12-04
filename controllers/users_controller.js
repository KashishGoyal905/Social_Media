const User = require('../models/users');
// action: show user profile
module.exports.profile = function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log("error in finding the user: ");
            return;
        }
        return res.render('profile', {
            users_list: users,
        })
    })
}


module.exports.signIn = function (req, res) {
    return res.render('sign_in');
}


module.exports.signUp = function (req, res) {
    return res.render('sign_up');
}

// action: user create
module.exports.create = function (req, res) {
    User.create(req.body, function (err, user) {
        if (err) {
            console.log("error in creating the user: ");
            return;
        }
        return res.redirect('/users/sign-in');
    })
};

module.exports.createSession = function (req, res) {
    return res.redirect('/users/profile');
}

module.exports.signOut = function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}
