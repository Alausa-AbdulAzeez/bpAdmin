import React from 'react'
import { BsClipboardCheck, BsFillPersonFill } from 'react-icons/bs'
import { MdManageAccounts } from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import './dashboardCard.scss'

const DashboardCard = (props) => {
  let data
  switch (props?.type) {
    case 'partnerLabs':
      data = {
        title: 'Partner Labs',
        isMoney: false,
        link: 'partnerLabs',
        linkText: 'See all laboratories',
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
        isMoney: false,
        link: 'manageClients',
        linkText: 'View all clients',

        icon: (
          <RiTeamFill
            className='icon'
            style={{ color: '#33A23E', backgroundColor: '#33A23E36' }}
          />
        ),
      }

      break
    case 'manageStaff':
      data = {
        title: 'Manage Staff',
        isMoney: false,
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
        link: '/profile',
        linkText: 'View profile',

        icon: (
          <BsFillPersonFill
            className='icon'
            style={{ color: '#3970FF', backgroundColor: '#3970FF36' }}
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
      <h1>{data.title === 'Profile' ? 'Balogun' : '100+'} </h1>
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
