const Post = require('../models/posts');
const Comment = require('../models/comments');

// action: create a post
module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        // if (req.xhr) {
        //     return res.status(200).json({
        //         data: {
        //             post: post
        //         },
        //         message: "post created!"
        //     })
        // }
        req.flash('success', "Post created successfully");
        return res.redirect('/');
    } catch (err) {
        if (err) {
            req.flash('error', "error in creating post");
            return;
        }
    }
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
        // if (req.xhr) {
        //     return res.status(200).json({
        //         data: {
        //             post_id: req.params.id
        //         },
        //         message: 'Post deleted'
        //     })
        // }
        req.flash('success', "Post deleted successfully");
        return res.redirect('/');
    } else {
        req.flash('error', "you can not delete this post");
        return res.redirect('/');
    }
}

