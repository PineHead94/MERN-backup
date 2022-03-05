const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const submitRoutes = require('./routes/signupRoutes')
const loginRoutes = require('./routes/loginRoutes')
const logoutRoute = require('./routes/logoutRoute')
const blogRoutes = require('./routes/blogRoutes')
const authRoute = require('./authentication')
const cookieParser = require('cookie-parser')

dotenv.config()
const app = express()

const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))
app.use(express.json())

mongoose.connect(uri)
    .then((res) => console.log(res.connection.host))
    .catch( err => console.log(err))

app.use('/signup', submitRoutes)
app.use('/login', loginRoutes)
app.use('/logout', logoutRoute)
app.use('/blogs',authRoute, blogRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`))


