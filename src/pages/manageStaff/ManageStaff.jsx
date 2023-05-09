import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { MdEdit } from 'react-icons/md'
import { RiAddLine } from 'react-icons/ri'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './manageStaff.scss'
import { Link } from 'react-router-dom'
import { privateRequest, publicRequest } from '../../functions/requestMethods'
import { useEffect } from 'react'
import Loading from '../../components/loading/Loading'
import Error from '../../components/error/Error'

const ManageStaff = () => {
  const [pageSize, setPageSize] = useState(5)
  const columns = [
    {
      field: 'fullName',
      headerName: 'Staff Name',
      width: 250,
      editable: true,
    },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 190 },
    { field: 'email', headerName: 'Email', width: 190 },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div className='role'>{params.row.role}</div>
          </>
        )
      },
    },
    {
      field: 'Action',
      headerName: 'Action',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 260,
      renderCell: () => {
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

  // SET LOADING AND ERROR FUNCTIONALITY
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // useEffect to update error and loading state
  useEffect(() => {
    console.log(error, loading)
  }, [error, loading])
  // end of useEffect to update error and loading state

  // END OF SET LOADING AND ERROR FUNCTIONALITY

  // FUNCTIONALITIES TO GET ALL STAFF

  const [staff, setStaff] = useState([])

  const fetchStaff = async () => {
    try {
      setLoading(true)
      const res = await privateRequest.get('Staff')
      setStaff(res?.data?.data)
      setLoading(false)
      console.log(res?.data?.data)
    } catch (error) {
      setLoading(false)
      setError(true)

      console.log(error)
    }
  }

  // useeffect to call the fetchSyaff function
  useEffect(() => {
    fetchStaff()
  }, [])
  // end of useeffect to call the fetchSyaff function
  // END OF FUNCTIONALITIES TO GET ALL STAFF

  return (
    <div className='manageStaffWrapper'>
      <Sidebar />
      <div className='manageStaffRight'>
        <Topber />
        {loading || error ? (
          loading ? (
            <Loading />
          ) : (
            <Error />
          )
        ) : (
          <div className='manageStaffMainWrapper'>
            <div className='manageStaffMainTop'>
              <h3>All Staff</h3>
              <Link to={'/manageStaff/addStaff'}>
                <button className='addStaffBtn'>
                  Add Staff
                  <span>
                    <RiAddLine className='addIcon' />
                  </span>
                </button>
              </Link>
            </div>
            <div className='manageStaffMainBottom'>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={staff}
                  columns={columns}
                  pageSize={pageSize}
                  checkboxSelection
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20]}
                  pagination
                  getRowId={(row) => row.userId}
                />
              </Box>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageStaff
