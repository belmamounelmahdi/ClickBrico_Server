const isEmpty = require('./isEmpty');
const validator = require('validator');



module.exports = function ValidateProfile (data) {
    let errors = {};

    data.tel = !isEmpty(data.tel) ? data.tel : ""
    data.city = !isEmpty(data.city) ? data.city : ""
    data.address = !isEmpty(data.address) ? data.address : ""


    if (validator.isEmpty(data.tel)) {
        errors.tel = "Entrer votre numéro de téléphone"
    }

    if (validator.isEmpty(data.city)) {
        errors.city = "Entrer votre ville"
    }

    if (validator.isEmpty(data.address)) {
        errors.address = "Entrer votre address"
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}