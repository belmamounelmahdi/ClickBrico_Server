var express = require("express");
const {
  Register,
  Login,
  Test,
  Admin,
} = require("../controllers/users.controllers");
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");
const { AddProfile, FindAllProfiles, FindSingleProfile, DeleteProfile } = require("../controllers/profile.controllers");
const { AddAvis } = require("../controllers/avis.controllers");
const Avis = require("../models/avis.models");

var router = express.Router();

/* Users Route. */
router.post("/register", Register);
router.post("/login", Login);




// Profile Route

// Add Profile
router.post("/profiles", 
passport.authenticate("jwt", { session: false }),
AddProfile);

// Get All Profiles
router.get("/profiles", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.ADMIN),
FindAllProfiles);

// Get One Profiles
router.get("/profile", 
passport.authenticate("jwt", { session: false }),
FindSingleProfile);


// AVIS
router.post("/submitavis", async (req, res) => {
  console.log(req.body.avis)
  try {
      const avis = new Avis({
          nom: req.body.nom,
          title: req.body.title,
          avis: req.body.avis
      });
      // Save quote in db
      const saveAvis = avis.save();
      // Redirect to avis if success
      res.send("Submited")

  }catch(err){
      res.send(err);
  }
});


// ADMIN
router.get("/admin", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.ADMIN),
Admin);

// Delete Profile
router.delete("/profile/:id", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.ADMIN),
DeleteProfile);




module.exports = router;
