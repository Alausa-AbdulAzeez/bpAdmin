import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './forgotPassword.scss'
import {
  BASE_FRONTEND_URL,
  publicRequest,
} from '../../functions/requestMethods'

const ForgotPassword = () => {
  // MISCELLANEOUS
  const [btnDisabled, setBtnDisabled] = useState(true)
  // END OF MISCELLANEOUS

  // USER LOGIN DETAILS
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  // END OF USER LOGIN DETAILS

  //   FUNCTIONs FOR SETTING BUTTON STATE

  const handleSetUser = (event, inputType) => {
    setUser({ ...user, [inputType]: event.target.value })
  }
  const setBtnState = () => {
    if (user.email && user.password) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }
  //   END OF FUNCTIONs FOR SETTING BUTTON STATE

  // FUNCTION FOR ONCLICK LOGIN BUTTON
  const handleLogin = async (e) => {
    e.preventDefault()
  }
  // END OF FUNCTION FOR ONCLICK LOGIN BUTTON

  //   USE EFFECT FOR SETTING BUTTON STATE
  useEffect(() => {
    setBtnState(user, setBtnDisabled)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <div className='forgotPasswordWrapper'>
        <div className='forgotPasswordWrapperRight'>
          <form className='forgotPasswordFormWrapper'>
            <div className='forgotPasswordHeading'>Recover Password</div>
            <p className='forgotPasswordDesc'>
              Enter your email address, and we'll send you a link to get back
              into your account.
            </p>
            <div className='forgotPasswordInputs'>
              <label htmlFor=''>Email</label>
              <input
                type='email'
                className='forgotPasswordEmailInput forgotPasswordInput'
                placeholder='example@****.com'
                data-testid='emailTestId'
                onChange={(e) => handleSetUser(e, 'email')}
              />
              <Link to={'/forgotPassword'}>
                <div className='forgotPassword'></div>
              </Link>
            </div>

            <button
              className='forgotPasswordBtn'
              type={'submit'}
              data-testid='forgotPasswordBtn'
              onClick={handleLogin}
            >
              Send Login Link
            </button>
            <Link to={`${BASE_FRONTEND_URL}login`}>
              <div className='backToLogin'>Back to login</div>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
