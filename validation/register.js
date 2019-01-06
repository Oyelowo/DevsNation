const Validator = require('validator');
const isEmpty =  require('./is-empty');

const validatingRegisterInput = (data) => {
    let errors = {};

    if (!Validator.isLength(data.name,{min: 2, max: 20})) {
        errors.name = 'Name must be between 2 and 30 characters'
    } 
    return {
        errors,
        isValid: isEmpty(errors)
    }

}

module.exports = validatingRegisterInput;