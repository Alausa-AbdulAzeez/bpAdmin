import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { RiAddLine } from 'react-icons/ri'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './manageClients.scss'
import { Link } from 'react-router-dom'
import { publicRequest } from '../../functions/requestMethods'
import Loading from '../../components/loading/Loading'
import { FaAngleDown, FaDotCircle } from 'react-icons/fa'
import Error from '../../components/error/Error'

const ManageClients = () => {
  const [pageSize, setPageSize] = useState(5)
  const [tableData, setTableData] = useState([])

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

  // CLIENTS DATA FUNCTIONALITIES
  const getAllClients = async () => {
    try {
      setLoading(true)
      const res = await publicRequest.get('Client/Client-list')

      if (res.data) {
        setTableData(res?.data?.data)
        console.log(res?.data?.data)
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

  // use effect to call the getAllClients function as the page loads
  useEffect(() => {
    getAllClients()
  }, [])
  // end of use effect to call the getAllClients function as the page loads
  // END OF TEST DATA FUNCTIONALITIES

  const columns = [
    // { field: 'id', headerName: 'Client ID', width: 190 },
    {
      field: 'clientName',
      headerName: 'Client name',
      width: 300,
      editable: false,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 200,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email ',
      width: 200,
      editable: false,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 300,
      editable: false,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Action',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 260,
    //   renderCell: () => {
    //     return (
    //       <div className='buttons'>
    //         <div className='editWrapper'>
    //           <div className='edit'>Edit</div>
    //           <MdEdit className='editIcon' />
    //         </div>
    //         <div className='deleteWrapper'>
    //           <div className='delete'>Delete</div>
    //           <BsTrashFill className='deleteIcon' />
    //         </div>
    //       </div>
    //     )
    //   },
    // },
  ]

  const rows = tableData

  // ACCOURDION FUNCTIONALITIES
  const [expanded, setExpanded] = React.useState('panel1')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  // END OF ACCOURDION FUNCTIONALITIES

  // SLIDE FUNCTIONALITIES
  const [position, setPosition] = useState('-100%')
  const [client, setClient] = useState(null)
  const [clientInfo, setClientInfo] = useState(null)
  const [fetchingTestInfo, setFetchingTestInfo] = useState(null)

  // functionalities for getting and updating client State
  //get client function
  const getClient = async (id) => {
    console.log(id)
    try {
      setFetchingTestInfo(true)
      const res = await publicRequest.get(`Test/test-category/${id}`)
      setClient(res.data)
      setFetchingTestInfo(false)
      console.log(res.data)
    } catch (error) {
      console.log(error)
      setFetchingTestInfo(false)
    }
  }
  //end of get client function

  // end of functionalities for getting and updating client State

  // handlerowclick function
  const handleRowClick = (row, e) => {
    getClient(row?.row?.clientId)
    setClientInfo(row)
    if (position !== '0') {
      setPosition('0')
    }
  }
  // end of  handlerowclick function

  // hide slide function
  const handleHideSlide = () => {
    setPosition('-100%')
  }
  // end of hide slide function

  // END OF SLIDE FUNCTIONALITIES

  // MISCELLANEOUS USEEFFECTS
  // update errorMessage state
  useEffect(() => {}, [errorMessage])
  // end of update errorMessage state
  // END OF MISCELLANEOUS USEEFFECTS
  // useRedirectLoggedOutUser()
  return (
    <div className='manageClientsWrapper'>
      <Sidebar />
      <div className='manageClientsRight'>
        <Topber />

        {loading || error ? (
          loading ? (
            <Loading />
          ) : (
            <Error errorMessage={errorMessage && errorMessage} />
          )
        ) : (
          <div className='manageClientsMainWrapper'>
            <div className='manageClientsMainTop'>
              <h3>All Clients</h3>
              <Link to='/manageClients/addClient'>
                <button className='addClientBtn'>
                  Add Client
                  <span>
                    <RiAddLine className='addIcon' />
                  </span>
                </button>
              </Link>
            </div>
            <div
              className='slide'
              style={{
                right: position,
                visibility: position === '0' && 'visible',
              }}
            >
              <div className='slideTop'>
                <div className='cancelconWrapper' onClick={handleHideSlide}>
                  <MdCancel className='cancelIcon' />
                </div>
                <div className='initials'>{clientInfo?.row?.clientName[0]}</div>
                <div className='slideFullname'>
                  {clientInfo?.row?.clientName}
                </div>
              </div>
              <div className='slideMiddle'>
                <div className='companyName h3 companyDetail'>
                  <h3>Email</h3>
                  <p>{clientInfo?.row?.email}</p>
                </div>

                <div className='phoneNo h3 companyDetail'>
                  <h3>Phone Number</h3>
                  <p>{clientInfo?.row?.phoneNumber}</p>
                </div>
                <div className='companyName h3 companyDetail'>
                  <h3>Contact Person Email</h3>
                  <p>{clientInfo?.row?.contactPersonEmail}</p>
                </div>

                <div className='phoneNo h3 companyDetail'>
                  <h3>Contact Person Phone Number</h3>
                  <p>{clientInfo?.row?.contactPersonPhone}</p>
                </div>
              </div>

              <div className='testCategoriesWrapper'>
                <h3>Test Categories</h3>
                {fetchingTestInfo
                  ? 'Loading...'
                  : client?.data?.length === 0
                  ? 'No result '
                  : client?.data?.map((clientData, index) => {
                      return (
                        <Accordion
                          expanded={expanded === `panel${index}`}
                          onChange={handleChange(`panel${index}`)}
                        >
                          <AccordionSummary
                            expandIcon={<FaAngleDown />}
                            aria-controls={`panel${index}d-content`}
                            id={`panel${index}d-header`}
                          >
                            <Typography>{clientData?.categoryName}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {clientData?.clientTestMappings?.map(
                              (clientTest) => {
                                return (
                                  // <Typography>

                                  //   <span>{clientTest?.test?.testName}</span>
                                  // </Typography>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <FaDotCircle />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={clientTest?.test?.testName}
                                    />
                                  </ListItemButton>
                                )
                              }
                            )}
                          </AccordionDetails>
                        </Accordion>
                      )
                    })}
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
                  getRowId={(row) => row.clientId}
                  onRowClick={(row, e) => handleRowClick(row, e)}
                />
              </Box>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageClients
