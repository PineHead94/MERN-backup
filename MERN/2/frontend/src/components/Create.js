import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

function Create() {
    const history = useHistory()

    const [ title,setTitle ] = useState('')
    const [ snippet,setSnippet ] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/blogs/create', { title,snippet })
            .then( res => {
                if(res.data === '/'){
                    history.push('/')
                }
            })
            .catch( err => console.log(err))
    }
    return (
        <div>
            <form>
                <input type="text" placeholder='title' name='title' onChange={(e) => setTitle(e.target.value)}/>
                <input type="text" placeholder='snippet' name='snippet' onChange={(e) => setSnippet(e.target.value)}/>
                <button onClick={(e)=>handleSubmit(e)} >Submit</button>
            </form>          
        </div>
    )
}

export default Create
