const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateProfileInput = data => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength (data.handle, { min: 2, max: 40 })) {
    errors.handle = "handle needs yo be between 2 and 4 characters";
  }

  if (!Validator.isLength (data.handle, { min: 2, max: 40 })) {
    errors.handle = "handle needs yo be between 2 and 4 characters";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProfileInput;
