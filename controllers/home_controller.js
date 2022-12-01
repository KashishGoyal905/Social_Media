const Post = require('../models/posts');

//! by pouplating u means e=means going one step inside of user we can ascess its properties
module.exports.home = function (req, res) {
    Post.find({}).populate('user').exec(function (err, post) {
        if (err) {
            console.log("error in finding post", err);
            return;
        }
        return res.render('home', {
            posts: post,
        }) 
    })
}
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