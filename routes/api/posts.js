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
module.exports = router;