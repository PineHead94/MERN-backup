const express = require('express')
const User = require('../model/userSchema')
const jwt = require('jsonwebtoken')


const router = express.Router()

const handleError = (err) => {
    // console.log(err.message)
    const errors = { username:'',password:'' }
    if(err.code===11000){
        errors.username = 'This user already exists'
        return errors
    }
    if(err.message.includes('user-db validation failed:')){
       Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
        // console.log(errors)
        return errors
    }

}

const maxAge = 60 * 60 * 24 * 3


const createToken = (id) => {
    return jwt.sign({ id }, 'secret key', {
        expiresIn: maxAge
    })
}

router.route('/').post((req,res) => {
    User.create(req.body)
        .then((user) => {
            const token = createToken(user._id)
            res.json({ token,user })
        })
        .catch( err => {
            const error = handleError(err)
            res.json({ error })
        })
})


module.exports = router