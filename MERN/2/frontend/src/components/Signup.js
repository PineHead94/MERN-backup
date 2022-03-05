import React, {  useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import { UserContext } from '../context/userContext'

function Signup() {
    // const { userName,token,setContext } = useContext(UserContext)
    const [ username,setUserName ] = useState(null)
    const [ password,setPassword ] = useState(null)
    const [ errorUserName,setErrorUserName ] = useState('')
    const [ errorPassword,setErrorPassword ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = { username,password }
        axios.defaults.withCredentials = true
        axios.post('http://localhost:5000/signup', formData)
            .then((res) => {
                if(res.data.error){
                    setErrorUserName(res.data.error.username)
                    setErrorPassword(res.data.error.password)
                } else {
                    localStorage.setItem('token',res.data.token)
                    localStorage.setItem('user',res.data.user.username)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={ (e) => handleSubmit(e)}>
                <input type="text" placeholder="username" name="username" onChange={(e) => setUserName(e.target.value)}/>
                <p>{errorUserName}</p>
                <input type="text" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <p>{errorPassword}</p>
                <button>SignUp</button>
            </form>
            <button><Link to = '/login'>Login</Link></button>
            <button><Link to = '/blogs'>Blogs</Link></button>
        </div>
    )
}

export default Signup
