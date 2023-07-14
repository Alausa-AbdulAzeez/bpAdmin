import React, { useEffect, useState } from 'react'
import DashboardCard from '../../components/dashboardCard/DashboardCard'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import './home.scss'

import { useSelector } from 'react-redux'
import { privateRequest, publicRequest } from '../../functions/requestMethods'
import Loading from '../../components/loading/Loading'
import Error from '../../components/error/Error'

const Home = () => {
  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user)
  const userName = currentUser?.data?.profile?.fullName

  const [pageSize, setPageSize] = useState(5)
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
    // {
    //   field: "role",
    //   headerName: "Role",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <div className="role">{params.row.role}</div>
    //       </>
    //     );
    //   },
    // },
  ]

  // SET LOADING AND ERROR FUNCTIONALITY
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

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

      const res = await publicRequest.get('/Staff', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      // const res = await privateRequest.get('Staff')
      console.log('seccessS')
      setStaff(res?.data?.data?.result)
      setLoading(false)
      console.log(res?.data?.data?.result)
    } catch (error) {
      setLoading(false)
      setError(true)
      setErrorMessage(error)

      console.log(error)
    }
  }

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

  return (
    <>
      <div className='homeWrapper'>
        <Sidebar />
        <div className='homepageRight'>
          <Topber />
          <div className='homeMainWrapperContainer'>
            <div className='homeMainWrapper'>
              <div className='homeMainTop'>
                <DashboardCard type='scheduleCandidate' />
                <DashboardCard type='manageClients' />
                {/* <DashboardCard type='manageStaff' /> */}
                <DashboardCard type='profile' userName={userName} />
              </div>

              <div className='homeMainBottom'>
                <h3>All Staff</h3>
                <Box sx={{ height: 350, width: '100%' }}>
                  {loading || error ? (
                    loading ? (
                      <Loading />
                    ) : (
                      <Error errorMessage={errorMessage && errorMessage} />
                    )
                  ) : (
                    <DataGrid
                      rows={staff}
                      columns={columns}
                      pageSize={pageSize}
                      checkboxSelection
                      disableSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}
                      onPageSizeChange={(newPageSize) =>
                        setPageSize(newPageSize)
                      }
                      rowsPerPageOptions={[5, 10, 20]}
                      pagination
                      getRowId={(row) => row.userId}
                    />
                  )}
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
