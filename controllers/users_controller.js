const User = require('../models/users');
// action: show user profile
module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log("error in finding the user: ");
            return;
        }
        return res.render('profile', {
            user_profile: user,
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
    return res.redirect('/');
}

module.exports.signOut = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            return res.redirect('/');
        })
    } else {
        return re.status(401).send("unauthorize");
    }
}