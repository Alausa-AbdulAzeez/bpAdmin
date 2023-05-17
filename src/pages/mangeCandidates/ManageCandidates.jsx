import React, { useEffect, useState } from 'react'
import './manageCandidates.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import { Autocomplete, Box, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { RiAddLine } from 'react-icons/ri'
import { DataGrid } from '@mui/x-data-grid'
import { MdEdit } from 'react-icons/md'
import { BsTrashFill } from 'react-icons/bs'
import { publicRequest } from '../../functions/requestMethods'
import Loading from '../../components/loading/Loading'
import ErrorComponent from '../../components/error/Error'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { RxReload } from 'react-icons/rx'

const ManageCandidates = () => {
  // MISCELLANEOUS
  const toastId = React.useRef(null)

  // PAGE SIZE OF TABLE
  const [pageSize, setPageSize] = useState(5)

  // CLIENTS DATA
  const [clients, setClients] = useState([])
  const [clientId, setClientId] = useState(null)

  // CANDIDATE'S PHONE NUMBER
  const [phoneNumber, setPhoneNumber] = useState('')

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
            <div className='editWrapper'>
              <div className='edit'>Edit</div>
              <MdEdit className='editIcon' />
            </div>
            <div className='deleteWrapper'>
              <div className='delete'>Delete</div>
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
      const res = await publicRequest.get('/Candidate')

      if (res.data) {
        console.log(res.data)
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
        console.log(res.data)
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
        `Candidate/SearchByPhoneNumber?Clientid=${clientId}&phone=${phoneNumber}`
      )
      console.log(clientId, phoneNumber)
      console.log(res)
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
  {
    /* <Link to="/scheduleCandidate">
    <button className="scheduleCandidateBtn">
      Schedule Candidate
      <span>
        <RiAddLine className="addIcon" />
      </span>
    </button>
  </Link> */
  }

  return (
    <div className='manageCandidatesWrapper'>
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
              <div className='partnerLabsMainBottom'>
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
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
  )
}

export default ManageCandidates
