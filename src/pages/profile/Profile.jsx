import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./profile.scss";
import { useSelector } from "react-redux";

const Profile = () => {
  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user);
  const loggedInUserRole = currentUser?.data?.role;
  const { fullName, phoneNumber, email } = currentUser?.data?.profile;
  const userData = currentUser?.data;

  return (
    <div className="profileWrapper">
      <Sidebar />
      <div className="profileRight">
        <Topber userData={userData} />
        <div className="profileMainWrapper">
          <h2>User Profile</h2>
          <div className="formWrapper">
            <div className="profileInputsWrapper">
              <div className="profileSingleInput">
                <p>Full Name</p>
                <div className="profileInputWrapper">
                  <input
                    type="text"
                    className="profileInput"
                    disabled
                    value={fullName}
                  />
                </div>
              </div>

              <div className="profileSingleInput">
                <p>Email</p>
                <div className="profileInputWrapper">
                  <input
                    type="email"
                    className="profileInput"
                    value={email}
                    disabled
                  />
                </div>
              </div>
              <div className="profileSingleInput">
                <p>Phone Number</p>
                <div className="profileInputWrapper">
                  <input
                    type="number"
                    className="profileInput"
                    disabled
                    value={phoneNumber}
                  />
                </div>
              </div>
              <div className="profileSingleInput">
                <p>Role</p>
                <div className="profileInputWrapper">
                  <select
                    name="roleSelect"
                    id="roleSelect"
                    disabled
                    className="profileInput"
                    defaultValue={loggedInUserRole}
                  >
                    <option value={loggedInUserRole}>{loggedInUserRole}</option>
                    <option value="Admin">Admin</option>
                    <option value="labScientist">Lab Scientist</option>
                  </select>
                </div>
              </div>
            </div>
            {/* <div className='editWrapper'>
              <button className='profileEditBtn'>Edit</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
