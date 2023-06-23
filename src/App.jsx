import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import ManageClients from './pages/manageClients/ManageClients'
import ManageStaff from './pages/manageStaff/ManageStaff'
import PartnerLabs from './pages/partnerLabs/PartnerLabs'
import Profile from './pages/profile/Profile'
import AddClient from './pages/addClient/AddClient'
import AddStaff from './pages/addStaff/addStaff'
import ManageTests from './pages/manageTests/ManageTests'
import TestCategories from './pages/testCategories/TestCategories'
import EditCategory from './pages/editCategory/EditCategory'
import ScheduleCandidate from './pages/scheduleCandidate/ScheduleCandidate'
import AddLaboratory from './pages/addLaboratory/AddLaboratory'
import AddTest from './pages/addTest/AddTest'

import PrivateRoutes from './components/PrivateRoutes'
import ManageCandidates from './pages/mangeCandidates/ManageCandidates'
import EditCandidate from './pages/editCandidate/EditCandidate'
import ChangePassword from './pages/changePassword/ChangePassword'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import ResetPassword from './pages/resetPassword/ResetPassword'

function App() {
  // const { currentUser: user } = useSelector((state) => state.user)

  // useEffect(() => {
  //   user === null && persistor.purge()
  // }, [user])

  return (
    <div className='appWrapper'>
      <BrowserRouter>
        {/* {user === null ? (
          <Routes>
            <Route path='login' element={<Login />} />
            <Route exact path='/' element={<Home />} />
            <Route path='/partnerLabs' element={<PartnerLabs />} />
            <Route path='/partnerLabs/addLab' element={<AddLaboratory />} />
            <Route path='/manageStaff' element={<ManageStaff />} />
            <Route path='/manageStaff/addStaff' element={<AddStaff />} />
            <Route path='/manageClients' element={<ManageClients />} />
            <Route path='/manageClients/addClient' element={<AddClient />} />
            <Route
              path='/testCategories/editCategory'
              element={<EditCategory />}
            />
            <Route path='/manageTests' element={<ManageTests />} />
            <Route path='/manageTests/addTest' element={<AddTest />} />
            <Route path='/testCategories' element={<TestCategories />} />
            <Route path='/scheduleCandidate' element={<ScheduleCandidate />} />

            <Route path='/profile' element={<Profile />} />
          </Routes>
        ) : (
          <Routes>
            <Route path='/*' element={<Login />} />
          </Routes>
        )} */}
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path='/' element={<Home />} />
            <Route path='/partnerLabs' element={<PartnerLabs />} />
            <Route path='/partnerLabs/addLab' element={<AddLaboratory />} />
            <Route path='/manageStaff' element={<ManageStaff />} />
            <Route path='/manageStaff/addStaff' element={<AddStaff />} />
            <Route path='/manageClients' element={<ManageClients />} />
            <Route path='/manageCandidates' element={<ManageCandidates />} />
            <Route path='/manageCandidates' element={<ManageCandidates />} />
            <Route
              path='/manageCandidates/editCandidate'
              element={<EditCandidate />}
            />
            <Route path='/manageClients/addClient' element={<AddClient />} />
            <Route
              path='/testCategories/editCategory'
              element={<EditCategory />}
            />
            <Route path='/manageTests' element={<ManageTests />} />
            <Route path='/manageTests/addTest' element={<AddTest />} />
            <Route path='/testCategories' element={<TestCategories />} />
            <Route path='/scheduleCandidate' element={<ScheduleCandidate />} />

            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/getToken' element={<ForgotPassword />} />
          <Route path='/forgotPassword' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
