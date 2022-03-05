const { Router } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')

const router = Router()

const handleError = (err) => {
    console.log(err)
    const errors =  { username:'',password:'' }
    if(err.message==='User does not exists'){
        errors.username = err.message
    }
    if(err.message==='Wrong password'){
        errors.password = err.message
    }
    if(err.message==='data and hash arguments required'){
        errors.username = 'Enter a valid username'
        errors.password = 'Enter a valid password'
    }
    return errors
}

const maxAge = 60 * 60 * 24 * 3
const createToken = (id) => {
    return jwt.sign({ id }, 'secret key', {
        expiresIn: maxAge
    })
}

router.route('/').post((req,res) => {
    const { username,password } = req.body
    User.login(username,password)
        .then((user) => {
            const token = createToken(user._id)
            res.json({ user,token })
        })
        .catch( err => {
            const error = handleError(err)
            res.json({ error })
        })

})

module.exports = router