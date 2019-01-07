const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateProfileInput = data => {
  let errors = {};

  const dataFields = ["handle", "status", "skills"];

  dataFields.forEach(field => {
    // ensure it returns string if user fills in nothing(this could be null or undefined and Validator's isEmpty method accepts only string)
    data[field] = !isEmpty(data[field]) ? data[field] : "";
    if (Validator.isEmpty(data[field])) {
      errors[field] = `${field} is required`;
    }
  });

  if (data.handle && !Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "handle needs to be between 2 and 4 characters";
  }

  usersUrls = [
    "website",
    "youtube",
    "twitter",
    "facebook",
    "linkedin",
    "instagram"
  ];

  usersUrls.forEach(url => {
    if (!isEmpty(data[url])) {
      if (!Validator.isURL(data[url])) {
        errors[url] = "Not a valid URL";
      }
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProfileInput;
