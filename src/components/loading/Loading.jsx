import React from 'react'
import './loading.scss'
import bcgImg from '../../utils/images/LoadingImg.png'
import { CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <div className='loadingWrapper'>
      <div className='mainLoadingWrapper'>
        <CircularProgress color='inherit' />
        <div>Loading...</div>
      </div>
    </div>
  )
}

export default Loading
