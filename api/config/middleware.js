const jwt = require('jsonwebtoken');

exports.loginRequired = async (req, res, next) => {
    try {
        const authader = await req.headers.authorization;
        if (!authader) {
            req.isAuth = false
            res.status(401).json("Plaese Login first");
            return next();
        }
        const token = await authader.split(" ")[1];
        if (!token || token === '') {
            req.isAuth = false
            res.status(401).json("Unauthorizeds");
            return next();
        }
        const decoded = await jwt.verify(token, process.env.SECRETE_KEY, {
            expiresIn: '1h'
        });
        if (!decoded) {
            req.isAuth = false
            res.status(401).json("Unauthorized");
            return next();
        }
        req.isAuth = true;
        req.userId = decoded.id
        next();
    } catch (err) {
        res.status(401).json("Invalid Token");
    }
}