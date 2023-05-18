import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { MdEdit } from 'react-icons/md'
import { RiAddLine } from 'react-icons/ri'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './manageTests.scss'
import { Link } from 'react-router-dom'
import { publicRequest } from '../../functions/requestMethods'
import Loading from '../../components/loading/Loading'
import AlertDialogSlide from '../../components/Dialogue'
import { toast } from 'react-toastify'
// import axios from 'axios'

const ManageTests = () => {
  const [pageSize, setPageSize] = useState(5)
  const [tableData, setTableData] = useState([])
  // const [error, setError] = useState(false)

  // DATA FOR TOGGLE ALERT
  const [open, setOpen] = React.useState(false)

  // SELECTED TEST TO BE DELETED OR EDIT ID
  const [selectedTest, setSelectedTest] = React.useState(false)

  // TEST DATA FUNCTIONALITIES
  const getAllTests = async () => {
    try {
      setLoading(true)
      const res = await publicRequest.get('/Test')

      if (res.data) {
        console.log(res.data)
        setTableData(res.data?.data)
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

  // use effect to call the getAllTest function as the page loads
  useEffect(() => {
    getAllTests()
  }, [])
  // end of use effect to call the getAllTest function as the page loads
  // END OF TEST DATA FUNCTIONALITIES

  // FUNCTION TO DELETE SINGLE TEST
  const handleDeleteTest = async () => {
    console.log(selectedTest)
    try {
      await publicRequest
        .delete(`Test/DeleteByID?Testid=${selectedTest?.id}`)
        .then((res) => {
          toast.success('Test deleted successfully', {
            position: 'top-right',
            // autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        })
        .then(() => {
          return window.location.reload()
        })
    } catch (error) {
      console.log(error)
      toast.error('Could not delete test. Try again', {
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
  // END OF FUNCTION TO DELETE SINGLE TEST

  const columns = [
    { field: 'testId', headerName: 'Test ID', width: 190 },
    {
      field: 'testName',
      headerName: 'Test name',
      width: 200,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
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
            <div className='editWrapper'>
              <div className='edit'>Edit</div>
              <MdEdit className='editIcon' />
            </div>
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
  useEffect(() => {
    console.log(error, loading)
  }, [error, loading])
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
            <div className='manageTestsMainTop'>
              <h3>All Tests</h3>
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
                  getRowId={(row) => row.testId}
                />
              </Box>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageTests
