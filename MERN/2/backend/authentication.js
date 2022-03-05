const jwt = require('jsonwebtoken')
const User = require('./model/userSchema')

const authRoute = (req,res,next) => {
    const token = req.header('x-auth-token')
    if(token){
        jwt.verify(token,'secret key',(err,decodedToken) => {
            if(!err){
                next()
            }
        })
            
    } else {
        console.log('not authenticated')
    }
}

module.exports = authRoute