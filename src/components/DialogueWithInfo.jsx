import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function FormDialog() {
  const [openDialogueWithInfo, setOpenDialogueWithInfo] = React.useState(false)

  const handleOpenDialogueWithInfo = () => {
    setOpenDialogueWithInfo(true)
  }

  const handleCloseDialogueWithInfo = () => {
    setOpenDialogueWithInfo(false)
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleOpenDialogueWithInfo}>
        Open form dialog
      </Button>
      <Dialog open={openDialogueWithInfo} onClose={handleCloseDialogueWithInfo}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogueWithInfo}>Cancel</Button>
          <Button onClick={handleCloseDialogueWithInfo}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
