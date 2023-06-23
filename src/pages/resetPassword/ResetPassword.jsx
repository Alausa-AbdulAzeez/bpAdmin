import React, { useState } from 'react'
import './resetPassword.scss'
import { BsEye, BsFillEyeSlashFill } from 'react-icons/bs'
import { publicRequest } from '../../functions/requestMethods'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  // MISCELLANEOUS

  const token = window.location?.search?.split('=')[1]

  // END OF MISCELLANEOUS

  // USER LOGIN DETAILS
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    code: token,
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
  const handleResetPassword = async (e) => {
    e.preventDefault()
    try {
      if (user?.password === user?.confirmPassword) {
        await publicRequest.post('/Account/reset-password', user)
      } else {
        toast.error("Passwords don't match!", {
          autoClose: 2000,
        })
      }
    } catch (error) {
      console.log(error)
      toast.error(
        error.response.data.title ||
          error.response.data.description ||
          error?.message ||
          'Something went wrong, please try again'
      )
    }

    // login(dispatch, user, navigate)
  }
  // END OF FUNCTION FOR ONCLICK LOGIN BUTTON

  return (
    <>
      <div className='resetPasswordWrapper'>
        <div className='resetPasswordWrapperRight'>
          <form
            className='resetPasswordFormWrapper'
            onSubmit={handleResetPassword}
          >
            <div className='resetPasswordHeading'>Reset Password</div>
            <div className='resetPasswordInputs'>
              <label htmlFor=''>Email</label>
              <input
                type='email'
                className='resetPasswordEmailInput resetPasswordInput'
                placeholder='example@****.com'
                data-testid='emailTestId'
                onChange={(e) => handleSetUser(e, 'username')}
                required
              />

              <label htmlFor=''>New Password</label>
              <div className='passwordWrapper'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='resetPasswordPasswordInput resetPasswordInput'
                  placeholder='Password'
                  onChange={(e) => handleSetUser(e, 'password')}
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
                  className='resetPasswordPasswordInput resetPasswordInput'
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
              className='resetPasswordBtn'
              type={'submit'}
              data-testid='resetPasswordBtn'
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
