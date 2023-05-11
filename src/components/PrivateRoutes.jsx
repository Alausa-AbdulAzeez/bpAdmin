import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { privateRequest } from '../functions/requestMethods'
import { persistor } from '../redux/store'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loggedIn, loggedOut } from '../redux/globalSlice'

const PrivateRoutes = () => {
  //   const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state?.globalState?.user)
  // const isL
  const token = useSelector((state) => state?.user?.currentUser?.data?.token)

  useEffect(() => {
    const getLoggedInStatus = async () => {
      try {
        await privateRequest.get('Staff', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        if (error?.response?.statusText === 'Unauthorized') {
          dispatch(loggedOut())

          persistor
            .purge()
            // .then(() => navigate('/login'))
            .then(() => {
              return toast.info('Session Expired Please login to continue', {
                position: 'top-right',
                // autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              })
            })
        }
      }
    }
    getLoggedInStatus()
  }, [dispatch, navigate])

  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn])
  return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoutes
