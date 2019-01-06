const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route GET api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    errors.email = "email already exists";
    return res.status(400).json(errors);
  }

  const avatar = gravatar.url(req.body.email, {
    s: "200", // size
    r: "pg", // Rating
    d: "mm" // Default
  });

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    avatar,
    password: req.body.password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash;
      const user = await newUser.save();
      try {
        res.json(user);
      } catch (error) {
        console.log(error);
      }
    });
  });
});

// @route GET api/users/login
// @desc login User/ Returning JWT Token
// @access Public
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    errors.email = "User not found";
    return res.status(404).json(errors);
  }

  // Check Passoword
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // User Matched

    const payLoad = { id: user.id, name: user.name, avatar: user.avatar }; // Create JTWT payload
    // Sign Token
    jwt.sign(
      payLoad,
      keys.secretOrKey,
      { expiresIn: 60 * 60 },
      (err, token) => {
        res.json({ success: true, token: "Bearer " + token });
      }
    );
  } else {
    errors.password = "Passowrd is incorrect";
    return res.status(400).json(errors);
  }
});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, name, email } = req.user;
    res.json({ id, name, email });
  }
);

module.exports = router;
