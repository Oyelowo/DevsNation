const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");

// Load User Profile
const User = require("../../models/User");

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get("/test", (req, res) => res.json({ msf: "profile Works" }));

// @route GET api/profile/
// @desc Get current users profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = {};

    try {
      profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// @route POST api/profile/
// @desc create or edit user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { skills } = req.body;
    
    const profileFields = {
      ...req.body,
      user: req.user.id,
      skills: skills.split(",")
    };
    // Get fields
    const standardFields = [
      "handle",
      "company",
      "website",
      "location",
      "bio",
      "status",
      "githubusername"
    ];

    const socialMediaFields = [
      "youtube",
      "twitter",
      "facebook",
      "linkedin",
      "instagram"
    ];

    const setProfileFields = (fieldsArray, profileFieldsToBeSet) => {
      fieldsArray.forEach(field => {
        if (req.body[field]) {
          profileFieldsToBeSet[field] = req.body[field];
        }
      });
    };

    setProfileFields(standardFields, profileFields);
    profileFields.social = {};
    setProfileFields(socialMediaFields, profileFields.social);

    const profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // Update
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      res.json(profile);
    } else {
      // Create

      // Check if handle exits
      const profile = await Profile.findOne({ handle: profileFields.handle });
      if (profile) {
        errors.handle = "That handle already exists";
        res.status(400).json(errors);
      }
    }
    //save profile
    const newProfile = await new Profile(profileFields).save();
    res.json(newProfile);
  }
);
module.exports = router;
