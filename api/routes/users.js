const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

router.get('/', async (req, res) => {
    try {
        const allUsers = await db.User.find().populate("posts");
        if (!allUsers) return res.status(400).json({
            msg: "No users found"
        });
        res.status(200).json(allUsers);
    } catch (err) {
        console.log("Something Wrong " + err)
    }
});

router.post('/register', async (req, res) => {
    const {
        email,
        password
    } = req.body
    try {
        const findUser = await db.User.findOne({
            email: email
        });
        if (findUser) return res.status(401).send("User with this email already exist");
        const newUser = new db.User({
            email,
            password
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) return res.status(401).send(err);
                newUser.password = hash;
                newUser.save().then(user => res.json(user))
                    .catch(err => console.log(err))
            });
        });
    } catch (err) {
        res.status(401).send("Something Went Wrong " + err);
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/api/profiles',
        failureRedirect: '/api/users/login',
        failureFlash: false
    })(req, res, next)
});

// router.get('/logout', (req, res, next) => {
//     req.logout();
//     res.redirect('/');
//     req.flash('success', "Logged you out");
//   });

module.exports = router;