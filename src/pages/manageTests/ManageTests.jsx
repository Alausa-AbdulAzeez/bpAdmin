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
// import axios from 'axios'

const ManageTests = () => {
  const [pageSize, setPageSize] = useState(5)
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  // const [error, setError] = useState(false)

  // TEST DATA FUNCTIONALITIES
  const getAllTests = async () => {
    try {
      setLoading(true)
      const res = await publicRequest.get('/Test')

      if (res.data) {
        console.log(res.data)
        setTableData(res.data)
        setLoading(false)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // use effect to call the getAllTest function as the page loads
  useEffect(() => {
    getAllTests()
  }, [])
  // end of use effect to call the getAllTest function as the page loads
  // END OF TEST DATA FUNCTIONALITIES

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

  const rows = tableData

  return (
    <div className='manageTestsWrapper'>
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
