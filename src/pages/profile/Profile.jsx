import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './profile.scss'

const Profile = () => {
  return (
    <div className='profileWrapper'>
      <Sidebar />
      <div className='profileRight'>
        <Topber />
        <div className='profileMainWrapper'>
          <h2>User Profile</h2>
          <div className='formWrapper'>
            <div className='inputsWrapper'>
              <div className='singleInput'>
                <p>First Name</p>
                <div className='inputWrapper'>
                  <input type='text' className='input' />
                </div>
              </div>
              <div className='singleInput'>
                <p>Last Name</p>
                <div className='inputWrapper'>
                  <input type='text' className='input' />
                </div>
              </div>
              <div className='singleInput'>
                <p>Email</p>
                <div className='inputWrapper'>
                  <input type='email' className='input' />
                </div>
              </div>
              <div className='singleInput'>
                <p>Phone Number</p>
                <div className='inputWrapper'>
                  <input type='number' className='input' />
                </div>
              </div>
              <div className='singleInput'>
                <p>Role</p>
                <div className='inputWrapper'>
                  <select name='roleSelect' id='roleSelect' className='input'>
                    <option value='Admin'>Admin</option>
                    <option value='labScientist'>Lab Scientist</option>
                  </select>
                </div>
              </div>
            </div>
            <button className='profileEditBtn'>Edit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
