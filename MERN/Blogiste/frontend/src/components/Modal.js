import { Button, Typography,Modal, TextField } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import { Box } from '@mui/system'
import React from 'react'


const useStyles = makeStyles({
    modal : {
        marginTop : 100
    },

})

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

function ModalComponent() {

    const classes = useStyles()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={classes.modal}>
        <Button onClick={handleOpen}>Open modal</Button>
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
            />
            <TextField
                label='Blog'
                sx={{mt:1,width:400}}
                multiline
                rows={4}
            /> <br />
            <Button
                sx={{mt:1,ml:20}}
                variant='contained'
            >
                Done
            </Button>
          </Box>
        </Modal>
      </div>
    )
}

export default ModalComponent
