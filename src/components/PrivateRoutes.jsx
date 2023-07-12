import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { privateRequest } from '../functions/requestMethods'
import { persistor } from '../redux/store'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loggedOut } from '../redux/globalSlice'

const PrivateRoutes = () => {
  //   const [isLoggedIn, setIsLoggedIn] = useState(false)

  // MISCELLANEOUS
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // GET LOGGED IN STATE OF THE USER
  const { isLoggedIn } = useSelector((state) => state?.globalState?.user)

  // GET CURRENT USER TOKEN
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
        if (
          error?.response?.statusText === 'Unauthorized' ||
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          persistor
            .purge()
            .then(() => dispatch(loggedOut()))
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
  }, [dispatch, navigate, token])

  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn])
  return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoutes
