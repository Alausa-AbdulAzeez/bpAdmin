import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './scheduleCandidate.scss'
import AlertDialogSlide from '../../components/Dialogue'
import { Autocomplete, TextField } from '@mui/material'
import { privateRequest, publicRequest } from '../../functions/requestMethods'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const ScheduleCandidate = () => {
  // MISCELLANEOUS
  const [open, setOpen] = React.useState(false)
  const date = new Date().toISOString()
  const toastId = React.useRef(null)

  // TO SET THE STATE OF TEST CATEGORY INPUT
  const [loadingTestCategory, setLoadingTestCategory] = useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  // END OF MISCELLANEOUS

  // DATE SELECTION AND CHANGE FUNCTIONALITIES
  const [startDate, setStartDate] = useState(new Date())
  // function for handling date chande
  const handleDateChange = (selectedDate) => {
    setStartDate(selectedDate)
    // end of function for handling date chande
  }
  // END OF DATE SELECTION AND CHANGE FUNCTIONALITIES

  //  FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS
  const [clients, setClients] = useState([])
  // function to get all clients
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
  // end of function to get all clients

  // use effect to call the getAllClients function as the page loads
  useEffect(() => {
    getAllClients()
  }, [])
  // end of use effect to call the getAllClients function as the page loads
  //  END OF FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS

  // FUNCTIONALITY FOR SETTING SCHEDULE INFO
  const [scheduleInfo, setScheduleInfo] = useState({
    candidateName: '',
    phoneNumber: '',
    createdDate: date,
    email: '',
    address: '',
    appointmentdate: startDate?.toISOString(),
    clientid: '',
    testcategory: '',
    status: 'PENDING',
  })

  // function for seting candidate info
  const [clientId, setClientId] = useState(null)
  const handlescheduleCandidateInfo = (e, dataName, data) => {
    if (dataName === 'test') {
      console.log(data)

      setScheduleInfo((prev) => {
        return {
          ...prev,
          testcategory: data?.categoryName,
        }
      })
    } else if (dataName === 'clientid') {
      setScheduleInfo((prev) => {
        return { ...prev, [dataName]: data?.clientId?.toString() }
      })
      setClientId(data?.clientId)
      setLoadingTestCategory(true)
    } else {
      setScheduleInfo((prev) => {
        return { ...prev, [dataName]: e.target.value }
      })
    }
  }
  // end of function for seting candidate info
  // useeffect for updating client id
  useEffect(() => {}, [clientId])
  // end of useeffect for updating client id

  // function for scheduling a candidate
  const handleScheduleCandidate = async (e) => {
    e.preventDefault()
    toastId.current = toast('Please wait...', {
      autoClose: 3000,
      isLoading: true,
    })
    console.log(scheduleInfo)

    try {
      await publicRequest.post('/Candidate', scheduleInfo).then((response) => {
        console.log(response)
        toast.update(toastId.current, {
          render: 'Test category created succesfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
      })
    } catch (error) {
      console.log(error.response)
      toast.update(toastId.current, {
        type: 'error',
        autoClose: 3000,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          'Something went wrong, please try again'
        }`,
      })
    }
  }
  // end of function for creating a test category

  // END OF FUNCTIONALITY FOR SETTING SCHEDULE INFO
  //  FUNCTIONALITIES FOR FETCHING AND SETTING TEST CATEGORIES
  const [testCategory, setTestCategory] = useState([])

  // function to get all TestCategories
  const getAllTestCategories = async () => {
    try {
      const res = await publicRequest.get(`Test/test-category/${clientId}`)

      if (res.data) {
        setTestCategory(res.data.data)
        console.log(res.data)
        setLoadingTestCategory(false)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // end of function to get all TestCategories

  // use effect to call the getAllTestCategories function as the page loads
  useEffect(() => {
    getAllTestCategories()
  }, [clientId])
  // end of use effect to call the getAllTestCategories function as the page loads
  //  END OF FUNCTIONALITIES FOR FETCHING AND SETTING TEST CATEGORIES

  return (
    <>
      <ToastContainer />
      <div className='scheduleCandidateWrapper'>
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          title='Cancel'
          link='/scheduleCandidate'
          message='Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost.'
        />
        <Sidebar />
        <div className='scheduleCandidateRight'>
          <Topber />
          {/* <h3>Schedule Candidate</h3> */}
          <div className='scheduleCandidateMainWrapper'>
            <form className='scheduleCandidateFormWrapper'>
              <div className='inputsWrapper'>
                <div className='singleInput autoComplete'>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={clients}
                    getOptionLabel={(option) =>
                      `${option.clientName} ${option.email}`
                    }
                    onChange={(e, option) =>
                      handlescheduleCandidateInfo(e, 'clientid', option)
                    }
                    sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label='Client Name' />
                    )}
                  />
                </div>
                <div className='singleInput autoComplete'>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={testCategory}
                    getOptionLabel={(option) => `${option.categoryName}`}
                    onChange={(e, option) =>
                      handlescheduleCandidateInfo(e, 'test', option)
                    }
                    sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label='Test Category' />
                    )}
                    disabled={loadingTestCategory}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.categoryName}
                        </li>
                      )
                    }}
                  />
                </div>
                <div className='singleInput'>
                  <p>Candidate Name</p>
                  <div className='inputWrapper'>
                    <input
                      type='text'
                      className='input'
                      required
                      onChange={(e) =>
                        handlescheduleCandidateInfo(e, 'candidateName')
                      }
                    />
                  </div>
                </div>

                <div className='singleInput'>
                  <p>Address</p>
                  <div className='inputWrapper'>
                    <input
                      type='text'
                      className='input'
                      required
                      onChange={(e) =>
                        handlescheduleCandidateInfo(e, 'address')
                      }
                    />
                  </div>
                </div>
                <div className='singleInput'>
                  <p>Email</p>
                  <div className='inputWrapper'>
                    <input
                      type='email'
                      className='input'
                      required
                      onChange={(e) => handlescheduleCandidateInfo(e, 'email')}
                    />
                  </div>
                </div>
                <div className='singleInput'>
                  <p>Phone Number</p>
                  <div className='inputWrapper'>
                    <input
                      type='number'
                      className='input'
                      required
                      onChange={(e) =>
                        handlescheduleCandidateInfo(e, 'phoneNumber')
                      }
                    />
                  </div>
                </div>
                <div className='singleInput'>
                  <p>Date</p>
                  <div className='inputWrapper'>
                    <DatePicker
                      selected={startDate}
                      onChange={(selectedDate) =>
                        handleDateChange(selectedDate)
                      }
                      dateFormat='MMMM d, yyyy'
                      className='datePicker'
                      showMonthDropdown
                      showYearDropdown
                      minDate={startDate}
                    />
                  </div>
                </div>
              </div>
              <div className='bottomButtons'>
                <button
                  className='cancelClientEditBtn'
                  onClick={handleClickOpen}
                >
                  Cancel
                </button>
                <button
                  className='scheduleCandidateEditBtn'
                  type='submit'
                  onClick={handleScheduleCandidate}
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ScheduleCandidate
