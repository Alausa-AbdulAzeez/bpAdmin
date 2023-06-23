import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './addTest.scss'
import AlertDialogSlide from '../../components/Dialogue'
import { privateRequest, publicRequest } from '../../functions/requestMethods'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddTest = () => {
  const [open, setOpen] = React.useState(false)
  const toastId = React.useRef(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // FUNCTIONALITIES PARTAINING TO FETCHING AND SETTING ROLES

  const [roles, setRoles] = useState([])

  // fetch roles
  const getRoles = async () => {
    try {
      const res = await publicRequest.get('/Account/roles')

      if (res) {
        console.log(res.data.data)
        setRoles(res.data.data)
      } else {
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // end of fetch roles

  // use effect for fetching roles
  useEffect(() => {
    getRoles()
  }, [])
  // end of use effect for fetching roles

  // END FUNCTIONALITIES PARTAINING TO ROLES

  // FUNCTIONALITIES FOR CREATING A NEW TEST
  const [test, setTest] = useState({
    testId: '',
    description: '',
    testName: '',
  })

  // function for setting test info
  const handleTestData = (e, dataName, data) => {
    setTest((prev) => {
      return { ...prev, [dataName]: data ? data.name : e.target.value }
    })
  }
  // end of function for setting test info

  const createTest = async (e) => {
    e.preventDefault()
    // const id = toast.loading('Please wait...')
    toastId.current = toast('Please wait...', {
      autoClose: false,
      isLoading: true,
    })
    console.log(test)
    try {
      await privateRequest.post('/Test', test).then((response) => {
        toast.update(toastId.current, {
          render: 'Test has been created succesfully!',
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
          error.response.data.title ||
          error.response.data.description ||
          'Something went wrong, please try again'
        }`,
      })
    }
  }

  //END OF FUNCTIONALITIES FOR CREATING A NEW TEST

  return (
    <>
      <ToastContainer />
      <div className='addTestWrapper'>
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          title='Cancel'
          link='/manageTests'
          message='Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost.'
        />
        <Sidebar />
        <div className='addTestRight'>
          <Topber />
          <div className='addTestMainWrapper'>
            <h2> Add New Test</h2>
            <form
              className='addTestFormWrapper'
              onSubmit={(e) => createTest(e)}
            >
              <div className='addTestInputsWrapper'>
                <div className='addTestSingleInput'>
                  <p>Test Name</p>
                  <div className='addTestInputWrapper'>
                    <input
                      type='text'
                      className='addTestInput'
                      onChange={(e) => handleTestData(e, 'testName')}
                      required
                    />
                  </div>
                </div>

                <div className='addTestSingleInput'>
                  <p>Description</p>
                  <div className='textAreaWrapper'>
                    <textarea
                      type='text'
                      className='textArea'
                      cols={5}
                      rows={7}
                      onChange={(e) => handleTestData(e, 'description')}
                      style={{ padding: '10px', outline: 'none' }}
                      required
                    />
                  </div>
                </div>
              </div>
              {/* <div className='bottomButtons'> */}
              <button className='cancelTestBtn' onClick={handleClickOpen}>
                Cancel
              </button>
              <button className='addTestEditBtn' type='submit'>
                Save
              </button>
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddTest
