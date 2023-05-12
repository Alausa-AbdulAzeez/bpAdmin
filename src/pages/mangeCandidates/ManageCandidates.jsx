import React, { useEffect, useState } from 'react'
import './manageCandidates.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import { Box, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { RiAddLine } from 'react-icons/ri'
import { DataGrid } from '@mui/x-data-grid'
import { MdEdit } from 'react-icons/md'
import { BsTrashFill } from 'react-icons/bs'
import { publicRequest } from '../../functions/requestMethods'

const ManageCandidates = () => {
  // PAGE SIZE OF TABLE
  const [pageSize, setPageSize] = useState(5)

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
  // LOADING DATA
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // FUNCTION TO GET AND SET ALL CANDIDATES
  const getAllCandidates = async () => {
    try {
      setLoading(true)
      const res = await publicRequest.get('/Candidate')

      if (res.data) {
        console.log(res.data)
        setRows(res.data?.data)
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
  // END OF FUNCTION TO GET AND SET ALL CANDIDATES

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  useEffect(() => {
    getAllCandidates()
  }, [])

  return (
    <div className='manageCandidatesWrapper'>
      <Sidebar />
      <div className='manageCandidatesRight'>
        <Topber />
        <div className='manageCandidatesMainWrapper'>
          <div className='manageCandidatesMainTop'>
            <h3>All Tests</h3>
            <div className='manageCandidatesMainTopForm'>
              <div className='formAndSearchWrapperMc'>
                <TextField
                  id='outlined-search'
                  label='Candidate name'
                  type='search'
                  className='candidateName'
                />

                <div className='manageCandidatesBtn'>Search</div>
              </div>
              <Link to='/scheduleCandidate'>
                <button className='scheduleCandidateBtn'>
                  Schedule Candidate
                  <span>
                    <RiAddLine className='addIcon' />
                  </span>
                </button>
              </Link>
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
                getRowId={(row) => row?.canditateId}
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageCandidates
