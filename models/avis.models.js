// require mongoose
const mongoose = require('mongoose');


// Create Avis Schema
const avisSchema = new mongoose.Schema({
    nom: String,
    title: String,
    avis: String
},
{
    timestamps:true
}

);




// export avis model
module.exports = mongoose.model('avis', avisSchema);