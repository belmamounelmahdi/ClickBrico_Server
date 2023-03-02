// require axpress router
const router = require('express').Router();


// Require Avis Model
const Avis = require("../models/avis.models");






// Get avis page (fetch data from db and send to avis page)
router.get("/avis", async (req, res) => {
    try{
        // fetch all avis from db
        const allAvis = await Avis.find();
        res.send(allAvis)
        // res.render("Avis", {allAvis, isAuth:req.isAuthenticated() });

    }catch(err){
        res.send(err);
    }
});


// POST
// Submit a avis and add data to database
router.post("/submitavis", async (req, res) => {
    console.log(req.body)
    try {
        const avis = new Avis({
            nom: req.body.nom,
            titre: req.body.titre,
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






// Export
module.exports = router;
