import React,{ useState } from 'react'
import axios from 'axios'


function Login() {
    const [ username,setUserName ] = useState(null)
    const [ password,setPassword ] = useState(null)
    const [ errorUserName,setErrorUserName ] = useState('')
    const [ errorPassword,setErrorPassword ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = { username,password }
        axios.defaults.withCredentials = true
        axios.post('http://localhost:5000/login', formData)
            .then((res) => {
                if(res.data.error){
                    setErrorUserName(res.data.error.username)
                    setErrorPassword(res.data.error.password)
                } else if(res.data.token){
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
            <h1>Login</h1>
            <form onSubmit={ (e) => handleSubmit(e)}>
                <input type="text" placeholder="username" name="username" onChange={(e) => setUserName(e.target.value)}/>
                <p>{errorUserName}</p>
                <input type="text" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <p>{errorPassword}</p>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login
