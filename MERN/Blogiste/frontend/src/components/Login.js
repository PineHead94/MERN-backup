import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Button, Card, CardContent, CardHeader,FormControl,IconButton,InputAdornment,InputLabel,OutlinedInput,TextField } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import { Visibility,VisibilityOff } from "@mui/icons-material"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
    root : {
        background : '#f4f4f4',
        height : '100vh',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    } 
})


function Login() {
    const navigate = useNavigate()
    const [ showPassword,setShowPassword ] = useState(false)
    const [ password,setPassword ] = useState('')
    const [ username,setUsername ] = useState('')
    const [ errorUsername,setErrorUsername ] = useState(null)
    const [ errorPassword,setErrorPassword ] = useState(null)

    const classes = useStyles()

    const handleLogin = () => {
        axios.defaults.withCredentials = true
        axios.post('http://localhost:8000/login',{ username,password })
            .then( res => {
                if(res.data.errors){
                    if(res.data.errors.username){
                        setErrorUsername(res.data.errors.username)
                    } else {
                        setErrorUsername(null)
                    }
                    if(res.data.errors.password){
                        setErrorPassword(res.data.errors.password)
                    } else {
                        setErrorPassword(null)
                    }
                } else {
                    localStorage.setItem('token',res.data.token)
                    localStorage.setItem('user',res.data.username)
                    navigate('/blogs')
                }
            })
            .catch( err => console.log(err) )
    }

    return (
        <div className={classes.root}>
            <Box sx={{width:400}}>
                <Card>
                    <CardHeader 
                        title='Login'
                    />
                    <CardContent>
                        <Box sx={{ml:6}}>
                        <TextField
                            variant='outlined'
                            label = 'Username'
                            sx={{width:257}}
                            onChange={(e)=>setUsername(e.target.value)}
                        /> <br />
                        <div>{errorUsername && <small>{errorUsername}</small>}</div>
                    <FormControl
                    sx={{mt:2}}
                    variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={()=>setShowPassword(prev => !prev)}
                                        edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        label="Password"
                    />
                    <div>{ errorPassword && <small>{ errorPassword }</small> }</div>
                </FormControl>
                        </Box>

                    <Box sx={{mt:3,ml:17}}>
                        <Button
                            variant='contained'
                            sx={{width:90}}
                            color='tertiary'
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Box>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default Login
