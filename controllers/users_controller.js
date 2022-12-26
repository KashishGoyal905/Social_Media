const User = require('../models/users');

// for removing the file avatar
const path = require('path');
const fs = require('fs');

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
            req.flash('error', "error in creating user");
            return;
        }
        req.flash('success', "Acoount created successfully");
        return res.redirect('/users/sign-in');
    })
};

module.exports.createSession = function (req, res) {
    // it will set msg to req.flash() function.
    req.flash('success', "Logged in successfully");
    return res.redirect('/');
}

module.exports.signOut = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', "Logged out successfully");
        res.redirect('/');
    });
}


// uploading file using multer
module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try {
            // finding the user of which we need to update the details.
            let user = await User.findById(req.params.id);
            // funciton from user schema
            // multer provides 2 things with req--> for params req.body like we have before n=but now they are via multer as our parser is not able to parse multipart data.
            // ans one is req,file-> wholde detail about file which is uploaded.
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log("multer error in uploading the avatar");
                    return;
                }
                // updating
                user.username = req.body.username;
                user.email = req.body.email;
                if (req.file) {
                    // if user alread had an avatar and and that file exists in our system
                    if (user.avatar && fs.existsSync(path.join(__dirname, "..", user.avatar))) {
                        fs.unlinkSync(path.join(__dirname, "..", user.avatar));
                    }

                    // setting the path of avatar inside schema
                    user.avatar = User.avatarPath + "/" + req.file.filename;
                }
                user.save();
                return res.redirect('/');
            })
        } catch (err) {
            req.flash('error', "error in updating the user");
            console.log(err);
            return;
        }
    } else {
        return re.status(401).send("unauthorize");
    }
}
// module.exports.update = function (req, res) {
//     if (req.user.id == req.params.id) {
//         User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
//             req.flash('success', "Data updated successfully");
//             return res.redirect('/');
//         })
//     } else {
//         return re.status(401).send("unauthorize");
//     }
// }