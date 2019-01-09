const Validator = require("validator");
const isEmpty = require("./is-empty");

const capitalizeFirstLetter = str => {
  return str[0].toUpperCase() + str.slice(1);
};

const validateEducationInput = data => {
  let errors = {};

  let fieldsToBeValidated = ["school", "degree", "fieldofstudy"];
  fieldsToBeValidated.forEach(field => {
    // Custom isEmpty function checks if null or undefined. The below returns strings which is necessary for Validator isEmpty method below
    data[field] = !isEmpty(data[field]) ? data[field] : "";
    if (Validator.isEmpty(data[field])) {
      errors[field] = `${capitalizeFirstLetter(field == "fieldofstudy" ? "Field of study" : field)} is required`;
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateEducationInput;
