const Post = require('../models/posts');
const User = require('../models/users');

module.exports.home = function (req, res) {
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function (err,post) {
        User.find({}, function (err,users){
            return res.render('home', {
            posts: post,
            users_list: users
        })
        })
    })
}
//! populating 
// module.exports.home = function (req, res) {
//     Post.find({}).populate('user').populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     }).exec(function (err, post) {
//         if (err) {
//             console.log("error in finding post", err);
//             return;
//         }
//         return res.render('home', {
//             posts: post,
//         })
//     })
// }
//! by pouplating u means e=means going one step inside of user we can ascess its properties
// module.exports.home = function (req, res) {
//     Post.find({}).populate('user').exec(function (err, post) {
//         if (err) {
//             console.log("error in finding post", err);
//             return;
//         }
//         return res.render('home', {
//             posts: post,
//         })
//     })
// }
//! by this we get only the user id
// module.exports.home = function (req, res) {
//     Post.find({}, function (err, post) {
//         if (err) {
//             console.log("error in finding post", err);
//             return;
//         }
//         return res.render('home', {
//             posts: post,
//         })
//     })
// }