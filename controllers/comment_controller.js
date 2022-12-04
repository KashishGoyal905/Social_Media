const Comment = require('../models/comments');
const Post = require('../models/posts');

// action for creting comment
module.exports.create = function (req, res) {
    // finding if post exist on which user wants to comment
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
                // pushing comment id to the post comments array
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    })
};

// action: delete a comment
module.exports.destroy = function (req, res) {
    // finding comment which user wants to delte
    Comment.findById(req.params.id, function (err, comment) {
        // .id == ._id mongodb do this for us
        // auth check that user who wants to delete and the user who created comment are same or not
        if (comment.user == req.user.id) {
            // fetching post id from that comment
            let post_id = comment.post;

            comment.remove();
            // deleting that comment id form the post array of comments
            Post.findByIdAndUpdate(post_id, { $pull: { comment: req.params.id } }, function (err) {
                return res.redirect('/');
            });
        } else {
            return res.redirect('/');
        }
    });
}