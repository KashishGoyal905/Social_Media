const Comment = require('../models/comments');
const Post = require('../models/posts');

// action for creating comments
module.exports.create = async function (req, res) {
    try {
        // finding if post exist on which user wants to comment
        let post = await Post.findById(req.params.id);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.params.id,
            });
            // pushing comment id to the post comments array
            console.log(post.comments);
            post.comments.push(comment);
            post.save();
            req.flash('success', "Comment created successfully");
            res.redirect('/');
        }
    } catch (err) {
        if (err) {
            req.flash('error', "error in creating comment");
            return;
        }
    }

};

// // action for creting comment
// module.exports.create = function (req, res) {
//     // finding if post exist on which user wants to comment
//     Post.findById(req.params.id, function (err, post) {
//         if (post) {
//             Comment.create({
//                 content: req.body.content,
//                 user: req.user._id,
//                 post: req.params.id,
//             }, function (err, comment) {
//                 if (err) {
//                     console.log("error in creating comment");
//                     return;
//                 }
//                 // pushing comment id to the post comments array
//                 post.comments.push(comment);
//                 post.save();
//                 res.redirect('/');
//             });
//         }
//     })
// };

// action: delete a comment
module.exports.destroy = async function (req, res) {
    try {
        // finding comment which user wants to delte
        let comment = await Comment.findById(req.params.id);
        // .id == ._id mongodb do this for us
        // auth check that user who wants to delete and the user who created comment are same or not
        if (comment.user == req.user.id) {
            // fetching post id from that comment
            let post_id = comment.post;
            comment.remove();
            // deleting that comment id form the post array of comments
            await Post.findByIdAndUpdate(post_id, { $pull: { comment: req.params.id } });
            req.flash('success', "Comment deleted successfully");
            return res.redirect('/');
        } else {
            req.flash('error', "you can not delete this comment");
            return res.redirect('/');
        }
    } catch (err) {
        if (err) {
            req.flash('error', "error in deleting comment");
            return;
        }
    }
}