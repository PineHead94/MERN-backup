const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [ true,'Username cannot be blank' ]
    },
    password: {
        type: String,
        minlength: [3,'Min length is 3 characters'],
        required: [true,'Enter a password']
    }
})

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.statics.login = async function (username,password){
    const user = await this.findOne({ username })
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }
        throw Error('Wrong password')
    }
    throw Error('User does not exists')
    
}

const User = mongoose.model('user-db',userSchema)
module.exports = User