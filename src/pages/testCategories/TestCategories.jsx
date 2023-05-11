import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './testCategories.scss'
import AlertDialogSlide from '../../components/Dialogue'
import { Autocomplete, TextField } from '@mui/material'
import { privateRequest, publicRequest } from '../../functions/requestMethods'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TestCategories = () => {
  const [open, setOpen] = React.useState(false)
  const toastId = React.useRef(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // TEST DATA FUNCTIONALITIES
  const [tests, setTests] = useState([])
  const getAllTests = async () => {
    try {
      const res = await publicRequest.get('/Test')

      if (res.data) {
        console.log(res.data)
        setTests(res.data?.data)
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

  //  FUNCTIONALITIES FOR FETCHING AND CLIENTS
  const [clients, setClients] = useState([])
  const getAllClients = async () => {
    try {
      const res = await publicRequest.get('Client/Client-list')

      if (res.data) {
        setClients(res.data.data)
        console.log(res.data)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // use effect to call the getAllClients function as the page loads
  useEffect(() => {
    getAllClients()
  }, [])
  // end of use effect to call the getAllClients function as the page loads
  //  END OF FUNCTIONALITIES FOR FETCHING AND CLIENTS

  // FUNCTIONALITIES FOR CREATING A NEW TEST CATEGORY
  const [testCategory, setTestCategory] = useState({
    clientId: '',
    categoryName: '',
    categoryDescription: '',
    tests: [],
  })

  // function for setting testCategory info
  const handleTestCategoryInfo = (e, dataName, data) => {
    if (dataName === 'tests') {
      const tests = data.map((singleTest) => {
        return {
          testId: singleTest.testId,
        }
      })
      setTestCategory((prev) => {
        return {
          ...prev,
          tests: [...tests],
        }
      })
    } else {
      setTestCategory((prev) => {
        return { ...prev, [dataName]: data ? data.clientId : e.target.value }
      })
    }
  }
  // end of function for testCategory info

  // function for creating a test category
  const createTestCategory = async () => {
    // const id = toast.loading('Please wait...')
    toastId.current = toast('Please wait...', {
      autoClose: 3000,
      isLoading: true,
    })

    try {
      await privateRequest
        .post('/Test/test-category', testCategory)
        .then((response) => {
          toast.update(toastId.current, {
            render: 'Test category created succesfully!',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          })
        })
    } catch (error) {
      console.log(error.response)
      toast.update(toastId.current, {
        type: 'error',
        autoClose: 3000,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          'Something went wrong, please try again'
        }`,
      })
    }
  }
  // end of function for creating a test category

  //END OF FUNCTIONALITIES FOR CREATING A NEW TEST CATEGORY
  return (
    <>
      <ToastContainer />
      <div className='testCategoryWrapper'>
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          title='Cancel'
          link='/testCategories'
          message='Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost.'
        />
        <Sidebar />
        <div className='testCategoryRight'>
          <Topber />
          <div className='testCategoryMainWrapper'>
            <h2> Add Test Category</h2>
            <div className='testCategoryFormWrapper'>
              <div className='inputsWrapper'>
                <div className='singleInput'>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={clients}
                    getOptionLabel={(option) => option.clientName}
                    onChange={(e, option) =>
                      handleTestCategoryInfo(e, 'clientId', option)
                    }
                    sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label='Client Name' />
                    )}
                  />
                </div>
                <div className='singleInput'>
                  <p>Test Category Name</p>
                  <div className='inputWrapper'>
                    <input
                      type='text'
                      className='input'
                      onChange={(e) =>
                        handleTestCategoryInfo(e, 'categoryName')
                      }
                    />
                  </div>
                </div>
                <div className='multipleSelectWrapper'>
                  {/* <div className="multipleSelectContainer"> */}
                  <div className='multipleSelect'>
                    <Autocomplete
                      multiple
                      id='tags-outlined'
                      options={tests}
                      getOptionLabel={(option) => option.testName}
                      onChange={(e, option) =>
                        handleTestCategoryInfo(e, 'tests', option)
                      }
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='SelectedTests'
                          placeholder='Test'
                        />
                      )}
                    />
                  </div>
                  {/* </div> */}
                </div>

                <div className='textAreaInput'>
                  <p>Description</p>
                  <div className='textAreaWrapper'>
                    <textarea
                      type='text'
                      className='textArea'
                      cols={50}
                      rows={5}
                      onChange={(e) =>
                        handleTestCategoryInfo(e, 'categoryDescription')
                      }
                      style={{ padding: '10px', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>
              <div className='bottomButtons'>
                <button
                  className='cancelClientEditBtn'
                  onClick={handleClickOpen}
                >
                  Cancel
                </button>
                <button
                  className='testCategoryEditBtn'
                  onClick={createTestCategory}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TestCategories
