import React, { useEffect, useRef, useState } from 'react'
import './changePassword.scss'
import { BsEye, BsFillEyeSlashFill } from 'react-icons/bs'
import { publicRequest } from '../../functions/requestMethods'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
  // MISCELLANEOUS
  const [btnDisabled, setBtnDisabled] = useState(false)
  const { token } = useSelector((state) => state?.user?.currentUser?.data)
  const toastId = useRef(null)
  const navigate = useNavigate()

  // END OF MISCELLANEOUS

  // USER LOGIN DETAILS
  const [user, setUser] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  // END OF USER LOGIN DETAILS

  //   FUNCTIONs FOR SETTING BUTTON STATE

  const handleSetUser = (event, inputType) => {
    setUser({ ...user, [inputType]: event.target.value })
  }

  //   END OF FUNCTIONs FOR SETTING BUTTON STATE

  // PASSWORD TOGGLE FUNCTIONALITY
  const [showPassword, setShowPassword] = useState(false)

  // FUNCTION FOR PASSWORD TOGGLE
  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev)
  }

  // END OF FUNCTION FOR PASSWORD TOGGLE

  // END OF PASSWORD TOGGLE FUNCTIONALITY

  // FUNCTION FOR ONCLICK LOGIN BUTTON
  const handleChangePassword = async (e) => {
    setBtnDisabled(true)
    e.preventDefault()

    toastId.current = toast('Please Wait', {
      autoClose: 3000,
      isLoading: true,
    })
    try {
      if (user?.newPassword.trim() === user?.confirmPassword.trim()) {
        const res = await publicRequest
          .post('/Account/change-password', user, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            toast.update(toastId.current, {
              render:
                "Password updated succesfully! You'll be redirected in a bit, Please wait...",
              type: 'success',
              isLoading: false,
              autoClose: 3000,
            })
            setBtnDisabled(false)

            setTimeout(() => {
              navigate('/login')
            }, 2500)
          })
      } else {
        toast.update(toastId.current, {
          render: "Passwords don't match!",
          type: 'error',
          isLoading: false,
          autoClose: 2000,
        })
        setBtnDisabled(false)
      }
    } catch (error) {
      console.log(error)
      toast.update(toastId.current, {
        type: 'error',
        autoClose: 2500,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          'Something went wrong, please try again'
        }`,
      })
      setBtnDisabled(false)
    }

    // login(dispatch, user, navigate)
  }
  // END OF FUNCTION FOR ONCLICK LOGIN BUTTON

  useEffect(() => {
    toast.info(
      "Hi there! You're required to change your password from the default password before you can proceed."
    )
  }, [])

  return (
    <>
      <ToastContainer />
      <div className='changePasswordWrapper'>
        {/* <div className='changePasswordWrapperLeft'>
          <img
            src={require('../../utils/images/IMG_6229.PNG')}
       
            alt=''
            className='biopathImg'
          />
        </div> */}
        <div className='changePasswordWrapperRight'>
          <form
            className='changePasswordFormWrapper'
            onSubmit={handleChangePassword}
          >
            <div className='changePasswordHeading'>Change Password</div>
            <div className='changePasswordInputs'>
              <label htmlFor=''>Email</label>
              <input
                type='email'
                className='changePasswordEmailInput changePasswordInput'
                placeholder='example@****.com'
                data-testid='emailTestId'
                onChange={(e) => handleSetUser(e, 'username')}
                required
              />
              <label htmlFor=''>Old Password</label>
              <div className='passwordWrapper'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='changePasswordPasswordInput changePasswordInput'
                  placeholder='Password'
                  onChange={(e) => handleSetUser(e, 'oldPassword')}
                  data-testid='passwordTestId'
                  required
                />
                <span onClick={handlePasswordToggle}>
                  {showPassword ? <BsEye /> : <BsFillEyeSlashFill />}
                </span>
              </div>
              <label htmlFor=''>New Password</label>
              <div className='passwordWrapper'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='changePasswordPasswordInput changePasswordInput'
                  placeholder='Password'
                  onChange={(e) => handleSetUser(e, 'newPassword')}
                  data-testid='passwordTestId'
                  required
                />
                <span onClick={handlePasswordToggle}>
                  {showPassword ? <BsEye /> : <BsFillEyeSlashFill />}
                </span>
              </div>
              <label htmlFor=''>Confirm New Password</label>
              <div className='passwordWrapper'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='changePasswordPasswordInput changePasswordInput'
                  placeholder='Password'
                  onChange={(e) => handleSetUser(e, 'confirmPassword')}
                  data-testid='passwordTestId'
                  required
                />
                <span onClick={handlePasswordToggle}>
                  {showPassword ? <BsEye /> : <BsFillEyeSlashFill />}
                </span>
              </div>
              <div className='checkboxWrapper'>
                <label htmlFor=''>Show Passwords</label>
                <input
                  type='checkbox'
                  className='checkbox'
                  onChange={handlePasswordToggle}
                />
              </div>
            </div>

            <button
              className='changePasswordBtn'
              type={'submit'}
              // disabled={isError}
              disabled={btnDisabled}
              // disabled={isFetching ? isFetching : btnDisabled}
              data-testid='changePasswordBtn'
              // onClick={handleChangePassword}
            >
              Submit
            </button>
            {/* {isError && (
              <div className='errorMsg'>
                {currentUser
                  ? currentUser?.description + 's!'
                  : 'Error logging in.. Please try again!!'}
              </div>
            )} */}
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangePassword
