import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './scheduleCandidate.scss'
import AlertDialogSlide from '../../components/Dialogue'
import { Autocomplete, TextField } from '@mui/material'
import { publicRequest } from '../../functions/requestMethods'

const ScheduleCandidate = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  //  FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS
  const [clients, setClients] = useState([])
  const getAllClients = async () => {
    try {
      const res = await publicRequest.get('Client/Client-list')

      if (res.data) {
        setClients(res.data.data)
        console.log(res.data)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // use effect to call the getAllClients function as the page loads
  useEffect(() => {
    getAllClients()
  }, [])
  // end of use effect to call the getAllClients function as the page loads
  //  END OF FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS

  //  FUNCTIONALITIES FOR FETCHING AND SETTING CANDIDATES
  const [candidates, setCandidates] = useState([])
  const getAllCandidates = async () => {
    try {
      const res = await publicRequest.get('Candidate')

      if (res.data) {
        setCandidates(res.data)
        console.log(res.data)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // use effect to call the getAllCandidates function as the page loads
  useEffect(() => {
    getAllCandidates()
  }, [])
  // end of use effect to call the getAllCandidates function as the page loads
  //  END OF FUNCTIONALITIES FOR FETCHING AND SETTING CANDIDATES

  // FUNCTIONALITY FOR SETTING SCHEDULE INFO
  const [scheduleInfo, setScheduleInfo] = useState({
    canditateId: '',
    candidateName: '',
    phoneNumber: '',
    createdDate: '',
    email: '',
    address: '',
    appointmentdate: '',
    clientid: '',
    testcategory: '',
  })

  // functionaliies for setting and updating candidate
  // function for updating candidate info after selecting candidate
  const getSelectedCandidate = (e, title, data) => {
    console.log(data)
    const date = new Date().toISOString()
    setScheduleInfo({
      canditateId: data?.canditateId,
      candidateName: data?.candidateName,
      phoneNumber: data?.phoneNumber,
      createdDate: date,
      email: data?.email,
      address: data?.address,
      appointmentdate: '',
      clientid: '',
      testcategory: '',
    })
  }

  // end of functionaliies for setting and updating candidate

  // END OF FUNCTIONALITY FOR SETTING SCHEDULE INFO
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
        {/* <h3>Schedule Candidate</h3> */}
        <div className='scheduleCandidateMainWrapper'>
          <div className='scheduleCandidateFormWrapper'>
            <div className='inputsWrapper'>
              <div className='singleInput'>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={clients}
                  getOptionLabel={(option) =>
                    `${option.clientName} ${option.email}`
                  }
                  // onChange={(e, option) =>
                  //   handleTestCategoryInfo(e, 'clientId', option)
                  // }
                  sx={{ width: 400 }}
                  renderInput={(params) => (
                    <TextField {...params} label='Client Name' />
                  )}
                />
              </div>
              <div className='singleInput'>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={candidates}
                  getOptionLabel={(option) =>
                    `${option.candidateName}       ${option.email}`
                  }
                  onChange={(e, option) =>
                    getSelectedCandidate(e, 'clientId', option)
                  }
                  sx={{ width: 400 }}
                  renderInput={(params) => (
                    <TextField {...params} label='Candidate Name' />
                  )}
                />
              </div>
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
