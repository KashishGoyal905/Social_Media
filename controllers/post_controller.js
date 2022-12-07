const Post = require('../models/posts');
const Comment = require('../models/comments');

// action: create a post
module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id,
    }, function (err, post) {
        if (err) {
            req.flash('error', "error in creating post");
            return;
        }
        req.flash('success', "Post created successfully");
        return res.redirect('/');
    })
};

// action: delete a post
module.exports.destroy = async function (req, res) {
    // finding the post
    let post = await Post.findById(req.params.id);
    // auth check see in comments
    if (post.user == req.user.id) {
        post.remove();
        // deleteing all the comments related to this post
        await Comment.deleteMany({ post: req.params.id });
        req.flash('success', "Post deleted successfully");
        return res.redirect('/');
    } else {
        req.flash('error', "you can not delete this post");
        return res.redirect('/');
    }
}

