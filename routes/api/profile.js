const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// Load Profile Model
const Profile = require("../../models/Profile");

// Load User Model
const User = require("../../models/User");

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
//router.get("/test", (req, res) => res.json({ msf: "profile Works" }));

// @route GET api/profile/
// @desc Get current users profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = {};

    try {
      profile = await Profile.findOne({ user: req.user.id }).populate("user", [
        "name",
        "avatar"
      ]);
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

// @route GET api/profile/handle/all
// @desc Get all profiles
// @access Public
router.get("/all", async (req, res) => {
  const errors = {};
  try {
    let profiles = await Profile.find().populate("user", ["name", "avatar"]);
    if (!profiles) {
      errors.noprofile = "There are no profiles";
      return res.status(404).json(errors);
    }
    res.json(profiles);
  } catch (error) {
    res.status(404).json({ profile: "There are no profiles" });
  }
});

// Function to help take care of 'handle' and 'user' params
const getUser = (endPoint, parameterNameInDB) => {
  // e.g /handle/:handle" will yield handle which is what we need to get the user by
  let parameterNameInUrl = endPoint.split(":")[1];
  router.get(endPoint, async (req, res) => {
    const errors = {};
    try {
      let profile = await Profile.findOne({
        [parameterNameInDB]: req.params[parameterNameInUrl]
      }).populate("user", ["name", "avatar"]);
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    } catch (error) {
      res.status(404).json({ profile: "There is no profile for this user" });
    }
  });
};

// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public
getUser("/handle/:handle", "handle");

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public
getUser("/user/:user_id", "user");

// @route POST api/profile/
// @desc create or edit user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { skills } = req.body;

    let profileFields = {
      ...req.body,
      user: req.user.id,
      skills: skills.split(",")
    };

    // Get fields
    const standardFields = [
      "handle",
      "status",
      "company",
      "website",
      "location",
      "bio",
      "githubusername"
    ];

    const socialMediaFields = [
      "youtube",
      "twitter",
      "facebook",
      "linkedin",
      "instagram"
    ];

    const setProfileFields = (fieldsArray, profileFieldsToBeSet, reqBody) => {
      fieldsArray.forEach(field => {
        if (reqBody[field]) {
          profileFieldsToBeSet[field] = reqBody[field];
        }
      });
    };

    setProfileFields(standardFields, profileFields, req.body);
    profileFields.social = {};
    setProfileFields(socialMediaFields, profileFields.social, req.body);

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

// @route POST api/profile/experience
// @desc  Add experience to profile
// @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profile = await Profile.findOne({ user: req.user.id });
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    // Add to experience array
    profile.experience.unshift(newExperience);

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  }
);

// @route POST api/profile/education
// @desc  Add education to profile
// @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profile = await Profile.findOne({ user: req.user.id });
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    // Add to education array
    profile.education.unshift(newEducation);

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  }
);

// function to help delete edu and experience parameters
const deleteParameter = (route, parameterNameInDB) => {
  const param = route.split(":")[1];
  router.delete(
    route,
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      // user is embedded in the token
      const profile = await Profile.findOne({ user: req.user.id });

      // Get remove index
      profile[parameterNameInDB] = profile[parameterNameInDB].filter(
        item => item.id !== req.params[param]
      );

      try {
        const updatedProfile = await profile.save();
        res.json(updatedProfile);
      } catch (error) {
        res.status(404).json(error);
      }
    }
  );
};

// @route DELETE api/profile/experience/:exp_id
// @desc  Delete experience to profile
// @access Private
deleteParameter("/experience/:exp_id", "experience");

// @route DELETE api/profile/education/:edu_id
// @desc  Delete education to profile
// @access Private
deleteParameter("/education/:edu_id", "education");

// @route DELETE api/profile/profile/
// @desc  Delete user and profile
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // user is embedded in the token
    const profile = await Profile.findOneAndRemove({ user: req.user.id });
    const user = await User.findByIdAndRemove({ _id: req.user.id });

    res.json({ success: true });
  }
);

module.exports = router;
