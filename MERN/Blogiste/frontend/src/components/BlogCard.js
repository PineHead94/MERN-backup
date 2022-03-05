import { Avatar, Button, Card, CardContent, CardHeader, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { parseJSON,format } from 'date-fns'
import DeleteOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import { Box } from '@mui/system'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };




function BlogCard({ blog,handleDelete,updateBlogs }) {

    const user = localStorage.getItem('user')

    const [open, setOpen] = useState(false);
    const [ editTitle,setEditTitle ] = useState('')
    const [ editBlog,setEditBlog ] = useState('')
    const handleOpen = (title,blog) => {
        setEditTitle(title)
        setEditBlog(blog)
        setOpen(true)
        // console.log(title,blog)
    }
    const handleClose = () => setOpen(false);

    const handleEdit = (id) => {
        const token = localStorage.getItem('token')
        axios.defaults.withCredentials = true
        axios.post('http://localhost:8000/blogs/edit/' + id,{ title:editTitle,blog:editBlog },{
            headers : {
                'x-auth-token':`${token}`,
                'Content-type':'application/json'
            }
        })
        .then((res) => {
            axios.get('http://localhost:8000/blogs',{
                headers : {
                    'x-auth-token':`${token}`,
                    'Content-type':'application/json'
                }
            })
            .then((res) => updateBlogs(res.data.blogs))
            .catch( err => console.log(err))
        })
        .catch( err => console.log(err))

        handleClose()
        
    }

    return (
        <div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                Edit
                </Typography>
                <TextField
                    label='Title'
                    sx={{mt:1,width:400}}
                    value={editTitle}
                    onChange={(e)=>setEditTitle(e.target.value)}
                />
                <TextField
                    label='Blog'
                    sx={{mt:1,width:400}}
                    multiline
                    rows={4}
                    value={editBlog}
                    onChange={(e)=>setEditBlog(e.target.value)}
                /> <br />
                <Button
                    sx={{mt:1,ml:20}}
                    variant='contained'
                    onClick={()=>handleEdit(blog._id)}
                >
                    Done
                </Button>
            </Box>
            </Modal>
            <Card>
                <CardHeader 
                    avatar={
                        <Avatar>
                            {blog.author[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <Box>
                            {user===blog.author ?
                                <div>
                                    <IconButton 
                                    onClick={()=>handleOpen(blog.title,blog.blog)}
                                    >
                                        <ModeEditIcon sx={{color:'info.main'}}/>
                                    </IconButton>
                                    <IconButton 
                                        onClick={()=>handleDelete(blog._id)}
                                >
                                        <DeleteOutlined sx={{color:'warning.main'}}/>
                                    </IconButton>
                                </div> 
                            : null}
                        </Box>
                    }
                    title={blog.title}
                    subheader={blog.author}
                />

                <CardContent>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                    >
                        {'Created On : ' + format(parseJSON(blog.updatedAt),'do MMMM Y')}
                    </Typography>
                    <Typography>
                        {blog.blog}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default BlogCard
