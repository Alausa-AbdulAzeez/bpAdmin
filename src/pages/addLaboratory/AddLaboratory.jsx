import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './addLaboratory.scss'
import AlertDialogSlide from '../../components/Dialogue'
import 'react-toastify/dist/ReactToastify.css'

import { publicRequest } from '../../functions/requestMethods'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Autocomplete, TextField } from '@mui/material'

const AddLaboratory = () => {
  // TOAST
  const [open, setOpen] = React.useState(false)
  const toastId = React.useRef(null)

  // STATES
  const states = [
    'Abia',
    'Abuja',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',

    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ]

  // LAB TYPES
  const labTypes = ['PartnerLab', 'Branch', 'MainLab']

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  // TO SET THE STATE OF THE DONE AND CANCEL BUTTONS
  const [disableDoneAndCancelBtn, setDisableDoneAndCancelBtn] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // FUNCTIONALITIES FOR CREATING A NEW LAB

  const [laboratory, setLaboratory] = useState({
    laboratoryName: '',
    address: '',
    type: '',
    state: '',
    contactPerson: '',
    contactPersonPhone: '',
    contactEmailAddress: '',
  })

  // FUNCTION TO SET LABORATORY STATE AND TYPE
  const setLaboratoryInfo = (e, dataName, data) => {
    console.log(dataName, data)
    setLaboratory({ ...laboratory, [dataName]: data })
  }

  // function for setting laboratory info
  const handleLaboratoryData = (e, dataName, data) => {
    setLaboratory((prev) => {
      return { ...prev, [dataName]: data ? data.name : e.target.value }
    })
  }
  // end of function for setting laboratory info

  // create laboratory function
  const addLaboratory = async (event) => {
    event.preventDefault()
    // const id = toast.loading('Please wait...')
    toastId.current = toast('Please wait...', {
      autoClose: false,
      isLoading: true,
    })

    setDisableDoneAndCancelBtn(true)
    console.log(laboratory)

    try {
      await publicRequest
        .post('/Laboratory', laboratory, {
          headers: {
            Accept: '*',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.update(toastId.current, {
            render: 'Laboratory has been added succesfully!',
            type: 'success',
            isLoading: false,
            autoClose: 2500,
          })
          console.log(response.data)
          setDisableDoneAndCancelBtn(false)
          setLaboratory({
            laboratoryName: '',
            address: '',
            type: '',
            state: '',
            contactPerson: '',
            contactPersonPhone: '',
            contactEmailAddress: '',
          })
        })
    } catch (error) {
      console.log(error.response)
      toast.update(toastId.current, {
        type: 'error',
        autoClose: 2500,
        isLoading: false,
        render: `${
          error.response.data.title ||
          error.response.data.description ||
          'Something went wrong, please try again'
        }`,
      })
      setDisableDoneAndCancelBtn(false)
    }
  }
  // end of create laboratory function
  // useEffect to reset input to default
  useEffect(() => {}, [laboratory])
  // end of useEffect to reset input to default
  return (
    <>
      <ToastContainer />
      <div className='addLaboratoryWrapper'>
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          title='Cancel'
          link='/partnerLabs'
          message='Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost.'
        />
        <Sidebar />
        <div className='addLaboratoryRight'>
          <Topber />
          <div className='addLaboratoryMainWrapper'>
            <h2> Add New Laboratory</h2>
            {/* <HorizontalStepper properties={properties} /> */}
            <form className='formWrapper' onSubmit={addLaboratory}>
              <div className='inputsWrapper'>
                <div className='singleInput'>
                  <p>
                    Laboratory Name <span>*</span>
                  </p>
                  <div className='inputWrapper'>
                    <input
                      type='text'
                      className='input'
                      required
                      onChange={(e) =>
                        handleLaboratoryData(e, 'laboratoryName')
                      }
                      value={laboratory.laboratoryName}
                    />
                  </div>
                </div>
                <div className='singleInput'>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={states}
                    onChange={(e, option) =>
                      setLaboratoryInfo(e, 'state', option)
                    }
                    state={disableDoneAndCancelBtn}
                    sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label='State' required />
                    )}
                  />
                </div>
                <div className='singleInput'>
                  <p>
                    Address <span>*</span>
                  </p>
                  <div className='inputWrapper'>
                    <input
                      type='text'
                      className='input'
                      onChange={(e) => handleLaboratoryData(e, 'address')}
                      value={laboratory.address}
                      required
                    />
                  </div>
                </div>

                <div className='singleInput'>
                  <p>
                    Contact Person <span>*</span>
                  </p>
                  <div className='inputWrapper'>
                    <input
                      type='string'
                      className='input'
                      onChange={(e) => handleLaboratoryData(e, 'contactPerson')}
                      value={laboratory.contactPerson}
                      required
                    />
                  </div>
                </div>
                <div className='singleInput'>
                  <p>
                    Email (Contact Person)<span>*</span>
                  </p>
                  <div className='inputWrapper'>
                    <input
                      type='email'
                      className='input'
                      onChange={(e) =>
                        handleLaboratoryData(e, 'contactEmailAddress')
                      }
                      value={laboratory.contactEmailAddress}
                      required
                    />
                  </div>
                </div>
                <div className='singleInput'>
                  <p>
                    Phone Number (Contact Person) <span>*</span>
                  </p>
                  <div className='inputWrapper'>
                    <input
                      type='string'
                      className='input'
                      onChange={(e) =>
                        handleLaboratoryData(e, 'contactPersonPhone')
                      }
                      value={laboratory.contactPersonPhone}
                      required
                    />
                  </div>
                </div>
                <div className='singleInput'>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={labTypes}
                    onChange={(e, option) =>
                      setLaboratoryInfo(e, 'type', option)
                    }
                    state={disableDoneAndCancelBtn}
                    sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label='Lab Type' required />
                    )}
                  />
                </div>
              </div>

              <button
                className='cancelLaboratoryEditBtn'
                onClick={handleClickOpen}
                disabled={disableDoneAndCancelBtn}
              >
                Cancel
              </button>

              <button
                className='addLaboratoryEditBtn'
                // onClick={addLaboratory}
                disabled={disableDoneAndCancelBtn}
              >
                Done
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddLaboratory
