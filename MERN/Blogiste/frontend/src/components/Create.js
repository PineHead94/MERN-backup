import { Button, TextField, Typography } from '@mui/material'
import { Card, CardContent, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import {makeStyles} from '@material-ui/core'
import { Box } from '@mui/system'
import axios from 'axios'


const useStyles = makeStyles({
    warning :{
        marginTop : 60,
        backgroundColor : '#f4f4f4',
        height: '100vh'
    },
    inputfields : {
        display : 'flex',
        flexDirection : 'column',
        width : 400,
        marginTop : 20
    },

})

function Create() {
    const classes = useStyles()

    const [ author,setAuthor ] = useState(localStorage.getItem('user'))
    const [ title,setTitle ] = useState('')
    const [ blog,setBlog ] = useState('')
    const [ blogSaved,setBlogSaved ] = useState(false)


    const blogSavedAnimation = () => {
        setBlogSaved(true)
        setTimeout(() => {
            setBlogSaved(false)
        },[3000])
    }

    const createButton = () => {
        const token = localStorage.getItem('token')
        axios.defaults.withCreadentials = true
        axios.post('http://localhost:8000/blogs/create',{ author,title,blog },{
            headers : {
                'x-auth-token':`${token}`,
                'Content-type':'application/json'
            }
        })
            .then(res => {
                if(res.data.res){
                    blogSavedAnimation()
                }
            })
            .catch(err => console.log(err))
    }

    if(!localStorage.getItem('token')){
        return (
            <div className={classes.warning}>
                <Card 
                sx={{width:300,mx:'auto'}}
                >
                <CardHeader 
                    title={'You are not logged in'}
                />

                <CardContent>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        sx={{mx:5}}
                    >
                        Log in to create a new Blog
                    </Typography>
                </CardContent>
            </Card>
            </div>
        )
    } else {
        return (
            <div className={classes.root}>
                <Box sx={{mt:10,mx:'20vw'}}>
                <form>
                <Typography
                    variant='h4'
                >Create a new Blog!</Typography>
                <div className={classes.inputfields}>
                <TextField 
                    disabled
                    label="Author's Name"
                    required
                    onChange={(e)=>setAuthor(e.target.value)}
                    value={localStorage.getItem('user')}
                ></TextField><br />
                <TextField 
                    label="Title"
                    required
                    onChange={(e)=>setTitle(e.target.value)}
                /> <br />
                <TextField 
                    label="Blog"
                    variant='outlined'
                    required
                    multiline
                    onChange={(e)=>setBlog(e.target.value)}
                    rows={4}
                />
                </div>
                <Box sx={{ml:18,mt:4}}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={createButton}
                    >
                        Create
                    </Button>
                </Box>
                </form>
                <div>
                    {blogSaved && <h5>Blog Saved!</h5>}
                </div>
                </Box>
            </div>
        )
    }


}

export default Create
