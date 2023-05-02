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

const ManageStaff = () => {
  const [pageSize, setPageSize] = useState(5)
  const columns = [
    { field: 'id', headerName: 'Staff ID', width: 190 },

    {
      field: 'lastName',
      headerName: 'Staff Name',
      width: 250,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <div className='role'>{params.row.role}</div>
          </>
        )
      },
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

  const rows = [
    { id: 1, lastName: 'Fakoya', firstName: 'Jon', age: 35, role: 'Admin' },
    {
      id: 2,
      lastName: 'Olamide',
      firstName: 'Cersei',
      age: 42,
      role: 'Phlebotomist',
    },
    {
      id: 3,
      lastName: 'Bankole',
      firstName: 'Jaime',
      age: 45,
      role: 'Admin',
    },
    {
      id: 4,
      lastName: 'Assumpta',
      firstName: 'Arya',
      age: 16,
      role: 'Lab Scientist',
    },
    {
      id: 5,
      lastName: 'Taiwo',
      firstName: 'Daenerys',
      age: null,
      role: 'Phlebotomist',
    },
    {
      id: 6,
      lastName: 'Ada',
      firstName: null,
      age: 150,
      role: 'Lab Scientist',
    },
    {
      id: 7,
      lastName: 'Olamide',
      firstName: 'Ferrara',
      age: 44,
      role: 'Phlebotomist',
    },
    {
      id: 8,
      lastName: 'Tunde',
      firstName: 'Rossini',
      age: 36,
      role: 'Admin',
    },
    {
      id: 9,
      lastName: 'Ada',
      firstName: 'Harvey',
      age: 65,
      role: 'Lab Scientist',
    },
  ]
  return (
    <div className='manageStaffWrapper'>
      <Sidebar />
      <div className='manageStaffRight'>
        <Topber />
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

export default ManageStaff
