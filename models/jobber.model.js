const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const JobberModel = new Schema({
    name: "string",
    service: "string",
    email: {
        type: 'string',
        trim: true,
        unique: true
    },
    password: "string",
    role: "string"
}, {
    timestamps: true
})

module.exports = mongoose.model('jobbers', JobberModel)










module.exports = mongoose.model('jobbers', JobberModel)