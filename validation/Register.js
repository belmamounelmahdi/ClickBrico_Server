const isEmpty = require('./isEmpty');
const validator = require('validator');



module.exports = function ValidateRegister (data) {
    let errors = {};
    data.firstname = !isEmpty(data.firstname) ? data.firstname : ""
    data.lastname = !isEmpty(data.lastname) ? data.lastname : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.confirm = !isEmpty(data.confirm) ? data.confirm : ""

    if (validator.isEmpty(data.firstname)) {
        errors.firstname = "Entrer votre prénom"
    }
    if (validator.isEmpty(data.lastname)) {
        errors.lastname = "Entrer votre nom"
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Entrer votre email"
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "Entrer votre email"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Saisissez un mot de passe"
    }
    if (!validator.equals(data.password, data.confirm)) {
        errors.confirm = "Le mot de passe ne correspond pas"
    }
    if (validator.isEmpty(data.confirm)) {
        errors.confirm = "Entrer le mot de passe de confirmation"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}