import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import './topbar.scss'

const Topber = () => {
  return (
    <div className='topbarWrapper'>
      <h3>Admin</h3>
      <BsFillPersonFill className='topbarIcon' />
    </div>
  )
}

export default Topber
