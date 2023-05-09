import { useEffect } from 'react'
import { privateRequest } from '../functions/requestMethods'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { persistor } from '../redux/store'

const useRedirectLoggedOutUser = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const getLoggedInStatus = async () => {
      try {
        await privateRequest.get('Staff')
      } catch (error) {
        if (error?.message === 'Network Error') {
          persistor
            .purge()
            .then(() => navigate('/login'))
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
  }, [navigate])
}

export default useRedirectLoggedOutUser
