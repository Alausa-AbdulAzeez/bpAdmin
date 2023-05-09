import React from 'react'
import './error.scss'
import bcgImg from '../../utils/images/LoadingImg.png'
import { CircularProgress } from '@mui/material'

const Error = () => {
  return (
    <div className='errorWrapper'>
      <div className='mainLoadingWrapper'>
        App encountered an error
        <div className='reloadBtn'>Reload</div>
      </div>
    </div>
  )
}

export default Error
