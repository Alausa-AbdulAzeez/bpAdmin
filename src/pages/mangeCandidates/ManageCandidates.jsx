import React, { useEffect, useState } from 'react'
import './manageCandidates.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import { Autocomplete, Box, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { MdCancel, MdEdit } from 'react-icons/md'
import { BsTrashFill } from 'react-icons/bs'
import { publicRequest } from '../../functions/requestMethods'
import Loading from '../../components/loading/Loading'
import ErrorComponent from '../../components/error/Error'
import { format } from 'date-fns'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import DatePicker from 'react-datepicker'
import AlertDialogSlide from '../../components/Dialogue'
import { useSelector } from 'react-redux'

const ManageCandidates = () => {
  // MISCELLANEOUS
  const toastId = React.useRef(null)
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  // PAGE SIZE OF TABLE
  const [pageSize, setPageSize] = useState(100)

  // SELECTED CANDIDATE
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  // CLIENTS DATA
  const [clients, setClients] = useState([])
  const [clientId, setClientId] = useState(null)

  // CANDIDATE'S PHONE NUMBER
  const [phoneNumber, setPhoneNumber] = useState('')

  // CANDIDATE TO BE EDITED INFO
  const [candidateToBeEdited, setCandidateToBeEdited] = useState(null)
  // CANDIDATE TO BE DELETED INFO
  const [candidateToBeDeleted, setCandidateToBeDeleted] = useState(null)

  // ALL LABORATORIES
  const [laboratories, setLaboratories] = useState([])

  // ALL LABORATORIES
  const [selectedLab, setSelectedLab] = useState('')

  // DISABLE SLIDE INPUT PROPERTIES
  const [disableCandidateProperties, setDisableCandidateProperties] =
    useState(false)

  // SLIDE POSITION
  const [position, setPosition] = useState('-100%')

  // TO SET THE STATE OF THE UPDATE BUTTON
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(false)

  // DATA TO BE DISPLAYED IN THE INPUTS AND SENT TO THE BACKEND
  const [updatedCandidateInfo, setUpdatedCandidateInfo] = useState(null)

  // DATE SELECTION
  const [startDate, setStartDate] = useState(null)

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
      field: 'laboratory',
      headerName: 'Screening Location',
      width: 250,
      editable: false,
      renderCell: (props) => {
        return (
          <div className='changeLaboratory'>
            {console.log(props)}
            <div className='labLocation'>{props?.row?.laboratory}</div>
            {/* <div
              className='changeBtn'
              style={{ cursor: 'pointer' }}
              onClick={() => showSlide(props)}
            >
              
            </div> */}
            <MdEdit
              className='editLocationIcon'
              onClick={() => showSlide(props, 'disabled')}
            />
          </div>
        )
      },
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 150,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
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
              onClick={() => showSlide(props, 'notDisabled')}
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
  const [rows, setRows] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const [filters, setFilters] = useState({
    clientId: '',
    phoneNumberOrName: '',
    date: '',
  })

  // INPUT VALUE
  const [inputValue, setInputValue] = useState('')

  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  // FUNCTION TO GET AND SET ALL CANDIDATES
  const getAllCandidates = async () => {
    setStartDate(null)
    setFilters({ clientId: '', phoneNumberOrName: '', date: '' })

    try {
      setLoading(true)
      const res = await publicRequest.get('/Candidate', {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data) {
        console.log(res.data?.data)

        setRows(res.data?.data?.reverse())
        setFilteredData(res.data?.data?.reverse())

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
      const res = await publicRequest.get('Client/Client-list', {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
        },
      })

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

  // FUNCTION TO HANDLE INPUT CHANGES
  const handleInputChange = (event, name, data) => {
    if (name === 'phoneNumberOrName') {
      setFilters({ ...filters, [name]: event?.target?.value?.trim() })
    }
    if (name === 'date') {
      setStartDate(data)
      setFilters({ ...filters, [name]: data })
    }
    if (name === 'clientId') {
      setFilters({ ...filters, [name]: data?.clientId })
    }
    // setFilters({ ...filters, [name]: value.trim() });
  }
  // END OF FUNCTION TO HANDLE INPUT CHANGES

  // FUNCTION TO FILTER DATA
  const filterData = () => {
    console.log(rows)
    const filteredData = rows.filter((item) => {
      const { clientId, phoneNumberOrName, date } = filters
      console.log(clientId, phoneNumberOrName, date)

      const correctDate = new Date(date)

      console.log(correctDate.toLocaleString())
      const month = (date && date?.getMonth() + 1).toString().padStart(2, '0')

      const year = date && date?.getFullYear()

      const newString = year && month ? year + '-' + month : ''
      console.log(newString)

      // const newString =
      //   correctDate.toLocaleString().split(",")[0].split("/")[2] +
      //   "-" +
      //   "0" +
      //   correctDate.toLocaleString().split(",")[0].split("/")[0];

      const itemCompanyId = item?.clientid?.toString().includes(clientId)
      const itemPhoneNumber = item?.phoneNumber
        ?.toString()
        .includes(phoneNumberOrName)
      const itemName = item?.candidateName
        ?.toLowerCase()
        .includes(phoneNumberOrName.toLowerCase())
      const itemDate = item?.createdDate?.substring(0, 7).includes(newString)
      console.log(itemDate)
      return (
        (clientId === '' || itemCompanyId) &&
        (phoneNumberOrName === '' || itemPhoneNumber || itemName) &&
        (date === '' || itemDate)
      )
    })
    console.log(filteredData)
    setFilteredData(filteredData)
  }
  // END OF FUNCTION TO FILTER DATA

  // FUNCTION TO HANDLE PHONE NUMBER CHANGE
  const handlePhoneNumberChange = (e) => {
    // console.log(e.target?.value)
    setPhoneNumber(e.target?.value)
  }
  // END OF FUNCTION TO HANDLE PHONE NUMBER CHANGE

  // function to get all Laboratories
  const getAllLaboratories = async () => {
    try {
      const res = await publicRequest.get(`/Laboratory`, {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data) {
        setLaboratories(res?.data?.data)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // end of function to get all Laboratories

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
  const showSlide = (props, state) => {
    // getCandidate(props?.row)
    setCandidateToBeEdited(props?.row)
    setUpdatedCandidateInfo(props?.row)
    if (position !== '0') {
      setPosition('0')
      if (state === 'notDisabled') {
        setDisableCandidateProperties(false)
      }
      if (state === 'disabled') {
        setDisableCandidateProperties(true)
      }
    }
  }
  // end of  handlerowclick function

  // hide slide function
  const handleHideSlide = () => {
    setPosition('-100%')
  }
  // end of hide slide function

  // END OF SLIDE FUNCTIONALITIES

  // FUNCTION TO HANDLE ROW CLICK
  const handleRowClick = (row) => {
    setSelectedCandidate(row?.row)
    setStartDate(new Date(row?.row?.appointmentdate))
  }
  // END OF FUNCTION TO HANDLE ROW CLICK

  // FUNCTION TO HANDLE LAB SELECTION (SLIDE)
  const handleLabSelection = (row) => {
    console.log(row)
    setSelectedLab(row?.id)
  }
  // END OF FUNCTION TO HANDLE LAB SELECTION (SLIDE)

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
    console.log('updateee')
    toastId.current = toast('Please wait...', {
      autoClose: 3000,
      isLoading: true,
    })

    setDisableUpdateBtn(true)

    try {
      await publicRequest
        .put(
          `Candidate/EditbyCID?Candidateid=${candidateToBeEdited?.candidateId}`,
          updatedCandidateInfo,
          {
            headers: {
              Accept: '*',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.update(toastId.current, {
            render: 'Candidate updated succesfully!',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          })
          setDisableUpdateBtn(true)
        })
        .then(async () => {
          await getAllCandidates().then(() => {
            setPosition('-100%')
          })
        })
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
      setDisableUpdateBtn(true)
    }
  }
  // END OF UPDATE USER FUNCTION

  // UPDATE SCREENING LOCATION FUNCTION
  const handleUpdateScreeningLocation = async () => {
    toastId.current = toast('Please wait...', {
      autoClose: 3000,
      isLoading: true,
    })

    setDisableUpdateBtn(true)

    try {
      await publicRequest
        .put(
          `Candidate/route/${candidateToBeEdited?.candidateId}/${selectedLab}`,
          updatedCandidateInfo,
          {
            headers: {
              Accept: '*',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.update(toastId.current, {
            render: 'Candidate updated succesfully!',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          })
          setDisableUpdateBtn(false)
        })
        .then(async () => {
          await getAllCandidates().then(() => {
            setPosition('-100%')
          })
        })
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
      setDisableUpdateBtn(false)
    }
  }
  // END OF UPDATE SCREENING LOCATION FUNCTION

  //  FUNCTIONALITIES FOR FETCHING AND SETTING TEST CATEGORIES

  // function to get all TestCategories
  const getAllTestCategories = async () => {
    try {
      const res = await publicRequest.get(
        `Test/test-category/${updatedCandidateInfo.clientid}`,
        {
          headers: {
            Accept: '*',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.data) {
        setTestCategory(res.data?.data)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    try {
      await publicRequest
        .delete(
          `Candidate/DeleteByID?Candidateid=${Number(
            candidateToBeDeleted?.row?.candidateId
          )}`,
          {
            headers: {
              Accept: '*',
              Authorization: `Bearer ${token}`,
            },
          }
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

  useEffect(() => {}, [selectedCandidate])

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  useEffect(() => {
    getAllCandidates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // use effect to call the getAllClients function as the page loads
  useEffect(() => {
    getAllClients()
  }, [])
  // end of use effect to call the getAllClients function as the page loads

  // use effect to call the getAllTestCategories function as the page loads
  useEffect(() => {
    getAllLaboratories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // end of use effect to call the getAllTestCategories function as the page loads

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
          <div className='manageCandidatesMainWrapper'>
            {/* <div className='manageCandidatesMainTop'>
                  <h3>All Candidates</h3>
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
                </div> */}
            <div className='filterContainer'>
              <Autocomplete
                // disablePortal
                options={clients}
                getOptionLabel={(option) =>
                  `${option.clientName} ${option.email}`
                }
                onChange={(e, option) =>
                  handleInputChange(e, 'clientId', option)
                }
                key={loading}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label='Client Name' size='small' />
                )}
              />
              <TextField
                id='outlined-search'
                label="Candidate's Name/PhoneNo"
                type='search'
                className='candidateSearchName'
                onChange={(e) => handleInputChange(e, 'phoneNumberOrName')}
                size='small'
                value={filters?.phoneNumberOrName}
              />
              <div className='filterDateWrapper'>
                <DatePicker
                  placeholderText='Select a date'
                  onChange={(date, e) => handleInputChange(e, 'date', date)}
                  dateFormat='MM/yyyy'
                  showMonthYearPicker
                  className='filterDate'
                  selected={startDate}
                />
              </div>
              <button className='searchFilterBtn' onClick={filterData}>
                Search
              </button>
              <button
                className='resetBtn'
                onClick={getAllCandidates}
                // onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
            <h3 className='candidateTitle'>Candidates</h3>
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
                    disabled={disableCandidateProperties}
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
                    disabled={disableCandidateProperties}
                  />
                </div>
                <div className='updateUserInputWrapper'>
                  <>
                    <label htmlFor='address'>Address</label>
                    <input
                      type='text'
                      id='address'
                      className='updateUserInput'
                      value={updatedCandidateInfo?.address}
                      disabled={disableCandidateProperties}
                      onChange={(e) => handleUpdateCandidateInfo(e, 'address')}
                    />
                  </>
                </div>
                <div className='updateUserInputWrapper'>
                  <label
                    htmlFor='testCategory'
                    style={{ visibility: 'hidden' }}
                  >
                    Test Category
                  </label>

                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={testCategory}
                    getOptionLabel={(option) => `${option.categoryName}`}
                    disabled={disableCandidateProperties}
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
                    disabled={disableCandidateProperties}
                    selected={startDate}
                    onChange={(selectedDate) => handleDateChange(selectedDate)}
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
                {disableCandidateProperties && (
                  <div className='updateUserInputWrapper'>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={laboratories}
                      getOptionLabel={(option) => `${option.laboratoryName}`}
                      onChange={(e, option) => handleLabSelection(option)}
                      key={loading}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Screening Location'
                          required
                        />
                      )}
                    />
                  </div>
                )}
              </div>

              <button
                className='updateUserBtn'
                disabled={disableUpdateBtn}
                onClick={
                  disableCandidateProperties
                    ? handleUpdateScreeningLocation
                    : handleUpdateUser
                }
              >
                Update
              </button>
            </div>
            <div className='partnerLabsMainBottom'>
              {loading || error ? (
                loading ? (
                  <Loading />
                ) : (
                  <ErrorComponent errorMessage={errorMessage && errorMessage} />
                )
              ) : (
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={filteredData}
                    columns={columns}
                    pageSize={pageSize}
                    checkboxSelection
                    disableSelectionOnClick
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[100, 150, 200]}
                    pagination
                    getRowId={(row) => row?.candidateId}
                    onRowClick={(row) => handleRowClick(row)}
                  />
                </Box>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageCandidates
