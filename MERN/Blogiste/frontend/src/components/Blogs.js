import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader,Typography } from '@mui/material'
import { Container } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import Masonry from 'react-masonry-css'
import BlogCard from './BlogCard'

const useStyles = makeStyles((theme)=>{
    return {
        root :{
            marginTop : 60,
            backgroundColor : '#f4f4f4'
        },
        warning :{
            marginTop : 60,
            backgroundColor : '#f4f4f4',
            height:'100vh'
        },
    }
})

function Blogs() {

    const classes = useStyles()

    const [ blogs,setBlogs ] = useState([])
    const [ isLoading,setIsLoading ] = useState(true)

    const breakpoints = {
        default : 3,
        1100: 2,
        900 : 1
    }

    useEffect(()=>{
        setIsLoading(true)
        const token = localStorage.getItem('token')
        if(token){
            axios.defaults.withCredentials = true
            axios.get('http://localhost:8000/blogs',{
                headers : {
                    'x-auth-token': `${token}`,
                    'Content-type': 'application/json'
                }
            })
            .then( res => {
                setBlogs(res.data.blogs)
                setIsLoading(false)
            })
            .catch( err => console.logl(err))
        }
    },[])


    const handleDelete = (id) => {
        const token = localStorage.getItem('token')
        axios.defaults.withCredentials = true
        axios.delete('http://localhost:8000/blogs/delete/' + id,{
            headers : {
                'x-auth-token':`${token}`,
                'Content-type':'application/json'
            }
        }).then((res) => {
            const newBlogs = blogs.filter( item => item._id !== id)
            setBlogs(newBlogs)
        })
        .catch( err => console.log(err))
    }

    const updateBlogs = (newBlogs) => {
        setBlogs(newBlogs)
    }

    if(isLoading){
        if(localStorage.getItem('user')){
            return (
                <div className={classes.warning}>
                    <h3>Loading Blogs...</h3>
                </div>
            )
        } else {
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
                                sx={{mx:8}}
                            >
                                Log in to view Blogs
                            </Typography>
                        </CardContent>
                    </Card>
            </div>
            )
        }
    } else {
        return (
            <div className={classes.root} >
                
                <Container>
                    <Masonry
                        breakpointCols={breakpoints}
                        className='my-masonry-grid'
                        columnClassName='my-masonry-grid_column'
                    >
                    {blogs.map(blog => {
                        return (
                            <div key={blog._id}>
                                <BlogCard blog={blog} handleDelete={handleDelete} updateBlogs={updateBlogs}/>
                            </div>
                        )
                    })}
                    </Masonry>
                </Container>
            </div>
        )
    }
}

export default Blogs
