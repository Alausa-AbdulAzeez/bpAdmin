import { Box, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'

import { RiAddLine } from 'react-icons/ri'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './manageStaff.scss'
import { Link } from 'react-router-dom'
import { publicRequest } from '../../functions/requestMethods'
import { useEffect } from 'react'
import Loading from '../../components/loading/Loading'
import Error from '../../components/error/Error'
import { useSelector } from 'react-redux'
import { MdCancel } from 'react-icons/md'

const ManageStaff = () => {
  const [pageSize, setPageSize] = useState(100)
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  const columns = [
    {
      field: 'fullName',
      headerName: 'Staff Name',
      width: 320,
      editable: true,
    },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 250 },
    { field: 'email', headerName: 'Email', width: 300 },
  ]

  // SET LOADING AND ERROR FUNCTIONALITY
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  // STAFF ROLE
  const [staffRole, setStaffRole] = useState('')

  // SET LOADING AND ERROR FUNCTIONALITY FOR STAFF ROLE
  const [loadingStaffRole, setLoadingStaffRole] = useState(false)
  const [staffRoleErrorMessage, setStaffRoleErrorMessage] = useState(null)

  // SELECTED CANDIDATE AFTER ROW CLICK
  const [selectedStaff, setSelecedStaff] = useState({})

  // INITIAL POSITION OF SLIDE
  const [position, setPosition] = useState('-100%')

  // FUNCTIONALITIES TO GET ALL STAFF

  const [staff, setStaff] = useState([])
  const [searchedTableData, setSearchedTableData] = useState([])

  const fetchStaff = async () => {
    try {
      setLoading(true)

      const res = await publicRequest.get('/Staff', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      // const res = await privateRequest.get('Staff')
      console.log('seccessS')
      setStaff(res?.data?.data?.result)
      setSearchedTableData(res?.data?.data?.result)
      setLoading(false)
      console.log(res?.data?.data?.result)
    } catch (error) {
      setLoading(false)
      setError(true)
      setErrorMessage(error)

      console.log(error)
    }
  }

  // FUNCTION TO GET SELECTED STAFF ROLE
  const getStaffRole = async () => {
    try {
      setLoadingStaffRole(true)
      setStaffRoleErrorMessage('')

      const res = await publicRequest.get(
        `/Staff/roles/${selectedStaff?.email}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setStaffRole(res?.data?.data?.[0])
      setLoadingStaffRole(false)
      console.log(res?.data?.data?.[0])
    } catch (error) {
      setLoadingStaffRole(false)
      setStaffRoleErrorMessage(error)

      console.log(error)
    }
  }

  // END OF FUNCTION TO GET SELECTED STAFF ROLE

  // SEARCH FUNCTIONALITY
  const handleSearchParamsChange = (e) => {
    let filteredsSaffArray
    filteredsSaffArray = staff?.filter((tableDatum) =>
      tableDatum?.fullName
        ?.toLowerCase()
        .includes(e.target.value.trim().toLowerCase())
    )
    setSearchedTableData(filteredsSaffArray)
    // console.log(filteredPendingCandidatesArray)
  }
  // END OF SEARCH FUNCTIONALITY

  // HANDLE ROW CLICK
  const handleRowClick = (row, e) => {
    setSelecedStaff(row?.row)

    if (position !== '0') {
      setPosition('0')
    }
  }
  // END OF HANDLE ROW CLICK

  // HANDLE ROW CLICK
  const handleHideSlide = () => {
    setPosition('-100%')
  }
  // END OF HANDLE ROW CLICK

  // useeffect to call the fetchStaff function
  useEffect(() => {
    fetchStaff()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // end of useeffect to call the fetchSyaff function
  // END OF FUNCTIONALITIES TO GET ALL STAFF

  // MISCELLANEOUS USEEFFECTS
  // update errorMessage state
  useEffect(() => {}, [errorMessage])
  // end of update errorMessage state
  // END OF MISCELLANEOUS USEEFFECTS

  // USE EFFECT TO UPDATE SELECTED STAFF
  useEffect(() => {
    getStaffRole()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStaff])

  // useEffect to update error and loading state
  useEffect(() => {
    console.log(error, loading)
  }, [error, loading])
  // end of useEffect to update error and loading state
  return (
    <div className='manageStaffWrapper'>
      <Sidebar />
      <div className='manageStaffRight'>
        <Topber />
        {loading || error ? (
          loading ? (
            <Loading />
          ) : (
            <Error errorMessage={errorMessage && errorMessage} />
          )
        ) : (
          <div className='manageStaffMainWrapper'>
            <div className='manageStaffMainTop'>
              <h3>All Staff</h3>
              <TextField
                id='outlined-search'
                label='Search'
                type='search'
                className='candidateSearchName'
                onChange={(e) => handleSearchParamsChange(e)}
                size='small'
              />
              <Link to={'/manageStaff/addStaff'}>
                <button className='addStaffBtn'>
                  Add Staff
                  <span>
                    <RiAddLine className='addIcon' />
                  </span>
                </button>
              </Link>
            </div>
            <form className='manageStaffSlide' style={{ right: position }}>
              <div className='manageStaffSlideTop'>
                <div className='cancelconWrapper' onClick={handleHideSlide}>
                  <MdCancel className='cancelIcon' />
                </div>
                <div className='initials'>
                  {selectedStaff?.fullName &&
                    selectedStaff?.fullName[0]?.toUpperCase()}
                </div>
                <div className='slideFullname'>
                  {selectedStaff?.fullName?.toUpperCase()}
                </div>
              </div>
              <div className='staffDetails'>
                <h3>Staff Laboratory</h3>
                <p>{selectedStaff?.laboratory?.laboratoryName}</p>
              </div>
              <div className='staffDetails'>
                <h3>Staff Email</h3>
                <p>{selectedStaff?.email}</p>
              </div>
              <div className='staffDetails'>
                <h3>Staff Section/Role</h3>
                {loadingStaffRole || staffRoleErrorMessage ? (
                  loadingStaffRole ? (
                    'Loading...'
                  ) : (
                    staffRoleErrorMessage?.message
                  )
                ) : (
                  <p>{staffRole}</p>
                )}
              </div>
              <div className='staffDetails'>
                <h3>Staff Phone no</h3>

                <p>{selectedStaff?.phoneNumber}</p>
              </div>
            </form>
            <div className='manageStaffMainBottom'>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={searchedTableData}
                  columns={columns}
                  pageSize={pageSize}
                  experimentalFeatures={{ newEditingApi: true }}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[100, 150, 200]}
                  pagination
                  onRowClick={(row, e) => handleRowClick(row, e)}
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
