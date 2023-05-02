import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './scheduleCandidate.scss'
import AlertDialogSlide from '../../components/Dialogue'

const ScheduleCandidate = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className='scheduleCandidateWrapper'>
      <AlertDialogSlide
        open={open}
        handleClose={handleClose}
        title='Cancel'
        link='/manageClients'
        message='Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost.'
      />
      <Sidebar />
      <div className='scheduleCandidateRight'>
        <Topber />
        <div className='scheduleCandidateMainWrapper'>
          <div className='scheduleCandidateFormWrapper'>
            <div className='inputsWrapper'>
              <div className='singleInput'>
                <p>Client Name</p>
                <div className='inputWrapper'>
                  <input type='text' className='input' />
                </div>
              </div>
              <div className='singleInput'>
                <p>Address</p>
                <div className='inputWrapper'>
                  <input type='text' className='input' />
                </div>
              </div>
              <div className='singleInput'>
                <p>Email</p>
                <div className='inputWrapper'>
                  <input type='email' className='input' />
                </div>
              </div>
              <div className='singleInput'>
                <p>Phone Number</p>
                <div className='inputWrapper'>
                  <input type='number' className='input' />
                </div>
              </div>
              <div className='singleInput'>
                <p>Date</p>
                <div className='inputWrapper'>
                  <input type='text' className='input' />
                </div>
              </div>
            </div>
            <div className='bottomButtons'>
              <button className='cancelClientEditBtn' onClick={handleClickOpen}>
                Cancel
              </button>
              <button className='scheduleCandidateEditBtn'>Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleCandidate
