const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyToken =  async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        const verify = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!verify){
            return res.send({
                authentication: false,
                message: "unauthenticated"
            });
        }
        req.userID = verify._id;
        next()
    } catch (error) {
        return res.send({
            authentication: false,
            message: "unauthenticated"
        });
    }
}

module.exports = verifyToken;

