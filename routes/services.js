const mongoose = require('mongoose');
const Schema = mongoose.Schema
const router = require('express').Router();

const mobileDB = mongoose.createConnection(process.env.MOBILE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const JobberModel = new mongoose.Schema({
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
const jobbers = mobileDB.model('jobbers', JobberModel)

const ProfileJobber = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "jobbers",
        required: true
    },
    tel: "string",
    city: "string",
    address: "string",
    bio: "string",
    solde: "string",
    avis: "string",
}, {
    timestamps: true
})
const profiles = mobileDB.model('profiles', ProfileJobber)

// Get Jobbers Electricien
router.get('/service-electriciens', async (req, res) => {
    try {
      const jobberProfiles = await jobbers.aggregate([
        { $match: { service: "Électricien" } },
        {
          $lookup: {
            from: "profiles",
            localField: "_id",
            foreignField: "user",
            as: "profile"
          }
        },
        { $unwind: "$profile" }
      ]);
      res.json(jobberProfiles);
    } catch (error) {
      console.log(error);
      res.status(404).send('Erreur serveur');
    }
  });
  

// Get Jobbers Peinture
router.get('/service-peinture', async (req, res) => {
    try {
      const jobberProfiles = await jobbers.aggregate([
        { $match: { service: "peinture" } },
        {
          $lookup: {
            from: "profiles",
            localField: "_id",
            foreignField: "user",
            as: "profile"
          }
        },
        { $unwind: "$profile" }
      ]);
      res.json(jobberProfiles);
    } catch (error) {
      console.log(error);
      res.status(404).send('Erreur serveur');
    }
  });


// Get Jobbers Jardinage
router.get('/service-jardinage', async (req, res) => {
    try {
      const jobberProfiles = await jobbers.aggregate([
        { $match: { service: "jardinier" } },
        {
          $lookup: {
            from: "profiles",
            localField: "_id",
            foreignField: "user",
            as: "profile"
          }
        },
        { $unwind: "$profile" }
      ]);
      res.json(jobberProfiles);
    } catch (error) {
      console.log(error);
      res.status(404).send('Erreur serveur');
    }
  });

// Get Jobbers Plombie
router.get('/service-plombie', async (req, res) => {
    try {
      const jobberProfiles = await jobbers.aggregate([
        { $match: { service: "plombie" } },
        {
          $lookup: {
            from: "profiles",
            localField: "_id",
            foreignField: "user",
            as: "profile"
          }
        },
        { $unwind: "$profile" }
      ]);
      res.json(jobberProfiles);
    } catch (error) {
      console.log(error);
      res.status(404).send('Erreur serveur');
    }
  });


// Get Jobbers Plombie
router.get('/service-menage', async (req, res) => {
    try {
      const jobberProfiles = await jobbers.aggregate([
        { $match: { service: "ménage" } },
        {
          $lookup: {
            from: "profiles",
            localField: "_id",
            foreignField: "user",
            as: "profile"
          }
        },
        { $unwind: "$profile" }
      ]);
      res.json(jobberProfiles);
    } catch (error) {
      console.log(error);
      res.status(404).send('Erreur serveur');
    }
  });
  




// Get All Jobbers
router.get('/jobbers', async (req, res) => {
    try {
        const jobber = await jobbers.find({});
        res.json(jobber);
    } catch (error) {
        console.log(error);
        res.status(500).send('Erreur serveur');
    }
});



// Export
module.exports = router;
