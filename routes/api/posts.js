const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Post = require("../../models/Post");

// Profile model
const Profile = require("../../models/Profile");

// Validation
const ValidatePostInput = require("../../validation/post");

// @route GET api/posts/test
// @desc Tests post route
// @access Public
router.get("/test", (req, res) =>
    res.json({
        msf: "post Works"
    })
);

// @route GET api/posts
// @desc Get posts
// @access Public
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({
            date: -1
        });
        res.json(posts);
    } catch (error) {
        res.status(404).json({
            nopostsfound: "No posts found"
        });
    }
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(404).json({
            nopostfound: "Post with ID not found"
        });
    }
});

// @route POST api/posts
// @desc Create post
// @access Private

router.post(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    async (req, res) => {
        const {
            errors,
            isValid
        } = ValidatePostInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const {
            text,
            name,
            avatar
        } = req.body;
        const newPost = Post({
            text,
            name,
            avatar,
            user: req.user.id
        });
        try {
            const post = await newPost.save();
            res.json(post);
        } catch (error) {
            res.json(error);
        }
    }
);

// @route DELETE api/posts/:id
// @desc Delete post
// @access Private
router.delete(
    "/:id",
    passport.authenticate("jwt", {
        session: false
    }),
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            // check if the post was made by the user. The return state helps to stop the code if not
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({
                    notauthorized: "User not authorized"
                });
            }

            // Delete
            await post.remove();
            res.json({
                success: true
            });
        } catch (error) {
            res.status(404).json({
                postnotfound: "No post found"
            });
        }
    }
);

// @route POST api/posts/like/:id
// @desc Like post
// @access Private
router.post(
    "/like/:id",
    passport.authenticate("jwt", {
        session: false
    }),
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            // check if the user already liked the post
            const postLikedByUser = post.likes.filter(like => like.user.toString() === req.user.id);
            if (postLikedByUser.length > 0) {
                return res.status(400).json({
                    alreadyliked: 'User already liked this post'
                })
            }

            // Add the user id to the like array
            post.likes.unshift({
                user: req.user.id
            })

            const updatedPost = await post.save();
            res.json(updatedPost)


        } catch (error) {
            res.status(404).json({
                postnotfound: "No post found"
            });
        }
    }
);


// @route POST api/posts/unlike/:id
// @desc Unlike post
// @access Private
router.post(
    "/unlike/:id",
    passport.authenticate("jwt", {
        session: false
    }),
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            // check if the user already liked the post
            const postLikedByUser = post.likes.filter(like => like.user.toString() === req.user.id);
            if (postLikedByUser.length === 0) {
                return res.status(400).json({
                    notliked: 'You have not yet liked this post'
                })
            }

            // Remove the like(user id) from the array
            post.likes = post.likes.filter(like => like.user.toString() !== req.user.id)
            const updatedPost = await post.save()
            res.json(updatedPost);

        } catch (error) {
            res.status(404).json({
                postnotfound: "No post found"
            });
        }
    }
);


// @route POST api/posts/comment/:id
// @desc Add comment to post
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    const {
        errors,
        isValid
    } = ValidatePostInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const {
        text,
        name,
        avatar
    } = req.body;

    const newComment = {
        text,
        name,
        avatar,
        user: req.user.id
    }

    try {
        const post = await Post.findById(req.params.id);
        // Add to comments array
        post.comments.unshift(newComment);
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(404).json({
            postnotfound: 'No post found'
        })
    }

})


// @route DELETE api/posts/comment/:id/:comment_id
// @desc Remove comment from post
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const commentInPost = post.comments.filter(comment => comment._id.toString() === req.params.comment_id);
        // Check if comment exists
        if (commentInPost.length === 0) {
            return res.status(404).json({
                commentnotexist: 'Comment does not exist'
            })
        }

        // Remove if it exists
        post.comments = post.comments.filter(comment => comment._id.toString() !== req.params.comment_id);
        const updatedPost = await post.save();
        res.json(updatedPost);

    } catch (error) {
        res.status(404).json({
            postnotfound: 'No post found'
        })
    }

})

module.exports = router;