const jwt = require('jsonwebtoken');

exports.loginRequired = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.SECRETE_KEY, {
            expiresIn: '1h'
        });
        if (!decoded) return res.status(401).json("Please Login First");
        req.userId = decoded.id
        next();
    } catch (err) {
        res.status(401).json("Somethign wrong! " + err);
    }
}