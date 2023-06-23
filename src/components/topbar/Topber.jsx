import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import './topbar.scss'
import { Link } from 'react-router-dom'

const Topber = () => {
  return (
    <div className='topbarWrapper'>
      <h3>Admin</h3>
      <Link to={'/profile'}>
        <BsFillPersonFill className='topbarIcon' />
      </Link>
    </div>
  )
}

export default Topber
