const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Access Denied. Login Required"
        });
    }

    try {

        const decoded = jwt.verify(token, "mySecretKey");

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = authMiddleware;