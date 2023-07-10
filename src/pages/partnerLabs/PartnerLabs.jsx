import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { MdEdit } from 'react-icons/md'
import ErrorComponent from '../../components/error/Error'

import { RiAddLine } from 'react-icons/ri'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './partnerLabs.scss'
import { Link } from 'react-router-dom'
import { publicRequest } from '../../functions/requestMethods'
import { useSelector } from 'react-redux'
import Loading from '../../components/loading/Loading'

const PartnerLabs = () => {
  // MISCELLANEOUS
  const [pageSize, setPageSize] = useState(50)

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const columns = [
    { field: 'laboratoryName', headerName: 'Laboratory Name', width: 190 },
    {
      field: 'state',
      headerName: 'Laboratory Location',
      width: 200,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Laboratory Type',
      width: 200,
      editable: true,
    },
    {
      field: 'contactPerson',
      headerName: 'Contact Person',
      width: 200,
      editable: true,
    },
    {
      field: 'contactPhoneNumber',
      headerName: 'Contact Person No.',
      width: 200,
      editable: true,
    },
    {
      field: 'contactEmailAddress',
      headerName: 'Contact Person Email',
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
  const [rows, setRows] = useState([])
  const [filteredData, setFilteredData] = useState([])

  // FUNCTION TO GET AND SET ALL LABORATORIES
  const getAllLaboratories = async () => {
    try {
      setLoading(true)
      const res = await publicRequest.get('/Laboratory', {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data) {
        console.log(res.data?.data)

        setRows(res.data?.data)
        setFilteredData(res.data?.data)

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
  // END OF FUNCTION TO GET AND SET ALL LABORATORIES

  // USE EFFECT TO GET AND SET ALL LABORATORIES AS THE PAGE LOADS
  useEffect(() => {
    getAllLaboratories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            {loading || error ? (
              loading ? (
                <Loading />
              ) : (
                <ErrorComponent errorMessage={errorMessage && errorMessage} />
              )
            ) : (
              <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={pageSize}
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[50, 150, 200]}
                  pagination
                />
              </Box>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerLabs
