import React from 'react'
import './manageCandidates.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'

const ManageCandidates = () => {
  return (
    <div className='manageCandidatesWrapper'>
      <Sidebar />
      <div className='manageCandidatesRight'>
        <Topber />
        <div className='manageCandidatesMainWrapper'>
          <div className='manageTestsMainTop'>
            <h3>All Tests</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageCandidates
