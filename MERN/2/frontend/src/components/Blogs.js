import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { UserContext } from '../context/userContext'

function Blogs() {

    const [ blogs,setBlogs ] = useState(null)
    const [ isLoading,setIsLoading ] = useState(true)
    const [ auth,setAuth ] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        axios.get('http://localhost:5000/blogs',{ headers: {
            'x-auth-token': `${token}`,
            'Content-type': 'application/json'
        }})
            .then((res) => {
                if(res.data==='not authenticated'){
                    setAuth(false)
                    setIsLoading(true)
                } else {
                    setBlogs(res.data)
                    setAuth(true)
                    setIsLoading(false)
                }
            })
            .catch( err => console.log(err))
    },[])
    return (
        <div>
            { !auth && <h1>Not logged in</h1> }
            {auth && <h1>Hello,{ localStorage.getItem('user') }</h1> }
            { !isLoading && blogs.map( blog => {
                return (
                    <p key={blog._id}>{blog.title} {blog.snippet}</p>
                )
            }) }
            <button><Link to='create'>Create</Link></button>
            <button><Link to='/'>Sign Up</Link></button>
        </div>
    )
}

export default Blogs
