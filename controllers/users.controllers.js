const UserModel = require('../models/users.models');
const ValidateRegister = require('../validation/Register');
const ValidateLogin = require('../validation/Login');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Regiter
const Register = async (req, res) => {
    const {errors, isValid} = ValidateRegister(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        }else {
            UserModel.findOne({email: req.body.email})
            .then( async (exist) => {
                if (exist) {
                    errors.email = "user exist"
                    res.status(404).json(errors)
                }else {
                    const hash = bcrypt.hashSync(req.body.password, 10)
                    req.body.password = hash;
                    req.body.role = "USER"
                    await UserModel.create(req.body)
                    res.status(200).json({message: "Success"})
                }
            })
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
}

// Login
const Login = async (req, res) => {
    const {errors, isValid} = ValidateLogin(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        }else {
            UserModel.findOne({email: req.body.email})
            .then( user => {
                if (!user) {
                    errors.email = "Not found user"
                    res.status(404).json(errors)
                }else {
                    bcrypt.compare(req.body.password, user.password)
                    .then( isMatch => {
                        if (!isMatch) {
                            errors.password = "Incorrect password"
                            res.status(404).json(errors)
                        }else {
                            var token = jwt.sign({
                                id: user._id,
                                name: user.firstname,
                                email: user.email,
                                role: user.role
                            }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
                            res.status(200).json({
                                message: "Success",
                                token: "Bearer " + token
                            })
                        }
                    })
                }
            })
        }
    } catch (error) {
        res.status(404).json(error.message);
    }
}


// Test 
const Test = (req, res) => {
    res.send("Welcome User");
}


// Prestataire
const Admin = (req, res) => {
    res.send("Welcome Admin");
}



module.exports = {
    Register,
    Login,
    Test,
    Admin
}