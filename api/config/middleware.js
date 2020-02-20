const jwt = require('jsonwebtoken');

exports.loginRequired = async (req, res, next) => {
    try {
        res.json("pls login firts");
    } catch (err) {
        return next({
            status: 401,
            message: "Please log in first"
        });
    }
}