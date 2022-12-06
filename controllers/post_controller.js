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
        return res.redirect('/');
    } else {
        return res.redirect('/');
    }
}

