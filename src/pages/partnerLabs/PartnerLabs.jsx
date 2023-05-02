import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { MdEdit } from 'react-icons/md'

import { RiAddLine } from 'react-icons/ri'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './partnerLabs.scss'
import { Link } from 'react-router-dom'

const PartnerLabs = () => {
  const [pageSize, setPageSize] = useState(5)
  const columns = [
    { field: 'id', headerName: 'Laboratory ID', width: 190 },
    {
      field: 'firstName',
      headerName: 'Laboratory name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Location',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <div className={`status ${params.row.status}`}>
              {params.row.status}
            </div>
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
    {
      id: 1,
      lastName: 'Abuja',
      firstName: 'Lab 1',
      age: 35,
      status: 'Inactive',
    },
    {
      id: 2,
      lastName: 'Abuja',
      firstName: 'Lab 2',
      age: 42,
      status: 'Inactive',
    },
    {
      id: 3,
      lastName: 'Abuja',
      firstName: 'Lab 3',
      age: 45,
      status: 'Active',
    },
    {
      id: 4,
      lastName: 'Kano',
      firstName: 'Lab 4',
      age: 16,
      status: 'Inactive',
    },
    {
      id: 5,
      lastName: 'Lagos',
      firstName: 'Lab 5',
      age: null,
      status: 'Active',
    },
    {
      id: 6,
      lastName: 'Lagos',
      firstName: 'Lab 7',
      age: 150,
      status: 'Inactive',
    },
    {
      id: 7,
      lastName: 'Abuja',
      firstName: 'Lab 8',
      age: 44,
      status: 'Inactive',
    },
    {
      id: 8,
      lastName: 'Abuja',
      firstName: 'Lab 9',
      age: 36,
      status: 'Active',
    },
    {
      id: 9,
      lastName: 'Abuja',
      firstName: 'Lab 10',
      age: 65,
      status: 'Active',
    },
  ]
  return (
    <div className='partnerLabsWrapper'>
      <Sidebar />
      <div className='partnerLabsRight'>
        <Topber />
        <div className='partnerLabsMainWrapper'>
          <div className='partnerLabsMainTop'>
            <h3>Partner Laboratories</h3>
            <Link to={'/partnerLabs/addLab'}>
              <button className='addLabBtn'>
                Add Laboratory
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
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerLabs
