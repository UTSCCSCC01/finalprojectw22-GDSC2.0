const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if(!token) {
        return res.status(403).json({message: "A token is required for authentication"})
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
    }catch(err) {
        res.status(401).json({message: "Invalid Token"})
    }
    return next()
}

module.exports = verifyToken