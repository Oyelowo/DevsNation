const Validator = require("validator");
const isEmpty = require("./is-empty");

const capitalizeFirstLetter = str => {
  return str[0].toUpperCase() + str.slice(1);
};

const validateExperienceInput = data => {
  let errors = {};

  let fieldsToBeValidated = ["title", "company", "from"];
  fieldsToBeValidated.forEach(field => {
    // Custom isEmpty function checks if null or undefined. The below returns strings which is necessary for Validator isEmpty method below
    data[field] = !isEmpty(data[field]) ? data[field] : "";
    if (Validator.isEmpty(data[field])) {
      errors[field] = `${capitalizeFirstLetter(field)} is required`;
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateExperienceInput;
