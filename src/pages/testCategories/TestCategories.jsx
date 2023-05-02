import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './testCategories.scss'
import { useNavigate } from 'react-router-dom'
import { RiAddLine } from 'react-icons/ri'
// import axios from 'axios'

const TestCategories = () => {
  const [pageSize, setPageSize] = useState(5)
  const navigate = useNavigate()

  const columns = [
    { field: 'id', headerName: 'Client ID', width: 190 },
    {
      field: 'firstName',
      headerName: 'Client name',
      width: 200,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Company',
      width: 200,
      editable: true,
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
            <div
              className='editWrapper'
              onClick={() => navigate('/testCategories/editCategory')}
            >
              <div className='edit'>Edit</div>
              <MdEdit className='editIcon' />
            </div>
          </div>
        )
      },
    },
  ]

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]

  // useEffect(() => {
  //   const clients = axios
  //     .get('http://15.237.160.238:60/api/Client/Client-list')
  //     .then((response) => console.log(response))
  // }, [])
  return (
    <div className='testCategoriesWrapper'>
      <Sidebar />
      <div className='testCategoriesRight'>
        <Topber />
        <div className='testCategoriesMainWrapper'>
          <div className='testCategoriesMainTop'>
            <h3>All Tests</h3>
            <button className='addTestBtn'>
              Add Test
              <span>
                <RiAddLine className='addIcon' />
              </span>
            </button>
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
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestCategories
