const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.params.id,
            }, function (err, comment) {
                if (err) {
                    console.log("error in creating comment");
                    return;
                }
                console.log(comment);
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    })
}