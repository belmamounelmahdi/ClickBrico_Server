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

// router.get('/service-electriciens', async (req, res) => {
//     try {
//         const jobberList = await jobbers.find({ service: "électricien" }).populate('profile');
//         const jobberProfiles = jobberList.map(jobber => {
//             return {
//                 jobber: jobber,
//                 profile: jobber.profile
//             };
//         });
//         res.json(jobberProfiles);
//     } catch (error) {
//         console.log(error);
//         res.status(404).send('Erreur serveur');
//     }
// });
router.get('/service-electriciens', async (req, res) => {
    try {
      const jobberProfiles = await jobbers.aggregate([
        { $match: { service: "électricien" } },
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
  


// router.get('/service-electriciens', async (req, res) => {
//     try {
//         const jobberList = await jobbers.find({ service: "électricien" });
//         const jobberProfiles = await Promise.all(jobberList.map(async jobber => {
//             const jobberProfile = await profiles.findOne({ jobberId: jobber._id });
//             return { jobber, profile: jobberProfile };
//         }));
//         res.json(jobberProfiles);
//     } catch (error) {
//         console.log(error);
//         res.status(404).send('Erreur serveur');
//     }
// });

// router.get('/profiles-jobbers', async (req, res) => {
//     try {
//         const profile = await profiles.find({});
//         res.json(profile);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Erreur serveur');
//     }
// });



// Get électriciens page 
// router.get('/service-electriciens', async (req, res) => {
//     try {
//         const jobber = await jobbers.find({ service: "électricien" });
//         res.json(jobber);
//     } catch (error) {
//         console.log(error);
//         res.status(404).send('Erreur serveur');
//     }
// });

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
