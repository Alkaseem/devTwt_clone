const localStratagy = require("passport-local").Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../models');

module.exports = async (passport) => {
    passport.use(new localStratagy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try {
            const findUser = await db.User.findOne({
                email: email
            });
            if (!findUser) {
                console.log("user not found");
                return done(null, false);
            }
            bcrypt.compare(password, findUser.password, (err, isMatch) => {
                if (err) throw err
                if (isMatch) {
                    return done(null, findUser)
                } else {
                    // throw new Error("pass")
                    console.log("password incorrect!!");
                    return done(null, false);
                }
            });
        } catch (err) {
            console.log(`Something Went Wrong ${err}`);
        }
    }));
}

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        return done(err, user);
    })
});