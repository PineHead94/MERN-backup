import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router-dom'

function Logout() {
    let history = useHistory()
    const handleLogout = () => {
        axios.get('http://localhost:5000/logout')
            .then((res) => {
                if(res.data === '/'){
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    history.push('/')
                }
            })
            .catch( err => console.log(err))
    }
    return (
        <div>
            <button onClick={()=>handleLogout()}>Logout</button>
        </div>
    )
}

export default Logout
