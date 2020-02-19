const router = require('express').Router();
const db = require('../models');

//Show all profiles
router.get('/', async (req, res) => {
    // console.log(req.user);
    try {
        const allProfiles = await db.Profile.find().populate("creator")
        if (!allProfiles) return res.status(401).send("profiles not found");
        res.json(allProfiles);
    } catch (err) {
        console.log(`Somethings went wrong: ${err}`);
    }
});

router.get('/:profileId/show', async (req, res) => {
    try {
        const spacificProfile = await db.Profile.findById(req.params.profileId)
        if (!spacificProfile) return res.status(401).send("profile not found");
        res.json(spacificProfile);
    } catch (err) {
        console.log(`Somethings went wrong: ${err}`);
    }
});

router.post('/create', async (req, res) => {
    const {
        fullName,
        rank,
        skills,
        image
    } = req.body;
    try {
        const profiles = {
            fullName,
            rank,
            skills,
            image,
            creator: "5e4445283ea87b0e448e003e"
        }
        const newProfile = new db.Profile(profiles);
        if (!newProfile) return res.status(400).send("Something Went Wrong!");
        newProfile.save().then(profile => {
            res.status(200).json(profile)
        }).catch(err => {
            console.log("Profile Not Save " + err)
        });
    } catch (err) {
        res.status(401).send("Wrong! " + err);
    }
});

router.put('/:profileId/edit', async (req, res) => {
    try {
        const profile = await db.Profile.findByIdAndUpdate(req.params.profileId, req.body, {
            new: true
        })
        if (!profile) return res.status(400).json({
            msg: "Profile not Found"
        });
        res.status(200).json(profile)
    } catch (err) {
        res.status(400).send("Wrong " + err);
    }
});

router.delete("/:profileId", async (req, res) => {
    try {
        const profile = await db.Profile.deleteOne({
            _id: req.params.profileId,
        })
        if (!profile) return res.status(400).json({
            msg: "profile not found"
        });
        res.json("Profile deleted")
    } catch (err) {
        res.status(400).json("Something wrong " + err);
    }
});

module.exports = router;