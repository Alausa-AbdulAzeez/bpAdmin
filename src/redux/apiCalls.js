import { toast } from 'react-toastify'
import { publicRequest } from '../functions/requestMethods'
import { loginFailure, loginStart, loginSuccess } from './userSlice'
import { loggedIn } from './globalSlice'

export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart())

  try {
    const res = await publicRequest.post('/Account/login', user)

    dispatch(loginSuccess(res?.data))
    // console.log(res.data)
    dispatch(loggedIn())
    navigate('/')
  } catch (error) {
    console.log(error)
    dispatch(loginFailure())
    toast.error(
      error.response.data.title ||
        error.response.data.description ||
        error?.message ||
        'Something went wrong, please try again'
    )
  }
}
