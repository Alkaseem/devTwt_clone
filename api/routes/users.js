const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
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

router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;
    try {
        const user = await db.User.findOne({
            email: email
        })
        if (!user) return res.status(400).json("email is not register");
        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json("password Incorrect");
        //User match
        const payload = {
            id: user.id,
            email: user.email
        };
        //sign token
        const token = await jwt.sign(payload, process.env.SECRETE_KEY, {
            expiresIn: 3600
        });
        // if (err) return res.json("Password Incorrect " + err);
        res.json({
            success: true,
            token: 'Bearer ' + token
        });
    } catch (err) {
        res.status(401).json("password Incorrect " + err);
    }
});

module.exports = router;