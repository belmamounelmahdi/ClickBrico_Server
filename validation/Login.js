const isEmpty = require('./isEmpty');
const validator = require('validator');



module.exports = function ValidateLogin (data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""



    if (!validator.isEmail(data.email)) {
        errors.email = "Email invalide"
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "Entrer un email"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Entrer un mot de passe"
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}