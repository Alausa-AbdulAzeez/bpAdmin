import React, { useEffect, useState } from 'react'
import './manageCandidates.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import { Autocomplete, Box, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { MdCancel, MdEdit } from 'react-icons/md'
import { BsTrashFill } from 'react-icons/bs'
import { privateRequest, publicRequest } from '../../functions/requestMethods'
import Loading from '../../components/loading/Loading'
import ErrorComponent from '../../components/error/Error'
import { format } from 'date-fns'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { RxReload } from 'react-icons/rx'
import DatePicker from 'react-datepicker'
import AlertDialogSlide from '../../components/Dialogue'
import { useSelector } from 'react-redux'

const ManageCandidates = () => {
  // MISCELLANEOUS
  const toastId = React.useRef(null)
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  // PAGE SIZE OF TABLE
  const [pageSize, setPageSize] = useState(5)

  // CLIENTS DATA
  const [clients, setClients] = useState([])
  const [clientId, setClientId] = useState(null)

  // CANDIDATE'S PHONE NUMBER
  const [phoneNumber, setPhoneNumber] = useState('')

  // CANDIDATE TO BE EDITED INFO
  const [candidateToBeEdited, setCandidateToBeEdited] = useState(null)
  // CANDIDATE TO BE DELETED INFO
  const [candidateToBeDeleted, setCandidateToBeDeleted] = useState(null)

  // SLIDE POSITION
  const [position, setPosition] = useState('-100%')

  // DATA TO BE DISPLAYED IN THE INPUTS AND SENT TO THE BACKEND
  const [updatedCandidateInfo, setUpdatedCandidateInfo] = useState(null)

  // DATE SELECTION
  const [startDate, setStartDate] = useState()

  // TEST CATEGORY LIST
  const [testCategory, setTestCategory] = useState([])

  // DATA FOR TOGGLE ALERT
  const [open, setOpen] = React.useState(false)

  // TABLE COLUMN DATA
  const columns = [
    {
      field: 'candidateName',
      headerName: 'Name',
      width: 200,
      editable: false,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 120,
      editable: false,
    },
    {
      field: 'appointmentdate',
      headerName: 'Appointment Date',
      width: 100,
      editable: false,
      description: 'The candidate shoul be present by this date',
      renderCell: (props) => {
        const refinedDate = new Date(props?.value)
        const dateWithRightFormat = format(refinedDate, 'dd-MMM-yyyy')
        return <div>{dateWithRightFormat}</div>
      },
    },
    {
      field: 'testcategory',
      headerName: 'Test Category',
      width: 100,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      editable: false,
    },

    {
      field: 'createdDate',
      headerName: 'Date Created',
      width: 100,
      editable: false,
      renderCell: (props) => {
        const refinedDate = new Date(props?.value)
        const dateWithRightFormat = format(refinedDate, 'dd-MMM-yyyy')
        return <div>{dateWithRightFormat}</div>
      },
    },
    {
      field: 'fullName',
      headerName: 'Action',

      sortable: false,
      width: 260,
      renderCell: (props) => {
        return (
          <div className='buttons'>
            <div
              className='editWrapper'
              style={{ cursor: 'pointer' }}
              onClick={() => showSlide(props)}
            >
              <div className='edit'>Edit</div>
              <MdEdit className='editIcon' />
            </div>
            <div className='deleteWrapper' style={{ cursor: 'pointer' }}>
              <div
                className='delete'
                style={{ cursor: 'pointer' }}
                onClick={() => handleClickOpen(props)}
              >
                Delete
              </div>
              <BsTrashFill className='deleteIcon' />
            </div>
          </div>
        )
      },
    },
  ]

  // TABLE ROW DATA
  const [rows, setRows] = useState([
    // {
    //   candidateName: 'Alausa Abdulazeez',
    //   phoneNumber: 12345678,
    //   appointmentdate: '1 Jann 2023',
    //   testcategory: 'Pre employment',
    //   status: 'PENDING',
    //   createdDate: '1 Jann 2023',
    //   id: 1,
    // },
  ])
  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  // FUNCTION TO GET AND SET ALL CANDIDATES
  const getAllCandidates = async () => {
    try {
      setLoading(true)
      const res = await privateRequest.get('/Candidate', {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data) {
        setRows(res.data?.data?.reverse())
        setLoading(false)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      setLoading(false)
      setError(true)
      setErrorMessage(error)

      console.log(error)
    }
  }
  // END OF FUNCTION TO GET AND SET ALL CANDIDATES
  //  FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS

  const getAllClients = async () => {
    try {
      const res = await publicRequest.get('Client/Client-list')

      if (res.data) {
        setClients(res.data.data)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //  END OF FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS

  // FUNCTION FOR SETTING CLIENT ID
  const handlescheduleCandidateInfo = (e, dataName, data) => {
    setClientId(data?.clientId)
  }
  //END OF FUNCTION FOR SETTING CLIENT ID

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  useEffect(() => {
    getAllCandidates()
  }, [])

  // use effect to call the getAllClients function as the page loads
  useEffect(() => {
    getAllClients()
  }, [])
  // end of use effect to call the getAllClients function as the page loads

  // FUNCTION TO HANDLE PHONE NUMBER CHANGE
  const handlePhoneNumberChange = (e) => {
    // console.log(e.target?.value)
    setPhoneNumber(e.target?.value)
  }
  // END OF FUNCTION TO HANDLE PHONE NUMBER CHANGE

  // FUNCTION TO HANDLE CANDIDATE SEARCH
  const handleCandidateSearch = async () => {
    toastId.current = toast('Please wait...', {
      autoClose: 3000,
      isLoading: true,
    })
    try {
      const res = await publicRequest.get(
        `Candidate/SearchByPhoneNumber?Clientid=${clientId}&phone=${phoneNumber?.trim()}`,
        {
          headers: {
            Accept: '*',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(clientId)
      console.log(phoneNumber)

      if (res?.data?.data?.length === 0) {
        throw new Error('Candidate not found')
      } else {
        toast.update(toastId.current, {
          render: 'Candidate found!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
        setRows(res?.data?.data)
      }
    } catch (error) {
      console.log(error.message)
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
  // END FUNCTION TO HANDLE CANDIDATE SEARCH

  // SLIDE FUNCTIONALITIES

  //functionalities to get and set candidate to be updated

  // function to get and set candidate
  // const getCandidate = async (candidate) => {
  //   const {
  //     clientid: candidateToBeEditedId,
  //     phoneNumber: candidateToBeEditedhoneNumber,
  //   } = candidate
  //   try {
  //     const res = await publicRequest.get(
  //       `Candidate/SearchByPhoneNumber?Clientid=${candidateToBeEditedId}&phone=${candidateToBeEditedhoneNumber}`
  //     )
  //     setCandidateToBeEdited(res?.data?.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // function to get and set candidate

  //end of functionality to get and set candidate to be updated

  // handlerowclick function
  const showSlide = (props) => {
    // getCandidate(props?.row)
    setCandidateToBeEdited(props?.row)
    setUpdatedCandidateInfo(props?.row)
    console.log(props)
    if (position !== '0') {
      setPosition('0')
    }
  }
  // end of  handlerowclick function

  // hide slide function
  const handleHideSlide = () => {
    setPosition('-100%')
  }
  // end of hide slide function

  // END OF SLIDE FUNCTIONALITIES

  // DATE SELECTION AND CHANGE FUNCTIONALITIES
  // function for handling date chande
  const handleDateChange = (selectedDate) => {
    setStartDate(selectedDate)
    setUpdatedCandidateInfo((prev) => {
      return {
        ...prev,
        appointmentdate: selectedDate?.toISOString(),
      }
    })

    // end of function for handling date chande
  }
  // END OF DATE SELECTION AND CHANGE FUNCTIONALITIES

  // function for seting candidate info
  const handleUpdateCandidateInfo = (e, dataName, data) => {
    if (dataName === 'testCategory') {
      setUpdatedCandidateInfo((prev) => {
        return {
          ...prev,
          testcategory: data?.categoryName,
        }
      })
    } else {
      setUpdatedCandidateInfo((prev) => {
        return {
          ...prev,
          [dataName]: e.target.value,
        }
      })
    }
  }
  // end of function for seting candidate info

  // UPDATE USER FUNCTION
  const handleUpdateUser = async () => {
    console.log(updatedCandidateInfo)
    toastId.current = toast('Please wait...', {
      autoClose: 3000,
      isLoading: true,
    })

    try {
      await publicRequest
        .put(
          `Candidate/EditbyID?Candidateid=${candidateToBeEdited?.candidateId}`,
          updatedCandidateInfo
        )
        .then(() => {
          toast.update(toastId.current, {
            render: 'Candidate updated succesfully!',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          })
        })
        .then(() => {
          getAllCandidates().then(() => {
            setPosition('-100%')
          })
          // setPosition("-100%");
        })
      // .then(() => {

      //   window.location.reload();
      // });
    } catch (error) {
      console.log(error)
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
  // END OF UPDATE USER FUNCTION

  //  FUNCTIONALITIES FOR FETCHING AND SETTING TEST CATEGORIES

  // function to get all TestCategories
  const getAllTestCategories = async () => {
    try {
      const res = await publicRequest.get(
        `Test/test-category/${updatedCandidateInfo.clientid}`
      )

      if (res.data) {
        setTestCategory(res.data.data)
        console.log(res.data)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // end of function to get all TestCategories

  useEffect(() => {
    getAllTestCategories()
  }, [updatedCandidateInfo])

  //  END OF FUNCTIONALITIES FOR FETCHING AND SETTING TEST CATEGORIES

  // FUNCTIONS TO TOGGLE ALERT SLIDE
  const handleClickOpen = (props) => {
    setOpen(true)
    setCandidateToBeDeleted(props)
  }

  const handleClose = () => {
    setOpen(false)
  }
  // END OF FUNCTIONS TO TOGGLE ALERT SLIDE

  // FUNCTION TO DELETE SINGLE CANDIDTE
  const handleDeleteCandidate = async () => {
    console.log(candidateToBeDeleted)
    try {
      await publicRequest
        .delete(
          `Candidate/DeleteByID?Candidateid=${Number(
            candidateToBeDeleted?.row?.candidateId
          )}`
        )
        .then((res) => {
          toast.success('Candidate deleted successfully', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setOpen(false)
        })
        .then(() => {
          return getAllCandidates()
        })
    } catch (error) {
      console.log(error)
      toast.error('Could not delete candidate. Try again', {
        position: 'top-right',
        // autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      setOpen(false)
    }
  }
  // END OF FUNCTION TO DELETE SINGLE CANDIDTE
  return (
    <>
      <ToastContainer />
      <div className='manageCandidatesWrapper'>
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          title='Delete'
          link='/scheduleCandidate'
          message='Warning!! Are you sure you want to delete this candidate? Action cannot be undone'
          action={handleDeleteCandidate}
        />
        <Sidebar />
        <div className='manageCandidatesRight'>
          <Topber />
          {loading || error ? (
            loading ? (
              <Loading />
            ) : (
              <ErrorComponent errorMessage={errorMessage && errorMessage} />
            )
          ) : (
            <>
              <div className='manageCandidatesMainWrapper'>
                <div className='manageCandidatesMainTop'>
                  <h3>All Tests</h3>
                  <div className='manageCandidatesMainTopForm'>
                    <div className='formAndSearchWrapperMc'>
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
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label='Client Name' />
                        )}
                      />
                      <TextField
                        id='outlined-search'
                        label="Candidate's PhoneNo"
                        type='search'
                        className='candidateName'
                        onChange={(e) => handlePhoneNumberChange(e)}
                      />
                      <div
                        className='manageCandidatesBtn'
                        onClick={handleCandidateSearch}
                      >
                        Search
                      </div>
                    </div>
                    <button className='reloadBtn' onClick={getAllCandidates}>
                      Show All
                      <span>
                        <RxReload className='reloadIcon' />
                      </span>
                    </button>
                  </div>
                </div>
                <div
                  className='manageCandidatesSlide'
                  style={{
                    right: position,
                    visibility: position === '0' && 'visible',
                  }}
                >
                  <div className='slideTop'>
                    <div className='cancelconWrapper' onClick={handleHideSlide}>
                      <MdCancel className='cancelIcon' />
                    </div>
                    <div className='initials'>
                      {console.log(candidateToBeEdited)}
                      {candidateToBeEdited?.candidateName[0]}
                    </div>
                    <div className='slideFullname'>
                      {candidateToBeEdited?.candidateName}
                    </div>
                  </div>
                  <div className='slideMiddle'>
                    <div className='companyName h3 companyDetail'>
                      <h3>Email</h3>
                      <p>{candidateToBeEdited?.email}</p>
                    </div>

                    <div className='phoneNo h3 companyDetail'>
                      <h3>Phone Number</h3>
                      <p>{candidateToBeEdited?.phoneNumber}</p>
                    </div>
                    <div className='companyName h3 companyDetail'>
                      <h3>Date Created</h3>
                      <p>
                        {candidateToBeEdited &&
                          format(
                            new Date(candidateToBeEdited?.createdDate),
                            'dd-MMM-yyyy'
                          )}
                      </p>
                    </div>

                    <div className='phoneNo h3 companyDetail'>
                      <h3>Appointment Date</h3>
                      <p>
                        {candidateToBeEdited &&
                          format(
                            new Date(candidateToBeEdited?.appointmentdate),
                            'dd-MMM-yyyy'
                          )}
                      </p>
                    </div>
                    <div className=' h3 companyDetail'>
                      <h3>Address</h3>
                      <p>{candidateToBeEdited?.address}</p>
                    </div>
                    <div className=' h3 companyDetail'>
                      <h3>Test Category</h3>
                      <p>{candidateToBeEdited?.testcategory}</p>
                    </div>
                  </div>
                  <div className='updateUserSlideBottom'>
                    <div className='updateUserInputWrapper'>
                      <label htmlFor='email'>Email</label>
                      <input
                        type='text'
                        id='email'
                        className='updateUserInput'
                        value={updatedCandidateInfo?.email}
                        onChange={(e) => handleUpdateCandidateInfo(e, 'email')}
                      />
                    </div>
                    <div className='updateUserInputWrapper'>
                      <label htmlFor='phoneNo'>Phone Number</label>
                      <input
                        type='text'
                        id='phoneNo'
                        className='updateUserInput'
                        value={updatedCandidateInfo?.phoneNumber}
                        onChange={(e) =>
                          handleUpdateCandidateInfo(e, 'phoneNumber')
                        }
                      />
                    </div>
                    <div className='updateUserInputWrapper'>
                      <label htmlFor='address'>Address</label>
                      <input
                        type='text'
                        id='address'
                        className='updateUserInput'
                        value={updatedCandidateInfo?.address}
                        onChange={(e) =>
                          handleUpdateCandidateInfo(e, 'address')
                        }
                      />
                    </div>
                    <div className='updateUserInputWrapper'>
                      <label
                        htmlFor='testCategory'
                        style={{ visibility: 'hidden' }}
                      >
                        Test Category
                      </label>
                      {/* <input
              type='text'
              id='testCategory'
              className='updateUserInput'
              value={updatedCandidateInfo?.testcategory}
              onChange={(e) =>
                handleUpdateCandidateInfo(e, 'testcategory')
              }
            /> */}

                      <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={testCategory}
                        getOptionLabel={(option) => `${option.categoryName}`}
                        onChange={(e, option) =>
                          handleUpdateCandidateInfo(e, 'testCategory', option)
                        }
                        sx={{ width: 300, alignSelf: 'flex-end' }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder={updatedCandidateInfo?.testcategory}
                          />
                        )}
                        renderOption={(props, option) => {
                          return (
                            <li {...props} key={option.id}>
                              {option.categoryName}
                            </li>
                          )
                        }}
                      />
                    </div>
                    <div className='updateUserInputWrapper'>
                      <label htmlFor='email'>Appointment Date</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(selectedDate) =>
                          handleDateChange(selectedDate)
                        }
                        dateFormat='MMMM d, yyyy'
                        className='updateUserDatePicker'
                        showMonthDropdown
                        showYearDropdown
                        minDate={new Date()}
                        placeholderText={
                          candidateToBeEdited &&
                          format(
                            new Date(candidateToBeEdited?.appointmentdate),
                            'dd-MMM-yyyy'
                          )
                        }
                      />
                      {/* <input type='text' id='email' className='updateUserInput' /> */}
                    </div>
                  </div>
                  <div className='updateUserBtn' onClick={handleUpdateUser}>
                    Update
                  </div>
                </div>
                <div className='partnerLabsMainBottom'>
                  <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={pageSize}
                      checkboxSelection
                      disableSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}
                      onPageSizeChange={(newPageSize) =>
                        setPageSize(newPageSize)
                      }
                      rowsPerPageOptions={[5, 10, 20]}
                      pagination
                      getRowId={(row) => row?.candidateId}
                    />
                  </Box>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ManageCandidates
