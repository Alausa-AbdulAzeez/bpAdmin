import React from 'react'
import './manageCandidates.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { RiAddLine } from 'react-icons/ri'

const ManageCandidates = () => {
  return (
    <div className='manageCandidatesWrapper'>
      <Sidebar />
      <div className='manageCandidatesRight'>
        <Topber />
        <div className='manageCandidatesMainWrapper'>
          <div className='manageCandidatesMainTop'>
            <h3>All Tests</h3>
            <div className='manageCandidatesMainTopForm'>
              <div className='formAndSearchWrapperMc'>
                <TextField
                  id='outlined-search'
                  label='Candidate name'
                  type='search'
                  className='candidateName'
                />

                <div className='manageCandidatesBtn'>Search</div>
              </div>
              <Link to='/scheduleCandidate'>
                <button className='scheduleCandidateBtn'>
                  Schedule Candidate
                  <span>
                    <RiAddLine className='addIcon' />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageCandidates
