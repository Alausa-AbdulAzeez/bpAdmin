import React from 'react'
import { BsClipboardCheck, BsFillPersonFill } from 'react-icons/bs'
import { MdManageAccounts } from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import './dashboardCard.scss'

const DashboardCard = (props) => {
  let data
  switch (props?.type) {
    case 'scheduleCandidate':
      data = {
        title: 'Schedule Candidate',
        isMoney: false,
        isScheduleCandidate: true,
        link: 'scheduleCandidate',
        linkText: 'Schedule Candidate',
        icon: (
          <BsClipboardCheck
            className='icon'
            style={{ color: '#7451f8', backgroundColor: '#ece8ff' }}
          />
        ),
      }

      break
    case 'manageClients':
      data = {
        title: 'Manage Clients',
        isManageClients: true,
        isMoney: false,
        link: 'manageClients',
        linkText: 'View all clients',

        icon: (
          <RiTeamFill
            className='icon'
            style={{ color: '#3970FF', backgroundColor: '#3970FF36' }}
          />
        ),
      }

      break
    case 'manageStaff':
      data = {
        title: 'Manage Staff',
        isMoney: false,
        isManageStaff: true,
        link: 'manageStaff',
        linkText: 'View all staff',

        icon: (
          <MdManageAccounts
            className='icon'
            style={{ color: '#FF8C39', backgroundColor: '#FF8C3938' }}
          />
        ),
      }

      break
    case 'profile':
      data = {
        title: 'Profile',
        isMoney: false,
        isProfile: true,
        link: '/profile',
        linkText: 'View profile',

        icon: (
          <BsFillPersonFill
            className='icon'
            style={{ color: '#33A23E', backgroundColor: '#33A23E36' }}
          />
        ),
      }
      break

    default:
      break
  }
  return (
    <div className='dashboardCardWrapper'>
      <p>{data.title}</p>
      <div className='imgWrapper'>
        {data.isProfile && <h1>{props.userName}</h1>}
        {data.isManageClients && (
          <img
            src='https://cdn0.iconfinder.com/data/icons/business-and-management-flat-8/24/PARTNER_team_friends_partners-128.png'
            alt='binoculars'
            className='candidateSearch'
          />
        )}
        {data.isScheduleCandidate && (
          <img
            src='https://cdn4.iconfinder.com/data/icons/halloween-2476/64/calendar-time-event-day-schedule-halloween-128.png'
            alt='schedule'
            className='candidateSearch'
          />
        )}
        {/* {data.isManageStaff && (
          <img
            src='https://cdn3.iconfinder.com/data/icons/iconpark-vol-8/48/file-staff-one-128.png'
            alt='schedule'
            className='candidateSearch'
          />
        )} */}
      </div>
      <div className='cardBottom'>
        <Link to={data.link} className='cardBottomText'>
          {data.linkText}
        </Link>
        {data.icon}
      </div>
    </div>
  )
}

export default DashboardCard
