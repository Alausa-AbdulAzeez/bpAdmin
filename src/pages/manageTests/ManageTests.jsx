import { Box, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { RiAddLine } from 'react-icons/ri'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './manageTests.scss'
import { Link } from 'react-router-dom'
import { publicRequest } from '../../functions/requestMethods'
import Loading from '../../components/loading/Loading'
import AlertDialogSlide from '../../components/Dialogue'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import axios from 'axios'

const ManageTests = () => {
  // MISCELLANEOUS
  const toastId = React.useRef(null)
  const [pageSize, setPageSize] = useState(100)
  const [tableData, setTableData] = useState([])
  const [searchedTableData, setSearchedTableData] = useState([])
  // const [error, setError] = useState(false)

  // DATA FOR TOGGLE ALERT
  const [open, setOpen] = React.useState(false)

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  // SELECTED TEST TO BE DELETED OR EDIT ID
  const [selectedTest, setSelectedTest] = React.useState(false)

  // TEST DATA FUNCTIONALITIES
  const getAllTests = async () => {
    try {
      setLoading(true)
      const res = await publicRequest.get('/Test', {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data) {
        setTableData(res.data?.data)
        setSearchedTableData(res.data?.data)
        setLoading(false)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      setLoading(false)
      setError(true)
      console.log(error)
    }
  }

  // SEARCH FUNCTIONALITY
  const handleSearchParamsChange = (e) => {
    let filteredPendingCandidatesArray
    filteredPendingCandidatesArray = tableData.filter((tableDatum) =>
      tableDatum?.testName
        ?.toLowerCase()
        .includes(e.target.value.trim().toLowerCase())
    )
    setSearchedTableData(filteredPendingCandidatesArray)
    // console.log(filteredPendingCandidatesArray)
  }
  // END OF SEARCH FUNCTIONALITY

  // use effect to call the getAllTest function as the page loads
  useEffect(() => {
    getAllTests()
  }, [])
  // end of use effect to call the getAllTest function as the page loads
  // END OF TEST DATA FUNCTIONALITIES

  // FUNCTION TO DELETE SINGLE TEST
  const handleDeleteTest = async () => {
    toastId.current = toast('Please wait...', {
      autoClose: 2500,
      isLoading: true,
    })

    try {
      await publicRequest
        .delete(`Test/DeleteByID?Testid=${selectedTest?.id}`, {
          headers: {
            Accept: '*',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.update(toastId.current, {
            render: 'Test deleted successfully!',
            type: 'success',
            isLoading: false,
            autoClose: 2500,
          })
        })
        .then(() => {
          handleClose()
          return getAllTests()
        })
    } catch (error) {
      console.log(error)
      toast.update(toastId.current, {
        type: 'error',
        autoClose: 2500,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          'Could not delete test. Try again'
        }`,
      })
      setOpen(false)
    }
  }
  // END OF FUNCTION TO DELETE SINGLE TEST

  const columns = [
    { field: 'testId', headerName: 'Test ID', width: 100 },
    {
      field: 'testName',
      headerName: 'Test name',
      width: 300,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 350,
      editable: false,
    },
    {
      field: 'fullName',
      headerName: 'Action',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 260,
      renderCell: (props) => {
        return (
          <div className='buttons'>
            {/* <div className='editWrapper'>
              <div className='edit'>Edit</div>
              <MdEdit className='editIcon' />
            </div> */}
            <div className='deleteWrapper'>
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

  const rows = tableData

  // SET LOADING AND ERROR FUNCTIONALITY
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // useEffect to update error and loading state
  useEffect(() => {}, [error, loading])
  // end of useEffect to update error and loading state

  // END OF SET LOADING AND ERROR FUNCTIONALITY

  // FUNCTIONS TO TOGGLE ALERT SLIDE
  const handleClickOpen = (props) => {
    setOpen(true)
    setSelectedTest(props)
  }

  const handleClose = () => {
    setOpen(false)
    // handleDeleteTest()
  }
  // END OF FUNCTIONS TO TOGGLE ALERT SLIDE

  return (
    <>
      <ToastContainer />
      <div className='manageTestsWrapper'>
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          title='Delete'
          link='/scheduleCandidate'
          message='Warning!! Are you sure you want to delete this test? Action cannot be undone'
          action={handleDeleteTest}
        />
        <Sidebar />
        <div className='manageTestsRight'>
          <Topber />

          {loading ? (
            <Loading />
          ) : (
            <div className='manageTestsMainWrapper'>
              {/* <h3 className="pendingCandidatesMainTopTitle">Search</h3>
              <div className="filterContainer">
                
              </div> */}
              <div className='manageTestsMainTop'>
                <h3>All Tests</h3>
                <TextField
                  id='outlined-search'
                  label='Search'
                  type='search'
                  className='candidateSearchName'
                  onChange={(e) => handleSearchParamsChange(e)}
                  size='small'
                />
                <Link to='/manageTests/addTest'>
                  <button className='addClientBtn'>
                    Add Test
                    <span>
                      <RiAddLine className='addIcon' />
                    </span>
                  </button>
                </Link>
              </div>
              <div className='partnerLabsMainBottom'>
                <Box sx={{ height: 500, width: '100%' }}>
                  <DataGrid
                    rows={searchedTableData}
                    columns={columns}
                    pageSize={pageSize}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[100, 150]}
                    rowsP
                    pagination
                    getRowId={(row) => row.testId}
                  />
                </Box>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ManageTests
