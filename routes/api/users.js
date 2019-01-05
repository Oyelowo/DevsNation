const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../../models/User");

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) => res.json({ msf: "Users Works" }));

// @route GET api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ email: "email already exists" });
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
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ email: "User not found" });
  }

  // Check Passoword
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    res.json({ msg: "Success" });
  } else {
    return res.status(400).json({ password: "Passowrd is incorrect" });
  }
});

module.exports = router;
