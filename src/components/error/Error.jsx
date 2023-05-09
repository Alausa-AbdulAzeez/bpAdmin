import React from 'react'
import './error.scss'
import bcgImg from '../../utils/images/LoadingImg.png'
import { CircularProgress } from '@mui/material'

const Error = (props) => {
  const { errorMessage: error } = props
  /*error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          'Something went wrong, please try again' */

  console.log(props)
  return (
    <div className='errorWrapper'>
      <div className='mainLoadingWrapper'>
        {error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          'Something went wrong, please try again'}
        <div className='reloadBtn'>Reload</div>
      </div>
    </div>
  )
}

export default Error
