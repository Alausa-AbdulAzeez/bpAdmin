import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './addStaff.scss'
import AlertDialogSlide from '../../components/Dialogue'
import { Autocomplete, TextField } from '@mui/material'
import { publicRequest } from '../../functions/requestMethods'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'

const AddStaff = () => {
  // MISCELLANEOUS
  const [open, setOpen] = React.useState(false)
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

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
      const res = await publicRequest.get('/Account/roles', {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res) {
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

  // FUNCTIONALITIES FOR CREATING A NEW STAFF
  const [staff, setStaff] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    role: '',
  })

  // function for setting staff info
  const handleStaffData = (e, dataName, data) => {
    setStaff((prev) => {
      return { ...prev, [dataName]: data ? data.name : e.target.value }
    })
  }
  // end of function for setting staff info

  const createStaff = async (e) => {
    e.preventDefault()
    // const id = toast.loading('Please wait...')
    toastId.current = toast('Please wait...', {
      autoClose: false,
      isLoading: true,
    })
    try {
      await publicRequest
        .post('/Account/profile-application-user', staff, {
          headers: {
            Accept: '*',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.update(toastId.current, {
            render: 'Staff has been added succesfully!',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          })
        })
        .then(() => {
          setStaff({
            name: '',
            phoneNumber: '',
            email: '',
            role: '',
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

  //END OF FUNCTIONALITIES FOR CREATING A NEW STAFF

  // USEEFFECT TO SET NEW STAFF INPUTS TO DEFAULT
  useEffect(() => {}, [staff])

  return (
    <>
      <ToastContainer />
      <div className='addStaffWrapper'>
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          title='Cancel'
          link='/manageStaff'
          message='Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost.'
        />
        <Sidebar />
        <div className='addStaffRight'>
          <Topber />
          <div className='addStaffMainWrapper'>
            <h2> Add New Staff</h2>
            <form
              className='addStaffFormWrapper'
              onSubmit={(e) => createStaff(e)}
            >
              <div className='inputsWrapper'>
                <div className='singleInput'>
                  <p>Staff Name</p>
                  <div className='inputWrapper'>
                    <input
                      type='text'
                      className='input'
                      onChange={(e) => handleStaffData(e, 'name')}
                      required
                      value={staff.name}
                    />
                  </div>
                </div>

                <div className='singleInput'>
                  <p>Email</p>
                  <div className='inputWrapper'>
                    <input
                      type='email'
                      required
                      className='input'
                      onChange={(e) => handleStaffData(e, 'email')}
                      value={staff.email}
                    />
                  </div>
                </div>

                <div className='singleInput'>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={roles}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, option) => handleStaffData(e, 'role', option)}
                    sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Role'
                        required
                        value={staff.role}
                      />
                    )}
                  />
                </div>

                <div className='singleInput'>
                  <p>Phone Number</p>
                  <div className='inputWrapper'>
                    <input
                      type='string'
                      className='input'
                      required
                      onChange={(e) => handleStaffData(e, 'phoneNumber')}
                      value={staff.phoneNumber}
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
                <button className='addStaffEditBtn' type='submit'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddStaff
