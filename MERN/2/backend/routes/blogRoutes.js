const { Router } = require('express')
const authRoute = require('../authentication')
const Blog = require('../model/blogSchema')
const router = Router()

router.route('/').get((req,res) => {
    Blog.find().sort({ createdAt:-1 })
        .then((blogs) => res.json(blogs))
        .catch( err => console.log(err))
})


router.post('/create',authRoute,(req,res) => {
    Blog.create(req.body)
        .then((blog) => res.json(redirect='/'))
        .catch( err => console.log(err))
})

module.exports = router