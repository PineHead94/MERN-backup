import { AppBar, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import { useNavigate,useLocation } from 'react-router-dom';

const drawerWidth = 240
const useStyles = makeStyles((theme) => {
    return {
        root : {
            background : '#f4f4f4'
        },
        drawer : {
            width : drawerWidth
        },
        layout : {
            marginLeft : drawerWidth,
        },
        active : {
            background : '#f4f4f4'
        },
        toolbar : theme.mixins.toolbar,
        appbar : {
            display : 'flex',
            justifyContent : 'center'
        }
    }
})


const listItem = [
    {
        name : 'Blogs',
        icon : <BookRoundedIcon color='tertiary' />,
        path : '/blogs'
    },
    {
        name : 'Create',
        icon : <NoteAddRoundedIcon color='primary' />,
        path : '/create'
    },
]


function Layout({ children }) {

    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()

    const user = localStorage.getItem('user')


    return (
        <div>
            {/* appbar */}
            <AppBar 
                className = {classes.appbar}
                sx={{width:`calc(100% - ${drawerWidth}px)`}}
                elevation={1}
            >
                <Toolbar>
                    <Typography variant='h6'>
                       {'Welcome'}
                    </Typography>
                    {user && 
                        <Typography variant='h6' sx={{ml:1}}>
                            {user}
                        </Typography>
                    }
                    {user&&
                        <Button
                            sx={{ml:'auto'}}
                            variant='contained'
                            color='secondary'
                            onClick={()=>{
                                localStorage.removeItem('user')
                                localStorage.removeItem('token')
                                navigate('/')
                            }}
                        >
                            Logout
                        </Button>
                    }
                    {!user&&location.pathname!=='/login'&&
                        <Button
                                variant='contained'
                                sx={{width:88,ml:'auto'}}
                                color='tertiary'
                                onClick={()=>navigate('/login')}
                            >
                                Login
                        </Button>
                    }
                    {!user&&location.pathname==='/login'&&
                        <Button
                                variant='contained'
                                sx={{width:88,ml:'auto'}}
                                color='secondary'
                                href='/'
                            >
                                Signup
                        </Button>
                    }
                </Toolbar>
            </AppBar>
            {/* sidebar */}
            <div>
            <Drawer
                variant='permanent'
                className = {classes.drawer}
                anchor='left'
                classes ={{ paper : classes.drawer }}
            >
                <Typography
                    variant='h5'
                    sx={{ mx : 'auto',mt:1 }}
                >
                    Blog Site
                </Typography>
                <List>
                    { listItem.map( item => (
                        <ListItem key={item.name}
                        className={location.pathname=== `${item.path}` ? classes.active : null}
                        button
                        onClick={()=>navigate(item.path)}
                        >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                    <ListItemText primary={item.name} />
                    </ListItem>
                    ) )}
                </List>    
            </Drawer>
            </div>
            <div className={classes.layout}>
            {/* <div className={classes.toolbar}></div> */}
                { children }
            </div>
        </div>
    )
}

export default Layout
