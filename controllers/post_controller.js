const Post = require('../models/posts');
const Comment = require('../models/comments');

// action: create a post
module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id,
    }, function (err, post) {
        if (err) {
            console.log("error in creating post");
            return;
        }
        console.log(post);
        return res.redirect('/');
    })
};

// action: delete a post
module.exports.destroy = function (req, res) {
    // finding the post
    Post.findById(req.params.id, function (err, post) {
        // auth check see in comments
        if (post.user == req.user.id) {
            post.remove();
            // deleteing all the comments related to this post
            Comment.deleteMany({ post: req.params.id }, function (err) {
                return res.redirect('/');
            });
        } else {
            return res.redirect('/');
        }
    })
}

