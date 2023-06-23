import React from 'react'
import './sidebar.scss'

import LogoImg from '../../utils/images/sidebarBiopath2.png'
import { RxDashboard } from 'react-icons/rx'
import { BsClipboardCheck, BsFillPersonFill } from 'react-icons/bs'
import { MdCategory, MdManageAccounts, MdSchedule } from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'
import { FaFileInvoice } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import AlertDialogSlide from '../Dialogue'

const Sidebar = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    // dispatch(loggedOut())
    setOpen(false)
  }

  // const logout = () => {
  //   dispatch(loggedOut())
  // }

  return (
    <div className='sidebarWrapper'>
      <AlertDialogSlide
        open={open}
        handleClose={handleClose}
        message=' Are you sure you want to logout?'
        link='/login'
        title='Logout'
      />
      <div className='sidebarTop'>
        <div className='sidebarTopImageWrapper'>
          <img src={LogoImg} alt='Logo' /> <span>Biopath MedLab</span>
        </div>
      </div>
      <div className='sidebarBottom'>
        <div className='sidebarBottomTop'>
          <ul className='ulTitle'>
            MAIN
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <li
                  className={
                    isActive ? 'activeLink sidebarListItem' : 'sidebarListItem'
                  }
                >
                  <RxDashboard className='sidebarIcon' />
                  <span> Dashboard</span>
                </li>
              )}
            </NavLink>
          </ul>
          <ul className='ulTitle'>
            LIST
            <NavLink to='/scheduleCandidate' style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <li
                  className={
                    isActive ? 'activeLink sidebarListItem' : 'sidebarListItem'
                  }
                >
                  <MdSchedule className='sidebarIcon' />
                  <span> Scedule Candidate</span>
                </li>
              )}
            </NavLink>
            <NavLink to='/partnerLabs' style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <li
                  className={
                    isActive ? 'activeLink sidebarListItem' : 'sidebarListItem'
                  }
                >
                  <BsClipboardCheck className='sidebarIcon' />
                  <span> Partner Labs</span>
                </li>
              )}
            </NavLink>
            <NavLink to='/manageStaff' style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <li
                  className={
                    isActive ? 'activeLink sidebarListItem' : 'sidebarListItem'
                  }
                >
                  <MdManageAccounts className='sidebarIcon' />

                  <span> Manage Staff</span>
                </li>
              )}
            </NavLink>
            <NavLink to='/manageCandidates' style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <li
                  className={
                    isActive ? 'activeLink sidebarListItem' : 'sidebarListItem'
                  }
                >
                  <FaFileInvoice className='sidebarIcon' />

                  <span> Manage Candidate</span>
                </li>
              )}
            </NavLink>
            <NavLink to='/manageClients' style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <li
                  className={
                    isActive ? 'activeLink sidebarListItem' : 'sidebarListItem'
                  }
                >
                  <RiTeamFill className='sidebarIcon' />
                  <span> Manage Clients</span>
                </li>
              )}
            </NavLink>
          </ul>

          <ul className='ulTitle'>
            TEST
            <NavLink to='/manageTests' style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <li
                  className={
                    isActive ? 'activeLink sidebarListItem' : 'sidebarListItem'
                  }
                >
                  <FaFileInvoice className='sidebarIcon' />
                  <span> Manage Tests</span>
                </li>
              )}
            </NavLink>
            <NavLink to='/testCategories' style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <li
                  className={
                    isActive ? 'activeLink sidebarListItem' : 'sidebarListItem'
                  }
                >
                  <MdCategory className='sidebarIcon' />
                  <span> Test Categories</span>
                </li>
              )}
            </NavLink>
          </ul>
          {/* <ul className='ulTitle'>
            ACCOUNT
            <NavLink to='/generateInvoice' style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <li
                  className={
                    isActive ? 'activeLink sidebarListItem' : 'sidebarListItem'
                  }
                >
                  <FaFileInvoice className='sidebarIcon' />
                  <span> Generate Invoice</span>
                </li>
              )}
            </NavLink>
          </ul> */}
        </div>
        <div className='sidebarBottomBottom'>
          <ul className='ulTitle'>
            USER
            <NavLink to='/profile' style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <li
                  className={
                    isActive ? 'activeLink sidebarListItem' : 'sidebarListItem'
                  }
                >
                  <BsFillPersonFill className='sidebarIcon' />
                  <span> Profile</span>
                </li>
              )}
            </NavLink>
            {/* <NavLink
              to='/logout'
              style={{ textDecoration: 'none' }}
              onClick={handleClickOpen}
            >
              {({ isActive }) => (
                
              )}
            </NavLink> */}
            {/* <li className='sidebarListItem' onClick={logout}>
              <FiLogOut className='sidebarIcon' />
              <span> Logout</span>
            </li> */}
            <li className='sidebarListItem' onClick={handleClickOpen}>
              <FiLogOut className='sidebarIcon' />
              <span> Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
