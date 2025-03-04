const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({ path: '../config/.env' })

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token)
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated..",
                success: false
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
        console.log('decoded', decoded);
        req.user = decoded.userId;
        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            name: 'TokenExpiredError',
            expiredAt: 1408621000,
            message: "jwt expired | You are trying to hack by stoling my cookies..",
            success: false
        })
    }
}
module.exports = isAuthenticated;
