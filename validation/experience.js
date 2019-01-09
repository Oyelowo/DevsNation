const Validator = require("validator");
const isEmpty = require("./is-empty");

const capitalizeFirstLetter = str => {
  return str[0].toUpperCase() + str.slice(1);
};

const validateExperienceInput = data => {
  let errors = {};

  let fieldsToBeValidated = ["title", "company", "from"];
  fieldsToBeValidated.forEach(field => {
    data[field] = !isEmpty(data[field]) ? data[field] : "";
    if (!Validator.isEmail(data[field])) {
      errors[field] = `${capitalizeFirstLetter(field)} is required`;
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateExperienceInput;
